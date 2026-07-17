import { useState } from "react";
import {
  ArrowRight,
  Bank,
  Briefcase,
  Buildings,
  Check,
  CheckCircle,
  ClipboardText,
  Clock,
  Coins,
  FileText,
  Handshake,
  Info,
  PaperPlaneRight,
  Robot,
  ShieldCheck,
  Sparkle,
  Storefront,
  Target,
  TrendUp,
  Wallet,
  X,
} from "@phosphor-icons/react";
import logo from "./assets/radeef-logo.webp";
import coinArt from "./assets/coin.webp";

const opportunities = {
  low: [
    { id: "warehouse", name: "صك توسّع مستودعات محلية", sector: "الخدمات اللوجستية", return: "6.5%", term: "12 شهرًا" },
    { id: "clinic", name: "صك تجهيز عيادات مجتمعية", sector: "الرعاية الصحية", return: "6.8%", term: "14 شهرًا" },
  ],
  medium: [
    { id: "cafe", name: "صك توسّع سلسلة مقاهٍ", sector: "الأغذية والمقاهي", return: "8.2%", term: "12 شهرًا" },
    { id: "hospitality", name: "صك مشروع ضيافة محلي", sector: "الضيافة", return: "8.7%", term: "18 شهرًا" },
  ],
  high: [
    { id: "fintech", name: "صك نمو منصة تقنية مالية", sector: "التقنية المالية", return: "11.4%", term: "24 شهرًا" },
    { id: "mobility", name: "صك توسّع التنقل الكهربائي", sector: "النقل الذكي", return: "10.8%", term: "20 شهرًا" },
  ],
};

const steps = ["الطريقة", "الهدف", "المخاطرة", "المطابقة", "المراجعة"];
const riskLabels = { low: "منخفضة", medium: "متوسطة", high: "مرتفعة" };
const riskOptions = [
  ["low", "منخفضة", "استقرار أعلى وعائد متوقع أقل", "5–7%"],
  ["medium", "متوسطة", "توازن بين النمو والاستقرار", "7–10%"],
  ["high", "مرتفعة", "تذبذب أعلى ونمو محتمل أكبر", "10–13%"],
];
const flowOrder = ["method", "goal", "risk", "match", "review"];
const merchantSteps = ["الآلية", "المنشأة", "هيكلة الصك", "المراجعة"];
const merchantFlowOrder = ["merchant-intro", "merchant-details", "merchant-plan", "merchant-review"];

function Icon({ icon: Component, size = 22, ...props }) {
  return <Component size={size} weight="regular" {...props} />;
}

function BrandHeader({ onBack, onClose, compact = false }) {
  return <header className={`brand-header ${compact ? "compact" : ""}`}>
    <button type="button" className="icon-button" onClick={onBack} aria-label="العودة"><Icon icon={ArrowRight} /></button>
    <img src={logo} alt="رديف" className="brand-logo" />
    <button type="button" className="icon-button" onClick={onClose} aria-label="إغلاق"><Icon icon={X} /></button>
  </header>;
}

function Progress({ current, labels = steps }) {
  return <div className="progress-wrap">
    <div className="progress-label"><span>الخطوة {current} من {labels.length}</span><strong>{labels[current - 1]}</strong></div>
    <div className="progress-track" aria-label={`الخطوة ${current} من ${labels.length}`}>
      {labels.map((step, index) => <span key={step} className={index < current ? "filled" : ""} />)}
    </div>
  </div>;
}

function PrimaryButton({ children, ...props }) {
  return <button type="button" className="primary-button" {...props}>{children}</button>;
}

function Choice({ selected, icon, title, description, onClick }) {
  return <button type="button" className={`choice-card ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={onClick}>
    <span className="choice-icon"><Icon icon={icon} /></span>
    <span className="choice-copy"><strong>{title}</strong><small>{description}</small></span>
    <span className="radio">{selected && <Icon icon={Check} size={14} weight="bold" />}</span>
  </button>;
}

const assistantPrompts = {
  investor: ["كم ممكن أجمع؟", "وش مستوى المخاطرة المناسب؟", "وش أفضل صك لي؟", "كيف أحقق هدفي؟"],
  merchant: ["كيف تتم دراسة الطلب؟", "كيف تُهيكل الصكوك؟", "متى أحصل على التمويل؟", "هل الفكرة مؤهلة؟"],
};

function assistantReply(question, context) {
  if (question.includes("كم") || question.includes("هدفي")) return "بناءً على متوسط صرفك السابق وقاعدة التقريب الحالية، قد تجمع نحو 1,280 ريال خلال سنة قبل العوائد. تقدر ترفع التقريب أو تضيف استثمارًا مباشرًا لتقترب من هدفك أسرع.";
  if (question.includes("مخاطر")) return "المستوى المتوسط يوازن بين الاستقرار والنمو، لكنه ليس ضمانًا للعائد. راجع المدة وقدرتك على تحمّل التذبذب قبل اعتماد اختيارك.";
  if (question.includes("أفضل صك") || question.includes("صك لي")) return "صك توسّع سلسلة المقاهي يطابق اختيارك الحالي للمخاطرة المتوسطة. الأفضل لك يعتمد أيضًا على المدة والقطاع ومدى رغبتك في التنويع.";
  if (question.includes("دراسة")) return "يراجع بنك الإنماء بيانات المنشأة، والسجل المالي، والغرض من التمويل، والامتثال. بعدها يحدد التصنيف والهيكلة المناسبة قبل أي طرح.";
  if (question.includes("هيكل") || question.includes("الصكوك")) return "يُقسّم مبلغ التمويل المعتمد إلى أجزاء صكوك صغيرة، مع مدة وعائد وشروط سداد واضحة، ثم تُطرح للمستثمرين المطابقين لمستوى المخاطرة.";
  if (question.includes("متى") || question.includes("أحصل")) return "بعد اكتمال الدراسة والعقود، يبدأ طرح الصكوك. يُصرف التمويل وفق الجدول المتفق عليه عند اكتمال التجميع أو الوصول إلى النسبة المحددة في العقد.";
  if (question.includes("فكرة") || context === "merchant") return "يمكن للفكرة قيد التأسيس تقديم طلب أولي دون سجل تجاري. سيطلب فريق رديف خطة العمل والبيانات الداعمة لتقييم قابليتها للتمويل.";
  return "أقدر أساعدك في فهم الاستثمار التلقائي، الأهداف، المخاطر، الصكوك، أو رحلة تمويل المنشآت. اكتب سؤالك بكلمات بسيطة.";
}

function Assistant({ context, onClose }) {
  const [messages, setMessages] = useState([{ id: "assistant-welcome", from: "bot", text: context === "merchant" ? "أهلًا، أنا مساعد رديف. أقدر أوضح لك رحلة تمويل المنشأة وهيكلة الصكوك." : "أهلًا عبدالله، أنا مساعد رديف. أقدر أساعدك في هدفك، مستوى المخاطرة، وفرص الصكوك." }]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const prompts = assistantPrompts[context];

  const ask = question => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || typing) return;
    setMessages(current => [...current, { id: window.crypto.randomUUID(), from: "user", text: cleanQuestion }]);
    setDraft("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages(current => [...current, { id: window.crypto.randomUUID(), from: "bot", text: assistantReply(cleanQuestion, context) }]);
      setTyping(false);
    }, 650);
  };

  return <section className="assistant-overlay" aria-label="مساعد رديف">
    <header className="assistant-header"><button type="button" className="icon-button" onClick={onClose} aria-label="إغلاق المساعد"><Icon icon={ArrowRight} /></button><div><span><Icon icon={Robot} /></span><p><strong>مساعد رديف</strong><small>متصل الآن</small></p></div><img src={logo} alt="رديف" /></header>
    <div className="assistant-insight"><Icon icon={Sparkle} /><p><strong>{context === "merchant" ? "مساعدة في طلب التمويل" : "قراءة استباقية لهدفك"}</strong><span>{context === "merchant" ? "اسأل عن الدراسة، الهيكلة، العقود، أو صرف التمويل." : "استمرارك على نفس المعدل قد يضيف 1,280 ريال خلال سنة قبل العوائد."}</span></p></div>
    <div className="chat-messages" aria-live="polite">{messages.map(message => <div className={`chat-message ${message.from}`} key={message.id}><span>{message.from === "bot" && <Icon icon={Robot} size={16} />}{message.text}</span></div>)}{typing && <div className="chat-message bot typing"><span><i /><i /><i /></span></div>}</div>
    <div className="prompt-list">{prompts.map(prompt => <button type="button" key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}</div>
    <form className="chat-composer" onSubmit={event => { event.preventDefault(); ask(draft); }}><label htmlFor="assistant-message">اكتب سؤالك</label><div><input id="assistant-message" value={draft} onChange={event => setDraft(event.target.value)} placeholder="اسأل رديف..." /><button type="submit" aria-label="إرسال" disabled={!draft.trim() || typing}><Icon icon={PaperPlaneRight} weight="fill" /></button></div></form>
    <small className="assistant-disclaimer"><Icon icon={Info} size={14} /> إجابات توعوية وليست توصية استثمارية أو موافقة تمويل.</small>
  </section>;
}

function Welcome({ onInvestorStart, onMerchantStart, onWalletOpen }) {
  return <main className="welcome screen">
    <div className="welcome-mark">
      <img src={logo} alt="رديف" />
      <button type="button" className="wallet-entry" onClick={onWalletOpen} aria-label="فتح محفظتي">
        <Icon icon={Wallet} size={18} />
        <span>محفظتي</span>
      </button>
    </div>
    <div className="welcome-visual">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <img src={coinArt} alt="عملات تنمو" />
    </div>
    <div className="welcome-copy">
      <span className="eyebrow"><Icon icon={Sparkle} size={15} /> داخل تطبيق الإنماء</span>
      <h1>فكتك تموّل فكرة.<br />وفكرة تنمّي فكتك.</h1>
      <p>حوّل فكة مشترياتك أو مبلغًا مباشرًا إلى أجزاء من صكوك منشآت محلية معتمدة.</p>
    </div>
    <div className="cycle-strip">
      <span><Icon icon={Coins} /> تجمع</span><i />
      <span><Icon icon={Buildings} /> تموّل</span><i />
      <span><Icon icon={TrendUp} /> تنمو</span>
    </div>
    <div className="role-actions">
      <button type="button" className="role-button investor" onClick={onInvestorStart}><span><Icon icon={Coins} /></span><p><strong>مستثمر فرد</strong><small>نمِّ فكتك أو استثمر مباشرة</small></p><Icon icon={ArrowRight} /></button>
      <button type="button" className="role-button merchant" onClick={onMerchantStart}><span><Icon icon={Storefront} /></span><p><strong>صاحب منشأة أو فكرة</strong><small>قدّم منشأتك للحصول على تمويل عبر الصكوك</small></p><Icon icon={ArrowRight} /></button>
    </div>
    <small className="legal-note"><Icon icon={ShieldCheck} size={16} /> فرص مدروسة ومنشآت معتمدة من البنك</small>
  </main>;
}

function MethodStep({ data, update, next }) {
  return <StepShell title="كيف تبي تستثمر؟" subtitle="اختر طريقة واحدة الآن. تقدر تغيّرها لاحقًا." current={1}>
    <Choice selected={data.method === "rounding"} icon={Coins} title="استثمار تلقائي من الفكة" description="نقرّب مشترياتك ونجمع الفرق تلقائيًا" onClick={() => update({ method: "rounding" })} />
    <Choice selected={data.method === "direct"} icon={Wallet} title="استثمار مباشر" description="أضف مبلغًا من حسابك في أي وقت" onClick={() => update({ method: "direct" })} />
    <section className="form-panel">
      <span className="control-label">{data.method === "rounding" ? "التقريب إلى" : "مبلغ الاستثمار"}</span>
      {data.method === "rounding" ? <div className="segmented">{[1, 5, 10].map(value => <button type="button" key={value} className={data.rounding === value ? "selected" : ""} onClick={() => update({ rounding: value })}>{value} {value === 1 ? "ريال" : "ريالات"}</button>)}</div> : <div className="amount-input"><input aria-label="مبلغ الاستثمار" inputMode="numeric" value={data.amount} onChange={e => update({ amount: e.target.value.replace(/\D/g, "") })} /><span>ريال</span></div>}
      <div className="account-row"><span><Icon icon={Bank} /> من الحساب الجاري</span><strong>•••• 7000</strong></div>
    </section>
    <PrimaryButton onClick={next}>التالي</PrimaryButton>
  </StepShell>;
}

function GoalStep({ data, update, next }) {
  return <StepShell title="وش هدفك؟" subtitle="رديف يحوّل الاستثمار الصغير إلى تقدّم واضح نحو هدفك." current={2}>
    <div className="field"><label htmlFor="goal">اسم الهدف</label><div className="input-with-icon"><Icon icon={Target} /><input id="goal" value={data.goal} onChange={e => update({ goal: e.target.value })} /></div></div>
    <div className="two-fields">
      <div className="field"><label htmlFor="target">المبلغ المستهدف</label><div className="amount-input small"><input id="target" inputMode="numeric" value={data.target} onChange={e => update({ target: e.target.value.replace(/\D/g, "") })} /><span>ريال</span></div></div>
      <div className="field"><label htmlFor="duration">المدة</label><select id="duration" value={data.duration} onChange={e => update({ duration: e.target.value })}><option>12 شهرًا</option><option>18 شهرًا</option><option>24 شهرًا</option></select></div>
    </div>
    <section className="insight-card"><span className="ai-icon"><Icon icon={Sparkle} /></span><div><strong>قراءة رديف لنمطك</strong><p>بناءً على صرفك السابق، قد تجمع نحو <b>{data.method === "rounding" ? "1,280" : data.amount || "0"} ريال</b> خلال سنة قبل العوائد.</p></div></section>
    <PrimaryButton onClick={next} disabled={!data.goal || !data.target}>التالي</PrimaryButton>
  </StepShell>;
}

function RiskStep({ data, update, next }) {
  return <StepShell title="حدد مستوى المخاطرة" subtitle="نستخدم اختيارك لمطابقة أموالك مع صكوك مناسبة." current={3}>
    <div className="risk-list">{riskOptions.map(([value, title, description, range]) => <button type="button" key={value} className={`risk-card ${data.risk === value ? "selected" : ""}`} onClick={() => update({ risk: value })} aria-pressed={data.risk === value}><span className="risk-meter"><i /><i /><i /></span><span><strong>{title}</strong><small>{description}</small></span><b>{range}</b></button>)}</div>
    <div className="notice"><Icon icon={Info} /><p>العائد المعروض تقديري وليس مضمونًا. رأس المال والأرباح يتأثران بأداء المنشأة.</p></div>
    <PrimaryButton onClick={next}>اعرض الفرص المناسبة</PrimaryButton>
  </StepShell>;
}

function MatchStep({ data, update, next }) {
  const matches = opportunities[data.risk];
  return <StepShell title="فرص تناسبك" subtitle={`طابقنا اختيارك (${riskLabels[data.risk]}) مع فرص منشآت محلية.`} current={4}>
    <section className="match-summary"><Icon icon={Sparkle} /><div><strong>مطابقة رديف الذكية</strong><p>يمكن توزيع استثمارك لاحقًا على أكثر من صك لتقليل التركّز.</p></div></section>
    <div className="opportunity-list">{matches.map(item => <button type="button" key={item.id} className={`opportunity ${data.opportunity === item.id ? "selected" : ""}`} onClick={() => update({ opportunity: item.id })} aria-pressed={data.opportunity === item.id}>
      <span className="building-icon"><Icon icon={Buildings} /></span>
      <span className="opportunity-copy"><small>{item.sector}</small><strong>{item.name}</strong><span><b>{item.return}</b> عائد سنوي متوقع · {item.term}</span></span>
      <span className="radio">{data.opportunity === item.id && <Icon icon={Check} size={14} />}</span>
    </button>)}</div>
    <small className="example-note">الفرص والأرقام في هذا النموذج توضيحية وليست طرحًا استثماريًا فعليًا.</small>
    <PrimaryButton onClick={next} disabled={!data.opportunity}>متابعة</PrimaryButton>
  </StepShell>;
}

function ReviewStep({ data, next }) {
  const selected = opportunities[data.risk].find(item => item.id === data.opportunity);
  const method = data.method === "rounding" ? `تقريب المشتريات إلى ${data.rounding} ${data.rounding === 1 ? "ريال" : "ريالات"}` : `استثمار مباشر بقيمة ${data.amount || 0} ريال`;
  return <StepShell title="راجع خطتك" subtitle="هذه هي الرحلة التي سينفّذها رديف عنك." current={5}>
    <section className="flow-review">
      <div><span className="flow-number">1</span><p><small>التجميع</small><strong>{method}</strong></p></div>
      <i />
      <div><span className="flow-number">2</span><p><small>المطابقة</small><strong>{selected?.name}</strong></p></div>
      <i />
      <div><span className="flow-number">3</span><p><small>النتيجة</small><strong>عائد متوقع {selected?.return} بعد {selected?.term}</strong></p></div>
    </section>
    <section className="review-details"><div><span>هدفك</span><strong>{data.goal} · {Number(data.target).toLocaleString("en-US")} ريال</strong></div><div><span>المخاطرة</span><strong>{riskLabels[data.risk]}</strong></div><div><span>مصدر الأموال</span><strong>الحساب الجاري •••• 7000</strong></div></section>
    <label className="consent"><input type="checkbox" checked={data.accepted} onChange={e => data.updateAccepted(e.target.checked)} /><span>اطلعت على آلية الاستثمار والمخاطر، وأوافق على تفعيل خطة رديف.</span></label>
    <PrimaryButton onClick={next} disabled={!data.accepted}>تأكيد وتفعيل رديف</PrimaryButton>
  </StepShell>;
}

function StepShell({ title, subtitle, current, children }) {
  return <main className="step-screen screen"><Progress current={current} /><div className="step-heading"><h1>{title}</h1><p>{subtitle}</p></div>{children}</main>;
}

function MerchantStepShell({ title, subtitle, current, children }) {
  return <main className="step-screen merchant-screen screen"><Progress current={current} labels={merchantSteps} /><div className="step-heading"><h1>{title}</h1><p>{subtitle}</p></div>{children}</main>;
}

function MerchantIntro({ next }) {
  return <MerchantStepShell title="موّل توسّع منشأتك بالصكوك" subtitle="رديف يحوّل احتياجك التمويلي إلى صكوك يشارك فيها عملاء الإنماء." current={1}>
    <section className="merchant-cycle">
      <div><span><Icon icon={ClipboardText} /></span><p><strong>قدّم طلبك</strong><small>بيانات المنشأة واحتياج التمويل</small></p></div><i />
      <div><span><Icon icon={ShieldCheck} /></span><p><strong>مراجعة الإنماء</strong><small>دراسة المنشأة والمخاطر والامتثال</small></p></div><i />
      <div><span><Icon icon={Coins} /></span><p><strong>طرح الصكوك</strong><small>جمع التمويل وصرفه وفق الشروط</small></p></div>
    </section>
    <div className="notice merchant-notice"><Icon icon={Info} /><p>تقديم الطلب لا يعني الموافقة النهائية. يحدد البنك الهيكلة والعائد والمدة بعد اكتمال الدراسة.</p></div>
    <PrimaryButton onClick={next}>ابدأ طلب التمويل</PrimaryButton>
  </MerchantStepShell>;
}

function MerchantDetails({ data, update, next }) {
  const valid = data.businessName && (data.entityType === "idea" || data.crNumber) && data.fundingAmount && data.purpose;
  return <MerchantStepShell title="عرّفنا على منشأتك" subtitle="نحتاج معلومات أولية لنكوّن صورة واضحة عن فرصة التمويل." current={2}>
    <div className="field"><span className="field-label">نوع الطلب</span><div className="segmented entity-type"><button type="button" className={data.entityType === "business" ? "selected" : ""} onClick={() => update({ entityType: "business" })}>منشأة قائمة</button><button type="button" className={data.entityType === "idea" ? "selected" : ""} onClick={() => update({ entityType: "idea" })}>فكرة قيد التأسيس</button></div></div>
    <div className="field"><label htmlFor="business-name">{data.entityType === "idea" ? "اسم الفكرة أو المشروع" : "اسم المنشأة"}</label><div className="input-with-icon"><Icon icon={Storefront} /><input id="business-name" value={data.businessName} onChange={e => update({ businessName: e.target.value })} placeholder="مثال: شركة مذاق القهوة" /></div></div>
    <div className={`two-fields ${data.entityType === "idea" ? "single" : ""}`}>
      {data.entityType === "business" && <div className="field"><label htmlFor="cr-number">رقم السجل التجاري</label><input className="text-control" id="cr-number" inputMode="numeric" value={data.crNumber} onChange={e => update({ crNumber: e.target.value.replace(/\D/g, "") })} /></div>}
      <div className="field"><label htmlFor="sector">القطاع</label><select id="sector" value={data.sector} onChange={e => update({ sector: e.target.value })}><option>أغذية ومقاهٍ</option><option>تجزئة</option><option>خدمات رقمية</option><option>ضيافة</option><option>لوجستيات</option></select></div>
    </div>
    <div className="field"><label htmlFor="funding-amount">مبلغ التمويل المطلوب</label><div className="amount-input small"><input id="funding-amount" inputMode="numeric" value={data.fundingAmount} onChange={e => update({ fundingAmount: e.target.value.replace(/\D/g, "") })} /><span>ريال</span></div></div>
    <div className="field"><label htmlFor="purpose">استخدام التمويل</label><textarea id="purpose" value={data.purpose} onChange={e => update({ purpose: e.target.value })} placeholder="اشرح خطة التوسع وما الذي سيموله الصك" /></div>
    <div className="document-row"><Icon icon={FileText} /><p><strong>المستندات</strong><small>سيطلبها فريق رديف بعد التقييم الأولي</small></p><span>لاحقًا</span></div>
    <PrimaryButton onClick={next} disabled={!valid}>متابعة</PrimaryButton>
  </MerchantStepShell>;
}

function MerchantPlan({ data, next }) {
  const amount = Number(data.fundingAmount || 0);
  const sukukCount = Math.max(1, Math.ceil(amount / 100));
  return <MerchantStepShell title="هيكلة أولية للصك" subtitle="تصور مبدئي يساعدك على فهم طريقة تمويل الطلب عبر رديف." current={3}>
    <section className="merchant-plan-card">
      <div className="plan-top"><span><Icon icon={Buildings} /></span><p><small>{data.sector}</small><strong>{data.businessName}</strong></p><em>تصور أولي</em></div>
      <div className="plan-amount"><small>التمويل المطلوب</small><strong>{amount.toLocaleString("en-US")} <span>ريال</span></strong></div>
      <div className="plan-grid"><div><small>عدد أجزاء الصك</small><strong>{sukukCount.toLocaleString("en-US")}</strong></div><div><small>قيمة الجزء</small><strong>100 ريال</strong></div><div><small>المدة المقترحة</small><strong>12 شهرًا</strong></div><div><small>عائد المستثمر المتوقع</small><strong>8–10%</strong></div></div>
    </section>
    <section className="bank-role"><Icon icon={ShieldCheck} /><p><strong>دور بنك الإنماء</strong><span>يدرس الطلب، يصنّف المخاطر، يعتمد الهيكلة، وينظم طرح الصكوك وتوزيع العوائد.</span></p></section>
    <small className="example-note">هذه الهيكلة تقديرية للنموذج. الشروط النهائية تعتمد على الدراسة الائتمانية والتنظيمية.</small>
    <PrimaryButton onClick={next}>مراجعة الطلب</PrimaryButton>
  </MerchantStepShell>;
}

function MerchantReview({ data, update, next }) {
  return <MerchantStepShell title="راجع طلب التمويل" subtitle="بعد الإرسال ينتقل طلبك إلى فريق رديف للدراسة الأولية." current={4}>
    <section className="review-details merchant-review"><div><span>نوع الطلب</span><strong>{data.entityType === "idea" ? "فكرة قيد التأسيس" : "منشأة قائمة"}</strong></div><div><span>{data.entityType === "idea" ? "المشروع" : "المنشأة"}</span><strong>{data.businessName}</strong></div>{data.entityType === "business" && <div><span>السجل التجاري</span><strong>{data.crNumber}</strong></div>}<div><span>القطاع</span><strong>{data.sector}</strong></div><div><span>التمويل المطلوب</span><strong>{Number(data.fundingAmount).toLocaleString("en-US")} ريال</strong></div><div><span>الغرض</span><strong>{data.purpose}</strong></div></section>
    <section className="review-timeline"><div><Icon icon={ClipboardText} /><span><strong>اليوم</strong><small>استلام الطلب</small></span></div><i /><div><Icon icon={Clock} /><span><strong>المرحلة التالية</strong><small>مراجعة أولية وتواصل الفريق</small></span></div><i /><div><Icon icon={Handshake} /><span><strong>بعد الموافقة</strong><small>العقود وطرح الصكوك</small></span></div></section>
    <label className="consent"><input type="checkbox" checked={data.merchantAccepted} onChange={e => update({ merchantAccepted: e.target.checked })} /><span>أقر بصحة البيانات وأوافق على مشاركتها مع فريق التمويل في بنك الإنماء لغرض دراسة الطلب.</span></label>
    <PrimaryButton onClick={next} disabled={!data.merchantAccepted}>إرسال طلب التمويل</PrimaryButton>
  </MerchantStepShell>;
}

function MerchantSuccess({ data, onHome }) {
  return <main className="success-screen merchant-success screen"><div className="success-symbol"><Icon icon={CheckCircle} size={58} weight="fill" /></div><img src={logo} alt="رديف" className="success-logo" /><h1>وصلنا طلبك</h1><p>طلب تمويل {data.businessName} أصبح الآن لدى فريق رديف للمراجعة الأولية.</p><div className="request-card"><span>رقم الطلب</span><strong>RD-2026-1048</strong><em><Icon icon={Clock} size={16} /> قيد المراجعة</em></div><section className="success-path merchant-path"><span><Icon icon={ClipboardText} /><b>استلام</b></span><Icon icon={ArrowRight} /><span><Icon icon={ShieldCheck} /><b>دراسة</b></span><Icon icon={ArrowRight} /><span><Icon icon={Handshake} /><b>اعتماد</b></span></section><PrimaryButton onClick={onHome}>العودة إلى رديف</PrimaryButton></main>;
}

function Success({ onDashboard }) {
  return <main className="success-screen screen"><div className="success-symbol"><Icon icon={CheckCircle} size={58} weight="fill" /></div><img src={logo} alt="رديف" className="success-logo" /><h1>خطة رديف صارت جاهزة</h1><p>من أول عملية مؤهلة، تبدأ فكتك رحلتها من حسابك إلى صك منشأة محلية.</p><section className="success-path"><span><Icon icon={Coins} /><b>تجميع</b></span><Icon icon={ArrowRight} /><span><Icon icon={Buildings} /><b>تمويل</b></span><Icon icon={ArrowRight} /><span><Icon icon={TrendUp} /><b>عوائد</b></span></section><PrimaryButton onClick={onDashboard}>عرض محفظة رديف</PrimaryButton></main>;
}

function Dashboard({ data, onRestart }) {
  const selected = opportunities[data.risk].find(item => item.id === data.opportunity);
  return <main className="dashboard screen">
    <div className="dashboard-heading"><div><span>محفظة رديف</span><h1>أهلًا عبدالله</h1></div><span className="active-badge">نشطة</span></div>
    <section className="balance-card"><small>إجمالي المحفظة</small><strong>5,420 <span>ريال</span></strong><div><span>المستثمر <b>5,180</b></span><span>العوائد <b className="positive">+240</b></span></div></section>
    <section className="goal-card"><div><span>هدفك</span><strong>{data.goal}</strong></div><b>34%</b><div className="goal-track"><i /></div><small>1,700 من {Number(data.target).toLocaleString("en-US")} ريال</small></section>
    <section className="dashboard-section"><div className="section-title"><h2>استثمارك النشط</h2><span>{riskLabels[data.risk]}</span></div><div className="active-investment"><span className="building-icon"><Icon icon={Briefcase} /></span><div><strong>{selected?.name}</strong><small>{selected?.sector} · {selected?.term}</small></div><b>{selected?.return}</b></div></section>
    <section className="impact-line"><Icon icon={Buildings} /><p><strong>أثر محلي يتراكم</strong><span>مساهمتك تدعم توسّع منشأة محلية معتمدة.</span></p></section>
    <PrimaryButton onClick={onRestart}>إضافة خطة استثمار</PrimaryButton>
  </main>;
}

export function App() {
  const [screen, setScreen] = useState("welcome");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [data, setData] = useState({ method: "rounding", rounding: 5, amount: "1000", goal: "سفر الصيف", target: "5000", duration: "12 شهرًا", risk: "medium", opportunity: "cafe", accepted: false });
  const [merchantData, setMerchantData] = useState({ entityType: "business", businessName: "شركة مذاق القهوة", crNumber: "1010998877", sector: "أغذية ومقاهٍ", fundingAmount: "500000", purpose: "افتتاح فرعين جديدين وتجهيز خط إنتاج مركزي", merchantAccepted: false });
  const update = patch => setData(current => ({ ...current, ...patch }));
  const updateMerchant = patch => setMerchantData(current => ({ ...current, ...patch }));
  const currentIndex = flowOrder.indexOf(screen);
  const merchantIndex = merchantFlowOrder.indexOf(screen);
  const goBack = () => merchantIndex >= 0 ? (merchantIndex === 0 ? setScreen("welcome") : setScreen(merchantFlowOrder[merchantIndex - 1])) : (currentIndex <= 0 ? setScreen("welcome") : setScreen(flowOrder[currentIndex - 1]));
  const next = () => setScreen(flowOrder[currentIndex + 1]);
  const renderScreen = () => {
    if (screen === "welcome") return <Welcome onInvestorStart={() => setScreen("method")} onMerchantStart={() => setScreen("merchant-intro")} onWalletOpen={() => setScreen("dashboard")} />;
    if (screen === "method") return <MethodStep data={data} update={update} next={next} />;
    if (screen === "goal") return <GoalStep data={data} update={update} next={next} />;
    if (screen === "risk") return <RiskStep data={data} update={update} next={next} />;
    if (screen === "match") return <MatchStep data={data} update={update} next={next} />;
    if (screen === "review") return <ReviewStep data={{ ...data, updateAccepted: value => update({ accepted: value }) }} next={() => setScreen("success")} />;
    if (screen === "success") return <Success onDashboard={() => setScreen("dashboard")} />;
    if (screen === "dashboard") return <Dashboard data={data} onRestart={() => setScreen("method")} />;
    if (screen === "merchant-intro") return <MerchantIntro next={() => setScreen("merchant-details")} />;
    if (screen === "merchant-details") return <MerchantDetails data={merchantData} update={updateMerchant} next={() => setScreen("merchant-plan")} />;
    if (screen === "merchant-plan") return <MerchantPlan data={merchantData} next={() => setScreen("merchant-review")} />;
    if (screen === "merchant-review") return <MerchantReview data={merchantData} update={updateMerchant} next={() => setScreen("merchant-success")} />;
    return <MerchantSuccess data={merchantData} onHome={() => setScreen("welcome")} />;
  };

  const showHeader = !["welcome", "success", "merchant-success"].includes(screen);
  const assistantContext = screen.startsWith("merchant") ? "merchant" : "investor";
  const showAssistantLauncher = !["success", "merchant-success"].includes(screen);
  return <div className="canvas" dir="rtl"><div className="mobile-prototype">
    {showHeader && <BrandHeader compact onBack={screen === "dashboard" ? () => setScreen("welcome") : goBack} onClose={() => setScreen("welcome")} />}
    <div className={`scroll-area ${showHeader ? "with-header" : ""} ${screen === "welcome" ? "welcome-scroll-lock" : ""}`}>{renderScreen()}</div>
    {showAssistantLauncher && !assistantOpen && <button type="button" className={`assistant-launcher ${screen === "welcome" ? "home" : ""}`} onClick={() => setAssistantOpen(true)} aria-label="فتح مساعد رديف"><Icon icon={Robot} size={21} weight="fill" /><span>مساعد رديف</span></button>}
    {assistantOpen && <Assistant context={assistantContext} onClose={() => setAssistantOpen(false)} />}
  </div></div>;
}
