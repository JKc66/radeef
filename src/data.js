export const opportunities = {
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

export const steps = ["الطريقة", "الهدف", "المخاطرة", "المطابقة", "المراجعة"];
export const riskLabels = { low: "منخفضة", medium: "متوسطة", high: "مرتفعة" };
export const riskOptions = [
  ["low", "منخفضة", "استقرار أعلى وعائد متوقع أقل", "5–7%"],
  ["medium", "متوسطة", "توازن بين النمو والاستقرار", "7–10%"],
  ["high", "مرتفعة", "تذبذب أعلى ونمو محتمل أكبر", "10–13%"],
];
export const flowOrder = ["method", "goal", "risk", "match", "review"];
export const merchantSteps = ["الآلية", "المنشأة", "هيكلة الصك", "المراجعة"];
export const merchantFlowOrder = ["merchant-intro", "merchant-details", "merchant-plan", "merchant-review"];

export const assistantPrompts = {
  investor: ["كم ممكن أجمع؟", "وش مستوى المخاطرة المناسب؟", "وش أفضل صك لي؟", "كيف أحقق هدفي؟"],
  merchant: ["كيف تتم دراسة الطلب؟", "كيف تُهيكل الصكوك؟", "متى أحصل على التمويل؟", "هل الفكرة مؤهلة؟"],
};
