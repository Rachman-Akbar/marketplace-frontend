export type MidtransSnapResult = {
  order_id?: string;
  status_code?: string;
  transaction_status?: string;
  payment_type?: string;
  transaction_id?: string;
  gross_amount?: string;
  [key: string]: unknown;
};

export type MidtransSnapCallbacks = {
  onSuccess?: (result: MidtransSnapResult) => void;
  onPending?: (result: MidtransSnapResult) => void;
  onError?: (result: MidtransSnapResult) => void;
  onClose?: () => void;
};

declare global {
  interface Window {
    snap?: {
      pay: (token: string, callbacks?: MidtransSnapCallbacks) => void;
      embed?: (
        token: string,
        options: MidtransSnapCallbacks & { embedId: string },
      ) => void;
    };
  }
}

const SNAP_SCRIPT_ID = "midtrans-snap-js";

function getMidtransClientKey(): string {
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

  if (!clientKey) {
    throw new Error("NEXT_PUBLIC_MIDTRANS_CLIENT_KEY belum dikonfigurasi.");
  }

  return clientKey;
}

function getMidtransSnapScriptUrl(): string {
  const isProduction =
    process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";

  return isProduction
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";
}

export function loadMidtransSnapScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("Midtrans Snap hanya bisa dijalankan di browser."),
    );
  }

  if (window.snap) {
    return Promise.resolve();
  }

  const existingScript = document.getElementById(
    SNAP_SCRIPT_ID,
  ) as HTMLScriptElement | null;

  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Gagal memuat Midtrans Snap JS.")),
        { once: true },
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.id = SNAP_SCRIPT_ID;
    script.type = "text/javascript";
    script.src = getMidtransSnapScriptUrl();
    script.async = true;
    script.setAttribute("data-client-key", getMidtransClientKey());

    script.onload = () => {
      if (!window.snap) {
        reject(new Error("Midtrans Snap JS berhasil dimuat, tetapi window.snap tidak tersedia."));
        return;
      }

      resolve();
    };

    script.onerror = () => {
      reject(new Error("Gagal memuat Midtrans Snap JS."));
    };

    document.body.appendChild(script);
  });
}

export async function payWithMidtransSnap(
  token: string,
  callbacks: MidtransSnapCallbacks,
): Promise<void> {
  await loadMidtransSnapScript();

  if (!window.snap) {
    throw new Error("Midtrans Snap belum tersedia.");
  }

  window.snap.pay(token, callbacks);
}