import Imap from "imap";
import { simpleParser } from "mailparser";
import { processEmailWebhook } from "./emailVerificationService";

const imap = new Imap({
    user: process.env.EMAIL_USER as string,
    password: process.env.EMAIL_PASS as string,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
});

function openInbox(cb: (err: Error | null, box: any) => void) {
    imap.openBox("INBOX", false, cb);
}

// Helper to process a single message
function processMessage(msg: Imap.ImapMessage) {
    msg.on("body", (stream: any, info: any) => {
        simpleParser(stream, async (err, parsed) => {
            if (err) return console.error("Parsing error:", err);

            const from = parsed.from?.text || "";
            const subject = parsed.subject || "";
            const text = parsed.text || "";
            const html = parsed.html || "";

            // Filter for Slice emails
            if (!from.toLowerCase().includes("slice") && !subject.toLowerCase().includes("slice")) {
                return;
            }

            console.log(`[Email Watcher] Processing email from: ${from}, Subject: ${subject}`);
            console.log("[Email Watcher] ✅ Found Slice email! Processing...");

            try {
                // Direct service call instead of webhook fetch
                const result = await processEmailWebhook(text || (html as string));
                console.log("[Email Watcher] Processing result:", result);

            } catch (error) {
                console.error("[Email Watcher] ❌ Processing error:", error);
            }
        });
    });
}

function scanPastEmails(cb: () => void) {
    console.log("[Email Watcher] 🔍 Scanning for Slice emails from the past 24 hours...");

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Search for emails since yesterday
    imap.search(['ALL', ['SINCE', yesterday]], (err, results) => {
        if (err) {
            console.error("[Email Watcher] Search error:", err);
            return cb();
        }

        if (!results || !results.length) {
            console.log("[Email Watcher] No recent emails found.");
            return cb();
        }

        console.log(`[Email Watcher] Found ${results.length} recent emails. Checking for Slice transactions...`);

        const fetcher = imap.fetch(results, {
            bodies: "",
            struct: true
        });

        fetcher.on("message", processMessage);

        fetcher.once('error', function (err) {
            console.log('[Email Watcher] Fetch error: ' + err);
        });

        fetcher.once('end', function () {
            console.log('[Email Watcher] Done scanning past emails.');
            cb();
        });
    });
}

export function startEmailWatcher() {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("[Email Watcher] Skipping watcher start: EMAIL_USER or EMAIL_PASS not set.");
        return;
    }

    imap.once("ready", () => {
        openInbox((err, box) => {
            if (err) {
                console.error("[Email Watcher] Error opening inbox:", err);
                return;
            }

            console.log("[Email Watcher] 📩 Gmail watcher started...");
            console.log(`[Email Watcher] Watching for emails from: Slice`);

            // 1. Scan past emails first
            scanPastEmails(() => {
                console.log("[Email Watcher] 👀 Starting real-time watcher...");

                // 2. Listen for new mail
                imap.on("mail", (numNewMsgs) => {
                    console.log(`[Email Watcher] New email received! Total: ${numNewMsgs}`);

                    const fetcher = imap.seq.fetch(box.messages.total + ":*", {
                        bodies: "",
                        struct: true
                    });

                    fetcher.on("message", processMessage);

                    fetcher.once('error', function (err) {
                        console.log('[Email Watcher] Fetch error: ' + err);
                    });

                    fetcher.once('end', function () {
                        console.log('[Email Watcher] Done fetching new messages!');
                    });
                });
            });
        });
    });

    imap.once("error", (err: any) => {
        console.error("[Email Watcher] ❌ IMAP Error:", err);
        setTimeout(() => {
            console.log("[Email Watcher] Reconnecting...");
            imap.connect();
        }, 5000);
    });

    imap.once("end", () => {
        console.log("[Email Watcher] Connection ended");
    });

    imap.connect();
}
