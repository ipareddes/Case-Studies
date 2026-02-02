"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";

interface BlockPreviewProps {
  preview: React.ReactNode;
  code: string;
  filename?: string;
}

export function BlockPreview({ preview, code, filename }: BlockPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-4 px-4">
          <button
            onClick={() => setActiveTab("preview")}
            className={`relative px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "preview"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Preview
            {activeTab === "preview" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`relative px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "code"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Code
            {activeTab === "code" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "preview" ? (
          <div className="rounded-lg border bg-background overflow-hidden">{preview}</div>
        ) : (
          <CodeBlock code={code} filename={filename} />
        )}
      </div>
    </div>
  );
}
