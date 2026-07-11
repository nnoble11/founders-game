"use client";

import { useActionState, useState } from "react";
import { submitApplication, type ApplicationState } from "@/app/actions";

const initialState: ApplicationState = { status: "idle" };

const STAGES = ["Pre-seed", "Seed", "Series A", "Series B+", "Bootstrapped"];
const CHECK_SIZES = ["Up to $100k", "$100k–$500k", "$500k–$2M", "$2M+"];
const STAGE_FOCUS = ["Pre-seed", "Seed", "Series A", "Series B+"];
const SECTORS = [
  "AI / ML",
  "B2B SaaS",
  "Consumer",
  "Fintech",
  "Health",
  "Deep tech",
  "Climate",
  "Other",
];

type Role = "" | "founder" | "investor" | "operator";

export default function ApplicationForm() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);
  const [role, setRole] = useState<Role>("");
  const [raising, setRaising] = useState(false);

  if (state.status === "success") {
    return (
      <div className="border border-bone/15 p-8 md:p-12" role="status">
        <h3 className="display text-3xl md:text-4xl">Application received.</h3>
        <p className="mt-4 max-w-md text-bone/60">
          Every table is curated, so seats take time. If there&apos;s a table
          where you belong, we&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="max-w-2xl">
      {/* Honeypot — hidden from real users and screen readers */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="fullName">
            Full name
          </label>
          <input className="field-input" id="fullName" name="fullName" autoComplete="name" required />
        </div>
        <div>
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input className="field-input" id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label className="field-label" htmlFor="linkedin">
            LinkedIn URL
          </label>
          <input className="field-input" id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/…" required />
        </div>
        <div>
          <label className="field-label" htmlFor="city">
            City
          </label>
          <input className="field-input" id="city" name="city" autoComplete="address-level2" required />
        </div>
      </div>

      <fieldset className="mt-12">
        <legend className="field-label">I am a</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {(["founder", "investor", "operator"] as const).map((r) => (
            <label key={r} className="choice capitalize">
              <input
                type="radio"
                name="role"
                value={r}
                checked={role === r}
                onChange={() => setRole(r)}
                required
              />
              {r}
            </label>
          ))}
        </div>
      </fieldset>

      {role === "founder" && (
        <div className="mt-12 grid gap-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="founderCompany">
                Company name
              </label>
              <input className="field-input" id="founderCompany" name="founderCompany" required />
            </div>
            <div>
              <label className="field-label" htmlFor="founderCompanyUrl">
                Company URL
              </label>
              <input className="field-input" id="founderCompanyUrl" name="founderCompanyUrl" type="url" placeholder="https://" />
            </div>
          </div>
          <div>
            <label className="field-label" htmlFor="founderOneLiner">
              One-line description
            </label>
            <input className="field-input" id="founderOneLiner" name="founderOneLiner" maxLength={140} required />
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="founderStage">
                Stage
              </label>
              <select className="field-input" id="founderStage" name="founderStage" defaultValue="" required>
                <option value="" disabled>
                  Select stage
                </option>
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <fieldset>
              <legend className="field-label">Student founder?</legend>
              <div className="mt-2 flex gap-3">
                {["Yes", "No"].map((v) => (
                  <label key={v} className="choice">
                    <input type="radio" name="founderStudent" value={v} required />
                    {v}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <fieldset>
            <legend className="field-label">Currently raising?</legend>
            <div className="mt-2 flex gap-3">
              {["Yes", "No"].map((v) => (
                <label key={v} className="choice">
                  <input
                    type="radio"
                    name="founderRaising"
                    value={v}
                    onChange={() => setRaising(v === "Yes")}
                    required
                  />
                  {v}
                </label>
              ))}
            </div>
          </fieldset>
          {raising && (
            <div>
              <label className="field-label" htmlFor="founderRoundSize">
                Round size
              </label>
              <input className="field-input" id="founderRoundSize" name="founderRoundSize" placeholder="e.g. $1.5M seed" />
            </div>
          )}
          <div>
            <label className="field-label" htmlFor="founderTableValue">
              What would make this table valuable for you? One sentence.
            </label>
            <input className="field-input" id="founderTableValue" name="founderTableValue" maxLength={200} required />
          </div>
        </div>
      )}

      {role === "investor" && (
        <div className="mt-12 grid gap-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="investorFirm">
                Firm (or “angel”)
              </label>
              <input className="field-input" id="investorFirm" name="investorFirm" required />
            </div>
            <div>
              <label className="field-label" htmlFor="investorFirmUrl">
                Firm URL
              </label>
              <input className="field-input" id="investorFirmUrl" name="investorFirmUrl" type="url" placeholder="https://" />
            </div>
          </div>
          <div>
            <label className="field-label" htmlFor="investorCheckSize">
              Check size
            </label>
            <select className="field-input" id="investorCheckSize" name="investorCheckSize" defaultValue="" required>
              <option value="" disabled>
                Select range
              </option>
              {CHECK_SIZES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className="field-label">Stage focus</legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {STAGE_FOCUS.map((s) => (
                <label key={s} className="choice">
                  <input type="checkbox" name="investorStageFocus" value={s} />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="field-label">Sectors of interest</legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {SECTORS.map((s) => (
                <label key={s} className="choice">
                  <input type="checkbox" name="investorSectors" value={s} />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="field-label">Actively deploying?</legend>
            <div className="mt-2 flex gap-3">
              {["Yes", "No"].map((v) => (
                <label key={v} className="choice">
                  <input type="radio" name="investorDeploying" value={v} required />
                  {v}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {role === "operator" && (
        <div className="mt-12 grid gap-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="operatorCompany">
                Company
              </label>
              <input className="field-input" id="operatorCompany" name="operatorCompany" required />
            </div>
            <div>
              <label className="field-label" htmlFor="operatorRole">
                Role
              </label>
              <input className="field-input" id="operatorRole" name="operatorRole" required />
            </div>
          </div>
          <div>
            <label className="field-label" htmlFor="operatorBrings">
              What do you bring to a table? One sentence.
            </label>
            <input className="field-input" id="operatorBrings" name="operatorBrings" maxLength={200} required />
          </div>
        </div>
      )}

      {state.status === "error" && (
        <p className="mt-8 text-sm text-[#e0a1a1]" role="alert">
          {state.message}
        </p>
      )}

      <button type="submit" className="btn-primary mt-12" disabled={pending}>
        {pending ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
