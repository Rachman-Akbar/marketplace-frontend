import { GoogleAuthButton } from "./GoogleAuthButton";

type SocialAuthSectionProps = {
  googleLoadingText: string;
  googleErrorMessage: string;
};

export function SocialAuthSection({
  googleLoadingText,
  googleErrorMessage,
}: SocialAuthSectionProps) {
  return (
    <>
      <div className="relative py-1">
        <div className="h-px bg-slate-200" />

        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <GoogleAuthButton
          loadingText={googleLoadingText}
          errorMessage={googleErrorMessage}
        />

        <button
          className="rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-400"
          type="button"
          disabled
        >
          Apple
        </button>
      </div>
    </>
  );
}