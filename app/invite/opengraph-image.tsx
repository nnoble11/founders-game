import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Founders Game invitation card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const cardBack = await readFile(
    path.join(process.cwd(), "public", "invite-card-back.png"),
  );
  const cardBackUrl = `data:image/png;base64,${cardBack.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#0d120f",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <img
        alt="Face-down Founders Game invitation card"
        height="630"
        src={cardBackUrl}
        style={{
          height: "630px",
          objectFit: "contain",
          width: "630px",
        }}
        width="630"
      />
    </div>,
    size,
  );
}
