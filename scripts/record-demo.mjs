import { chromium } from "playwright";

const videoDir = new URL("../.demo-video/", import.meta.url).pathname;
const browser = await chromium.launch({
  executablePath: "/snap/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  recordVideo: { dir: videoDir, size: { width: 390, height: 844 } },
});
const page = await context.newPage();
const pause = (ms = 700) => page.waitForTimeout(ms);
const baseUrl = process.env.RADEEF_URL || "http://127.0.0.1:5174/radeef/";

await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.screenshot({ path: "/tmp/radeef-welcome.png" });

await page.getByRole("button", { name: /مستثمر فرد/ }).click();
await page.getByRole("button", { name: "التالي" }).click();
await pause();
await page.getByRole("button", { name: "التالي" }).click();
await pause();
await page.getByRole("button", { name: "اعرض الفرص المناسبة" }).click();
await pause();
await page.getByRole("button", { name: /صك توسّع سلسلة مقاهٍ/ }).click();
await page.getByRole("button", { name: "متابعة" }).click();
await pause();
await page.getByRole("checkbox").check();
await page.getByRole("button", { name: "تأكيد وتفعيل رديف" }).click();
await pause();
await page.getByRole("button", { name: "عرض محفظة رديف" }).click();
await pause();
await page.screenshot({ path: "/tmp/radeef-dashboard.png" });

// Verify the direct-investment branch is part of the same isolated Radeef flow.
await page.getByRole("button", { name: "إضافة خطة استثمار" }).click();
await page.getByRole("button", { name: /استثمار مباشر/ }).click();
await page.getByRole("textbox", { name: "مبلغ الاستثمار" }).fill("10000");
await page.getByRole("button", { name: "التالي" }).click();
await page.getByRole("button", { name: "التالي" }).click();
await page.getByRole("button", { name: "اعرض الفرص المناسبة" }).click();
await page.getByRole("button", { name: /صك توسّع سلسلة مقاهٍ/ }).click();
await page.getByRole("button", { name: "متابعة" }).click();
await page.getByRole("button", { name: "تأكيد وتفعيل رديف" }).click();
await page.getByRole("heading", { name: "خطة رديف صارت جاهزة" }).waitFor();

// Verify the establishment-side financing request from entry to review status.
await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.screenshot({ path: "/tmp/radeef-two-paths.png" });
await page.getByRole("button", { name: /صاحب منشأة أو فكرة/ }).click();
await page.getByRole("button", { name: "ابدأ طلب التمويل" }).click();
await page.getByRole("button", { name: "فكرة قيد التأسيس" }).click();
await page.getByRole("button", { name: "متابعة" }).click();
await page.getByRole("heading", { name: "هيكلة أولية للصك" }).waitFor();
await page.screenshot({ path: "/tmp/radeef-merchant-plan.png" });
await page.getByRole("button", { name: "مراجعة الطلب" }).click();
await page.getByRole("checkbox").check();
await page.getByRole("button", { name: "إرسال طلب التمويل" }).click();
await page.getByRole("heading", { name: "وصلنا طلبك" }).waitFor();
await page.screenshot({ path: "/tmp/radeef-merchant-success.png" });

const videoPath = await page.video().path();
await context.close();
await browser.close();
console.log(videoPath);
