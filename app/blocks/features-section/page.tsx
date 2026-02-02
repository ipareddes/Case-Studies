import Link from "next/link";
import Image from "next/image";

interface FeatureSectionVariant {
  id: string;
  title: string;
  description: string;
  preview: string;
  image: string;
}

export default function FeatureSectionsPage() {
  const featureSections: FeatureSectionVariant[] = [
    {
      id: "features-section-1",
      title: "Features Section 1",
      description:
        "A responsive bento grid features section with asymmetric layout. The first and fourth cards span 2 rows, creating an engaging visual hierarchy.",
      preview: "/blocks/features-section/features-section-1",
      image: "/screenshots/features-section-1-preview.png",
    },
    {
      id: "features-section-2",
      title: "Features Section 2",
      description:
        "A 3-column grid with rich visual cards featuring custom SVG graphics, charts, network diagrams, and icon grids. Includes centered header with CTA buttons.",
      preview: "/blocks/features-section/features-section-2",
      image: "/screenshots/features-section-2-preview.png",
    },
    {
      id: "features-section-3",
      title: "Features Section 3",
      description:
        "A 2-column split layout featuring an interactive workflow showcase with auto-cycling animations. Features on the left highlight different steps, while the right side displays corresponding visual states with smooth transitions.",
      preview: "/blocks/features-section/features-section-3",
      image: "/screenshots/features-section-3-preview.png",
    },
    {
      id: "features-section-4",
      title: "Features Section 4",
      description:
        "A 2-column layout with content on the left and a large dashboard mockup on the right. Features three compact feature cards in a grid, perfect for showcasing key product capabilities.",
      preview: "/blocks/features-section/features-section-4",
      image: "/screenshots/features-section-4-preview.png",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blocks"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to blocks
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-4">
            Marketing
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Features Sections
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A collection of features section variants designed to showcase
            product features, services, or capabilities. Each variant offers a
            unique layout and visual style.
          </p>
        </div>

        {/* Variants Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureSections.map((variant) => (
            <Link
              key={variant.id}
              href={variant.preview}
              className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
            >
              {/* Preview Image */}
              <div className="aspect-video w-full bg-muted/50 border-b overflow-hidden relative">
                <Image
                  src={variant.image}
                  alt={variant.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {variant.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {variant.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  View block
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
