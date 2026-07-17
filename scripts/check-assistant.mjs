import { chromium } from "playwright";

const browser = await chromium.launch({ executablePath: "/snap/bin/chromium", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const baseUrl = process.env.RADEEF_URL || "http://127.0.0.1:5174/radeef/";

await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "فتح محفظتي" }).waitFor();
await page.getByRole("button", { name: "فتح مساعد رديف" }).click();
await page.getByRole("button", { name: "كم ممكن أجمع؟" }).click();
await page.getByText(/قد تجمع نحو 1,280 ريال/).waitFor();
await page.screenshot({ path: "/tmp/radeef-assistant-investor.png" });
await page.getByRole("button", { name: "إغلاق المساعد" }).click();
await page.getByRole("button", { name: /صاحب منشأة أو فكرة/ }).click();
await page.getByRole("button", { name: "فتح مساعد رديف" }).click();
await page.getByRole("button", { name: "هل الفكرة مؤهلة؟" }).click();
await page.getByText(/يمكن للفكرة قيد التأسيس/).waitFor();
await page.screenshot({ path: "/tmp/radeef-assistant-merchant.png" });

console.log("assistant: investor and merchant contexts passed; wallet entry preserved");
await browser.close();
