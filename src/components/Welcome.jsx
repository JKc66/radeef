import {
  ArrowRight,
  Buildings,
  Coins,
  Robot,
  ShieldCheck,
  Sparkle,
  Storefront,
  TrendUp,
  Wallet,
} from "@phosphor-icons/react";
import logo from "../assets/radeef-logo.webp";
import coinArt from "../assets/coin.webp";
import { Icon } from "./shared";

export function Welcome({ onInvestorStart, onMerchantStart, onWalletOpen, onAssistantOpen }) {
  return <main className="welcome screen">
    <div className="welcome-mark">
      <button type="button" className="assistant-header-launcher" onClick={onAssistantOpen} aria-label="فتح مساعد رديف">
        <Icon icon={Robot} size={18} weight="fill" />
        <span>مساعد رديف</span>
      </button>
      <button type="button" className="wallet-entry" onClick={onWalletOpen} aria-label="فتح محفظتي">
        <Icon icon={Wallet} size={18} />
        <span>محفظتي</span>
      </button>
    </div>
    <div className="welcome-visual">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <img src={coinArt} alt="عملات تنمو" />
    </div>
    <div className="welcome-brand">
      <img src={logo} alt="رديف" />
    </div>
    <div className="welcome-copy">
      <span className="eyebrow"><Icon icon={Sparkle} size={15} /> داخل تطبيق الإنماء</span>
      <h1>فكتك تموّل وتنمو.</h1>
      <p>حوّل فكة مشترياتك تلقائيًا إلى صكوك منشآت معتمدة.</p>
    </div>
    <div className="cycle-strip">
      <span><Icon icon={Coins} /> تجمع</span><i />
      <span><Icon icon={Buildings} /> تموّل</span><i />
      <span><Icon icon={TrendUp} /> تنمو</span>
    </div>
    <div className="role-actions">
      <button type="button" className="role-button investor" onClick={onInvestorStart}><span><Icon icon={Coins} /></span><p><strong>مستثمر فرد</strong><small>استثمر فكتك تلقائيًا أو مباشرة</small></p><Icon icon={ArrowRight} /></button>
      <button type="button" className="role-button merchant" onClick={onMerchantStart}><span><Icon icon={Storefront} /></span><p><strong>تمويل منشأة</strong><small>اطلب تمويل صكوك لتوسيع مشروعك</small></p><Icon icon={ArrowRight} /></button>
    </div>
    <small className="legal-note"><Icon icon={ShieldCheck} size={16} /> فرص مدروسة ومنشآت معتمدة من البنك</small>
  </main>;
}
