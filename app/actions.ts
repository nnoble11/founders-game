"use server";

export type ApplicationState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const ROLES = ["founder", "investor", "operator"] as const;
type Role = (typeof ROLES)[number];

function text(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitApplication(
  _prev: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  // Honeypot: real users never see or fill this field.
  if (text(formData, "website")) {
    return { status: "success" };
  }

  const fullName = text(formData, "fullName");
  const email = text(formData, "email");
  const linkedin = text(formData, "linkedin");
  const city = text(formData, "city");
  const role = text(formData, "role") as Role;

  if (!fullName || !email || !linkedin || !city) {
    return {
      status: "error",
      message: "Please fill in your name, email, LinkedIn, and city.",
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email doesn't look right." };
  }
  if (!ROLES.includes(role)) {
    return { status: "error", message: "Please choose a role." };
  }

  if (role === "founder") {
    const company = text(formData, "founderCompany");
    const oneLiner = text(formData, "founderOneLiner");
    if (!company || !oneLiner) {
      return {
        status: "error",
        message: "Please add your company name and one-line description.",
      };
    }
  } else if (role === "investor") {
    const firm = text(formData, "investorFirm");
    if (!firm) {
      return {
        status: "error",
        message: 'Please add your firm (or "angel").',
      };
    }
  } else {
    const company = text(formData, "operatorCompany");
    const operatorRole = text(formData, "operatorRole");
    if (!company || !operatorRole) {
      return {
        status: "error",
        message: "Please add your company and role.",
      };
    }
  }

  // The form is intentionally dormant and no submission data is persisted.
  return {
    status: "error",
    message: "Applications are not open right now.",
  };
}
