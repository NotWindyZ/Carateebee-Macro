import React from "react";
import enabledBtn from "../icons/enabled_button.png";
import disabledBtn from "../icons/disabled_button.png";

interface ToggleSwitchProps {
    label: string;
    description?: React.ReactNode;
    checked: boolean;
    onChange: (val: boolean) => void;
}

export default function ToggleSwitch({ label, description, checked, onChange }: ToggleSwitchProps) {
    return (
        <div className="toggle-row">
            <div className="toggle-label">
                <span className="label-text">{label}</span>
                {description && <span className="label-desc">{description}</span>}
            </div>
            <div
                className="toggle-img-btn"
                onClick={() => onChange(!checked)}
                title={checked ? "Enabled" : "Disabled"}
            >
                <img
                    src={checked ? enabledBtn : disabledBtn}
                    alt={checked ? "Enabled" : "Disabled"}
                    style={{ width: 32, height: 32, objectFit: "contain", cursor: "pointer" }}
                    draggable={false}
                />
            </div>
        </div>
    );
}
