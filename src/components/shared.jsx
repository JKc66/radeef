import {
  ArrowRight,
  Check,
  X,
} from "@phosphor-icons/react";
import logo from "../assets/radeef-logo.webp";
import { steps, merchantSteps } from "../data";

export function Icon({ icon: Component, size = 22, ...props }) {
  return <Component size={size} weight="regular" {...props} />;
}

export function BrandHeader({ onBack, onClose, compact = false }) {
  return <header className={`brand-header ${compact ? "compact" : ""}`}>
    <button type="button" className="icon-button" onClick={onBack} aria-label="العودة"><Icon icon={ArrowRight} /></button>
    <img src={logo} alt="رديف" className="brand-logo" />
    <button type="button" className="icon-button" onClick={onClose} aria-label="إغلاق"><Icon icon={X} /></button>
  </header>;
}

export function Progress({ current, labels = steps }) {
  return <div className="progress-wrap">
    <div className="progress-label"><span>الخطوة {current} من {labels.length}</span><strong>{labels[current - 1]}</strong></div>
    <div className="progress-track" aria-label={`الخطوة ${current} من ${labels.length}`}>
      {labels.map((step, index) => <span key={step} className={index < current ? "filled" : ""} />)}
    </div>
  </div>;
}

export function PrimaryButton({ children, ...props }) {
  return <button type="button" className="primary-button" {...props}>{children}</button>;
}

export function Choice({ selected, icon, title, description, onClick }) {
  return <button type="button" className={`choice-card ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={onClick}>
    <span className="choice-icon"><Icon icon={icon} /></span>
    <span className="choice-copy"><strong>{title}</strong><small>{description}</small></span>
    <span className="radio">{selected && <Icon icon={Check} size={14} weight="bold" />}</span>
  </button>;
}

export function StepShell({ title, subtitle, current, children }) {
  return <main className="step-screen screen"><Progress current={current} /><div className="step-heading"><h1>{title}</h1><p>{subtitle}</p></div>{children}</main>;
}

export function MerchantStepShell({ title, subtitle, current, children }) {
  return <main className="step-screen merchant-screen screen"><Progress current={current} labels={merchantSteps} /><div className="step-heading"><h1>{title}</h1><p>{subtitle}</p></div>{children}</main>;
}
