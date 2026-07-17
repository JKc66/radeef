import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

const root = resolve(import.meta.dirname, "..");
const buildDir = resolve(root, ".demo-build");
const videoDir = resolve(buildDir, "video");
const output = resolve(root, "radeef-narrated-demo.mp4");
const baseUrl = process.env.RADEEF_URL || "http://127.0.0.1:5174/radeef/";
const voice = process.env.RADEEF_VOICE || "ar-SA-ZariyahNeural";

rmSync(buildDir, { recursive: true, force: true });
mkdirSync(videoDir, { recursive: true });

const scenes = [
  {
    id: "01-welcome",
    text: "رديف تجربة ادخار واستثمار وتمويل مجتمعي داخل تطبيق الإنماء، تربط الأفراد بالمنشآت المحلية عبر صكوك معتمدة.",
    action: async () => {},
  },
  {
    id: "02-investment-method",
    text: "يختار المستثمر جمع فكة مشترياته تلقائيًا، أو إضافة مبلغ مباشر من حسابه.",
    action: async page => page.getByRole("button", { name: /مستثمر فرد/ }).click(),
  },
  {
    id: "03-investment-goal",
    text: "ثم يحدد هدفه ومدته، ويرى تقديرًا مبنيًا على نمط صرفه.",
    action: async page => page.getByRole("button", { name: "التالي" }).click(),
  },
  {
    id: "04-risk-and-match",
    text: "وبحسب مستوى المخاطرة، يطابق رديف أمواله مع صكوك محلية توضح المدة والعائد المتوقع.",
    action: async page => {
      await page.getByRole("button", { name: "التالي" }).click();
      await page.waitForTimeout(500);
      await page.getByRole("button", { name: "اعرض الفرص المناسبة" }).click();
    },
  },
  {
    id: "05-investment-review",
    text: "قبل التفعيل، يراجع دورة الأموال: تجميع، وتمويل، ثم عودة الأصل والعوائد.",
    action: async page => {
      await page.getByRole("button", { name: /صك توسّع سلسلة مقاهٍ/ }).click();
      await page.waitForTimeout(350);
      await page.getByRole("button", { name: "متابعة" }).click();
    },
  },
  {
    id: "06-investment-success",
    text: "وبموافقة واحدة، تبدأ الخطة من أول عملية شراء مؤهلة.",
    action: async page => {
      await page.getByRole("checkbox").check();
      await page.getByRole("button", { name: "تأكيد وتفعيل رديف" }).click();
    },
  },
  {
    id: "07-investment-portfolio",
    text: "وفي محفظته، يتابع المستثمر القيمة والأرباح وتقدمه نحو الهدف وأثره المحلي.",
    action: async page => page.getByRole("button", { name: "عرض محفظة رديف" }).click(),
  },
  {
    id: "08-merchant-intro",
    text: "ويستطيع صاحب المنشأة طلب تمويل بالصكوك، يبدأ بمعلومات أولية ومراجعة البنك.",
    action: async page => {
      await page.getByRole("button", { name: "إغلاق" }).click();
      await page.getByRole("button", { name: /تمويل منشأة/ }).click();
    },
  },
  {
    id: "09-merchant-structure",
    text: "ويقترح رديف هيكلة للمبلغ والأجزاء والمدة والعائد، خاضعة للاعتماد النهائي.",
    action: async page => {
      await page.getByRole("button", { name: "ابدأ طلب التمويل" }).click();
      await page.waitForTimeout(500);
      await page.getByRole("button", { name: "متابعة" }).click();
    },
  },
  {
    id: "10-assistant",
    text: "ويبقى مساعد رديف حاضرًا لشرح الأهداف والمخاطر والتمويل، بإجابات توعوية غير استشارية.",
    action: async page => {
      await page.getByRole("button", { name: "فتح مساعد رديف" }).click();
      await page.getByRole("button", { name: "كيف تُهيكل الصكوك؟" }).click();
      await page.waitForTimeout(750);
    },
  },
];

function run(command, args, options = {}) {
  execFileSync(command, args, { cwd: root, stdio: "inherit", ...options });
}

function durationOf(path) {
  return Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", path], { encoding: "utf8" }).trim());
}

console.log(`Generating Arabic narration with ${voice}...`);
for (const scene of scenes) {
  scene.mp3 = resolve(buildDir, `${scene.id}.mp3`);
  scene.wav = resolve(buildDir, `${scene.id}.wav`);
  run("edge-tts", ["--voice", voice, "--rate=+12%", "--text", scene.text, "--write-media", scene.mp3]);
  run("ffmpeg", ["-y", "-loglevel", "error", "-i", scene.mp3, "-af", "adelay=200,apad=pad_dur=0.3", "-ar", "48000", "-ac", "1", scene.wav]);
  scene.duration = durationOf(scene.wav);
}

const concatList = resolve(buildDir, "narration-concat.txt");
writeFileSync(concatList, scenes.map(scene => `file '${scene.wav.replaceAll("'", "'\\''")}'`).join("\n"));
const narration = resolve(buildDir, "narration.wav");
run("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", concatList, "-c:a", "pcm_s16le", narration]);

console.log("Recording synchronized app walkthrough...");
const browser = await chromium.launch({ executablePath: "/snap/bin/chromium", headless: true, args: ["--no-sandbox"] });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  recordVideo: { dir: videoDir, size: { width: 390, height: 844 } },
});
const page = await context.newPage();
await page.goto(baseUrl, { waitUntil: "networkidle" });

for (const scene of scenes) {
  console.log(`${scene.id}: ${scene.duration.toFixed(1)}s`);
  await scene.action(page);
  await page.waitForTimeout(Math.ceil(scene.duration * 1000));
}

const rawVideo = await page.video().path();
await context.close();
await browser.close();

const recordedVideo = resolve(buildDir, "recording.webm");
run("ffmpeg", ["-y", "-loglevel", "error", "-i", rawVideo, "-c", "copy", recordedVideo]);

console.log("Rendering final narrated MP4...");
run("ffmpeg", [
  "-y", "-loglevel", "error",
  "-i", recordedVideo,
  "-i", narration,
  "-filter_complex", "[0:v]scale=-2:1920:flags=lanczos,pad=1080:1920:(ow-iw)/2:0:color=0x061827[v];[1:a]loudnorm=I=-16:TP=-1.5:LRA=7,apad=pad_dur=3[a]",
  "-map", "[v]", "-map", "[a]",
  "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-r", "30", "-pix_fmt", "yuv420p",
  "-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-shortest", "-movflags", "+faststart",
  output,
]);

const summary = {
  output,
  durationSeconds: durationOf(output),
  sizeBytes: readdirSync(root).includes("radeef-narrated-demo.mp4") ? undefined : 0,
};
console.log(JSON.stringify(summary, null, 2));
