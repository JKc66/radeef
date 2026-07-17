import { useState } from "react";
import { Robot } from "@phosphor-icons/react";
import { flowOrder, merchantFlowOrder } from "./data";
import { BrandHeader, Icon } from "./components/shared";
import { Assistant } from "./components/Assistant";
import { Welcome } from "./components/Welcome";
import { MethodStep, GoalStep, RiskStep, MatchStep, ReviewStep } from "./components/investor/Steps";
import { MerchantIntro, MerchantDetails, MerchantPlan, MerchantReview, MerchantSuccess } from "./components/merchant/Steps";
import { Success } from "./components/Success";
import { Dashboard } from "./components/Dashboard";

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
    if (screen === "welcome") return <Welcome onInvestorStart={() => setScreen("method")} onMerchantStart={() => setScreen("merchant-intro")} onWalletOpen={() => setScreen("dashboard")} onAssistantOpen={() => setAssistantOpen(true)} />;
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
  const showAssistantLauncher = !["welcome", "success", "merchant-success"].includes(screen);
  return <div className="canvas" dir="rtl"><div className="mobile-prototype">
    {showHeader && <BrandHeader compact onBack={screen === "dashboard" ? () => setScreen("welcome") : goBack} onClose={() => setScreen("welcome")} />}
    <div className={`scroll-area ${showHeader ? "with-header" : ""} ${screen === "welcome" ? "welcome-scroll-lock" : ""}`}>{renderScreen()}</div>
    {showAssistantLauncher && !assistantOpen && <button type="button" className={`assistant-launcher ${screen === "welcome" ? "home" : ""}`} onClick={() => setAssistantOpen(true)} aria-label="فتح مساعد رديف"><Icon icon={Robot} size={21} weight="fill" /><span>مساعد رديف</span></button>}
    {assistantOpen && <Assistant context={assistantContext} onClose={() => setAssistantOpen(false)} />}
  </div></div>;
}
