import QRCode from "qrcode";

export async function generateQRCodeDataUrl(text: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 400,
      color: {
        dark: "#0284c7", // cyan/sky color to match Army of Salvation military aesthetic
        light: "#030712", // dark background
      },
    });
    return dataUrl;
  } catch (err) {
    console.error("Failed to generate QR Code:", err);
    throw err;
  }
}

export function generateServiceNumber(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `AOS-${year}-${randomNum}`;
}
