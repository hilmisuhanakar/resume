"use client";

import { useEffect } from "react";

export default function ScrollHashUpdater({onSectionChange}) {
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            window.history.replaceState(
              null,
              "",
              `#${id}`
            );
            window.dispatchEvent(new CustomEvent("sectionchange", { detail: id }));
            onSectionChange(id);
          }
        });
      },
      {
        rootMargin: "-49% 0px -49% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}