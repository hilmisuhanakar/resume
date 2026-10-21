"use client";
import { useEffect, useRef, useState } from "react";

export default function SlideIn({ children, direction = "left", className = "",
}) {

    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    const transforms = {
        left: "-translate-x-25",
        right: "translate-x-25",
        up: "-translate-y-25",
        down: "translate-y-25",
    };

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`
                ${className}
                transition-all
                duration-2000
                ease-out
                ${visible
                    ? "opacity-100 translate-x-0 translate-y-0"
                    : `opacity-0 ${transforms[direction]}`
                }
            `}
        >
            {children}
        </div>
    );
}