"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

function CodeBlock({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border bg-muted/50">
      <div className="flex items-center justify-between border-b bg-muted/80 px-4 py-2">
        <span className="text-sm font-medium">{title}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-background"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="text-sm">{code}</code>
      </pre>
    </div>
  );
}

export default function AccordionPage() {
  const defaultAccordionCode = `<details className="group">
  <summary className="flex cursor-pointer items-center justify-between rounded-lg border bg-background p-4 font-medium transition-colors hover:bg-muted">
    <span>How do I track my order?</span>
    <svg
      className="h-5 w-5 transition-transform group-open:rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </summary>
  <div className="mt-2 rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
    You can track your order by logging into your account and visiting the "Orders" section.
  </div>
</details>`;

  const borderedAccordionCode = `<details className="group border-b-2 last:border-b-0">
  <summary className="flex cursor-pointer items-center justify-between bg-background p-6 font-medium transition-colors hover:bg-muted">
    <span>What payment methods do you accept?</span>
    <svg
      className="h-5 w-5 transition-transform group-open:rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </summary>
  <div className="bg-muted/30 p-6 text-sm text-muted-foreground">
    We accept all major credit cards, PayPal, and Apple Pay.
  </div>
</details>`;

  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-8 space-y-3">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Shadcn Accordion
        </h1>
        <p className="text-muted-foreground">
          Explore the collection of awesome Shadcn Accordion Components, featuring 16 accordion variants designed for customizable, and interactive UI elements built with React and Tailwind CSS.
        </p>
      </div>

      {/* Suggestions Banner */}
      <div className="mb-8 rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <svg
            className="h-5 w-5 text-muted-foreground mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4M12 8h.01" />
          </svg>
          <div>
            <p className="font-medium text-sm">Have any suggestions for Accordion variants?</p>
            <p className="text-sm text-muted-foreground mt-1">
              Join our Discord community and share your ideas to help us improve and expand our component variants!
            </p>
          </div>
        </div>
      </div>

      {/* Component Variants */}
      <div className="space-y-12">
        {/* Variant 1: Default Accordion */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">How do I track my order?</h2>
          </div>

          {/* Preview */}
          <div className="rounded-lg border bg-card p-8">
            <div className="space-y-4 max-w-2xl">
              <details className="group" open>
                <summary className="flex cursor-pointer items-center justify-between rounded-lg border bg-background p-4 font-medium transition-colors hover:bg-muted">
                  <span>How do I track my order?</span>
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="mt-2 rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
                  You can track your order by logging into your account and visiting the "Orders" section. You'll receive tracking information via email once your order ships. For real-time updates, you can also use the tracking number provided in your shipping confirmation email.
                </div>
              </details>

              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg border bg-background p-4 font-medium transition-colors hover:bg-muted">
                  <span>What is your return policy?</span>
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="mt-2 rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
                  We offer a 30-day return policy for most items. Products must be unused and in their original packaging.
                </div>
              </details>

              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg border bg-background p-4 font-medium transition-colors hover:bg-muted">
                  <span>How can I contact customer support?</span>
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="mt-2 rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
                  You can reach our customer support team via email at support@example.com or call us at 1-800-123-4567.
                </div>
              </details>
            </div>
          </div>

          {/* Code Block */}
          <CodeBlock code={defaultAccordionCode} title="accordion-default.tsx" />
        </section>

        {/* Variant 2: Bordered Accordion */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">What payment methods do you accept?</h2>
          </div>

          {/* Preview */}
          <div className="rounded-lg border bg-card p-8">
            <div className="max-w-2xl rounded-xl border-2 overflow-hidden">
              <details className="group border-b-2 last:border-b-0" open>
                <summary className="flex cursor-pointer items-center justify-between bg-background p-6 font-medium transition-colors hover:bg-muted">
                  <span>What payment methods do you accept?</span>
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="bg-muted/30 p-6 text-sm text-muted-foreground">
                  We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through our encrypted payment gateway.
                </div>
              </details>

              <details className="group border-b-2 last:border-b-0">
                <summary className="flex cursor-pointer items-center justify-between bg-background p-6 font-medium transition-colors hover:bg-muted">
                  <span>Do you ship internationally?</span>
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="bg-muted/30 p-6 text-sm text-muted-foreground">
                  Yes! We ship to over 100 countries worldwide. Shipping costs and delivery times vary by destination.
                </div>
              </details>

              <details className="group border-b-2 last:border-b-0">
                <summary className="flex cursor-pointer items-center justify-between bg-background p-6 font-medium transition-colors hover:bg-muted">
                  <span>How long does shipping take?</span>
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="bg-muted/30 p-6 text-sm text-muted-foreground">
                  Standard shipping typically takes 5-7 business days. Express shipping (2-3 business days) is also available.
                </div>
              </details>
            </div>
          </div>

          {/* Code Block */}
          <CodeBlock code={borderedAccordionCode} title="accordion-bordered.tsx" />
        </section>
      </div>
    </ComponentLayout>
  );
}
