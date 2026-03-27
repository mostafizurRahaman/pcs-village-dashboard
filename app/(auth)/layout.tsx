import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* ── Left panel: full-height image ───────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="/auth-banner.png"
          alt="PCS Village — military base network illustration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/60 flex flex-col justify-end p-10">
          <h2
            className="text-primary-foreground text-3xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-lexend, sans-serif)" }}
          >
            PCS Village Admin
          </h2>
          <p className="text-primary-foreground/80 mt-2 text-base">
            Manage military bases, personnel, and community resources — all in
            one place.
          </p>
        </div>
      </div>

      {/* ── Right panel: form area — uses card surface ───────── */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-card px-6 py-12">
        <div className="w-full max-w-[440px]">{children}</div>
      </div>
    </div>
  )
}
