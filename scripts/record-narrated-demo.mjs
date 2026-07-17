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
    text: "مرحبًا بكم في رديف، منظومة استثمار وتمويل مجتمعي داخل تطبيق الإنماء. تبدأ الرحلة من مسارين واضحين: مستثمر فرد، أو صاحب منشأة وفكرة يبحث عن التمويل.",
    action: async () => {},
  },
  {
    id: "02-investment-method",
    text: "نبدأ بمسار المستثمر الفرد. يستطيع العميل الاستثمار تلقائيًا من فكة المشتريات، أو إضافة مبلغ مباشر من حسابه. في هذا المثال سنختار التقريب إلى خمسة ريالات.",
    action: async page => page.getByRole("button", { name: /مستثمر فرد/ }).click(),
  },
  {
    id: "03-investment-goal",
    text: "بعدها يحدد العميل هدفه المالي، مثل سفر الصيف، والمبلغ الذي يريد الوصول إليه، والمدة المناسبة. ويعرض رديف تقديرًا مبنيًا على نمط صرفه السابق.",
    action: async page => page.getByRole("button", { name: "التالي" }).click(),
  },
  {
    id: "04-investment-risk",
    text: "ثم يختار مستوى المخاطرة: منخفض، أو متوسط، أو مرتفع. هذا الاختيار هو الأساس الذي يستخدمه رديف لمطابقة أموال العميل مع الصكوك المناسبة.",
    action: async page => page.getByRole("button", { name: "التالي" }).click(),
  },
  {
    id: "05-investment-match",
    text: "بناءً على المستوى المتوسط، يعرض رديف فرص صكوك لمنشآت محلية معتمدة، مع القطاع، والمدة، والعائد السنوي المتوقع. نختار هنا صك توسع سلسلة مقاهٍ.",
    action: async page => page.getByRole("button", { name: "اعرض الفرص المناسبة" }).click(),
  },
  {
    id: "06-investment-review",
    text: "قبل التفعيل، يرى العميل الرحلة كاملة: تجميع الفكة، ثم مطابقتها مع الصك، ثم العائد المتوقع. كما يراجع الهدف، ومستوى المخاطرة، ومصدر الأموال.",
    action: async page => {
      await page.getByRole("button", { name: /صك توسّع سلسلة مقاهٍ/ }).click();
      await page.getByRole("button", { name: "متابعة" }).click();
    },
  },
  {
    id: "07-investment-success",
    text: "بعد الموافقة على الشروط، تُفعّل خطة رديف. ومن أول عملية مؤهلة، تبدأ الأموال رحلتها من التجميع، إلى تمويل المنشأة، ثم العودة بالعوائد حسب أداء الصك.",
    action: async page => {
      await page.getByRole("checkbox").check();
      await page.getByRole("button", { name: "تأكيد وتفعيل رديف" }).click();
    },
  },
  {
    id: "08-investment-portfolio",
    text: "وفي محفظة رديف، يتابع العميل قيمة استثماره، والعوائد، وتقدمه نحو الهدف، والصك النشط الذي يساهم من خلاله في دعم منشأة محلية.",
    action: async page => page.getByRole("button", { name: "عرض محفظة رديف" }).click(),
  },
  {
    id: "09-merchant-intro",
    text: "ننتقل الآن إلى المسار الثاني: صاحب منشأة أو فكرة. يوضح رديف أن الطلب يمر بثلاث مراحل: تقديم البيانات، ومراجعة بنك الإنماء، ثم طرح الصكوك وجمع التمويل.",
    action: async page => {
      await page.getByRole("button", { name: "إغلاق" }).click();
      await page.getByRole("button", { name: /صاحب منشأة أو فكرة/ }).click();
    },
  },
  {
    id: "10-merchant-details-top",
    text: "يبدأ صاحب الطلب بتحديد ما إذا كان يمثل منشأة قائمة، أو فكرة قيد التأسيس. وللمنشأة القائمة تُضاف بيانات السجل التجاري والقطاع.",
    action: async page => page.getByRole("button", { name: "ابدأ طلب التمويل" }).click(),
  },
  {
    id: "11-merchant-details-bottom",
    text: "ثم يحدد مبلغ التمويل المطلوب، ويشرح استخدامه، مثل افتتاح فروع جديدة أو تجهيز خط إنتاج. أما المستندات التفصيلية، فيطلبها فريق رديف بعد التقييم الأولي.",
    action: async page => page.locator(".scroll-area").evaluate(element => element.scrollTo({ top: element.scrollHeight, behavior: "instant" })),
  },
  {
    id: "12-merchant-structure",
    text: "يقدم رديف تصورًا أوليًا لهيكلة الصك: قيمة التمويل، وعدد الأجزاء، وقيمة كل جزء، والمدة، والعائد المتوقع. ويظل الاعتماد النهائي خاضعًا للدراسة الائتمانية والتنظيمية.",
    action: async page => page.getByRole("button", { name: "متابعة" }).click(),
  },
  {
    id: "13-merchant-review",
    text: "في المراجعة النهائية، يتأكد صاحب المنشأة من بيانات الطلب. وبعد الإرسال ينتقل الطلب إلى فريق رديف، ثم إلى الدراسة، والعقود، وطرح الصكوك عند الموافقة.",
    action: async page => page.getByRole("button", { name: "مراجعة الطلب" }).click(),
  },
  {
    id: "14-merchant-success",
    text: "تم إرسال الطلب بنجاح، ويظهر رقم مرجعي وحالة قيد المراجعة. وهكذا يربط رديف مدخرات الأفراد باحتياجات المنشآت، في دورة مالية واحدة وواضحة.",
    action: async page => {
      await page.getByRole("checkbox").check();
      await page.getByRole("button", { name: "إرسال طلب التمويل" }).click();
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
  run("edge-tts", ["--voice", voice, "--rate=-8%", "--text", scene.text, "--write-media", scene.mp3]);
  run("ffmpeg", ["-y", "-loglevel", "error", "-i", scene.mp3, "-af", "adelay=650,apad=pad_dur=1.2", "-ar", "48000", "-ac", "1", scene.wav]);
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
