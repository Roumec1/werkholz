interface Props {
  variant?: "wave" | "grain" | "minimal";
  color?: "stone" | "oak" | "ink";
}

export default function SectionDivider({ variant = "minimal", color = "stone" }: Props) {
  if (variant === "minimal") {
    return (
      <div className="container-w">
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="h-px flex-1 bg-stone-200" />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-moss-500">
            <circle cx="6" cy="6" r="2" fill="currentColor" opacity="0.5" />
          </svg>
          <div className="h-px flex-1 bg-stone-200" />
        </div>
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div aria-hidden="true" className="w-full overflow-hidden text-stone-200">
        <svg viewBox="0 0 1200 30" preserveAspectRatio="none" className="w-full h-6 sm:h-8">
          <path
            d="M0,15 Q150,5 300,15 T600,15 T900,15 T1200,15"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="container-w py-4">
      <svg viewBox="0 0 1200 12" className="w-full h-3 text-oak-200/40">
        {Array.from({ length: 5 }).map((_, i) => (
          <path
            key={i}
            d={`M0,${2 + i * 2} Q300,${i * 2} 600,${4 + i * 2} T1200,${2 + i * 2}`}
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
}
