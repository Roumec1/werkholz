import type { Locale } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";
import PageHeader from "./PageHeader";
import InquiryForm from "../InquiryForm";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function ContactPage({ locale, dict }: Props) {
  return (
    <>
      <PageHeader
        eyebrow={dict.nav.inquiry}
        title={dict.form.title}
        subtitle={dict.form.subtitle}
      />

      <section className="pb-32">
        <div className="container-w">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <InquiryForm locale={locale} dict={dict} />
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-md bg-cream p-8 border border-stone-200/60">
                  <h3 className="font-display text-2xl text-ink">
                    {dict.contact.directTitle}
                  </h3>
                  <p className="mt-3 text-stone-600 leading-relaxed text-sm">
                    {dict.contact.directSubtitle}
                  </p>

                  <div className="mt-6 space-y-3 text-sm">
                    <a
                      href="mailto:hello@werkholz.de"
                      className="flex items-center gap-3 text-ink hover:text-oak-500 transition-colors"
                    >
                      <span className="w-9 h-9 rounded-full bg-bone flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 4l5 3 5-3M2 4v6a1 1 0 001 1h8a1 1 0 001-1V4M2 4a1 1 0 011-1h8a1 1 0 011 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      hello@werkholz.de
                    </a>

                    <a
                      href="https://wa.me/491700000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-ink hover:text-oak-500 transition-colors"
                    >
                      <span className="w-9 h-9 rounded-full bg-bone flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                        </svg>
                      </span>
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="rounded-md bg-ink text-bone p-8">
                  <p className="eyebrow text-stone-400">
                    {dict.contact.workshopLabel}
                  </p>
                  <p className="mt-3 font-display text-xl leading-snug">
                    {dict.contact.workshopText}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
