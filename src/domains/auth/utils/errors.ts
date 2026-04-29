type FirebaseLikeError = {
  code?: string;
  message?: string;
};

export function getPasswordResetErrorMessage(error: unknown): string {
  const firebaseError = error as FirebaseLikeError;

  switch (firebaseError?.code) {
    case "auth/invalid-email":
      return "Format email tidak valid.";

    case "auth/user-not-found":
      return "Email tidak terdaftar.";

    case "auth/too-many-requests":
      return "Terlalu banyak percobaan. Coba lagi beberapa saat.";

    case "auth/network-request-failed":
      return "Koneksi bermasalah. Periksa internet kamu lalu coba lagi.";

    default:
      if (error instanceof Error && error.message) {
        return error.message;
      }

      return "Gagal mengirim email reset password.";
  }
}