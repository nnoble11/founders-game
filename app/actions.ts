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
    return { status: "error", message: "Please fill in your name, email, LinkedIn, and city." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email doesn't look right." };
  }
  if (!ROLES.includes(role)) {
    return { status: "error", message: "Please choose a role." };
  }

  // Every field maps to a clean column — this data feeds curation.
  const fields: Record<string, string> = {
    "Full name": fullName,
    Email: email,
    LinkedIn: linkedin,
    City: city,
    Role: role,
  };

  if (role === "founder") {
    const company = text(formData, "founderCompany");
    const oneLiner = text(formData, "founderOneLiner");
    if (!company || !oneLiner) {
      return { status: "error", message: "Please add your company name and one-line description." };
    }
    fields["Company"] = company;
    fields["Company URL"] = text(formData, "founderCompanyUrl");
    fields["One-liner"] = oneLiner;
    fields["Stage"] = text(formData, "founderStage");
    fields["Student founder"] = text(formData, "founderStudent");
    fields["Raising"] = text(formData, "founderRaising");
    fields["Round size"] = text(formData, "founderRoundSize");
    fields["Table value"] = text(formData, "founderTableValue");
  } else if (role === "investor") {
    const firm = text(formData, "investorFirm");
    if (!firm) {
      return { status: "error", message: "Please add your firm (or “angel”)." };
    }
    fields["Firm"] = firm;
    fields["Firm URL"] = text(formData, "investorFirmUrl");
    fields["Check size"] = text(formData, "investorCheckSize");
    fields["Stage focus"] = formData.getAll("investorStageFocus").join(", ");
    fields["Sectors"] = formData.getAll("investorSectors").join(", ");
    fields["Actively deploying"] = text(formData, "investorDeploying");
  } else {
    const company = text(formData, "operatorCompany");
    const operatorRole = text(formData, "operatorRole");
    if (!company || !operatorRole) {
      return { status: "error", message: "Please add your company and role." };
    }
    fields["Company"] = company;
    fields["Operator role"] = operatorRole;
    fields["What they bring"] = text(formData, "operatorBrings");
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME ?? "Applications";

  // Backend decision is deferred: without credentials, log and accept so the
  // site works end to end. Swap in Airtable by setting the env vars.
  if (!apiKey || !baseId) {
    console.warn("[application] Airtable not configured; received:", fields);
    return { status: "success" };
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records: [{ fields }], typecast: true }),
      },
    );
    if (!res.ok) {
      console.error("[application] Airtable error:", res.status, await res.text());
      return { status: "error", message: "Something went wrong on our end. Please try again." };
    }
  } catch (err) {
    console.error("[application] Airtable request failed:", err);
    return { status: "error", message: "Something went wrong on our end. Please try again." };
  }

  return { status: "success" };
}
