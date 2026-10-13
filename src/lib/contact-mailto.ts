export interface ContactDraft {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function buildContactMailto(recipient: string, draft: ContactDraft) {
  const body = `${draft.message.trim()}\n\nFrom: ${draft.name.trim()} <${draft.email.trim()}>`;
  const parameters = new URLSearchParams({
    subject: draft.subject.trim(),
    body,
  });

  return `mailto:${recipient}?${parameters.toString()}`;
}