import { useState } from "react";
import {
  ArrowRight,
  Info,
  PaperPlaneRight,
  Robot,
  Sparkle,
} from "@phosphor-icons/react";
import logo from "../assets/radeef-logo.webp";
import { assistantPrompts } from "../data";
import { Icon } from "./shared";

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

export function Assistant({ context, onClose }) {
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
    <div className="assistant-insight dark-insight"><Icon icon={Sparkle} /><p><strong>{context === "merchant" ? "مساعدة في طلب التمويل" : "قراءة استباقية لهدفك"}</strong><span>{context === "merchant" ? "اسأل عن الدراسة، الهيكلة، العقود، أو صرف التمويل." : "استمرارك على نفس المعدل قد يضيف 1,280 ريال خلال سنة قبل العوائد."}</span></p></div>
    <div className="chat-messages scroll-hide" aria-live="polite">{messages.map(message => <div className={`chat-message ${message.from}`} key={message.id}><span>{message.from === "bot" && <Icon icon={Robot} size={16} />}{message.text}</span></div>)}{typing && <div className="chat-message bot typing"><span><i /><i /><i /></span></div>}</div>
    <div className="prompt-list scroll-hide">{prompts.map(prompt => <button type="button" key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}</div>
    <form className="chat-composer" onSubmit={event => { event.preventDefault(); ask(draft); }}><label htmlFor="assistant-message">اكتب سؤالك</label><div><input id="assistant-message" value={draft} onChange={event => setDraft(event.target.value)} placeholder="اسأل رديف..." /><button type="submit" aria-label="إرسال" disabled={!draft.trim() || typing}><Icon icon={PaperPlaneRight} weight="fill" /></button></div></form>
    <small className="assistant-disclaimer"><Icon icon={Info} size={14} /> إجابات توعوية وليست توصية استثمارية أو موافقة تمويل.</small>
  </section>;
}
