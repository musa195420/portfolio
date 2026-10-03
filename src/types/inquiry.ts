export type InquiryFieldErrors = Partial<Record<string, string>>;

export type InquirySubmissionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: InquiryFieldErrors };
