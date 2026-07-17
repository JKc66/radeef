import {
  BankIcon,
  BuildingsIcon,
  CheckIcon,
  CoinsIcon,
  InfoIcon,
  SparkleIcon,
  TargetIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import { opportunities, riskLabels, riskOptions } from "../../data";
import { Icon, StepShell, Choice, PrimaryButton } from "../shared";

export function MethodStep({ data, update, next }) {
  return <StepShell title="كيف تبي تستثمر؟" subtitle="اختر طريقة واحدة الآن. تقدر تغيّرها لاحقًا." current={1}>
    <Choice selected={data.method === "rounding"} icon={CoinsIcon} title="استثمار تلقائي من الفكة" description="نقرّب مشترياتك ونجمع الفرق تلقائيًا" onClick={() => update({ method: "rounding" })} />
    <Choice selected={data.method === "direct"} icon={WalletIcon} title="استثمار مباشر" description="أضف مبلغًا من حسابك في أي وقت" onClick={() => update({ method: "direct" })} />
    <section className="form-panel">
      <span className="control-label">{data.method === "rounding" ? "التقريب إلى" : "مبلغ الاستثمار"}</span>
      {data.method === "rounding" ? <div className="segmented">{[1, 5, 10].map(value => <button type="button" key={value} className={data.rounding === value ? "selected" : ""} onClick={() => update({ rounding: value })}>{value} {value === 1 ? "ريال" : "ريالات"}</button>)}</div> : <div className="amount-input"><input aria-label="مبلغ الاستثمار" inputMode="numeric" value={data.amount} onChange={e => update({ amount: e.target.value.replace(/\D/g, "") })} /><span>ريال</span></div>}
      <div className="account-row"><span><Icon icon={BankIcon} /> من الحساب الجاري</span><strong>•••• 7000</strong></div>
    </section>
    <PrimaryButton onClick={next}>التالي</PrimaryButton>
  </StepShell>;
}

export function GoalStep({ data, update, next }) {
  return <StepShell title="وش هدفك؟" subtitle="رديف يحوّل الاستثمار الصغير إلى تقدّم واضح نحو هدفك." current={2}>
    <div className="field"><label htmlFor="goal">اسم الهدف</label><div className="input-with-icon"><Icon icon={TargetIcon} /><input id="goal" value={data.goal} onChange={e => update({ goal: e.target.value })} /></div></div>
    <div className="two-fields">
      <div className="field"><label htmlFor="target">المبلغ المستهدف</label><div className="amount-input small"><input id="target" inputMode="numeric" value={data.target} onChange={e => update({ target: e.target.value.replace(/\D/g, "") })} /><span>ريال</span></div></div>
      <div className="field"><label htmlFor="duration">المدة</label><select id="duration" value={data.duration} onChange={e => update({ duration: e.target.value })}><option>12 شهرًا</option><option>18 شهرًا</option><option>24 شهرًا</option></select></div>
    </div>
    <section className="insight-card dark-insight"><span className="ai-icon icon-pill"><Icon icon={SparkleIcon} /></span><div><strong>قراءة رديف لنمطك</strong><p>بناءً على صرفك السابق، قد تجمع نحو <b>{data.method === "rounding" ? "1,280" : data.amount || "0"} ريال</b> خلال سنة قبل العوائد.</p></div></section>
    <PrimaryButton onClick={next} disabled={!data.goal || !data.target}>التالي</PrimaryButton>
  </StepShell>;
}

export function RiskStep({ data, update, next }) {
  return <StepShell title="حدد مستوى المخاطرة" subtitle="نستخدم اختيارك لمطابقة أموالك مع صكوك مناسبة." current={3}>
    <div className="risk-list">{riskOptions.map(([value, title, description, range]) => <button type="button" key={value} className={`risk-card ${data.risk === value ? "selected" : ""}`} onClick={() => update({ risk: value })} aria-pressed={data.risk === value}><span className="risk-meter"><i /><i /><i /></span><span><strong>{title}</strong><small>{description}</small></span><b>{range}</b></button>)}</div>
    <div className="notice"><Icon icon={InfoIcon} /><p>العائد المعروض تقديري وليس مضمونًا. رأس المال والأرباح يتأثران بأداء المنشأة.</p></div>
    <PrimaryButton onClick={next}>اعرض الفرص المناسبة</PrimaryButton>
  </StepShell>;
}

export function MatchStep({ data, update, next }) {
  const matches = opportunities[data.risk];
  return <StepShell title="فرص تناسبك" subtitle={`طابقنا اختيارك (${riskLabels[data.risk]}) مع فرص منشآت محلية.`} current={4}>
    <section className="match-summary dark-insight"><Icon icon={SparkleIcon} /><div><strong>مطابقة رديف الذكية</strong><p>يمكن توزيع استثمارك لاحقًا على أكثر من صك لتقليل التركّز.</p></div></section>
    <div className="opportunity-list">{matches.map(item => <button type="button" key={item.id} className={`opportunity ${data.opportunity === item.id ? "selected" : ""}`} onClick={() => update({ opportunity: item.id })} aria-pressed={data.opportunity === item.id}>
      <span className="building-icon icon-pill"><Icon icon={BuildingsIcon} /></span>
      <span className="opportunity-copy"><small>{item.sector}</small><strong>{item.name}</strong><span><b>{item.return}</b> عائد سنوي متوقع · {item.term}</span></span>
      <span className="radio">{data.opportunity === item.id && <Icon icon={CheckIcon} size={14} />}</span>
    </button>)}</div>
    <small className="example-note">الفرص والأرقام في هذا النموذج توضيحية وليست طرحًا استثماريًا فعليًا.</small>
    <PrimaryButton onClick={next} disabled={!data.opportunity}>متابعة</PrimaryButton>
  </StepShell>;
}

export function ReviewStep({ data, next }) {
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
