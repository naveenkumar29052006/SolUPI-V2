import { prisma } from './prisma';
import { verifyUTRAndCompleteOrder } from './orderService';

interface EmailParseResult {
    rrn: string | null;
    amount: number | null;
    sender: string | null;
    date: string | null;
}

/**
 * Parses the email body from Slice Bank to extract RRN, Amount, Sender, and Date.
 */
export function parseEmailContent(emailBody: string): EmailParseResult {
    const result: EmailParseResult = {
        rrn: null,
        amount: null,
        sender: null,
        date: null
    };

    // 1. Extract RRN (Reference Number)
    const rrnMatch = emailBody.match(/RRN\s+(\d{12})/i);
    if (rrnMatch && rrnMatch[1]) {
        result.rrn = rrnMatch[1];
    }

    // 2. Extract Amount
    const amountMatch = emailBody.match(/received\s+(?:₹|Rs\.?|INR)?\s*([\d,]+(?:\.\d{2})?)/i);
    if (amountMatch && amountMatch[1]) {
        const cleanAmount = amountMatch[1].replace(/,/g, '');
        result.amount = parseFloat(cleanAmount);
    }

    // 3. Extract Sender
    const senderMatch = emailBody.match(/From\s+([A-Za-z\s]+)(?=\n|\r|RRN)/i);
    if (senderMatch && senderMatch[1]) {
        result.sender = senderMatch[1].trim();
    }

    // 4. Extract Date
    // Try to find a date string. This is a best-effort regex.
    // Example: "Date: 2023-10-27 10:30:00" or similar in email headers/body
    const dateMatch = emailBody.match(/(?:Date|Sent):\s*(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/i);
    if (dateMatch && dateMatch[1]) {
        result.date = dateMatch[1];
    } else {
        // Fallback to current ISO string if not found
        result.date = new Date().toISOString();
    }

    return result;
}

/**
 * Processes an incoming email webhook, parses its content, and stores the transaction
 * details in the EmailTransaction table.
 */
export const processEmailWebhook = async (emailBody: string) => {
    console.log("📧 Processing email webhook...");

    const parsedData = parseEmailContent(emailBody);

    if (!parsedData.rrn && !parsedData.amount && !parsedData.sender) {
        console.log("❌ Could not parse meaningful email content");
        return { success: false, error: "Could not parse email" };
    }

    const { rrn, amount, sender, date } = parsedData;
    console.log(`[Email Verification] Found RRN: ${rrn}, Amount: ${amount}, Sender: ${sender}, Date: ${date}`);

    if (!rrn) {
        console.log("❌ RRN not found in email content, cannot store transaction.");
        return { success: false, error: "RRN not found in email" };
    }

    try {
        // Store the transaction in the database
        const transaction = await prisma.emailTransaction.create({
            data: {
                rrn,
                sender: sender || "Unknown",
                transactionDate: date || new Date().toISOString(),
                amount: amount || 0,
                isUsed: false
            }
        });

        console.log(`✅ Stored email transaction: ${transaction.id}`);

        // Trigger order verification in case the order is already waiting
        console.log(`[Email Verification] Triggering verification for RRN: ${rrn}`);
        verifyUTRAndCompleteOrder(rrn).catch(err => {
            console.error(`[Email Verification] Auto-verification failed for RRN ${rrn}:`, err);
        });

        return { success: true, transactionId: transaction.id };

    } catch (error: any) {
        if (error.code === 'P2002') {
            console.log(`⚠️ Transaction with RRN ${rrn} already exists.`);
            return { success: true, message: "Transaction already exists" };
        }
        console.error("❌ Error storing email transaction:", error);
        return { success: false, error: "Database error" };
    }
};
