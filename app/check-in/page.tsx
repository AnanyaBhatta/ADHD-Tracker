import { CheckInForm } from "@/components/check-in/CheckInForm";

export default function CheckInPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-3xl text-moss">Daily check-in</h1>
      <p className="mt-2 text-sm text-ink/60">
        Takes about a minute. Saved privately in your browser — nothing leaves your device.
      </p>
      <div className="mt-8">
        <CheckInForm />
      </div>
    </main>
  );
}