"use client";

import { Input, Label, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState, useRef, useCallback, ChangeEvent, KeyboardEvent } from "react";
import { X, Sparkles, Code2, Copy, Check, CreditCard } from "lucide-react";
import ReactDOM from "react-dom";

// --- Code Modal ---
function CodeModal({ code, onClose, variantId }: { code: string; onClose: () => void; variantId: string }) {
  const [copied, setCopied] = useState(false);
  const [pkgManager, setPkgManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");

  const cliCommands: Record<string, string> = {
    pnpm: `pnpm dlx shadcn@latest add @ss-components/${variantId}`,
    npm: `npx shadcn@latest add @ss-components/${variantId}`,
    yarn: `npx shadcn@latest add @ss-components/${variantId}`,
    bun: `bunx --bun shadcn@latest add @ss-components/${variantId}`,
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-[100] bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-[101] w-full max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-lg max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">CLI Command</h2>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-muted" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-4 border-b mb-4">
          {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
            <button
              key={pm}
              onClick={() => setPkgManager(pm)}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                pkgManager === pm
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {pm}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">CLI v3</span>
        </div>
        <div className="relative mb-8">
          <pre className="rounded-lg bg-zinc-950 p-4 text-sm text-zinc-50 overflow-x-auto">
            <code>{cliCommands[pkgManager]}</code>
          </pre>
          <button
            onClick={() => { navigator.clipboard.writeText(cliCommands[pkgManager]); }}
            className="absolute top-3 right-3 rounded-md p-1.5 text-zinc-400 hover:text-zinc-50 transition-colors"
            aria-label="Copy CLI command"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <h3 className="text-base font-semibold mb-4">Manual Code</h3>
        <div className="relative">
          <pre className="rounded-lg bg-zinc-950 p-4 text-sm text-zinc-50 overflow-x-auto max-h-[400px] overflow-y-auto">
            <code>{code}</code>
          </pre>
          <button
            onClick={copyCode}
            className="absolute top-3 right-3 rounded-md p-1.5 text-zinc-400 hover:text-zinc-50 transition-colors"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}

// --- Variant Cell ---
function VariantCell({
  title,
  variantId,
  code,
  children,
  isLastCol,
}: {
  title: string;
  variantId: string;
  code: string;
  children: React.ReactNode;
  isLastCol: boolean;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className={isLastCol ? "border-r-0" : ""}>
      <div className="group/item relative flex h-full min-h-[210px] items-center justify-center px-8 py-12 max-sm:px-4" data-slot={variantId}>
        <div className="w-full">{children}</div>
        <TooltipProvider delayDuration={200}>
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground cursor-pointer opacity-0 transition-none group-hover/item:opacity-100" aria-label="Copy prompt">
                  <Sparkles className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Copy prompt</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground cursor-pointer opacity-0 transition-none group-hover/item:opacity-100" aria-label="Open in v0">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                  </svg>
                </button>
              </TooltipTrigger>
              <TooltipContent>Open in v0</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setShowCode(true)} className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground cursor-pointer opacity-0 transition-none group-hover/item:opacity-100" aria-label="View code">
                  <Code2 className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>View code</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        <div className="text-muted-foreground absolute top-3 left-4 hidden text-sm group-hover/item:block">
          {title}
        </div>
      </div>
      {showCode && <CodeModal code={code} onClose={() => setShowCode(false)} variantId={variantId} />}
    </div>
  );
}

// --- Mask Utility Hook ---
function useMaskedInput(mask: string, maskChar = "_") {
  const [value, setValue] = useState("");

  const applyMask = useCallback(
    (raw: string) => {
      const digits = raw.replace(/[^a-zA-Z0-9]/g, "");
      let result = "";
      let digitIndex = 0;
      for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
        if (mask[i] === maskChar) {
          result += digits[digitIndex];
          digitIndex++;
        } else {
          result += mask[i];
          if (digits[digitIndex] === mask[i]) {
            digitIndex++;
          }
        }
      }
      return result;
    },
    [mask, maskChar]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(applyMask(e.target.value));
    },
    [applyMask]
  );

  return { value, onChange };
}

// --- Input Mask Variant Previews ---

function InputMask01() {
  const { value, onChange } = useMaskedInput("____ ____");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-mask-01">Input with mask</Label>
      <Input
        id="input-mask-01"
        type="text"
        placeholder="AB12 CDE"
        inputMode="text"
        value={value}
        onChange={onChange}
      />
      <p className="text-muted-foreground text-xs">
        Alphanumeric mask pattern
      </p>
    </div>
  );
}

function InputMask02() {
  const applyTimeMask = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 6);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}:${digits.slice(2)}`;
    return `${digits.slice(0, 2)}:${digits.slice(2, 4)}:${digits.slice(4)}`;
  };

  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-mask-02">Input time</Label>
      <Input
        id="input-mask-02"
        type="text"
        placeholder="00:00:00"
        inputMode="numeric"
        value={value}
        onChange={(e) => setValue(applyTimeMask(e.target.value))}
      />
      <p className="text-muted-foreground text-xs">
        Time format HH:MM:SS
      </p>
    </div>
  );
}

function InputMask03() {
  const applyCardMask = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 16);
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(" ") : "";
  };

  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-mask-03">Card number</Label>
      <div className="relative">
        <Input
          id="input-mask-03"
          type="tel"
          className="peer pr-11"
          aria-label="Card number"
          autoComplete="cc-number"
          placeholder="Card number"
          value={value}
          onChange={(e) => setValue(applyCardMask(e.target.value))}
        />
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
          <CreditCard className="size-4" aria-hidden="true" />
          <span className="sr-only">Card Provider</span>
        </div>
      </div>
      <p className="text-muted-foreground text-xs">
        Credit card number format
      </p>
    </div>
  );
}

function InputMask04() {
  const applyExpiryMask = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-mask-04">Expiry date</Label>
      <Input
        id="input-mask-04"
        type="tel"
        aria-label="Expiry date in format MM YY"
        autoComplete="cc-exp"
        placeholder="MM/YY"
        value={value}
        onChange={(e) => setValue(applyExpiryMask(e.target.value))}
      />
      <p className="text-muted-foreground text-xs">
        Card expiry date format
      </p>
    </div>
  );
}

function InputMask05() {
  const [value, setValue] = useState("");

  const applyCvcMask = (raw: string) => {
    return raw.replace(/\D/g, "").slice(0, 4);
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-mask-05">CVC code</Label>
      <Input
        id="input-mask-05"
        type="tel"
        aria-label="CVC"
        autoComplete="cc-csc"
        placeholder="CVC"
        value={value}
        onChange={(e) => setValue(applyCvcMask(e.target.value))}
      />
      <p className="text-muted-foreground text-xs">
        3 or 4 digit security code
      </p>
    </div>
  );
}

function InputMask06() {
  const applyCardMask = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 16);
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(" ") : "";
  };

  const applyExpiryMask = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const applyCvcMask = (raw: string) => {
    return raw.replace(/\D/g, "").slice(0, 4);
  };

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Card details</Label>
      <div>
        <div className="relative focus-within:z-10">
          <Input
            type="tel"
            className="peer rounded-b-none pr-9 shadow-none"
            aria-label="Card number"
            autoComplete="cc-number"
            placeholder="Card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(applyCardMask(e.target.value))}
          />
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
            <CreditCard className="size-4" aria-hidden="true" />
            <span className="sr-only">Card Provider</span>
          </div>
        </div>
        <div className="-mt-px flex">
          <div className="min-w-0 flex-1 focus-within:z-10">
            <Input
              type="tel"
              className="rounded-t-none rounded-r-none shadow-none"
              aria-label="Expiry date in format MM YY"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(applyExpiryMask(e.target.value))}
            />
          </div>
          <div className="-ms-px min-w-0 flex-1 focus-within:z-10">
            <Input
              type="tel"
              className="rounded-t-none rounded-l-none shadow-none"
              aria-label="CVC"
              autoComplete="cc-csc"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(applyCvcMask(e.target.value))}
            />
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-xs">
        Combined card details input
      </p>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "input-mask-01": `import { useState, useCallback, ChangeEvent } from "react"

function useMaskedInput(mask: string, maskChar = "_") {
  const [value, setValue] = useState("")
  const applyMask = useCallback((raw: string) => {
    const digits = raw.replace(/[^a-zA-Z0-9]/g, "")
    let result = ""
    let digitIndex = 0
    for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
      if (mask[i] === maskChar) {
        result += digits[digitIndex]; digitIndex++
      } else {
        result += mask[i]
        if (digits[digitIndex] === mask[i]) digitIndex++
      }
    }
    return result
  }, [mask, maskChar])
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(applyMask(e.target.value))
  }, [applyMask])
  return { value, onChange }
}

export default function InputMask01() {
  const { value, onChange } = useMaskedInput("____ ____")
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-mask-01">Input with mask</Label>
      <Input
        id="input-mask-01"
        type="text"
        placeholder="AB12 CDE"
        inputMode="text"
        value={value}
        onChange={onChange}
      />
      <p className="text-muted-foreground text-xs">Alphanumeric mask pattern</p>
    </div>
  )
}`,
  "input-mask-02": `import { useState } from "react"

export default function InputMask02() {
  const [value, setValue] = useState("")
  const applyTimeMask = (raw: string) => {
    const digits = raw.replace(/\\D/g, "").slice(0, 6)
    if (digits.length <= 2) return digits
    if (digits.length <= 4) return \`\${digits.slice(0, 2)}:\${digits.slice(2)}\`
    return \`\${digits.slice(0, 2)}:\${digits.slice(2, 4)}:\${digits.slice(4)}\`
  }
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-mask-02">Input time</Label>
      <Input
        id="input-mask-02"
        type="text"
        placeholder="00:00:00"
        inputMode="numeric"
        value={value}
        onChange={(e) => setValue(applyTimeMask(e.target.value))}
      />
      <p className="text-muted-foreground text-xs">Time format HH:MM:SS</p>
    </div>
  )
}`,
  "input-mask-03": `import { CreditCard } from "lucide-react"
import { useState } from "react"

export default function InputMask03() {
  const [value, setValue] = useState("")
  const applyCardMask = (raw: string) => {
    const digits = raw.replace(/\\D/g, "").slice(0, 16)
    const groups = digits.match(/.{1,4}/g)
    return groups ? groups.join(" ") : ""
  }
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-mask-03">Card number</Label>
      <div className="relative">
        <Input
          id="input-mask-03"
          type="tel"
          className="peer pr-11"
          aria-label="Card number"
          autoComplete="cc-number"
          placeholder="Card number"
          value={value}
          onChange={(e) => setValue(applyCardMask(e.target.value))}
        />
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
          <CreditCard className="size-4" aria-hidden="true" />
        </div>
      </div>
      <p className="text-muted-foreground text-xs">Credit card number format</p>
    </div>
  )
}`,
  "input-mask-06": `import { CreditCard } from "lucide-react"
import { useState } from "react"

export default function InputMask06() {
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")

  const applyCardMask = (raw: string) => {
    const digits = raw.replace(/\\D/g, "").slice(0, 16)
    const groups = digits.match(/.{1,4}/g)
    return groups ? groups.join(" ") : ""
  }
  const applyExpiryMask = (raw: string) => {
    const digits = raw.replace(/\\D/g, "").slice(0, 4)
    if (digits.length <= 2) return digits
    return \`\${digits.slice(0, 2)}/\${digits.slice(2)}\`
  }
  const applyCvcMask = (raw: string) => raw.replace(/\\D/g, "").slice(0, 4)

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Card details</Label>
      <div>
        <div className="relative focus-within:z-10">
          <Input
            type="tel"
            className="peer rounded-b-none pr-9 shadow-none"
            aria-label="Card number"
            autoComplete="cc-number"
            placeholder="Card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(applyCardMask(e.target.value))}
          />
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
            <CreditCard className="size-4" aria-hidden="true" />
          </div>
        </div>
        <div className="-mt-px flex">
          <div className="min-w-0 flex-1 focus-within:z-10">
            <Input
              type="tel"
              className="rounded-t-none rounded-r-none shadow-none"
              aria-label="Expiry date"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(applyExpiryMask(e.target.value))}
            />
          </div>
          <div className="-ms-px min-w-0 flex-1 focus-within:z-10">
            <Input
              type="tel"
              className="rounded-t-none rounded-l-none shadow-none"
              aria-label="CVC"
              autoComplete="cc-csc"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(applyCvcMask(e.target.value))}
            />
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-xs">Combined card details input</p>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["input-mask-01"]!.replace("InputMask01", id.replace("input-mask-", "InputMask"));
}

// --- Variants ---
const variants = [
  { id: "input-mask-01", title: "Input Mask 1", preview: <InputMask01 /> },
  { id: "input-mask-02", title: "Input Mask 2", preview: <InputMask02 /> },
  { id: "input-mask-03", title: "Input Mask 3", preview: <InputMask03 /> },
  { id: "input-mask-04", title: "Input Mask 4", preview: <InputMask04 /> },
  { id: "input-mask-05", title: "Input Mask 5", preview: <InputMask05 /> },
  { id: "input-mask-06", title: "Input Mask 6", preview: <InputMask06 /> },
];

export default function InputMaskPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Input Mask</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Input Mask Components, featuring {variants.length} input mask
            variants designed for customizable, and interactive UI elements built with React and Tailwind CSS.
          </p>
        </div>
      </div>

      {/* Suggestion banner */}
      <div className="mb-8 flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <div className="text-sm">
          <p className="font-medium">Have any suggestions for Input Mask variants?</p>
          <p className="text-muted-foreground">Join our Discord community and share your ideas to help us improve and expand our component variants!</p>
        </div>
      </div>

      {/* Variants Grid */}
      <div className="group/grid grid grid-cols-1 divide-y divide-dashed md:grid-cols-2 md:divide-x">
        {variants.map((variant, i) => (
          <VariantCell
            key={variant.id}
            title={variant.title}
            variantId={variant.id}
            code={getCode(variant.id)}
            isLastCol={(i + 1) % 2 === 0}
          >
            {variant.preview}
          </VariantCell>
        ))}
      </div>
    </ComponentLayout>
  );
}
