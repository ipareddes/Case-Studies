import Image from 'next/image'
import { Author, HeroStat } from '@/lib/types'
import { StatCard } from './stat-card'

interface HeroSectionProps {
  title: string
  author: Author
  stats: HeroStat[]
  image: string
}

export function HeroSection({ title, author, stats, image }: HeroSectionProps) {
  return (
    <section className="max-w-[1400px] mx-auto mb-12 md:mb-16 lg:mb-24 px-4">
      {/* Hero Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 md:mb-12 lg:mb-16">
        {/* Left Column: Title and Role Card */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
            {title}
          </h1>

          {/* Role Card */}
          <div className="card p-6">
            <div className="text-sm font-medium text-muted-foreground mb-4">
              Featuring insights from:
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-semibold text-lg">
                {author.initials}
              </div>
              <div>
                <div className="text-base font-semibold text-foreground mb-0.5">
                  {author.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {author.role}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image - Mobile/Tablet */}
          <div className="lg:hidden w-full bg-muted rounded-3xl overflow-hidden p-12 md:p-20 flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-video">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Column: Clipped Hero Image - Desktop Only */}
        <div className="hidden lg:block relative h-[400px]">
          <div className="absolute top-0 right-0 w-full h-full bg-muted rounded-3xl overflow-hidden flex items-center justify-center p-16"
               style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}>
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Project Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  )
}
