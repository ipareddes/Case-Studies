import { Header } from '@/components/layout/header'
import { PortfolioProject } from '@/components/portfolio/portfolio-project'

export default function PortfolioPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen pt-24 pb-16">
        {/* Clip Project */}
        <PortfolioProject
          projectTitle="CLIP / FINTECH / B2B / POS SYSTEM"
          logo="/images/clip/logo.png"
          companyName="Clip"
          productName="Payments"
          brandColor="#FF4E19"
          grayColor="#F0F2F6"
          meta={{
            role: 'Senior Product Designer',
            segment: 'Fintech',
            year: '2019',
            platform: 'Web & Mobile',
            website: 'https://clip.mx'
          }}
          businessProblem={{
            title: 'The Challenge',
            description: 'Small merchants in Mexico were losing revenue due to slow checkout experiences and limited payment acceptance. Existing POS systems were complex and expensive.',
            image: '/images/clip/business-problem.svg'
          }}
          objective={{
            title: 'My Role',
            description: 'Lead the UX redesign of Clip\'s POS platform to reduce transaction time by 70% and decrease chargebacks while scaling from 10K to 250K merchants.',
            image: '/images/clip/objective.svg'
          }}
          solution={{
            title: 'The Approach',
            description: 'Designed a unified POS system combining payments, inventory, and sales analytics—turning merchant pain points into growth opportunities.',
            image: '/images/clip/solution.svg'
          }}
          solutionOverview={{
            headline: {
              beforeHighlight: 'From simple payments to',
              highlight: 'complete business operations',
              afterHighlight: 'in one unified platform'
            },
            features: {
              title: 'Design Strategy',
              items: [
                'Jobs-to-be-done research with 50+ merchants',
                'Progressive disclosure to reduce cognitive load',
                'Designed for speed: 3-tap checkout flow',
                'Multi-location inventory sync system'
              ]
            },
            heroImage: '/images/clip/solution-overview-hero.svg'
          }}
          featureCards={[
            {
              title: 'Speed-focused checkout',
              description: 'Reduced checkout from 8 taps to 3 taps. Designed numpad-first interface based on merchant workflow analysis showing 90% of transactions use manual entry.',
              image: '/images/clip/feature-standard.svg'
            },
            {
              title: 'Progressive complexity',
              titleHighlight: 'Progressive complexity',
              description: 'Created adaptive UI that reveals advanced features (inventory tracking, multi-location sync) only when merchants are ready—reducing cognitive load for new users while scaling with business growth.',
              image: '/images/clip/feature-retail.svg'
            },
            {
              title: 'Unified payment rails',
              titleHighlight: 'payment rails',
              description: 'Designed single interface for card-present, card-not-present, and QR payments—eliminating the need to switch between apps mid-transaction.',
              image: '/images/clip/feature-payment.svg'
            },
            {
              title: 'Contextual product catalog',
              titleHighlight: 'product catalog',
              description: 'Smart search with real-time inventory status prevents overselling and enables upselling based on what\'s actually in stock.',
              image: '/images/clip/feature-menu.svg'
            },
            {
              title: 'Quick product creation',
              titleHighlight: 'Quick product creation',
              description: 'Streamlined 3-field product entry flow vs 12-field competitor forms. Merchants can add items during transactions without losing context.',
              image: '/images/clip/feature-create.svg'
            },
            {
              title: 'Zero-training interface',
              titleHighlight: 'Zero-training',
              description: 'Designed familiar patterns (grid layout, large touch targets, color-coded states) that reduced merchant onboarding time from 2 hours to 15 minutes.',
              image: '/images/clip/feature-intuitive.svg'
            }
          ]}
          businessImpact={{
            features: [
              {
                title: '3-tap checkout flow',
                image: '/images/clip/impact-checkout.svg'
              },
              {
                title: 'Real-time inventory sync',
                image: '/images/clip/impact-transaction.svg'
              },
              {
                title: 'Automated receipt generation',
                image: '/images/clip/impact-detail.svg'
              }
            ],
            outcomes: [
              {
                metric: '1000+',
                description: 'Merchants onboarded in first 6 months'
              },
              {
                metric: '40%',
                description: 'Reduction in chargebacks (saved $2M annually)'
              },
              {
                metric: '$1.5B+',
                description: 'Transaction volume processed through new design'
              }
            ]
          }}
          tags={['Clip', 'Fintech', 'POS System']}
        />

        {/* More projects can be added here */}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div className="flex flex-wrap gap-4">
            <span>Isaac Paredes</span>
            <span className="hidden sm:inline">|</span>
            <span>Product Design</span>
            <span className="hidden sm:inline">|</span>
            <a href="https://linkedin.com" className="underline hover:text-gray-900">Linkedin</a>
            <span className="hidden sm:inline">|</span>
            <a href="mailto:ipareddes@gmail.com" className="hover:text-gray-900">ipareddes@gmail.com</a>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0 text-gray-400">
            <span>Clip</span>
            <span>|</span>
            <span>Fintech</span>
            <span>|</span>
            <span>POS System</span>
          </div>
        </div>
      </footer>
    </>
  )
}
