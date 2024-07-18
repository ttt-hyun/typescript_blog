"use client";

import { promises } from "dns";
import { useState } from "react";

interface PreTagProps {
    children: React.ReactNode;
    raw: string;
    [key: string]: any;
}

export const Pre = ({ children, raw, ...props } : PreTagProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (t: string): Promise<void> => {
    await navigator.clipboard.writeText(t);
    setIsCopied(true);
  
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const lang = props["data-language"];
  
  return (
    <>
    <button className="absolute top-3 right-3 text-sm font-bold text-white" onClick={() => copy(raw)}>
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
    <pre {...props} >
      {/* <div className={"code-header"}>{lang}</div> */}
      {children}
    </pre>
    </>
  );
};
