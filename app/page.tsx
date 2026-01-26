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
