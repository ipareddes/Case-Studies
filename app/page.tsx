'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Header } from '@/components/layout/header'
import { caseStudies } from '@/lib/data/case-studies'
import {
  ArrowRight,
  Eye,
  Palette,
  Sparkles,
  Monitor,
  PenTool,
  Star,
  ChevronDown,
  ChevronUp,
  Diamond,
  Linkedin,
  Twitter,
  Github,
  Mail,
  MessageSquareMore,
  ChevronsUpDown,
} from 'lucide-react'

// ─── Scroll Reveal ──────────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('scroll-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`scroll-hidden ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function HeroReveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add('scroll-visible'))
  }, [])
  return (
    <div ref={ref} className={`scroll-hidden ${className}`}>
      {children}
    </div>
  )
}

// ─── Testimonials ───────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      'Isaac transformed our conversational banking experience. His design thinking bridged the gap between complex AI systems and real human needs.',
    name: 'Carolina Medina',
    role: 'VP Product',
    company: 'Yalo',
    rating: 5,
  },
  {
    quote:
      'Working with Isaac on GBM+, his ability to simplify complex trading workflows was exceptional. He always put the user first.',
    name: 'David Arana',
    role: 'Head of Design',
    company: 'GBM',
    rating: 5,
  },
  {
    quote:
      'Isaac brought clarity to our payment platform redesign. His systematic approach to design systems saved us months of iteration.',
    name: 'Alejandra Rios',
    role: 'Product Lead',
    company: 'Clip',
    rating: 5,
  },
]

// ─── Services ───────────────────────────────────────────────────────────────
const services = [
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'I craft intuitive UIs and seamless UXs that solve real problems and deliver results with a user-centric approach.',
  },
  {
    icon: PenTool,
    title: 'Logo Design',
    description:
      'Crafting distinctive, scalable, and impactful logos that embody your brand\'s identity and vision.',
  },
  {
    icon: Monitor,
    title: 'Web Design',
    description:
      'I craft modern, responsive web designs that tell your brand\'s story. Optimized for performance, usability, and seamless navigation.',
  },
  {
    icon: Sparkles,
    title: 'Framer Design',
    description:
      'I create high-quality designs using Framer that are interactive and engaging. Bringing ideas to life with smooth animations.',
  },
]

const skillsMarquee = [
  'UX Design', 'Canva', 'Blender', 'Photoshop', 'Research', 'Graphics',
  'Copywriting', 'Figma', 'UI Design',
]

// ─── Experience ─────────────────────────────────────────────────────────────
const experienceData = [
  {
    company: 'Numaris',
    logo: '/images/logos/numaris.svg',
    desc: 'SaaS Fleet Management',
    role: 'Product Designer',
    duration: '2 years (2024–2026)',
  },
  {
    company: 'GBM',
    logo: '/images/logos/gbm.svg',
    desc: 'Investment Trading Platform',
    role: 'Product Designer',
    duration: '3 years (2020–2023)',
  },
  {
    company: 'Mercado Pago',
    logo: '/images/logos/mercado-pago.svg',
    desc: 'Fintech & Financial Inclusion',
    role: 'Sr. Product Designer',
    duration: '14 months (2023–2024)',
  },
  {
    company: 'Clip',
    logo: '/images/logos/clip.svg',
    desc: 'Point of Sale & Payments',
    role: 'Product Designer',
    duration: '18 months (2022–2023)',
  },
  {
    company: 'Yalo.ai',
    logo: '/images/logos/yalo.svg',
    desc: 'Conversational Commerce AI',
    role: 'Sr. Product Designer',
    duration: '4 years (2018–2022)',
  },
]

// ─── Projects ───────────────────────────────────────────────────────────────
const companyLogos: Record<string, string> = {
  'yalo-conversational-banking': '/images/logos/yalo.svg',
  'gbm-trading-platform': '/images/logos/gbm.svg',
  'mercadopago-investing': '/images/logos/mercado-pago.svg',
  'clip-pos-platform': '/images/logos/clip.svg',
  'numaris-fleet-management': '/images/logos/numaris.svg',
}

const projects = [
  {
    slug: 'take-app',
    title: 'Take App',
    desc: 'Restaurant POS & Delivery',
    duration: '1 year (2023-2024)',
    description: 'A POS system for restaurants that helps them manage orders from delivery platforms like Uber Eats, DiDi, Rappi, and more — unifying all channels into a single interface.',
    tags: ['Figma', 'React Native', 'POS Systems', 'Restaurant Tech'],
    logo: '/images/logos/take-app.svg',
  },
]

// ─── Section Header ─────────────────────────────────────────────────────────
function SectionHeader({
  badge,
  heading,
  description,
}: {
  badge: string
  heading: React.ReactNode
  description: string
}) {
  return (
    <div className="space-y-2.5 px-4 py-16 md:px-6 lg:px-8">
      <span className="inline-flex w-fit items-center border px-1.5 py-0.5 text-xs font-medium">
        {badge}
      </span>
      <div className="flex justify-between gap-4 max-md:flex-col">
        <h2 className="max-w-[25rem] text-2xl font-semibold sm:text-3xl lg:text-4xl">
          {heading}
        </h2>
        <p className="text-muted-foreground max-w-xl text-lg">{description}</p>
      </div>
    </div>
  )
}

// ─── Testimonial Stack ──────────────────────────────────────────────────────
function TestimonialStack({
  testimonials,
}: {
  testimonials: { quote: string; name: string; role: string; company: string; rating: number }[]
}) {
  const [active, setActive] = useState(0)

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div
      className="relative h-[280px] sm:h-[300px] cursor-pointer"
      onClick={next}
    >
      {testimonials.map((t, i) => {
        const offset = (i - active + testimonials.length) % testimonials.length
        const isVisible = offset <= 2
        return (
          <div
            key={t.name}
            className="absolute inset-x-0 bottom-0 rounded-2xl border bg-card p-6 space-y-4 transition-all duration-500 ease-in-out"
            style={{
              transform: `translateY(${offset * -16}px) scale(${1 - offset * 0.05})`,
              zIndex: testimonials.length - offset,
              opacity: isVisible ? 1 - offset * 0.2 : 0,
              pointerEvents: offset === 0 ? 'auto' : 'none',
            }}
          >
            {/* Name + avatar */}
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-bold">
                {t.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role} <span className="font-medium text-foreground">{t.company}</span>
                </p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="size-5 fill-orange-400 stroke-orange-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-muted-foreground leading-relaxed">
              {t.quote}
            </p>
          </div>
        )
      })}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [expandedProject, setExpandedProject] = useState<string | null>(
    projects[0]?.slug ?? null
  )
  const [expandedExperience, setExpandedExperience] = useState<string | null>(
    experienceData[0]?.company ?? null
  )

  return (
    <>
      <Header />

      <main className="pt-14 relative">
        {/* Vertical side borders */}
        <div className="pointer-events-none fixed inset-y-0 left-0 right-0 z-10 hidden lg:block">
          <div className="mx-auto h-full max-w-6xl border-x border-border" />
        </div>
        {/* ═══ HERO ══════════════════════════════════════════════════════ */}
        <section id="home" className="relative flex-1">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-12 sm:gap-16 sm:px-6 sm:py-16 md:grid-cols-2 lg:gap-24 lg:px-8 lg:py-24">
            <HeroReveal className="space-y-5">
              {/* Availability badge */}
              <span className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium shadow-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-green-600" />
                </span>
                Available for next months | 2 slots free
              </span>

              {/* Heading */}
              <div className="flex flex-col gap-1 text-2xl font-bold sm:text-3xl lg:text-5xl">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Crafting</span>
                  <span>Designs</span>
                </div>
                <span>That Work Harder,</span>
                <div className="flex items-center gap-2">
                  <span>Think</span>
                  <span className="text-muted-foreground">Bigger.</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground">
                From brand identity to web design,{' '}
                <span className="text-foreground font-medium">I create tailored solutions</span>{' '}
                that engage audiences, elevate your brand, and drive growth.
                Whether it&rsquo;s a{' '}
                <span className="text-foreground font-medium">logo, website, or rebrand,</span>{' '}
                let&rsquo;s work together to bring your vision to life.
              </p>

              {/* CTA */}
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-500 hover:border-primary/10 hover:bg-background hover:text-foreground hover:shadow-md"
              >
                <span>Hire Me</span>
                <span className="flex size-5 items-center justify-center rounded-full bg-background text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-background">
                  <ArrowRight className="size-3" />
                </span>
              </Link>
            </HeroReveal>

            {/* Right column — hero image placeholder */}
            <HeroReveal className="relative flex items-center justify-center">
              <div className="relative w-full aspect-square sm:aspect-[4/3]">
                {/* Stacked card effect */}
                <div className="absolute inset-0 rounded-2xl border bg-muted/50 rotate-3 scale-95" />
                <div className="absolute inset-0 rounded-2xl border bg-muted/30 -rotate-2 scale-[0.98]" />
                <div className="relative h-full rounded-2xl border bg-background shadow-lg overflow-hidden flex items-center justify-center">
                  <div className="text-center space-y-2 p-6 sm:p-8">
                    <div className="text-3xl sm:text-4xl font-bold">IP</div>
                    <p className="text-sm text-muted-foreground">Isaac Paredes</p>
                    <p className="text-xs text-muted-foreground">Product Designer</p>
                  </div>
                </div>
              </div>
            </HeroReveal>
          </div>

          {/* Trust strip */}
          <div className="border-y">
            <div className="mx-auto flex max-w-6xl items-center gap-4 sm:gap-6 px-4 py-4 sm:px-6 lg:px-8">
              {/* Avatar stack + rating — hide avatars on mobile */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:flex -space-x-2">
                  {['CM', 'DA', 'AR', 'JP'].map((initials, i) => (
                    <div
                      key={i}
                      className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-foreground text-background text-xs font-bold"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="size-3 sm:size-3.5 fill-yellow-500 stroke-yellow-500" />
                    ))}
                    <Star className="size-3 sm:size-3.5 fill-yellow-500/50 stroke-yellow-500" />
                    <span className="ml-1 text-xs sm:text-sm font-semibold">4.8</span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">Trusted by 20+ clients</span>
                </div>
              </div>

              {/* Logo marquee */}
              <div className="flex-1 overflow-hidden">
                <div
                  className="flex shrink-0 items-center gap-6 sm:gap-10 animate-marquee-horizontal"
                  style={{ '--marquee-gap': '1.5rem' } as React.CSSProperties}
                >
                  {[
                    { name: 'Yalo', logo: '/images/logos/yalo.svg' },
                    { name: 'GBM', logo: '/images/logos/gbm.svg' },
                    { name: 'Mercado Pago', logo: '/images/logos/mercado-pago.svg' },
                    { name: 'Clip', logo: '/images/logos/clip.svg' },
                    { name: 'Numaris', logo: '/images/logos/numaris.svg' },
                    { name: 'Yalo', logo: '/images/logos/yalo.svg' },
                    { name: 'GBM', logo: '/images/logos/gbm.svg' },
                    { name: 'Mercado Pago', logo: '/images/logos/mercado-pago.svg' },
                    { name: 'Clip', logo: '/images/logos/clip.svg' },
                    { name: 'Numaris', logo: '/images/logos/numaris.svg' },
                  ].map((item, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 text-muted-foreground whitespace-nowrap text-sm sm:text-base font-semibold"
                    >
                      <Image src={item.logo} alt={item.name} width={24} height={24} className="object-contain" />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PORTFOLIO ═════════════════════════════════════════════════ */}
        <section id="portfolio" className="relative flex-1">
          <div className="mx-auto flex w-full max-w-6xl flex-col">
            <Reveal>
              <SectionHeader
                badge="Portfolio"
                heading={<>Portfolio highlights collection</>}
                description="A selection of projects highlighting my creativity and problem-solving approach. From concept to execution, each design balances beauty and function."
              />
            </Reveal>

            {/* Separator */}
            <div className="h-px w-full bg-border" />

            {/* Portfolio grid */}
            <div className="relative grid gap-x-12 gap-y-16 px-4 py-16 max-sm:gap-y-8 sm:grid-cols-2 md:px-6 lg:px-8">
              {caseStudies.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 150} className="group relative flex flex-col gap-6">
                  {/* Image */}
                  <Link href={`/case-study/${cs.slug}`}>
                    <div className="overflow-hidden rounded-xl border shadow-sm transition-transform duration-300 group-hover:rotate-3">
                      <div className="relative aspect-[16/10] bg-muted">
                        {(cs.thumbnail || cs.heroImage) && (
                          <Image
                            src={cs.thumbnail || cs.heroImage}
                            alt={cs.title}
                            fill
                            className="object-cover rounded-xl"
                          />
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Info row — stack on mobile, side-by-side on sm+ */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-lg sm:text-2xl font-semibold">{cs.title}</span>
                      <span className="text-muted-foreground text-sm sm:text-lg">
                        {cs.projectMetadata.sector}
                      </span>
                    </div>
                    <Link
                      href={`/case-study/${cs.slug}`}
                      className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border bg-background px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium shadow-xs transition-all group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground"
                    >
                      Preview <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SERVICES ══════════════════════════════════════════════════ */}
        <section id="services" className="relative overflow-hidden border-y">
          <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:space-y-16 sm:px-6 sm:py-16 lg:px-8 min-w-0">
            <Reveal className="space-y-2.5">
              <span className="inline-flex w-fit items-center border px-1.5 py-0.5 text-xs font-medium">
                Services
              </span>
              <div className="flex justify-between gap-4 max-md:flex-col">
                <div className="max-w-[25rem]">
                  <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                    Design services that make an impact.
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-xl text-lg">
                  Whether you need a complete brand identity or a conversion-focused website, I create designs that deliver. With a keen eye for detail, I ensure every element serves both form and function.
                </p>
              </div>
            </Reveal>

            {/* Separator */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <div className="h-px w-full bg-border" />
            </div>

            {/* Service cards — asymmetric masonry like reference */}
            <div className="grid gap-6 sm:grid-cols-2 min-w-0">
              {/* Left column */}
              <Reveal className="flex flex-col gap-6 min-w-0">
                {/* UI/UX Design — tall card with slider */}
                <div className="flex flex-1 flex-col gap-6 rounded-3xl bg-muted py-6 overflow-hidden min-w-0">
                  <div className="flex items-center gap-2.5 px-4 sm:px-6 text-lg sm:text-xl font-semibold">
                    <Palette className="size-5" />
                    <span>UI/UX Design</span>
                  </div>
                  <p className="text-muted-foreground px-4 sm:px-6 text-sm sm:text-lg leading-relaxed">
                    I craft intuitive UIs and seamless UXs that solve real problems and deliver results with a user-centric approach.
                  </p>
                  {/* Analytics slider marquee */}
                  <div
                    style={{
                      '--marquee-duration': '30s',
                      '--marquee-gap': '1rem',
                    } as React.CSSProperties}
                    className="group/slider flex gap-4 overflow-hidden pb-2 -mx-0"
                  >
                    {[0, 1, 2].map((setIndex) => (
                      <div
                        key={setIndex}
                        className="flex shrink-0 gap-4 animate-marquee-horizontal group-hover/slider:[animation-play-state:paused]"
                      >
                        {[
                          { title: 'Page Views', badge: 'Website', value: '24.5k', change: '18.2', isPositive: true },
                          { title: 'Session Duration', badge: 'Last month', value: '3m 42s', change: '8.1', isPositive: true },
                          { title: 'Bounce Rate', badge: 'Weekly', value: '32.1%', change: '4.3', isPositive: false },
                          { title: 'Conversion', badge: 'Monthly', value: '12.2k', change: '22.4', isPositive: true },
                        ].map((metric, idx) => (
                          <div
                            key={`${setIndex}-${idx}`}
                            className="flex w-40 sm:w-52 flex-col rounded-xl border bg-card py-4 sm:py-5 relative justify-between gap-3 sm:gap-4 shadow-sm"
                          >
                            <div className="flex flex-col gap-1.5 sm:gap-2 px-3 sm:px-4">
                              <span className="text-xs sm:text-sm font-medium">{metric.title}</span>
                              <span className="inline-flex w-fit items-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-medium">
                                {metric.badge}
                              </span>
                            </div>
                            <div className="px-3 sm:px-4 flex items-center gap-2">
                              <span className="text-base sm:text-xl font-semibold">{metric.value}</span>
                              <span className={`text-[10px] sm:text-xs ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {metric.isPositive ? '+' : '-'}{metric.change}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Web Design — short card */}
                <div className="flex flex-col gap-6 rounded-3xl bg-muted py-6 overflow-hidden min-w-0">
                  <div className="flex items-center gap-2.5 px-4 sm:px-6 text-lg sm:text-xl font-semibold">
                    <Monitor className="size-5" />
                    <span>Web Design</span>
                  </div>
                  <p className="text-muted-foreground px-4 sm:px-6 text-sm sm:text-lg leading-relaxed">
                    I craft modern, responsive web designs that tell your brand&rsquo;s story. Optimized for performance, usability, and seamless navigation.
                  </p>
                </div>
              </Reveal>

              {/* Right column */}
              <Reveal delay={150} className="flex flex-col gap-6 min-w-0">
                {/* Logo Design — short card */}
                <div className="flex flex-col gap-6 rounded-3xl bg-muted py-6 overflow-hidden min-w-0">
                  <div className="flex items-center gap-2.5 px-4 sm:px-6 text-lg sm:text-xl font-semibold">
                    <PenTool className="size-5" />
                    <span>Logo Design</span>
                  </div>
                  <p className="text-muted-foreground px-4 sm:px-6 text-sm sm:text-lg leading-relaxed">
                    Crafting distinctive, scalable, and impactful logos that embody your brand&rsquo;s identity and vision.
                  </p>
                </div>

                {/* Framer Design — tall card with images */}
                <div className="flex flex-1 flex-col gap-6 rounded-3xl bg-muted py-6 overflow-hidden min-w-0">
                  <div className="flex items-center gap-2.5 px-4 sm:px-6 text-lg sm:text-xl font-semibold">
                    <Sparkles className="size-5" />
                    <span>Framer Design</span>
                  </div>
                  <p className="text-muted-foreground px-4 sm:px-6 text-sm sm:text-lg leading-relaxed">
                    I create high-quality designs using Framer that are interactive and engaging. Bringing ideas to life with smooth animations.
                  </p>
                  {/* Image placeholder */}
                  <div className="flex-1 min-h-0 px-6 pb-1">
                    <div className="grid grid-cols-3 gap-3 h-full">
                      <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                        <div className="absolute inset-0 flex flex-col items-center justify-end p-3">
                          <p className="text-[10px] font-medium text-gray-500 text-center">Design</p>
                        </div>
                      </div>
                      <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-indigo-950 to-purple-900 shadow-lg">
                        <div className="absolute inset-0 flex flex-col items-center justify-end p-3">
                          <p className="text-[10px] font-medium text-white/80 text-center">AI-Driven Success</p>
                        </div>
                      </div>
                      <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg">
                        <div className="absolute inset-0 flex flex-col items-center justify-end p-3">
                          <p className="text-[10px] font-medium text-white/80 text-center">Automation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Tools marquee — 2 rows with edge fade */}
            <div className="relative space-y-4">
              {/* Left/right fade masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

              {[0, 1].map((row) => (
                <div key={row} className="flex overflow-hidden">
                  {[0, 1, 2, 3].map((setIdx) => (
                    <div
                      key={setIdx}
                      className="flex shrink-0 items-center gap-4 animate-marquee-horizontal"
                      style={{
                        '--marquee-gap': '1rem',
                        '--marquee-duration': row === 0 ? '25s' : '30s',
                        animationDirection: row === 1 ? 'reverse' : 'normal',
                        paddingRight: '1rem',
                      } as React.CSSProperties}
                    >
                      {skillsMarquee.map((skill, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center whitespace-nowrap rounded-full border bg-background px-4 py-2 text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* CTA buttons centered */}
            <div className="flex justify-center gap-4 pt-4">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
              >
                Hire me <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
              >
                Let&rsquo; talk <MessageSquareMore className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ ABOUT ═════════════════════════════════════════════════════ */}
        <section id="about" className="relative">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeader
                badge="About me"
                heading={<>Design that tells your story.</>}
                description="I help brands communicate clearly and confidently through thoughtful, goal-driven visuals that resonate with their audience and strengthen their identity."
              />
            </Reveal>

            {/* Separator */}
            <div className="h-px w-full bg-border" />

            <div className="space-y-10 px-4 py-16 md:px-6 lg:px-8">
              {/* Bio — 2 col with bold key phrases */}
              <Reveal className="grid gap-10 md:grid-cols-2">
                <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
                  <p>
                    <span className="text-foreground font-medium">Design isn&rsquo;t just my job&mdash;it&rsquo;s my passion.</span>{' '}
                    What began as a hobby turned into a full-fledged career when I realized
                    the true power of design: not just making things beautiful, but
                    making them work better.
                  </p>
                  <p>
                    <span className="text-foreground font-medium">My approach is all about crafting user interfaces that serve a
                    real purpose.</span>{' '}
                    I believe great design should solve problems
                    and provide seamless experiences.
                  </p>
                </div>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
                  <p>
                    <span className="text-foreground font-medium">I&rsquo;m a perfectionist when it comes to the details, and I believe
                    it&rsquo;s the little things that elevate design from good to great.</span>{' '}
                    This meticulous attention to detail allows me to create lasting
                    relationships with clients.
                  </p>
                </div>
              </Reveal>

              {/* Tools section — full-width card like reference */}
              <Reveal delay={150} className="relative overflow-hidden rounded-3xl border bg-muted/30 p-6 sm:p-8">
                {/* Dot pattern decoration */}
                <div className="pointer-events-none absolute bottom-0 right-0 opacity-20">
                  <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
                    {Array.from({ length: 12 }).map((_, row) =>
                      Array.from({ length: 20 }).map((_, col) => (
                        <circle
                          key={`${row}-${col}`}
                          cx={col * 10 + 5}
                          cy={row * 10 + 5}
                          r="1.5"
                          fill="currentColor"
                          className="text-muted-foreground"
                        />
                      ))
                    )}
                  </svg>
                </div>

                <div className="relative space-y-5">
                  <div className="flex items-center gap-2.5">
                    <svg className="size-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <h3 className="text-lg font-semibold">
                      Tools That Power My Design Process
                    </h3>
                  </div>

                  <p className="text-muted-foreground max-w-2xl">
                    My design process is powered by tools that encourage clarity,
                    collaboration, and creativity &mdash; turning vision into user-centered experiences.
                  </p>

                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
                    {[
                      { name: 'Figma', color: 'text-[#F24E1E]', icon: 'F' },
                      { name: 'Framer', color: 'text-foreground', icon: 'Fr' },
                      { name: 'Blender', color: 'text-[#EA7600]', icon: 'B' },
                      { name: 'Webflow', color: 'text-[#4353FF]', icon: 'W' },
                      { name: 'Notion', color: 'text-foreground', icon: 'N' },
                      { name: 'GitHub', color: 'text-foreground', icon: 'G' },
                      { name: 'Adobe XD', color: 'text-[#FF61F6]', icon: 'Xd' },
                      { name: 'Miro', color: 'text-[#FFD02F]', icon: 'M' },
                      { name: 'Canva', color: 'text-[#00C4CC]', icon: 'C' },
                    ].map((tool) => (
                      <span
                        key={tool.name}
                        className="inline-flex items-center gap-2 rounded-full border bg-background px-3.5 py-2 text-sm font-medium shadow-xs"
                      >
                        <span className={`text-base font-bold ${tool.color}`}>{tool.icon}</span>
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCE ════════════════════════════════════════════════ */}
        <section id="experience" className="relative flex-1 border-y">
          <div className="mx-auto flex w-full max-w-6xl flex-col">
            <Reveal>
              <SectionHeader
                badge="Experience"
                heading={<>Experience that delivers.</>}
                description="From concept to completion, I combine design thinking with thoughtful execution to help brands move forward with innovative and effective solutions."
              />
            </Reveal>

            {/* Timeline — accordion with logos */}
            <div className="w-full border-t">
              {experienceData.map((company, i) => {
                const isOpen = expandedExperience === company.company
                const cs = caseStudies.find((c) => c.projectMetadata.company.startsWith(company.company.replace('.ai', '')))
                return (
                  <Reveal key={company.company} delay={i * 100} className="border-b last:border-b-0">
                    <button
                      onClick={() => setExpandedExperience(isOpen ? null : company.company)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                    >
                      <span className="flex items-center">
                        <div className="m-6 sm:m-8 flex size-12 items-center justify-center shrink-0">
                          <Image src={company.logo} alt={company.company} width={48} height={48} className="object-contain" />
                        </div>
                        <div className="flex flex-col gap-1.5 border-l px-2.5 py-5">
                          <span className="text-lg sm:text-xl font-semibold">{company.company}</span>
                          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-base font-normal">
                            <span>{company.desc}</span>
                            <span className="h-4 w-0.5 bg-muted-foreground/30 max-sm:hidden" />
                            <span className="max-sm:hidden">{company.role}</span>
                            <span className="h-4 w-0.5 bg-muted-foreground/30 max-sm:hidden" />
                            <span className="max-sm:hidden">{company.duration}</span>
                          </div>
                        </div>
                      </span>
                      <ChevronsUpDown className="mr-4 sm:mr-10 size-5 shrink-0 text-muted-foreground" />
                    </button>
                    {isOpen && cs && (
                      <div className="space-y-6 px-6 pb-8 sm:px-8 text-muted-foreground text-base">
                        <p>{cs.projectMetadata.overview}</p>
                        <div className="flex flex-wrap gap-2">
                          {cs.projectMetadata.tools.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/case-study/${cs.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          Read full case study <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </Reveal>
                )
              })}
            </div>

            {/* See more */}
            <div className="flex justify-center py-8">
              <button className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                See more <ChevronDown className="size-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ═══ PROJECTS ══════════════════════════════════════════════════ */}
        <section id="projects" className="relative flex-1">
          <div className="mx-auto flex w-full max-w-6xl flex-col">
            <Reveal>
              <SectionHeader
                badge="Projects"
                heading={<>Work that speaks for itself.</>}
                description="A collection of projects where strategy meets creativity — each crafted to deliver measurable results, meaningful experiences, and lasting impact through thoughtful design."
              />
            </Reveal>

            {/* Accordion */}
            <div className="w-full border-t">
              {projects.map((project, i) => {
                const isOpen = expandedProject === project.slug
                return (
                  <Reveal key={project.slug} delay={i * 100} className="border-b last:border-b-0">
                    <button
                      onClick={() =>
                        setExpandedProject(isOpen ? null : project.slug)
                      }
                      className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                    >
                      <span className="flex items-center">
                        <div className="m-6 sm:m-8 flex size-12 items-center justify-center shrink-0">
                          {project.logo ? (
                            <Image src={project.logo} alt={project.title} width={48} height={48} className="object-contain" />
                          ) : (
                            <div className="flex size-12 items-center justify-center rounded-lg bg-muted text-sm font-bold">{project.title.slice(0, 2)}</div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1.5 border-l px-2.5 py-5">
                          <span className="text-lg sm:text-xl font-semibold">{project.title}</span>
                          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-base font-normal">
                            <span>{project.desc}</span>
                            <span className="h-4 w-0.5 bg-muted-foreground/30 max-sm:hidden" />
                            <span className="max-sm:hidden">{project.duration}</span>
                          </div>
                        </div>
                      </span>
                      <ChevronsUpDown className="mr-4 sm:mr-10 size-5 shrink-0 text-muted-foreground" />
                    </button>
                    {isOpen && (
                      <div className="space-y-6 px-6 pb-8 sm:px-8 text-muted-foreground text-base">
                        <p>{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </Reveal>
                )
              })}
            </div>

            {/* See more */}
            <div className="flex justify-center py-8">
              <button className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                See more <ChevronDown className="size-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ══════════════════════════════════════════════ */}
        <section id="testimonials" className="relative border-y">
          <div className="mx-auto max-w-6xl flex flex-col gap-16 px-4 py-8 md:px-6 md:py-16 lg:px-8">
            <Reveal className="space-y-2.5">
              <span className="inline-flex w-fit items-center border px-1.5 py-0.5 text-xs font-medium">
                Testimonials
              </span>
              <div className="flex justify-between gap-4 max-md:flex-col">
                <h2 className="max-w-[25rem] text-2xl font-semibold sm:text-3xl lg:text-4xl">
                  Trusted by clients around the globe.
                </h2>
                <p className="text-muted-foreground max-w-xl text-lg">
                  I&rsquo;m grateful to collaborate with forward-thinking brands and teams who value design that creates a real difference in user experiences and drives business success.
                </p>
              </div>
            </Reveal>

            <Reveal className="grid gap-9 md:grid-cols-2 items-start">
              {/* Left — stats + CTA */}
              <div className="flex flex-col gap-8">
                <p className="text-muted-foreground text-center text-xl">
                  I&rsquo;m grateful to collaborate with brands and teams.
                </p>
                <div className="grid h-24 sm:h-28 grid-cols-3 text-center">
                  <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
                    <span className="text-lg sm:text-xl font-medium">100+</span>
                    <span className="text-muted-foreground text-xs sm:text-sm">Happy Client</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 border-x">
                    <span className="text-lg sm:text-xl font-medium">$250m</span>
                    <span className="text-muted-foreground text-xs sm:text-sm">Revenue Added</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
                    <span className="text-lg sm:text-xl font-medium">4.8</span>
                    <span className="text-muted-foreground text-xs sm:text-sm">Average Rating</span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 border-y py-6 sm:py-8">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
                  >
                    Let&rsquo;s talk <MessageSquareMore className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                  <div className="w-px bg-border hidden sm:block" />
                  <Link
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full border border-transparent bg-primary px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary-foreground transition-all duration-500 hover:border-primary/10 hover:bg-background hover:text-foreground hover:shadow-md"
                  >
                    <span>Hire Me</span>
                    <span className="flex size-4 sm:size-5 items-center justify-center rounded-full bg-background text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-background">
                      <ArrowRight className="size-2.5 sm:size-3" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right — stacked testimonial cards with slider effect */}
              <TestimonialStack testimonials={testimonials} />
            </Reveal>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer id="contact">
        {/* Separator */}
        <div className="h-px w-full bg-border" />

        {/* CTA section */}
        <Reveal className="flex flex-col items-center gap-6 px-4 py-20 text-center md:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Let&rsquo;s collaborate and<br />craft your vision
          </h2>
          <Link
            href="mailto:hello@isaacparedes.com"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Let&rsquo;s talk <MessageSquareMore className="size-4" />
          </Link>
        </Reveal>

        {/* Separator */}
        <div className="h-px w-full bg-border" />

        {/* Nav links */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-6 text-sm text-muted-foreground">
          <Link href="#portfolio" className="hover:text-foreground transition-colors">Portfolio</Link>
          <span className="w-px h-4 bg-border" />
          <Link href="#services" className="hover:text-foreground transition-colors">Services</Link>
          <span className="w-px h-4 bg-border" />
          <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
          <span className="w-px h-4 bg-border" />
          <Link href="#projects" className="hover:text-foreground transition-colors">Projects</Link>
          <span className="w-px h-4 bg-border" />
          <Link href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</Link>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-border" />

        {/* Social icons */}
        <div className="flex items-center justify-center gap-3 px-4 py-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="size-5" />
          </a>
          <span className="w-px h-4 bg-border" />
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="size-5" />
          </a>
          <span className="w-px h-4 bg-border" />
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="size-5" />
          </a>
          <span className="w-px h-4 bg-border" />
          <a href="mailto:hello@isaacparedes.com" aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="size-5" />
          </a>
        </div>
      </footer>
    </>
  )
}
