import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="de">
      <body className="bg-bone text-ink min-h-screen flex flex-col">
        <header className="container-w py-6">
          <Link href="/" className="font-display text-xl text-ink">
            WERKHOLZ
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            {/* Stylized 404 in wood-grain */}
            <div className="relative inline-flex">
              <span
                className="font-display text-[120px] sm:text-[160px] leading-none"
                style={{
                  background: "linear-gradient(135deg, #C4A878 0%, #A88550 50%, #6F5430 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                404
              </span>
            </div>

            <h1 className="mt-2 font-display text-2xl sm:text-3xl text-ink">
              Diese Seite gibt es nicht.
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              This page doesn&apos;t exist. · Tato stránka neexistuje.
            </p>

            <p className="mt-8 text-stone-600 leading-relaxed">
              Vielleicht ist das gesuchte Stück bereits verkauft — oder die URL hat sich geändert.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <Link href="/de" className="btn-primary">
                Zur Startseite
              </Link>
              <Link href="/de/aktuelle-stuecke" className="btn-secondary">
                Aktuelle Stücke
              </Link>
            </div>

            <p className="mt-8 text-xs text-stone-500">
              <Link href="/en" className="underline underline-offset-2">English</Link>
              {" · "}
              <Link href="/cs" className="underline underline-offset-2">Česky</Link>
            </p>
          </div>
        </main>

        <footer className="container-w py-6 text-xs text-stone-500 text-center">
          &copy; {new Date().getFullYear()} WERKHOLZ
        </footer>
      </body>
    </html>
  );
}
