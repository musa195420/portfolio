'use client';

import { CheckCircle2, Send } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { InquiryLimits } from '@/constants/app_constants';
import { ApiRoutes } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { inquirySchema, toFieldErrors, type InquiryFormValues } from '@/features/inquiries/inquiry.schema';
import type { InquirySubmissionResult } from '@/types/inquiry';
import { controlClasses, Field, Fieldset, Select } from './FormControls';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const strings = AppStrings.inquiry;

/** Page the visitor came from (`?from=` set by CTAs), else the current path. */
function currentSourcePage(): string {
  const from = new URLSearchParams(window.location.search).get('from');
  return from && from.startsWith('/') ? from.slice(0, 300) : window.location.pathname;
}

function readForm(form: HTMLFormElement, startedAt: number): InquiryFormValues {
  const data = new FormData(form);
  const text = (key: string) => String(data.get(key) ?? '');
  return {
    name: text('name'),
    email: text('email'),
    phone: text('phone'),
    company: text('company'),
    projectTitle: text('projectTitle'),
    projectType: text('projectType'),
    budgetRange: text('budgetRange'),
    timeline: text('timeline'),
    ideaSummary: text('ideaSummary'),
    requiredServices: data.getAll('requiredServices').map(String) as InquiryFormValues['requiredServices'],
    preferredContactMethod: text('preferredContactMethod'),
    sourcePage: currentSourcePage(),
    website: text('website'),
    startedAt,
  } as InquiryFormValues;
}

export function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (status === 'idle') startedAt.current = Date.now();
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const focusFirstError = (fieldErrors: Record<string, string>) => {
    const first = Object.keys(fieldErrors)[0];
    const element = first ? formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`) : null;
    element?.focus();
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = readForm(event.currentTarget, startedAt.current);
    const parsed = inquirySchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus('error');
      setMessage(strings.errors.invalid);
      focusFirstError(fieldErrors);
      return;
    }

    setErrors({});
    setMessage(null);
    setStatus('submitting');
    try {
      const response = await fetch(ApiRoutes.projectInquiries, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = (await response.json().catch(() => null)) as InquirySubmissionResult | null;
      if (response.ok && result?.ok) {
        setStatus('success');
        return;
      }
      const fieldErrors = result && !result.ok ? (result.fieldErrors ?? {}) : {};
      setErrors(fieldErrors as Record<string, string>);
      setStatus('error');
      setMessage(result && !result.ok ? result.error : strings.errors.generic);
      focusFirstError(fieldErrors as Record<string, string>);
    } catch {
      setStatus('error');
      setMessage(strings.errors.network);
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center gap-4 rounded-panel border border-line bg-surface px-6 py-14 text-center shadow-card focus:outline-none"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-accent-wash text-accent">
          <CheckCircle2 aria-hidden="true" className="size-7" />
        </span>
        <h2 className="font-display text-2xl font-bold">{strings.successTitle}</h2>
        <p className="max-w-md text-ink-muted">{strings.successBody}</p>
        <Button variant="secondary" onClick={() => setStatus('idle')}>
          {strings.sendAnother}
        </Button>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-busy={submitting}
      className="space-y-8 rounded-panel border border-line bg-surface p-5 shadow-card sm:p-8"
    >
      <div aria-live="assertive">
        {message ? (
          <p role="alert" className="rounded-xl border border-danger/25 bg-danger/5 px-4 py-3 text-sm font-medium text-danger">
            {message}
          </p>
        ) : null}
      </div>

      <Fieldset legend={strings.sections.about}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="name" label={strings.fields.name} error={errors.name}>
            {(aria) => (
              <input {...aria} name="name" autoComplete="name" required maxLength={InquiryLimits.nameMax} placeholder={strings.placeholders.name} className={controlClasses} />
            )}
          </Field>
          <Field name="email" label={strings.fields.email} error={errors.email}>
            {(aria) => (
              <input {...aria} name="email" type="email" autoComplete="email" required maxLength={InquiryLimits.emailMax} placeholder={strings.placeholders.email} className={controlClasses} />
            )}
          </Field>
          <Field name="phone" label={strings.fields.phone} optional error={errors.phone}>
            {(aria) => (
              <input {...aria} name="phone" type="tel" autoComplete="tel" maxLength={InquiryLimits.phoneMax} placeholder={strings.placeholders.phone} className={controlClasses} />
            )}
          </Field>
          <Field name="company" label={strings.fields.company} optional error={errors.company}>
            {(aria) => (
              <input {...aria} name="company" autoComplete="organization" maxLength={InquiryLimits.companyMax} placeholder={strings.placeholders.company} className={controlClasses} />
            )}
          </Field>
        </div>
      </Fieldset>

      <Fieldset legend={strings.sections.project}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="projectTitle" label={strings.fields.projectTitle} optional error={errors.projectTitle}>
            {(aria) => (
              <input {...aria} name="projectTitle" maxLength={InquiryLimits.projectTitleMax} placeholder={strings.placeholders.projectTitle} className={controlClasses} />
            )}
          </Field>
          <Field name="projectType" label={strings.fields.projectType} optional error={errors.projectType}>
            {(aria) => (
              <Select {...aria} name="projectType" options={strings.options.projectType} placeholder={strings.placeholders.select} />
            )}
          </Field>
        </div>
        <Field name="ideaSummary" label={strings.fields.ideaSummary} error={errors.ideaSummary}>
          {(aria) => (
            <textarea
              {...aria}
              name="ideaSummary"
              required
              rows={6}
              minLength={InquiryLimits.ideaMin}
              maxLength={InquiryLimits.ideaMax}
              placeholder={strings.placeholders.ideaSummary}
              className={controlClasses}
            />
          )}
        </Field>
        <fieldset aria-describedby={errors.requiredServices ? 'inquiry-requiredServices-error' : undefined}>
          <legend className="mb-2 text-sm font-medium text-ink-soft">
            {strings.fields.requiredServices}
            <span className="ml-1 font-normal text-ink-faint">{strings.optional}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {strings.options.requiredServices.map((service) => (
              <label key={service} className="cursor-pointer">
                <input type="checkbox" name="requiredServices" value={service} className="peer sr-only" />
                <span className="inline-flex rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-ink-muted transition peer-checked:border-accent peer-checked:bg-accent-wash peer-checked:text-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                  {service}
                </span>
              </label>
            ))}
          </div>
          {errors.requiredServices ? (
            <p id="inquiry-requiredServices-error" className="mt-1.5 text-xs font-medium text-danger">
              {errors.requiredServices}
            </p>
          ) : null}
        </fieldset>
      </Fieldset>

      <Fieldset legend={strings.sections.logistics}>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field name="budgetRange" label={strings.fields.budgetRange} optional error={errors.budgetRange}>
            {(aria) => (
              <Select {...aria} name="budgetRange" options={strings.options.budgetRange} placeholder={strings.placeholders.select} />
            )}
          </Field>
          <Field name="timeline" label={strings.fields.timeline} optional error={errors.timeline}>
            {(aria) => (
              <Select {...aria} name="timeline" options={strings.options.timeline} placeholder={strings.placeholders.select} />
            )}
          </Field>
          <Field name="preferredContactMethod" label={strings.fields.preferredContactMethod} optional error={errors.preferredContactMethod}>
            {(aria) => (
              <Select {...aria} name="preferredContactMethod" options={strings.options.preferredContactMethod} placeholder={strings.placeholders.select} />
            )}
          </Field>
        </div>
      </Fieldset>

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="inquiry-website">{strings.fields.website}</label>
        <input id="inquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full sm:w-auto"
        icon={<Send aria-hidden="true" className="size-5" />}
      >
        {submitting ? strings.submitting : strings.submit}
      </Button>
    </form>
  );
}
