
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/components/eurasian-logo.css";

export default function EurasianLogo({
    className = "",
    animated = true,
    label = "Eurasian House",
}) {
    const { theme } = useTheme();
    const [visible, setVisible] = useState(!animated);

    useEffect(() => {
        if (!animated) {
            setVisible(true);
            return;
        }

        setVisible(false);

        const frame = requestAnimationFrame(() => {
            requestAnimationFrame(() => setVisible(true));
        });

        return () => cancelAnimationFrame(frame);
    }, [animated]);

    return (
        <svg
            key={`${theme}-${animated}`}
            className={[
                "eurasian-logo",
                theme === "dark" ? "eurasian-logo--dark" : "eurasian-logo--light",
                animated ? "eurasian-logo--animated" : "",
                visible ? "eurasian-logo--visible" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            viewBox="0 0 1094 1094"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={label}
            focusable="false"
        >
            <g className="eurasian-logo__mark">
                <path
                    className="eurasian-logo__circle"
                    d="M1071.5 547C1071.5 836.673 836.673 1071.5 547 1071.5C257.327 1071.5 22.5 836.673 22.5 547C22.5 257.327 257.327 22.5 547 22.5C836.673 22.5 1071.5 257.327 1071.5 547Z"
                />
                <g className="eurasian-logo__letters">
                    <path d="M199 773.5L201 316H487.5V405H300V497H468.5V589H300V681.5H533.5C545.1 686.3 618 657.167 653 642V773.5H199Z" />
                    <path d="M551.5 632V316H653V496H787.5V316H890.5V773.5H787.5V589H667.5C637.9 589 577.833 617.667 551.5 632Z" />
                    <path
                        className="eurasian-logo__letter-outline"
                        d="M201 316L199 773.5H653V642C618 657.167 545.1 686.3 533.5 681.5H300V589H468.5V497H300V405H487.5V316H201ZM551.5 316V632C577.833 617.667 637.9 589 667.5 589H787.5V773.5H890.5V316H787.5V496H653V316H551.5Z"
                    />
                </g>
            </g>
        </svg>
    );
}
