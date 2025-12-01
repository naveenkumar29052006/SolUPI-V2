import { parseEmailContent } from './services/emailVerificationService';

const emailSample = `
Hi Naveen,
You have received ₹1 via UPI in your slice bank account xx6712!
Transaction date	01-Dec-25
From	Kavya Sarsawat
RRN	570196198030
Best,
Team slice
Digital safety tips
To talk to us, drop an email to help@slicebank.com
© slice small finance bank. All rights reserved.
Instagram	Facebook	Twitter	LinkedIn
`;

const result = parseEmailContent(emailSample);
console.log("Parsed Result:", result);

if (result.rrn === '570196198030' && result.amount === 1 && result.sender === 'Kavya Sarsawat') {
    console.log("✅ Test Passed!");
} else {
    console.error("❌ Test Failed!");
}
