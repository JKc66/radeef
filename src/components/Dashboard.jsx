import {
  Briefcase,
  Buildings,
} from "@phosphor-icons/react";
import { opportunities, riskLabels } from "../data";
import { Icon, PrimaryButton } from "./shared";

export function Dashboard({ data, onRestart }) {
  const selected = opportunities[data.risk].find(item => item.id === data.opportunity);
  return <main className="dashboard screen">
    <div className="dashboard-heading"><div><span>محفظة رديف</span><h1>أهلًا عبدالله</h1></div><span className="active-badge">نشطة</span></div>
    <section className="balance-card dark-card"><small>إجمالي المحفظة</small><strong>5,420 <span>ريال</span></strong><div><span>المستثمر <b>5,180</b></span><span>العوائد <b className="positive">+240</b></span></div></section>
    <section className="goal-card"><div><span>هدفك</span><strong>{data.goal}</strong></div><b>34%</b><div className="goal-track"><i /></div><small>1,700 من {Number(data.target).toLocaleString("en-US")} ريال</small></section>
    <section className="dashboard-section"><div className="section-title"><h2>استثمارك النشط</h2><span>{riskLabels[data.risk]}</span></div><div className="active-investment"><span className="building-icon icon-pill"><Icon icon={Briefcase} /></span><div><strong>{selected?.name}</strong><small>{selected?.sector} · {selected?.term}</small></div><b>{selected?.return}</b></div></section>
    <section className="impact-line info-row"><Icon icon={Buildings} /><p><strong>أثر محلي يتراكم</strong><span>مساهمتك تدعم توسّع منشأة محلية معتمدة.</span></p></section>
    <PrimaryButton onClick={onRestart}>إضافة خطة استثمار</PrimaryButton>
  </main>;
}
