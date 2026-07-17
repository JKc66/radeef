import {
  BuildingsIcon,
  ChartLineUpIcon,
  ArrowUpIcon,
  LightningIcon,
} from "@phosphor-icons/react";
import { opportunities, riskLabels } from "../data";
import { Icon, PrimaryButton } from "./shared";

const CHART_POINTS = [
  { x: 0,   y: 88 },
  { x: 60,  y: 80 },
  { x: 120, y: 72 },
  { x: 180, y: 60 },
  { x: 240, y: 48 },
  { x: 300, y: 35 },
  { x: 340, y: 20 },
];
const CHART_W = 340, CHART_H = 100;
const CHART_MONTHS = ["يناير", "سبتمبر", "نوفمبر", "اليوم"];

/* ── tiny SVG growth chart ── */
function GrowthChart() {
  const polyline = CHART_POINTS.map(p => `${p.x},${p.y}`).join(" ");
  const areaPath = `M${CHART_POINTS[0].x},${CHART_H} ` +
    CHART_POINTS.map(p => `L${p.x},${p.y}`).join(" ") +
    ` L${CHART_POINTS[CHART_POINTS.length-1].x},${CHART_H} Z`;
  return (
    <div className="growth-chart-wrap">
      <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} preserveAspectRatio="none" className="growth-svg">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef765d" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ef765d" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#chartGrad)" />
        <polyline points={polyline} fill="none" stroke="#ef765d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {[0, 3, 5, 6].map(i => {
          const p = CHART_POINTS[i];
          return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#ef765d" stroke="white" strokeWidth="1.5" />;
        })}
      </svg>
      <div className="chart-x-labels">
        {CHART_MONTHS.map(m => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}

export function Dashboard({ data, onRestart, onAssistantOpen }) {
  const selected = opportunities[data.risk]?.find(item => item.id === data.opportunity);
  const target = Number(data.target) || 5000;
  const invested = 1425.05;
  const profit = 58.43;
  const remaining = target - invested;
  const pct = Math.min(100, Math.round((invested / target) * 100));
  const annualAdd = 1185;

  return (
    <main className="dashboard screen">

      {/* heading */}
      <div className="dashboard-heading">
        <div>
          <span>رديف &gt; استثمار</span>
          <h1 className="dashboard-title">محفظة رديف</h1>
        </div>
        <span className="active-badge">نشطة</span>
      </div>

      {/* top stat tiles */}
      <div className="stat-tiles">
        <div className="stat-tile dark-card">
          <small>قيمة المحفظة</small>
          <strong>{invested.toLocaleString("en-US", { minimumFractionDigits: 2 })} <span>ر.س</span></strong>
        </div>
        <div className="stat-tile dark-card profit-tile">
          <small>الأرباح</small>
          <strong className="profit-value">{profit.toFixed(2)} <span>ر.س</span></strong>
          <div className="profit-badge"><Icon icon={ArrowUpIcon} size={11} weight="bold" /><span>+4.27%</span></div>
        </div>
      </div>

      {/* goal progress card */}
      <section className="goal-card-v2 light-card">
        <div className="goal-header-row">
          <div>
            <span className="goal-label light-label">هدفك الحالي</span>
            <strong className="goal-name light-strong">{data.goal || "هدف مالي"}</strong>
          </div>
          <div className="goal-right">
            <span className="goal-label light-label">المتبقي</span>
            <strong className="goal-remaining light-strong">{remaining.toLocaleString("en-US", { minimumFractionDigits: 2 })} <small>ر.س</small></strong>
          </div>
        </div>
        <div className="goal-track-v2 light-track">
          <div className="goal-fill-v2" style={{ width: `${pct}%` }} />
          <div className="goal-dot" style={{ left: `${pct}%` }} />
        </div>
        <p className="goal-insight light-insight">
          بحسب نمط صرفك، قد تضيف قرابة {annualAdd.toLocaleString("en-US")} ر.س سنويًا. المتبقي {remaining.toLocaleString("en-US", { minimumFractionDigits: 2 })} ر.س.
        </p>
      </section>

      {/* portfolio growth chart */}
      <section className="chart-card light-card">
        <div className="chart-card-header light-section-header">
          <Icon icon={ChartLineUpIcon} size={18} />
          <h2>نمو محفظتك</h2>
        </div>
        <GrowthChart />
      </section>

      {/* auto investment card */}
      <section className="auto-invest-card light-card">
        <div className="auto-invest-header light-section-header">
          <Icon icon={LightningIcon} size={16} weight="fill" />
          <h2>استثمار رديف التلقائي</h2>
        </div>
        <p className="auto-invest-desc light-desc">
          تتم إضافة فروقات مشترياتك إلى محفظة رديف واستثمارها تلقائيًا حسب مستوى المخاطرة الذي اخترته.
        </p>
        <div className="invest-meta-row">
          <div className="invest-meta light-meta">
            <span>إعداد الاستثمار</span>
            <strong>التقريب إلى 1 ر.س</strong>
          </div>
          <div className="invest-meta light-meta">
            <span>المخاطرة</span>
            <strong>{riskLabels[data.risk] || "متوسط"}</strong>
          </div>
        </div>
        <div className="sukuk-row light-sukuk-row">
          <span className="sukuk-label light-label">الصك المختار</span>
          <strong className="sukuk-name light-strong">{selected?.name || "صكوك سلسلة مطاعم إقليمية"}</strong>
        </div>
      </section>

      {/* local impact card */}
      <section className="impact-card-v2 light-card">
        <div className="impact-header light-section-header">
          <Icon icon={BuildingsIcon} size={16} />
          <h2>أثرك المحلي</h2>
        </div>
        <p className="impact-desc light-desc">
          يبدأ احتساب أثرك عند أول عملية استثمار في منشأة محلية معتمدة.
        </p>
        <div className="impact-meta-row">
          <div className="invest-meta light-meta">
            <span>المنشآت المدعومة</span>
            <strong>3</strong>
          </div>
          <div className="invest-meta light-meta">
            <span>المبلغ الموجه</span>
            <strong>1,102.23 ر.س</strong>
          </div>
        </div>
      </section>

      <PrimaryButton onClick={onRestart} style={{ marginTop: 20 }}>إضافة خطة استثمار</PrimaryButton>
    </main>
  );
}
