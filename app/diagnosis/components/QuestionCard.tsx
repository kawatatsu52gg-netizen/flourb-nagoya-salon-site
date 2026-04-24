"use client";

import { type Question } from "@/app/diagnosis/lib/questions";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  value?: string | string[];
  onSingleSelect: (value: string) => void;
  onMultiToggle: (value: string) => void;
  onTextChange: (value: string) => void;
}

export function QuestionCard({ question, value, onSingleSelect, onMultiToggle, onTextChange }: QuestionCardProps) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <article className="glass-card min-h-[360px] p-6 md:p-10">
      <h2 className="font-serif text-2xl leading-[1.6] md:text-3xl">{question.title}</h2>
      {question.subtitle && <p className="mt-3 text-sm text-foreground/65">{question.subtitle}</p>}

      {question.type !== "text" && (
        <div className="mt-8 grid gap-3">
          {question.options?.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => (question.type === "single" ? onSingleSelect(option.value) : onMultiToggle(option.value))}
                className={cn(
                  "w-full rounded-2xl border px-5 py-4 text-left text-sm leading-relaxed transition-all md:text-base",
                  isSelected
                    ? "border-rose-700 bg-rose-100/80 text-rose-900"
                    : "border-rose-200/80 bg-white text-foreground/80 hover:border-rose-400 hover:bg-rose-50/40"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "text" && (
        <div className="mt-8">
          <textarea
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onTextChange(e.target.value.slice(0, question.maxLength ?? 200))}
            rows={7}
            placeholder={question.placeholder}
            className="w-full rounded-2xl border border-rose-200/80 bg-white px-4 py-4 text-sm leading-relaxed text-foreground outline-none transition focus:border-rose-700 focus:ring-2 focus:ring-rose-200 md:text-base"
          />
          {question.maxLength && (
            <p className="mt-2 text-right text-xs text-foreground/55">
              {typeof value === "string" ? value.length : 0}/{question.maxLength}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
