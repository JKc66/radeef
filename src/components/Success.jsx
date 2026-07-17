import {
  ArrowRight,
  Buildings,
  CheckCircle,
  Coins,
  TrendUp,
} from "@phosphor-icons/react";
import logo from "../assets/radeef-logo.webp";
import { Icon, PrimaryButton } from "./shared";

export function Success({ onDashboard }) {
  return <main className="success-screen screen"><div className="success-symbol"><Icon icon={CheckCircle} size={58} weight="fill" /></div><img src={logo} alt="رديف" className="success-logo" /><h1>خطة رديف صارت جاهزة</h1><p>من أول عملية مؤهلة، تبدأ فكتك رحلتها من حسابك إلى صك منشأة محلية.</p><section className="success-path"><span><Icon icon={Coins} /><b>تجميع</b></span><Icon icon={ArrowRight} /><span><Icon icon={Buildings} /><b>تمويل</b></span><Icon icon={ArrowRight} /><span><Icon icon={TrendUp} /><b>عوائد</b></span></section><PrimaryButton onClick={onDashboard}>عرض محفظة رديف</PrimaryButton></main>;
}
