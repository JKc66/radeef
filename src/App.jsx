import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bell,
  Buildings,
  ChartBar,
  Check,
  CheckCircle,
  Coffee,
  Coins,
  DotsThree,
  GasPump,
  Gear,
  GridFour,
  HandHeart,
  Lightbulb,
  MagnifyingGlass,
  PencilSimple,
  Receipt,
  Robot,
  ShoppingBag,
  SlidersHorizontal,
  Sparkle,
  Storefront,
  Target,
  TrendUp,
  Truck,
  Wallet,
  X,
} from "@phosphor-icons/react";
import walletArt from "./assets/wallet.webp";
import robotArt from "./assets/robot.webp";
import coinArt from "./assets/coin.webp";

const Icon = ({ icon: Component, size = 25, ...props }) => <Component size={size} weight="regular" {...props} />;

const labels = {
  start: "تفعيل رَديف",
  setup: "إعداد رَديف",
  activity: "اجمع فكتك صمتًا",
  reached: "الاستثمار التلقائي",
  assistant: "المساعد الذكي",
  portfolio: "هذا أثر هلالتك",
  impact: "النمو والأثر",
  discover: "كشف الحركات",
};

function Header({ screen, onScreen }) {
  return (
    <>
      <div className="statusbar" dir="ltr"><b>9:41</b><div className="signal">▮▮▮▮ <span>⌁</span> <strong>86</strong></div></div>
      <header className="app-header">
        <div className="header-actions">
          <button className="icon-button coral" aria-label="تسجيل الخروج"><Icon icon={ArrowLeft} /></button>
          <button className="icon-button" aria-label="التنبيهات"><Icon icon={Bell} /></button>
          <button className="icon-button" aria-label="المساعد الذكي" onClick={() => onScreen("assistant")}><Icon icon={PencilSimple} /></button>
        </div>
        <button className="profile" onClick={() => onScreen("start")} aria-label="العودة إلى شاشة رَديف">
          <div><b>عبدالله</b><small>10 <span>✣</span></small></div><strong>ع ع</strong>
        </button>
      </header>
      {screen !== "start" && screen !== "setup" && <button className="mini-title" onClick={() => onScreen("start")}>{labels[screen]}</button>}
    </>
  );
}

function BottomNav({ active, onScreen }) {
  const items = [
    ["الرئيسية", Wallet, "home", "start"], ["التحويل", ArrowLeft, "transfer", "start"], ["المدفوعات", Receipt, "payments", "activity"], ["المتجر", Storefront, "store", "portfolio"], ["الخدمات", GridFour, "services", "discover"],
  ];
  return <nav className="bottom-nav" aria-label="التنقل الرئيسي">{items.map(([label, icon, id, target]) => {
    const isActive = active === id;
    return <button key={label} className={isActive ? "nav-active" : ""} aria-current={isActive ? "page" : undefined} onClick={() => onScreen(target)}><Icon icon={icon} size={27} /><span>{label}</span></button>;
  })}</nav>;
}

function ScreenTitle({ title, subtitle, art, children }) {
  return <>
    <section className="screen-title">
      {art && <img src={art} className="title-art" alt="" />}
      <div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
    </section>
    {children}
  </>;
}

function Start({ onScreen }) {
  return <div className="screen start-screen">
    <section className="hero-card">
      <span className="tag"><Icon icon={Sparkle} size={16} /> جديد</span>
      <img src={coinArt} className="hero-coin" alt="عملات ونبتة" />
      <div className="hero-copy"><h1>فَعِّل رَديف</h1><p>استثمر الفكة تلقائيًا مع كل عملية شراء، بدون تعقيد وبخطوات بسيطة.</p></div>
      <div className="benefits"><span><Icon icon={TrendUp} /> استثمار تدريجي</span><span><Icon icon={SlidersHorizontal} /> تحكم كامل</span><span><Icon icon={TrendUp} /> تقريب تلقائي</span></div>
      <button className="primary" onClick={() => onScreen("setup")}>تفعيل الخدمة</button>
      <small className="helper">◷ اختر الحساب وقاعدة التقريب خلال أقل من دقيقة</small>
    </section>
    <section className="card how-card"><h2>كيف يعمل رَديف؟</h2><div className="how-row"><div><Icon icon={Coffee} /><b>قهوة الصباح</b><span>14.50 ر.س</span></div><Icon icon={ArrowLeft} className="coral" /><div><Icon icon={Coins} /><b><em>0.50 ر.س</em></b><span>إلى رَديف</span></div></div></section>
    <div className="pager"><i></i><i></i><i></i></div>
  </div>;
}

function Setup({ onScreen }) {
  const [round, setRound] = useState("5"); const [goal, setGoal] = useState("invest");
  return <div className="screen setup-screen"><ScreenTitle title="إعداد رَديف" subtitle="فعل الخدمة خلال خطوات بسيطة" />
    <div className="steps"><span className="active">1</span><i></i><span>2</span><i></i><span>3</span><label>الحساب</label><label>قاعدة التقريب</label><label>الهدف</label></div>
    <section className="card form-card"><h2>1. الحساب</h2><p>اختر الحساب الذي تريد تفعيل رَديف عليه</p><button className="choice selected"><Icon icon={Wallet} /> الحساب الجاري ••••7000 <span><Icon icon={CheckCircle} /></span><small>الرصيد الحالي <em>1,245.40</em> ريال</small></button></section>
    <section className="card form-card"><h2>2. قاعدة التقريب</h2><p>اختر طريقة التقريب المناسبة لك</p><div className="choice-grid">{["1","5","10"].map(value => <button className={round === value ? "choice selected" : "choice"} onClick={() => setRound(value)} key={value}>أقرب {value} ريال {round === value && <Icon icon={CheckCircle} />}</button>)}</div></section>
    <section className="card form-card"><h2>3. الهدف</h2><p>اختر وجهة مدخراتك من رَديف</p><div className="goal-grid">{[["save","الادخار الذكي",Target],["invest","الاستثمار",ChartBar],["local","دعم منشآت محلية",Buildings]].map(([value,label,icon]) => <button onClick={() => setGoal(value)} className={goal === value ? "goal selected" : "goal"} key={value}><Icon icon={icon} /><span>{label}</span>{goal === value && <Icon icon={CheckCircle} />}</button>)}</div></section>
    <div className="expected"><span><b>المتوقع شهريًا:</b><em>86 ريال</em></span><span><b>الحد الأعلى الشهري:</b><strong>150 ريال</strong></span></div>
    <button className="primary" onClick={() => onScreen("activity")}>متابعة</button><button className="outline" onClick={() => onScreen("start")}>لاحقًا</button>
  </div>;
}

const transactions = [["قهوة الصباح","14.50 ر.س","0.50",Coffee],["سوبرماركت","23.20 ر.س","0.80",ShoppingBag],["بنزين","49.10 ر.س","0.90",GasPump],["توصيل","18.40 ر.س","0.60",Truck]];
function Activity({ onScreen }) { return <div className="screen"><ScreenTitle title="اجمع فكتك صمتًا" subtitle="كل عملية شراء تساهم تلقائيًا في رَديف." />
  <div className="filter"><button className="selected">اليوم</button><button>هذا الأسبوع</button><button>الكل</button></div>
  <section className="card summary"><span><Icon icon={Coins} className="coral" /> إجمالي اليوم <b>2.80 <small>ريال</small></b></span><i></i><span><Icon icon={ChartBar} className="coral" /> عدد العمليات <b>4</b></span></section>
  <section className="card tx-list">{transactions.map(([name,price,round,icon]) => <button key={name} onClick={() => onScreen("reached")}><Icon icon={icon} className="coral"/><b>{name}</b><span>{price}</span><em>{round}<small> إلى رَديف</small></em></button>)}</section>
  <section className="card insight"><img src={coinArt} alt=""/><p>لو استمريت بهذا المعدل،<br/>قد تجمع <em>84 ريال</em> هذا الشهر.</p></section>
</div>; }

function Reached({ onScreen }) { return <div className="screen"><ScreenTitle title="الاستثمار التلقائي" art={walletArt} />
  <section className="card reached-card"><div className="ring"><b>10 <small>/ 10</small></b><span>ريال</span><Icon icon={CheckCircle} /></div><div><small>الحد المطلوب</small><h2>تم الوصول للحد!</h2><p>مبروك! تم تجميع الحد المطلوب للاستثمار وسيتم التحويل تلقائيًا.</p></div></section>
  <section className="success"><Icon icon={Check} /> تم تحويل <em>10 ريالات</em><br/>إلى محفظة الاستثمار بنجاح</section>
  <section className="card compact"><p>آخر عملية أكملت الحد المطلوب <Icon icon={DotsThree} /></p><hr/><p>تمت الإضافة من عملية: <em>قهوة الصباح</em><Icon icon={Coffee} /></p></section>
  <section className="card split-stat"><div><small>الرصيد قبل التحويل</small><b>9.50</b><span>ريال</span></div><div><small>المبلغ المضاف</small><b>0.50</b><span>ريال</span></div><div><small>الرصيد الحالي في المحفظة</small><b>1,240</b><span>ريال</span></div></section>
  <button className="primary" onClick={() => onScreen("portfolio")}>عرض المحفظة</button><button className="text-button" onClick={() => onScreen("start")}>العودة إلى رَديف <Icon icon={ArrowLeft}/></button>
</div>; }

function Assistant() { const [message, setMessage] = useState("كيف أصل لهدفي أسرع؟"); return <div className="screen assistant-screen"><ScreenTitle title="المساعد الذكي" />
  <section className="card assistant-hero"><img src={robotArt} alt="روبوت مساعد"/><div><span className="tag">توصية استباقية <Icon icon={Sparkle}/></span><p>لاحظنا صرفك المتكرر في المقاهي؛ قد يناسبك الاستثمار في قطاع الأغذية والمشاريع المحلية المرتبطة به.</p></div><div className="quick-actions"><button>رفع التقريب <Icon icon={SlidersHorizontal}/></button><button>اقتراح قطاع <Icon icon={ChartBar}/></button></div></section>
  <section className="card chat"><h2>المحادثة <Icon icon={Receipt} className="coral"/></h2><div className="user-bubble">{message}<small>9:40 م</small></div><div className="bot-row"><Icon icon={Robot} size={38}/><div className="bot-bubble">يمكنك رفع قاعدة التقريب إلى أقرب 5 ريالات وتحديد حد شهري 150 ريال لزيادة النمو بشكل متوازن.<small>9:41 م</small></div></div><div className="suggestions"><button onClick={() => setMessage("غيّر الإعدادات")}>غيّر الإعدادات <Icon icon={Gear}/></button><button onClick={() => setMessage("اعرض هدفي")}>اعرض هدفي <Icon icon={Target}/></button><button onClick={() => setMessage("المزيد من النصائح")}>المزيد من النصائح <Icon icon={Lightbulb}/></button></div></section>
  <div className="disclaimer"><Icon icon={X}/> المساعد يقدم اقتراحات توعوية ولا يعد توصية استثمارية ملزمة</div>
</div>; }

function Portfolio({ onScreen }) { return <div className="screen"><ScreenTitle title="هذا أثر هلالتك" subtitle="استثمارك اليوم يصنع الفرق غدًا." art={coinArt}/>
  <section className="card portfolio-total"><img src={coinArt} alt=""/><div><span><Icon icon={MagnifyingGlass}/> إجمالي قيمة المحفظة</span><b>5,420</b><small>ريال</small></div></section>
  <div className="metric-cards"><button><Icon icon={ChartBar} className="coral"/>الأرباح <b className="green">+240</b><small>ريال</small></button><button><Icon icon={Wallet} className="coral"/>إجمالي المستثمر <b>3,320</b><small>ريال</small></button><button><Icon icon={Coins} className="coral"/>الفكة المتجمعة <b>1,860</b><small>ريال</small></button></div>
  <section className="card chart-card"><h2>نمو المحفظة <Icon icon={TrendUp} className="coral"/></h2><div className="chart"><span className="line l1"></span><span className="line l2"></span><span className="line l3"></span><svg viewBox="0 0 320 120" aria-label="رسم نمو المحفظة"><path d="M6 102 C34 90 42 76 66 83 S95 66 119 69 S144 54 167 61 S195 41 218 48 S244 39 267 45 S292 25 314 18" fill="none" stroke="#72e293" strokeWidth="3"/><path d="M6 102 C34 90 42 76 66 83 S95 66 119 69 S144 54 167 61 S195 41 218 48 S244 39 267 45 S292 25 314 18 L314 120 L6 120Z" fill="rgba(79,195,132,.18)"/></svg><div className="months"><span>يناير</span><span>فبراير</span><span>مارس</span><span>أبريل</span><span>مايو</span><span>يونيو</span></div></div></section>
  <button className="card continue-card" onClick={() => onScreen("impact")}><img src={coinArt} alt=""/><span><b>استمرارك في رَديف</b>ساعدك على بناء استثمار تدريجي بدون ضغط مالي.</span></button>
</div>; }

function Impact() { return <div className="screen"><ScreenTitle title="النمو والأثر" subtitle="نمو محفظتك.. وأثر أموالك في الاقتصاد المحلي" />
  <section className="card impact-hero"><div><small>إجمالي المحفظة</small><b>2,840 <em>ريال</em></b><span className="up">↑ +5.4%</span><p>منذ بداية الشهر</p></div><img src={coinArt} alt=""/><div className="chart coral-chart"><svg viewBox="0 0 320 120"><path d="M6 104 C29 97 36 78 59 83 S85 66 105 74 S134 50 158 59 S188 43 215 49 S239 21 267 28 S292 14 314 18" fill="none" stroke="#ff957d" strokeWidth="3"/></svg></div></section>
  <section className="card local-impact"><h2><Icon icon={HandHeart} className="coral"/> أثر محلي</h2><p>أموالك ساهمت في دعم <em>8</em> منشآت محلية</p><div>{[["أغذية ومقاهٍ","32%"],["خدمات رقمية","26%"],["تجزئة","18%"]].map(([name,value]) => <span key={name}><b>{name}</b><i><i style={{width:value}} /></i><em>{value}</em></span>)}</div><small>تم تمويلها بشكل جماعي وآلي عبر رَديف</small></section>
  <section className="card two-stat"><div><small>متوسط الاستثمار الشهري</small><b>142 <em>ريال</em></b><span className="green">↑ 12% عن الشهر الماضي</span></div><div><small>أقرب هدف قادم</small><b>3,000 <em>ريال</em></b><span className="green">اكتمل 64%</span></div></section>
</div>; }

function Discover({ onScreen }) { const [filter,setFilter]=useState("مستقطعة"); const rows=[["تموينات الحي","27.40 ر.س","+0.60",ShoppingBag],["قهوة الصباح","14.50 ر.س","+0.50",Coffee],["محطة الوقود","49.10 ر.س","+0.90",GasPump],["صيدلية","31.80 ر.س","+0.20",CheckCircle],["توصيل","18.40 ر.س","+0.60",Truck]]; return <div className="screen discover"><ScreenTitle title="كشف الحركات" />
  <div className="filter">{["الكل","مستقطعة","غير مؤهلة"].map(x=><button className={filter===x?"selected":""} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div>
  <section className="card deduct-total"><img src={coinArt} alt=""/><p>إجمالي المستقطع هذا الأسبوع <b>12.40 <small>ريال</small></b></p></section>
  <section className="discover-list">{rows.map(([name,price,amount,icon])=><button className="card" onClick={()=>onScreen("setup")} key={name}><span className="tile"><Icon icon={icon}/></span><span><b>{name}</b><small>اليوم 10:30 ص</small></span><strong>{price}</strong><em><Icon icon={Sparkle} size={17}/> {amount} رَديف</em></button>)}</section>
  <button className="card info-button" onClick={()=>onScreen("setup")}><Icon icon={CheckCircle} className="coral"/> يمكنك تعديل قواعد التقريب في أي وقت <Icon icon={ArrowLeft} className="coral"/></button>
</div>; }

export function App() {
  const [screen, setScreen] = useState("start");
  const [frameScale, setFrameScale] = useState(1);
  useEffect(() => {
    const updateScale = () => {
      const viewport = window.visualViewport;
      const width = viewport?.width ?? window.innerWidth;
      const height = viewport?.height ?? window.innerHeight;
      if (width < 540) return setFrameScale(1);
      setFrameScale(Math.min(1, (height - 8) / 844, (width - 8) / 390));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    window.visualViewport?.addEventListener("resize", updateScale);
    return () => {
      window.removeEventListener("resize", updateScale);
      window.visualViewport?.removeEventListener("resize", updateScale);
    };
  }, []);
  const activeNav = {
    start: "home", setup: "home", activity: "payments", reached: "home",
    assistant: "home", portfolio: "store", impact: "store", discover: "services",
  }[screen];
  const view = {start:<Start onScreen={setScreen}/>,setup:<Setup onScreen={setScreen}/>,activity:<Activity onScreen={setScreen}/>,reached:<Reached onScreen={setScreen}/>,assistant:<Assistant/>,portfolio:<Portfolio onScreen={setScreen}/>,impact:<Impact/>,discover:<Discover onScreen={setScreen}/>}[screen];
  return <main className="canvas"><div className="mobile-prototype" style={{ "--frame-scale": frameScale }} dir="rtl"><Header screen={screen} onScreen={setScreen}/><div className="scroll-area">{view}</div><BottomNav active={activeNav} onScreen={setScreen}/></div></main>;
}
