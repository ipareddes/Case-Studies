import Link from 'next/link'
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
