import React from "react";

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    isGlitching: boolean;
    macroVersion: string;
}
import GlitchOverlay from "./GlitchOverlay";
import { useGlitchText } from "../hooks/useGlitchText";

import carotIcon from "../icons/carot_ico.png";
import noticeIcon from "../icons/notice.png";
import statusIcon from "../icons/uma_status.png";
import fishingIcon from "../icons/fishing.png";
import statsIcon from "../icons/stats.png";
import aurasIcon from "../icons/auras.png";
import creditsIcon from "../icons/credits.png";
import settingIcon from "../icons/setting_icon.png";
import merchantIcon from "../icons/merchant.png";
import donationIcon from "../icons/donation.png";
import movementIcon from "../icons/movement.png";
import autopopIcon from "../icons/uma_autopop.png";
import otherfeatureIcon from "../icons/otherfeature.png";
import kitasanIcon from "../icons/kitasandrinkwater.png";
import jukeboxIcon from "../icons/uma_jukebox.png";

const SidebarItem = ({ item, isActive, onClick, isGlitching, locked }: { item: any; isActive: boolean; onClick: () => void; isGlitching: boolean; locked?: boolean }) => {
    const label = useGlitchText(item.label || "", isGlitching);
    const isDisabled = item.disabled || locked;
    return (
        <div
            className={`sidebar-item ${isActive ? "active" : ""}`}
            onClick={() => !isDisabled && onClick()}
            style={isDisabled ? { opacity: 0.3, cursor: "not-allowed", pointerEvents: "none" } : {}}
            title={locked ? "🔒 Locked" : undefined}
        >
            <span className="icon">
                {locked ? "🔒" : (
                    item.imgIcon ? (
                        <img src={item.imgIcon} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : item.icon
                )}
            </span>
            {label}
            {item.disabled && <span style={{ fontSize: "10px", marginLeft: "auto", opacity: 0.7 }}>(WIP)</span>}
        </div>
    );
};

const navItems = [
    { section: "Dashboard" },
    { id: "notice", label: "Notice", icon: "📰", imgIcon: noticeIcon },
    { id: "status", label: "Status", icon: "🐴", imgIcon: statusIcon },
    { id: "stats", label: "Stats", icon: "🏆", imgIcon: statsIcon },
    { section: "Configuration" },
    { id: "webhook", label: "Webhook", icon: "📱", imgIcon: settingIcon },
    { id: "misc", label: "Automated actions", icon: "⚙️", imgIcon: settingIcon },
    { id: "calibrations", label: "Macro Calibrations", icon: "⚙️", imgIcon: settingIcon },
    { id: "remoteaccess", label: "Remote Control", icon: "🎮", imgIcon: settingIcon },
    { id: "customization", label: "Customizations", icon: "⚙️", imgIcon: settingIcon },
    { section: "Main Features" },
    { id: "fishing", label: "Fishing", icon: "🏖️", imgIcon: fishingIcon },
    { id: "merchant", label: "Merchant", icon: "🎪", imgIcon: merchantIcon },
    { id: "potioncraft", label: "Potion Crafting", icon: "🍹", imgIcon: kitasanIcon },
    { id: "auras", label: "Auras", icon: "✨", imgIcon: aurasIcon },
    { id: "movements", label: "Movements", icon: "🏃‍♀️", imgIcon: movementIcon },
    { id: "autopopbuff", label: "Auto Pop Buff", icon: "🥕", imgIcon: autopopIcon },
    { id: "otherfeatures", label: "Other Features", icon: "🗃️", imgIcon: otherfeatureIcon },
    { section: "Information" },
    { id: "credits", label: "Credits", icon: "🤝", imgIcon: creditsIcon },
    { id: "donations", label: "Donations <3", icon: "💎", imgIcon: donationIcon },
    { id: "jukebox", label: "Jukebox", icon: "🎶", imgIcon: jukeboxIcon },
];

export default function Sidebar({ activeTab, onTabChange, isGlitching, macroVersion }: SidebarProps) {
    const title = useGlitchText("Carateebee Macro", isGlitching);
    const version = useGlitchText(macroVersion || "v?.?.?", isGlitching);

    const navRef = React.useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = React.useState({ top: 0, height: 0, opacity: 0 });

    React.useEffect(() => {
        const updateIndicator = () => {
            if (navRef.current) {
                const activeEl = navRef.current.querySelector('.sidebar-item.active') as HTMLElement;
                if (activeEl) {
                    setIndicatorStyle({
                        top: activeEl.offsetTop,
                        height: activeEl.offsetHeight,
                        opacity: 1
                    });
                }
            }
        };
        updateIndicator();
        const timeoutId = setTimeout(updateIndicator, 50);
        window.addEventListener('resize', updateIndicator);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updateIndicator);
        };
    }, [activeTab]);

    return (
        <div className="sidebar" style={{ position: "relative" }}>
            {isGlitching && <GlitchOverlay />}
            <div className="sidebar-brand">
                <div className="sidebar-brand-row">
                    <img src={carotIcon} alt="" className="carot-icon" />
                    <div>
                        <h1>{title}</h1>
                        <div className="version">{version}</div>
                    </div>
                </div>
            </div>

            <div className="sidebar-nav" ref={navRef} style={{ position: "relative", zIndex: 0 }}>
                {/* Sliding Bubble Indicator */}
                <div style={{
                    position: "absolute",
                    top: indicatorStyle.top,
                    left: 8,
                    right: 8,
                    height: indicatorStyle.height,
                    opacity: indicatorStyle.opacity,
                    background: "linear-gradient(135deg, #78c822, #65ad1a)",
                    border: "2px solid #5a9a14",
                    borderRadius: "12px",
                    boxShadow: "0 3px 10px rgba(120, 200, 34, 0.25)",
                    transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    zIndex: 0,
                    pointerEvents: "none"
                }} />

                {navItems.map((item, i) => {
                    if ("section" in item && item.section) {
                        return (
                            <div key={`s-${i}`} className="sidebar-section-label" style={{ position: "relative", zIndex: 1 }}>
                                {item.section}
                            </div>
                        );
                    }
                    return (
                        <SidebarItem
                            key={item.id}
                            item={item}
                            isActive={activeTab === item.id}
                            onClick={() => item.id && onTabChange(item.id)}
                            isGlitching={isGlitching}
                        />
                    );
                })}
            </div>

            <div className="sidebar-footer">
                <div className="by-line">
                    Carateebee Macro made by <span>Carateebee Development Team</span>
                </div>
            </div>
        </div>
    );
}
