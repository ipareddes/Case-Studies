import Link from 'next/link'
import Image from 'next/image'
import { caseStudies } from '@/lib/data/case-studies'
import { Header } from '@/components/layout/header'

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Isaac Paredes
          </h1>
          <p className="text-xl text-muted-foreground mb-16">
            Lead Product Designer specializing in AI-powered platforms
          </p>

          {/* Components and Blocks Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <Link
              href="/components"
              className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-8 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold group-hover:text-blue-600 transition-colors">
                  Components
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Reusable UI components built with Radix UI and Tailwind CSS. Copy and paste into your apps.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                <span>Browse components</span>
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
            </Link>

            <Link
              href="/blocks"
              className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-8 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 3h14" />
                    <path d="M5 9h14" />
                    <path d="M5 15h14" />
                    <path d="M5 21h14" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold group-hover:text-purple-600 transition-colors">
                  Blocks
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Ready-to-use sections and layouts. Build pages faster with pre-designed blocks.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-purple-600">
                <span>Explore blocks</span>
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
            </Link>
          </div>

          <h2 id="case-studies" className="text-3xl font-semibold mb-8 text-foreground">
            Case Studies
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map(cs => (
              <Link
                key={cs.slug}
                href={`/case-study/${cs.slug}`}
                className="group"
              >
                <div className="card p-6 hover:shadow-lg transition-all h-full">
                  {/* Logo and Company */}
                  <div className="flex items-center gap-4 mb-4">
                    {cs.projectMetadata.companyLogo ? (
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center p-2">
                        <Image
                          src={cs.projectMetadata.companyLogo}
                          alt={cs.projectMetadata.company}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-2xl font-bold">
                        {cs.projectMetadata.company.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-semibold text-foreground">
                        {cs.projectMetadata.company}
                      </div>
                      {cs.projectMetadata.productName && (
                        <div className="text-sm text-muted-foreground">
                          {cs.projectMetadata.productName}
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {cs.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {cs.heroStats.slice(0, 3).map((stat, index) => (
                      <div key={index} className="inline-block px-3 py-1 rounded-full bg-muted text-xs">
                        <span className="font-semibold text-foreground">{stat.value}</span>
                        <span className="text-muted-foreground"> {stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm font-medium text-accent group-hover:underline">
                    Read case study →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
