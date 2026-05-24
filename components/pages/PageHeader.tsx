interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="pt-32 sm:pt-40 lg:pt-44 pb-12 sm:pb-16">
      <div className="container-w">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 font-display font-light text-display-lg text-ink text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg sm:text-xl text-stone-600 leading-relaxed max-w-prose">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
