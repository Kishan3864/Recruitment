import type { ApplyFormCopy, ContactFormCopy, LeadFormCopy } from "@/types/pages";

export const applyFormCopy: ApplyFormCopy = {
  title: "Apply for this role",
  subtitle:
    "Share your details and our consultant for this role will get back to you within 2 working days.",
  fields: {
    fullName: { label: "Full name", placeholder: "e.g. Rahul Sharma" },
    email: { label: "Email address", placeholder: "you@example.com" },
    phone: { label: "Phone number", placeholder: "+91 98XXXXXXXX" },
    location: { label: "Current city", placeholder: "e.g. Bengaluru" },
    experienceYears: { label: "Total experience (years)", placeholder: "e.g. 5" },
    currentRole: { label: "Current role & company", placeholder: "e.g. Senior Engineer at Acme" },
    expectedSalary: { label: "Expected salary (LPA)", placeholder: "e.g. 24" },
    noticePeriod: { label: "Notice period" },
    linkedin: { label: "LinkedIn profile (optional)", placeholder: "linkedin.com/in/yourname" },
    resume: {
      label: "Resume",
      help: "PDF, DOC or DOCX, up to 5 MB.",
    },
    coverNote: {
      label: "Anything you'd like us to know? (optional)",
      placeholder: "A short note about what you're looking for…",
    },
  },
  noticePeriodOptions: [
    "Immediate",
    "15 days or less",
    "30 days",
    "60 days",
    "90 days",
    "Serving notice",
  ],
  consent:
    "By submitting, you consent to Northbridge Talent storing your details to contact you about relevant opportunities. Your profile is never shared with an employer without your explicit approval. See our Privacy Policy.",
  messages: {
    submit: "Submit application",
    submitting: "Submitting…",
    successTitle: "Application received!",
    successBody:
      "Thank you — your application is with our consultant for this role. If your profile matches, we'll call you within 2 working days. Either way, you'll hear from us.",
    errorTitle: "Something went wrong",
    errorBody:
      "We couldn't submit your application. Please try again, or email us your resume directly.",
    fieldInvalid: "Please check this field.",
    resumeInvalid: "Please attach a PDF, DOC or DOCX file up to 5 MB.",
  },
};

export const registerFormCopy: ApplyFormCopy = {
  ...applyFormCopy,
  title: "Submit your resume",
  subtitle:
    "Not seeing the right role yet? Join our verified talent network and we'll reach out when a genuinely matching role opens.",
  messages: {
    ...applyFormCopy.messages,
    successTitle: "You're in our network!",
    successBody:
      "Thank you — a consultant from the relevant sector desk will review your profile within 2 working days and reach out as soon as a matching role opens.",
  },
};

export const leadFormCopy: LeadFormCopy = {
  title: "Tell us who you're hiring",
  subtitle:
    "Share your requirement and a sector-specialist consultant will call you back within 4 business hours.",
  fields: {
    company: { label: "Company name", placeholder: "e.g. Acme Technologies" },
    fullName: { label: "Your name", placeholder: "e.g. Neha Gupta" },
    email: { label: "Work email", placeholder: "you@company.com" },
    phone: { label: "Phone number", placeholder: "+91 98XXXXXXXX" },
    hiringFor: {
      label: "Roles you're hiring for",
      placeholder: "e.g. 2 backend engineers, 1 finance manager",
    },
    headcount: { label: "Number of positions" },
    message: {
      label: "Anything else we should know? (optional)",
      placeholder: "Timelines, locations, must-haves…",
    },
  },
  headcountOptions: ["1–2", "3–5", "6–15", "16–50", "50+"],
  consent:
    "By submitting, you agree to be contacted by Northbridge Talent about your hiring requirement. We never share your details with third parties.",
  messages: {
    submit: "Request a callback",
    submitting: "Sending…",
    successTitle: "Request received!",
    successBody:
      "Thank you — a sector-specialist consultant will call you within 4 business hours (Mon–Sat, 9:00–19:00 IST).",
    errorTitle: "Something went wrong",
    errorBody: "We couldn't send your request. Please try again or call us directly.",
    fieldInvalid: "Please check this field.",
    resumeInvalid: "Please attach a PDF, DOC or DOCX file up to 5 MB.",
  },
};

export const contactFormCopy: ContactFormCopy = {
  title: "Send us a message",
  subtitle: "We reply to every message within one working day.",
  fields: {
    fullName: { label: "Your name", placeholder: "e.g. Amit Verma" },
    email: { label: "Email address", placeholder: "you@example.com" },
    subject: { label: "Subject", placeholder: "How can we help?" },
    message: { label: "Message", placeholder: "Tell us a little about what you need…" },
  },
  messages: {
    submit: "Send message",
    submitting: "Sending…",
    successTitle: "Message sent!",
    successBody: "Thank you for reaching out — we'll reply within one working day.",
    errorTitle: "Something went wrong",
    errorBody: "We couldn't send your message. Please try again or email us directly.",
    fieldInvalid: "Please check this field.",
    resumeInvalid: "Please attach a PDF, DOC or DOCX file up to 5 MB.",
  },
};
