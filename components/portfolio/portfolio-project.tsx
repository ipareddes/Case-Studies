'use client'

import Image from 'next/image'
import Link from 'next/link'

interface PortfolioProjectProps {
  projectTitle: string
  logo: string
  companyName: string
  productName: string
  brandColor: string // Hex color for highlights (e.g., "#FF4E19" for Clip)
  grayColor?: string // Hex color for gray backgrounds (default: "#F0F2F6")
  meta: {
    role: string
    segment: string
    year: string
    platform: string
    website: string
  }
  businessProblem: {
    title: string
    description: string
    image: string
  }
  objective: {
    title: string
    description: string
    image: string
  }
  solution: {
    title: string
    description: string
    image: string
  }
  solutionOverview?: {
    headline: {
      beforeHighlight: string
      highlight: string
      afterHighlight: string
    }
    features: {
      title: string
      items: string[]
    }
    heroImage: string
  }
  featureCards?: {
    title: string
    titleHighlight?: string
    description: string
    image: string
  }[]
  businessImpact?: {
    features: {
      title: string
      image: string
    }[]
    outcomes: {
      metric: string
      description: string
    }[]
  }
  tags: string[]
}

export function PortfolioProject({
  projectTitle,
  logo,
  companyName,
  productName,
  brandColor,
  grayColor = '#F0F2F6',
  meta,
  businessProblem,
  objective,
  solution,
  solutionOverview,
  featureCards,
  businessImpact,
  tags
}: PortfolioProjectProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-20">
      {/* Company Info Card */}
      <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 mb-8">
        {/* Logo and Meta Information */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white border-2 border-gray-200 overflow-hidden flex items-center justify-center p-4">
              <Image
                src={logo}
                alt={companyName}
                width={112}
                height={112}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Company Name and Meta Info */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 w-full">
            {/* Company Name */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {companyName}
              </h2>
              <p className="text-lg text-gray-600">{productName}</p>
            </div>

            {/* Role */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Role</p>
              <p className="text-base font-medium text-gray-900">{meta.role}</p>
            </div>

            {/* Segment */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Segment</p>
              <p className="text-base font-medium text-gray-900">{meta.segment}</p>
            </div>

            {/* Year */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Year</p>
              <p className="text-base font-medium text-gray-900">{meta.year}</p>
            </div>

            {/* Platform */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Platform</p>
              <p className="text-base font-medium text-gray-900">{meta.platform}</p>
            </div>

            {/* Website */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Website</p>
              <Link
                href={meta.website}
                target="_blank"
                className="text-base font-medium text-gray-900 underline hover:text-gray-600 transition-colors"
              >
                Visit Product page
              </Link>
            </div>
          </div>
        </div>

        {/* Three Column Layout: Business Problem, Objective, Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Business Problem */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: grayColor }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: brandColor }}>
              {businessProblem.title}
            </h3>
            <p className="text-base text-gray-700 mb-6">
              {businessProblem.description}
            </p>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white">
              <Image
                src={businessProblem.image}
                alt={businessProblem.title}
                fill
                className="object-contain p-4"
              />
            </div>
          </div>

          {/* Objective */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: grayColor }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: brandColor }}>
              {objective.title}
            </h3>
            <p className="text-base text-gray-700 mb-6">
              {objective.description}
            </p>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white">
              <Image
                src={objective.image}
                alt={objective.title}
                fill
                className="object-contain p-4"
              />
            </div>
          </div>

          {/* Solution */}
          <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: brandColor }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: brandColor }}>
              {solution.title}
            </h3>
            <p className="text-base text-gray-700 mb-6">
              {solution.description}
            </p>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white">
              <Image
                src={solution.image}
                alt={solution.title}
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Solution Overview Section */}
      {solutionOverview && (
        <div className="mb-8">
          {/* Headline and Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Headline */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {solutionOverview.headline.beforeHighlight}{' '}
                <span style={{ color: brandColor }}>
                  {solutionOverview.headline.highlight}
                </span>{' '}
                {solutionOverview.headline.afterHighlight}
              </h2>
            </div>

            {/* Features List */}
            <div className="flex items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: brandColor }}>
                  {solutionOverview.features.title}
                </h3>
                <ul className="space-y-3">
                  {solutionOverview.features.items.map((item, index) => (
                    <li key={index} className="text-lg text-gray-900">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="rounded-3xl p-8 md:p-12" style={{ backgroundColor: grayColor }}>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
              <Image
                src={solutionOverview.heroImage}
                alt="Solution overview"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bento Grid - Feature Showcase */}
      {featureCards && featureCards.length > 0 && (
        <div className="mb-8">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
            {/* Card 1 - Standard Mode (2 cols, tall) */}
            {featureCards[0] && (
              <div
                className="lg:col-span-2 bg-gradient-to-br rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-xl group"
                style={{
                  background: `linear-gradient(to bottom right, ${brandColor}10, #ffffff)`,
                  borderColor: `${brandColor}30`
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {featureCards[0].title}
                  </h3>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transform group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: brandColor }}
                  >
                    ✓
                  </div>
                </div>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                  {featureCards[0].description}
                </p>
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-lg">
                  <Image
                    src={featureCards[0].image}
                    alt={featureCards[0].title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            )}

            {/* Card 2 - Retail Mode (3 cols) */}
            {featureCards[1] && (
              <div
                className="lg:col-span-3 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl"
                style={{ backgroundColor: grayColor }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {featureCards[1].titleHighlight ? (
                    <>
                      {featureCards[1].title.split(featureCards[1].titleHighlight)[0]}
                      <span style={{ color: brandColor }}>{featureCards[1].titleHighlight}</span>
                      {featureCards[1].title.split(featureCards[1].titleHighlight)[1]}
                    </>
                  ) : (
                    featureCards[1].title
                  )}
                </h3>
                <p className="text-base text-gray-700 mb-6">
                  {featureCards[1].description}
                </p>
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-white shadow-lg">
                  <Image
                    src={featureCards[1].image}
                    alt={featureCards[1].title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            )}

            {/* Card 3 - Take Payment (3 cols) */}
            {featureCards[2] && (
              <div className="lg:col-span-3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white hover:from-gray-800 hover:to-gray-700 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold mb-4">
                  {featureCards[2].titleHighlight ? (
                    <>
                      {featureCards[2].title.split(featureCards[2].titleHighlight)[0]}
                      <span style={{ color: `${brandColor}80` }}>{featureCards[2].titleHighlight}</span>
                      {featureCards[2].title.split(featureCards[2].titleHighlight)[1]}
                    </>
                  ) : (
                    featureCards[2].title
                  )}
                </h3>
                <p className="text-base text-gray-300 mb-6">
                  {featureCards[2].description}
                </p>
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-white shadow-lg">
                  <Image
                    src={featureCards[2].image}
                    alt={featureCards[2].title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            )}

            {/* Card 4 - Menu Items (2 cols) */}
            {featureCards[3] && (
              <div
                className="lg:col-span-2 bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-xl"
                style={{ borderColor: `${brandColor}50` }}
              >
                <h3 className="text-2xl font-bold mb-4">
                  {featureCards[3].titleHighlight ? (
                    <>
                      {featureCards[3].title.split(featureCards[3].titleHighlight)[0]}
                      <span style={{ color: brandColor }}>{featureCards[3].titleHighlight}</span>
                      {featureCards[3].title.split(featureCards[3].titleHighlight)[1]}
                    </>
                  ) : (
                    featureCards[3].title
                  )}
                </h3>
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: grayColor }}>
                  <Image
                    src={featureCards[3].image}
                    alt={featureCards[3].title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            )}

            {/* Card 5 - Create Items (2 cols) */}
            {featureCards[4] && (
              <div
                className="lg:col-span-2 rounded-3xl p-8 text-white transition-all duration-300 hover:shadow-xl group"
                style={{
                  backgroundColor: brandColor,
                  filter: 'brightness(1)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(0.9)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-2xl transform group-hover:rotate-90 transition-transform duration-300">
                    +
                  </div>
                  <h3 className="text-2xl font-bold">
                    {featureCards[4].titleHighlight ? (
                      <>
                        {featureCards[4].title.split(featureCards[4].titleHighlight)[0]}
                        <span className="opacity-60">{featureCards[4].titleHighlight}</span>
                        {featureCards[4].title.split(featureCards[4].titleHighlight)[1]}
                      </>
                    ) : (
                      featureCards[4].title
                    )}
                  </h3>
                </div>
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-lg">
                  <Image
                    src={featureCards[4].image}
                    alt={featureCards[4].title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            )}

            {/* Card 6 - Intuitive POS (3 cols, compact) */}
            {featureCards[5] && (
              <div
                className="lg:col-span-3 rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-xl"
                style={{
                  background: `linear-gradient(to right, ${grayColor}, ${brandColor}15)`,
                  borderColor: `${brandColor}30`
                }}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">
                      {featureCards[5].titleHighlight ? (
                        <>
                          {featureCards[5].title.split(featureCards[5].titleHighlight)[0]}
                          <span style={{ color: brandColor }}>{featureCards[5].titleHighlight}</span>
                          {featureCards[5].title.split(featureCards[5].titleHighlight)[1]}
                        </>
                      ) : (
                        featureCards[5].title
                      )}
                    </h3>
                    <p className="text-base text-gray-700">
                      Easy to learn, fast to use, built for modern businesses
                    </p>
                  </div>
                  <div className="relative w-full lg:w-64 aspect-square rounded-xl overflow-hidden bg-white shadow-lg flex-shrink-0">
                    <Image
                      src={featureCards[5].image}
                      alt={featureCards[5].title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Business Impact Section */}
      {businessImpact && (
        <div className="mb-8">
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 lg:gap-6 lg:h-[80vh]">
            {/* Left Column - First Card - Reduced size (3 cols) */}
            {businessImpact.features[0] && (
              <div
                className="lg:col-span-3 rounded-3xl p-6 transition-all duration-300 flex flex-col lg:h-full"
                style={{ backgroundColor: grayColor }}
              >
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 flex-shrink-0" style={{ color: brandColor }}>
                  {businessImpact.features[0].title}
                </h3>
                <div className="relative w-full max-w-[220px] mx-auto flex-1 flex items-center">
                  <div className="relative w-full aspect-[9/19] rounded-3xl overflow-hidden bg-white shadow-2xl">
                    <Image
                      src={businessImpact.features[0].image}
                      alt={businessImpact.features[0].title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Middle Column - Second and Third Cards Stacked (3 cols) */}
            <div className="lg:col-span-3 flex flex-col gap-4 lg:gap-6 lg:h-full">
              {/* Second Card - Reduced with Clipped Phone */}
              {businessImpact.features[1] && (
                <div
                  className="rounded-3xl p-5 transition-all duration-300 flex flex-col overflow-hidden flex-1"
                  style={{ backgroundColor: grayColor }}
                >
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 flex-shrink-0" style={{ color: brandColor }}>
                    {businessImpact.features[1].title}
                  </h3>
                  <div className="relative w-full max-w-[180px] mx-auto flex-1 overflow-hidden rounded-2xl max-h-[240px]">
                    <div className="relative w-full h-[400px] -mt-16">
                      <Image
                        src={businessImpact.features[1].image}
                        alt={businessImpact.features[1].title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Third Card - Reduced with Clipped Phone */}
              {businessImpact.features[2] && (
                <div
                  className="rounded-3xl p-5 transition-all duration-300 flex flex-col overflow-hidden flex-1"
                  style={{ backgroundColor: grayColor }}
                >
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 flex-shrink-0" style={{ color: brandColor }}>
                    {businessImpact.features[2].title}
                  </h3>
                  <div className="relative w-full max-w-[180px] mx-auto flex-1 overflow-hidden rounded-2xl max-h-[240px]">
                    <div className="relative w-full h-[400px] -mt-16">
                      <Image
                        src={businessImpact.features[2].image}
                        alt={businessImpact.features[2].title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Outcomes expand to fill height (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6 lg:h-full">
              {/* Outcome Header Card */}
              <div
                className="bg-white rounded-3xl p-6 lg:p-8 border-4 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: brandColor }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: brandColor }}>
                  Outcome
                </h2>
              </div>

              {/* Outcome Metric Cards - Expand to fill space */}
              {businessImpact.outcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 lg:p-7 border-4 transition-all duration-300 hover:shadow-xl group flex-1 flex items-center"
                  style={{
                    borderColor: brandColor,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${brandColor}10`}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                >
                  <div className="flex items-center gap-4 lg:gap-5 w-full">
                    <div className="flex-shrink-0">
                      <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: brandColor }}>
                        {outcome.metric}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-base md:text-lg lg:text-xl font-medium text-gray-900 leading-snug">
                        {outcome.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
