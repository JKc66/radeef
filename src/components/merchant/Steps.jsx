import {
  ArrowRight,
  Buildings,
  CheckCircle,
  ClipboardText,
  Clock,
  Coins,
  FileText,
  Handshake,
  Info,
  ShieldCheck,
  Storefront,
} from "@phosphor-icons/react";
import logo from "../../assets/radeef-logo.webp";
import { Icon, MerchantStepShell, PrimaryButton } from "../shared";

export function MerchantIntro({ next }) {
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

export function MerchantDetails({ data, update, next }) {
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

export function MerchantPlan({ data, next }) {
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

export function MerchantReview({ data, update, next }) {
  return <MerchantStepShell title="راجع طلب التمويل" subtitle="بعد الإرسال ينتقل طلبك إلى فريق رديف للدراسة الأولية." current={4}>
    <section className="review-details merchant-review"><div><span>نوع الطلب</span><strong>{data.entityType === "idea" ? "فكرة قيد التأسيس" : "منشأة قائمة"}</strong></div><div><span>{data.entityType === "idea" ? "المشروع" : "المنشأة"}</span><strong>{data.businessName}</strong></div>{data.entityType === "business" && <div><span>السجل التجاري</span><strong>{data.crNumber}</strong></div>}<div><span>القطاع</span><strong>{data.sector}</strong></div><div><span>التمويل المطلوب</span><strong>{Number(data.fundingAmount).toLocaleString("en-US")} ريال</strong></div><div><span>الغرض</span><strong>{data.purpose}</strong></div></section>
    <section className="review-timeline"><div><Icon icon={ClipboardText} /><span><strong>اليوم</strong><small>استلام الطلب</small></span></div><i /><div><Icon icon={Clock} /><span><strong>المرحلة التالية</strong><small>مراجعة أولية وتواصل الفريق</small></span></div><i /><div><Icon icon={Handshake} /><span><strong>بعد الموافقة</strong><small>العقود وطرح الصكوك</small></span></div></section>
    <label className="consent"><input type="checkbox" checked={data.merchantAccepted} onChange={e => update({ merchantAccepted: e.target.checked })} /><span>أقر بصحة البيانات وأوافق على مشاركتها مع فريق التمويل في بنك الإنماء لغرض دراسة الطلب.</span></label>
    <PrimaryButton onClick={next} disabled={!data.merchantAccepted}>إرسال طلب التمويل</PrimaryButton>
  </MerchantStepShell>;
}

export function MerchantSuccess({ data, onHome }) {
  return <main className="success-screen merchant-success screen"><div className="success-symbol"><Icon icon={CheckCircle} size={58} weight="fill" /></div><img src={logo} alt="رديف" className="success-logo" /><h1>وصلنا طلبك</h1><p>طلب تمويل {data.businessName} أصبح الآن لدى فريق رديف للمراجعة الأولية.</p><div className="request-card"><span>رقم الطلب</span><strong>RD-2026-1048</strong><em><Icon icon={Clock} size={16} /> قيد المراجعة</em></div><section className="success-path merchant-path"><span><Icon icon={ClipboardText} /><b>استلام</b></span><Icon icon={ArrowRight} /><span><Icon icon={ShieldCheck} /><b>دراسة</b></span><Icon icon={ArrowRight} /><span><Icon icon={Handshake} /><b>اعتماد</b></span></section><PrimaryButton onClick={onHome}>العودة إلى رديف</PrimaryButton></main>;
}
