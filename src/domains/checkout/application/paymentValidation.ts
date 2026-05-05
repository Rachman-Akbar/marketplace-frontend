import type {
  ManualTransferFormValue,
  ValidationErrors,
} from "@/domains/checkout/types";

export function validateManualTransfer(
  manualTransfer: ManualTransferFormValue,
): ValidationErrors {
  const errors: Record<string, string[]> = {};

  if (!manualTransfer.bank_destination) {
    errors["manual_transfer.bank_destination"] = ["Bank tujuan wajib dipilih."];
  }

  if (!manualTransfer.sender_account_name.trim()) {
    errors["manual_transfer.sender_account_name"] = [
      "Nama pemilik rekening wajib diisi.",
    ];
  }

  if (!manualTransfer.sender_account_number.trim()) {
    errors["manual_transfer.sender_account_number"] = [
      "Nomor rekening pengirim wajib diisi.",
    ];
  }

  if (!manualTransfer.transfer_date) {
    errors["manual_transfer.transfer_date"] = ["Tanggal transfer wajib diisi."];
  }

  if (!manualTransfer.transfer_proof) {
    errors["manual_transfer.transfer_proof"] = [
      "Bukti transfer wajib diunggah.",
    ];
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export function mergeValidationErrors(
  first: ValidationErrors,
  second: ValidationErrors,
): ValidationErrors {
  if (!first && !second) return null;

  return {
    ...(first ?? {}),
    ...(second ?? {}),
  };
}