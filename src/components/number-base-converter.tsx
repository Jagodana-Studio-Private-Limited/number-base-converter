"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Plus, X, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface BaseField {
  id: string;
  label: string;
  base: number;
  value: string;
  isCustom?: boolean;
}

const DEFAULT_FIELDS: BaseField[] = [
  { id: "bin", label: "Binary", base: 2, value: "" },
  { id: "oct", label: "Octal", base: 8, value: "" },
  { id: "dec", label: "Decimal", base: 10, value: "" },
  { id: "hex", label: "Hexadecimal", base: 16, value: "" },
];

function isValidForBase(str: string, base: number): boolean {
  if (!str) return true;
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, base);
  return str
    .toLowerCase()
    .split("")
    .every((c) => chars.includes(c));
}

function convertFromBase(value: string, fromBase: number): bigint | null {
  if (!value) return null;
  try {
    const clean = value.toLowerCase().replace(/^0+/, "") || "0";
    if (!isValidForBase(clean, fromBase)) return null;
    return [...clean].reduce((acc, ch) => {
      const digit = parseInt(ch, 36);
      if (digit >= fromBase) return acc;
      return acc * BigInt(fromBase) + BigInt(digit);
    }, 0n);
  } catch {
    return null;
  }
}

function convertToBase(num: bigint, toBase: number): string {
  if (num === 0n) return "0";
  const base = BigInt(toBase);
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = "";
  let n = num;
  while (n > 0n) {
    result = chars[Number(n % base)] + result;
    n = n / base;
  }
  return result;
}

export function NumberBaseConverter() {
  const [fields, setFields] = useState<BaseField[]>(DEFAULT_FIELDS);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [customBase, setCustomBase] = useState("32");
  const [error, setError] = useState<string | null>(null);

  const updateAllFields = useCallback(
    (sourceId: string, inputValue: string, currentFields: BaseField[]) => {
      const source = currentFields.find((f) => f.id === sourceId);
      if (!source) return currentFields;

      if (!inputValue) {
        return currentFields.map((f) => ({ ...f, value: "" }));
      }

      if (!isValidForBase(inputValue, source.base)) {
        setError(`Invalid character for base ${source.base}`);
        return currentFields.map((f) =>
          f.id === sourceId ? { ...f, value: inputValue } : f
        );
      }

      setError(null);
      const num = convertFromBase(inputValue, source.base);
      if (num === null) {
        return currentFields.map((f) =>
          f.id === sourceId ? { ...f, value: inputValue } : f
        );
      }

      return currentFields.map((f) => {
        if (f.id === sourceId) return { ...f, value: inputValue };
        return { ...f, value: convertToBase(num, f.base) };
      });
    },
    []
  );

  const handleChange = useCallback(
    (id: string, value: string) => {
      setActiveId(id);
      setFields((prev) => updateAllFields(id, value, prev));
    },
    [updateAllFields]
  );

  const handleCopy = useCallback(async (id: string, value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopiedId(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 1500);
  }, []);

  const addCustomField = useCallback(() => {
    const base = parseInt(customBase);
    if (isNaN(base) || base < 2 || base > 36) {
      toast.error("Base must be between 2 and 36");
      return;
    }
    if (fields.some((f) => f.base === base)) {
      toast.error(`Base ${base} already exists`);
      return;
    }
    const id = `custom-${base}`;
    const newField: BaseField = {
      id,
      label: `Base ${base}`,
      base,
      value: "",
      isCustom: true,
    };

    setFields((prev) => {
      const updated = [...prev, newField];
      // If there's a value in any existing field, compute the new field's value
      const source = prev.find((f) => f.value);
      if (source) {
        const num = convertFromBase(source.value, source.base);
        if (num !== null) {
          newField.value = convertToBase(num, base);
        }
      }
      return updated;
    });
    toast.success(`Added Base ${base}`);
  }, [customBase, fields]);

  const removeCustomField = useCallback((id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const handleClear = useCallback(() => {
    setFields((prev) => prev.map((f) => ({ ...f, value: "" })));
    setError(null);
    setActiveId(null);
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-brand" />
          <h2 className="text-lg font-semibold">Convert</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="text-xs"
        >
          Clear All
        </Button>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2"
        >
          {error}
        </motion.div>
      )}

      {/* Base Fields */}
      <div className="space-y-3">
        {fields.map((field, i) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
              activeId === field.id
                ? "border-brand/50 bg-brand/5"
                : "border-border/50 bg-muted/20"
            }`}
          >
            <div className="w-28 shrink-0">
              <div className="text-sm font-medium">{field.label}</div>
              <div className="text-xs text-muted-foreground">
                Base {field.base}
              </div>
            </div>
            <Input
              value={field.value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onFocus={() => setActiveId(field.id)}
              placeholder={`Enter base-${field.base} number`}
              className="font-mono text-sm bg-background"
              spellCheck={false}
              autoComplete="off"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCopy(field.id, field.value)}
              disabled={!field.value}
              className="shrink-0 h-9 w-9"
              title="Copy"
            >
              {copiedId === field.id ? (
                <Check className="h-4 w-4 text-brand" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            {field.isCustom && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCustomField(field.id)}
                className="shrink-0 h-9 w-9 text-muted-foreground hover:text-destructive"
                title="Remove"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add Custom Base */}
      <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-border/50 bg-muted/10">
        <div className="w-28 shrink-0">
          <div className="text-sm font-medium text-muted-foreground">
            Custom Base
          </div>
        </div>
        <Input
          type="number"
          min={2}
          max={36}
          value={customBase}
          onChange={(e) => setCustomBase(e.target.value)}
          placeholder="2–36"
          className="w-24 font-mono text-sm bg-background"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={addCustomField}
          className="gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      </div>

      {/* Quick reference */}
      <div className="text-xs text-muted-foreground/60 text-center pt-2">
        Supports integers in any base from 2 to 36. Uses BigInt for arbitrary
        precision.
      </div>
    </div>
  );
}
