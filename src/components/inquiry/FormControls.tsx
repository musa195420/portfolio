import { ChevronDown } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { AppStrings } from '@/constants/app_strings';
import { cn } from '@/utils/cn';

export const controlClasses =
  'w-full rounded-xl border border-line bg-surface px-4 py-3 text-[0.95rem] text-ink shadow-soft transition placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent-soft aria-invalid:border-danger aria-invalid:ring-danger/15';

type FieldProps = {
  name: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: (props: { id: string; 'aria-invalid'?: true; 'aria-describedby'?: string }) => ReactNode;
};

/** Label + control + error message with the right ARIA wiring. */
export function Field({ name, label, optional, error, className, children }: FieldProps) {
  const id = `inquiry-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink-soft">
        {label}
        {optional ? <span className="ml-1 font-normal text-ink-faint">{AppStrings.inquiry.optional}</span> : null}
      </label>
      {children({ id, ...(error ? { 'aria-invalid': true, 'aria-describedby': errorId } : {}) })}
      {error ? (
        <p id={errorId} className="text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type SelectProps = ComponentPropsWithoutRef<'select'> & { options: readonly string[]; placeholder: string };

export function Select({ options, placeholder, className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select className={cn(controlClasses, 'appearance-none pr-10', className)} defaultValue="" {...props}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-faint"
      />
    </div>
  );
}

export function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-4 flex items-center gap-2.5 font-display text-base font-semibold">
        <span aria-hidden="true" className="h-4 w-[3px] rounded-full bg-accent" />
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}
