"use client";
import { useState } from "react";
import Header from "./header";
import ScrollHashUpdater from "./scrooll-hash-updater";

export default function ActiveSectionProvider({ children }) {
    const [activeId, setActiveId] = useState("");
    return (
        <>
            <Header activeId={activeId} />
            <ScrollHashUpdater onSectionChange={setActiveId} />
            {children}
        </>
    );
}