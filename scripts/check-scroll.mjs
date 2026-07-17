import { chromium } from "playwright";

const browser = await chromium.launch({
  executablePath: "/snap/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});

const baseUrl = process.env.RADEEF_URL || "http://127.0.0.1:5174/radeef/";
const viewports = [
  { name: "small-mobile", width: 375, height: 667 },
  { name: "mobile", width: 390, height: 844 },
  { name: "zoomed-desktop", width: 1053, height: 709 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const metrics = await page.evaluate(() => {
    const doc = document.scrollingElement;
    const appScroll = document.querySelector(".scroll-area");
    return {
      documentClientHeight: doc.clientHeight,
      documentScrollHeight: doc.scrollHeight,
      documentClientWidth: doc.clientWidth,
      documentScrollWidth: doc.scrollWidth,
      appClientHeight: appScroll.clientHeight,
      appScrollHeight: appScroll.scrollHeight,
    };
  });

  if (metrics.documentScrollHeight !== metrics.documentClientHeight || metrics.documentScrollWidth !== metrics.documentClientWidth) {
    throw new Error(`${viewport.name}: outer document can scroll: ${JSON.stringify(metrics)}`);
  }
  if (metrics.appScrollHeight !== metrics.appClientHeight) {
    throw new Error(`${viewport.name}: welcome screen can scroll: ${JSON.stringify(metrics)}`);
  }
  const welcomeBounds = await page.locator(".welcome").boundingBox();
  const merchantChoiceBounds = await page.getByRole("button", { name: /صاحب منشأة أو فكرة/ }).boundingBox();
  const legalNoteBounds = await page.locator(".legal-note").boundingBox();
  if (!welcomeBounds || !merchantChoiceBounds || !legalNoteBounds || merchantChoiceBounds.y + merchantChoiceBounds.height > welcomeBounds.y + welcomeBounds.height || legalNoteBounds.y + legalNoteBounds.height > welcomeBounds.y + welcomeBounds.height) {
    throw new Error(`${viewport.name}: welcome controls are clipped outside the app frame`);
  }
  await page.screenshot({ path: `/tmp/radeef-welcome-${viewport.name}.png` });

  await page.getByRole("button", { name: /صاحب منشأة أو فكرة/ }).click();
  await page.getByRole("button", { name: "ابدأ طلب التمويل" }).click();
  const innerScroll = await page.locator(".scroll-area").evaluate(element => ({ clientHeight: element.clientHeight, scrollHeight: element.scrollHeight }));
  if (innerScroll.scrollHeight <= innerScroll.clientHeight) {
    throw new Error(`${viewport.name}: long form is not scrolling inside the app: ${JSON.stringify(innerScroll)}`);
  }

  console.log(`${viewport.name}: welcome locked, outer locked, form scroll active`);
  await page.close();
}

await browser.close();
