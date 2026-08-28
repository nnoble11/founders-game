import InvitationExperience from "@/components/InvitationExperience";

const DEFAULT_LUMA_URL = "https://luma.com/3zvkzpzc";

function httpUrl(value: string | undefined) {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

export default function InvitePage() {
  return (
    <InvitationExperience
      cardFaceUrl={
        httpUrl(process.env.INVITE_CARD_FACE_URL) ?? "/invite-card-face.png"
      }
      lumaUrl={
        httpUrl(process.env.NEXT_PUBLIC_LUMA_URL) ?? DEFAULT_LUMA_URL
      }
    />
  );
}
