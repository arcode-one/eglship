import { ImageResponse } from "next/og";

export const alt = "EGLSHIP — доставка товаров из США";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        color: "#ffffff",
        background: "linear-gradient(135deg, #292536 0%, #504567 58%, #e9551b 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            color: "#e9551b",
            background: "#ffffff",
            fontSize: 48,
            fontWeight: 900,
          }}
        >
          E
        </div>
        <div style={{ fontSize: 74, fontWeight: 900, letterSpacing: -2 }}>EGLSHIP</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ maxWidth: 900, fontSize: 58, fontWeight: 800, lineHeight: 1.05 }}>
          USA DELIVERY &amp; FULFILLMENT
        </div>
        <div style={{ fontSize: 28, opacity: 0.88 }}>Reliable logistics for your international purchases</div>
      </div>
    </div>,
    size,
  );
}
