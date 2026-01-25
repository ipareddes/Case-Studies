import { CaseStudy } from '../types'

export const numarisCaseStudy: CaseStudy = {
  slug: 'numaris-fleet-management',
  title: 'AI-Powered Fleet Management Platform',
  subtitle: 'Designing an AI-first IoT platform that transforms fleet operations through intelligent automation and real-time insights',

  author: {
    name: 'Isaac Paredes',
    role: 'Lead Product Designer',
    initials: 'IP'
  },

  heroStats: [
    { value: '2 years', label: 'Project Duration' },
    { value: '250K+', label: 'Vehicles Monitored' },
    { value: '40%', label: 'Accident Reduction' },
    { value: '$180M+', label: 'Customer Savings' }
  ],

  heroImage: '/images/dashboard-hero.png',

  projectMetadata: {
    company: 'Numaris',
    overview: 'An AI-powered fleet management platform that helps companies reduce accidents, optimize operations, and save millions in operational costs.',
    sector: 'Fleet Management & IoT',
    teamSize: '12 (3 Designers, 6 Engineers, 2 PM, 1 QA)',
    location: 'Remote based in Mexico City',
    duration: '2 years (2024-2026)',
    tools: ['Figma', 'Miro', 'UserTesting', 'Mixpanel', 'React', 'TypeScript', 'Claude Code', 'Storybook']
  },

  overview: {
    myRole: [
      'Led end-to-end product design for the fleet management platform',
      'Defined design system and component library',
      'Conducted user research with fleet managers and drivers',
      'Collaborated with engineering on technical feasibility'
    ],
    keyResponsibilities: [
      'User Research & Testing',
      'Interaction Design',
      'Design System Architecture',
      'Cross-functional Collaboration'
    ],
    introduction: [
      'Numaris is an AI-powered fleet management platform that helps companies monitor, analyze, and optimize their vehicle operations in real-time.',
      'As Lead Product Designer, I was responsible for transforming complex telematics data into actionable insights that fleet managers could use to reduce accidents, improve driver behavior, and save millions in operational costs.',
      'This case study focuses on how we leveraged Jobs to Be Done (JTBD) framework and automation workflows to create a platform that scaled from 10,000 to 250,000+ monitored vehicles.'
    ]
  },

  problem: {
    introduction: [
      'Fleet management companies were struggling with three critical challenges that existing solutions failed to address adequately.'
    ],
    painPoints: [
      {
        title: 'Information Overload',
        description: 'Fleet managers received thousands of alerts daily but lacked context to prioritize actions, leading to alert fatigue and missed critical incidents.'
      },
      {
        title: 'Reactive Operations',
        description: 'Most platforms only reported incidents after they occurred, preventing proactive intervention and accident prevention.'
      },
      {
        title: 'Manual Workflows',
        description: 'Fleet managers spent hours manually processing data, creating reports, and coordinating driver coaching sessions.'
      }
    ],
    competitiveAnalysis: [
      {
        company: 'Samsara',
        strengths: ['Comprehensive hardware ecosystem', 'Strong market presence'],
        weaknesses: ['Limited AI capabilities', 'Generic workflow automation'],
        opportunity: 'Build AI-first automation with context-aware intelligence'
      },
      {
        company: 'Geotab',
        strengths: ['Extensive API integrations', 'Large data ecosystem'],
        weaknesses: ['Complex user interface', 'Steep learning curve'],
        opportunity: 'Create intuitive, role-based experiences with smart defaults'
      },
      {
        company: 'Verizon Connect',
        strengths: ['Enterprise-grade reliability', 'Global coverage'],
        weaknesses: ['Expensive', 'Slow innovation cycle'],
        opportunity: 'Fast iteration with customer-driven features at competitive pricing'
      }
    ]
  },

  research: {
    introduction: [
      'We conducted in-depth Jobs to Be Done research with three key personas to understand what they were trying to accomplish and design automation workflows that helped them succeed.'
    ],
    personas: [
      {
        id: 'safety-manager',
        name: 'Sarah Chen',
        title: 'Fleet Safety Manager',
        pain: "When Sarah starts her morning, she needs to identify high-risk drivers and prevent accidents before they happen, but she's overwhelmed by hundreds of safety alerts with no clear prioritization.",
        painPoints: [
          'Receives 500+ alerts daily across 200 vehicles',
          "Can't distinguish critical safety issues from minor infractions",
          'Spends 3+ hours manually reviewing dashcam footage',
          'No systematic way to track driver coaching effectiveness'
        ],
        quote: 'I need to know which drivers need immediate attention, not just a list of every hard brake that happened yesterday.',
        automationRule: {
          trigger: 'AI detects high-risk driving pattern',
          conditions: [
            'Driver has 3+ harsh braking events in 24 hours',
            'Speed violation in school zone',
            'Distracted driving detected by dashcam AI'
          ],
          actions: [
            'Auto-assign coaching session to driver',
            'Notify safety manager with video clips',
            'Create incident report with timeline',
            'Schedule follow-up review in 7 days'
          ],
          result: 'Proactive intervention reduces accidents by 42%'
        },
        metrics: [
          { value: '42%', label: 'Accident Reduction', change: '+42%' },
          { value: '6 hrs', label: 'Time Saved Weekly', change: '-75%' },
          { value: '94%', label: 'Driver Engagement', change: '+31%' }
        ]
      },
      {
        id: 'operations-manager',
        name: 'Marcus Thompson',
        title: 'Fleet Operations Manager',
        pain: 'When Marcus plans weekly routes, he needs to optimize fuel costs and vehicle utilization, but he lacks visibility into real-time vehicle health and driver availability.',
        painPoints: [
          'Discovers maintenance issues only when vehicles break down',
          "Can't predict which vehicles will be available tomorrow",
          'Manual fuel cost tracking across 150 vehicles',
          'No insight into optimal route efficiency'
        ],
        quote: "I'm always playing catch-up. I need to see problems coming before they disrupt our operations.",
        automationRule: {
          trigger: 'Predictive maintenance algorithm detects anomaly',
          conditions: [
            'Engine diagnostic code detected',
            'Unusual fuel consumption pattern',
            'Tire pressure below threshold',
            'Scheduled maintenance due within 7 days'
          ],
          actions: [
            'Auto-schedule maintenance appointment',
            'Reassign upcoming routes to available vehicles',
            'Order replacement parts automatically',
            'Notify operations manager with cost estimate'
          ],
          result: '28% reduction in unexpected breakdowns'
        },
        metrics: [
          { value: '28%', label: 'Breakdown Reduction', change: '+28%' },
          { value: '$1.2M', label: 'Fuel Savings Annual', change: '+18%' },
          { value: '91%', label: 'Vehicle Utilization', change: '+12%' }
        ]
      },
      {
        id: 'executive',
        name: 'Jennifer Rodriguez',
        title: 'VP of Fleet Operations',
        pain: 'When Jennifer presents to the board, she needs to demonstrate ROI and operational improvements, but her team spends days compiling reports from multiple systems.',
        painPoints: [
          'Data scattered across 5 different platforms',
          'Manual report generation takes 2-3 days per month',
          "Can't quickly answer \"what if\" scenario questions",
          'No real-time visibility into KPIs'
        ],
        quote: 'I need one source of truth that shows the complete picture of our fleet performance, updated in real-time.',
        automationRule: {
          trigger: 'End of month or custom date range',
          conditions: [
            'All vehicle data synchronized',
            'Incidents categorized and verified',
            'Maintenance records updated',
            'Fuel costs reconciled'
          ],
          actions: [
            'Auto-generate executive summary report',
            'Calculate ROI metrics and trends',
            'Create comparison charts vs. last period',
            'Email PDF report to stakeholders',
            'Schedule review meeting on calendar'
          ],
          result: 'Report generation time reduced from 3 days to 5 minutes'
        },
        metrics: [
          { value: '5 min', label: 'Report Generation', change: '-99%' },
          { value: '$180M', label: 'Customer Savings Total', change: '+180M' },
          { value: '250K+', label: 'Vehicles Monitored', change: '+2400%' }
        ]
      }
    ]
  },

  solution: {
    introduction: [
      'Based on our JTBD research, we designed an AI-first platform centered around three core principles:',
      '1. Proactive Intelligence - Predict and prevent issues before they escalate',
      '2. Contextual Automation - Automate workflows based on user roles and goals',
      '3. Unified Data - Single source of truth for all fleet operations'
    ],
    approach: [
      'We redesigned the platform architecture around user jobs rather than data types',
      'Implemented AI-powered prioritization that surfaced critical actions first',
      'Created role-based dashboards with intelligent defaults',
      'Built flexible automation rules that users could customize to their workflows'
    ],
    beforeAfter: [
      {
        before: {
          title: 'Alert Overload',
          description: 'Fleet managers received 500+ daily alerts with no prioritization',
          painPoints: [
            'Equal weight given to all alerts',
            'No context about severity',
            'Manual triage required',
            'Critical incidents buried'
          ]
        },
        after: {
          title: 'AI-Powered Inbox',
          description: 'Smart prioritization surfaces critical actions first',
          benefits: [
            'AI ranks alerts by severity + impact',
            'Automatic categorization',
            'One-click bulk actions',
            'Critical alerts prominently displayed'
          ]
        },
        imagePlaceholder: 'Before/After comparison: Alert inbox transformation'
      },
      {
        before: {
          title: 'Manual Reporting',
          description: 'Teams spent 2-3 days compiling monthly reports',
          painPoints: [
            'Data from 5 different systems',
            'Manual data entry and verification',
            'Inconsistent formatting',
            'Always out of date'
          ]
        },
        after: {
          title: 'Automated Insights',
          description: 'Real-time dashboards with custom report generation',
          benefits: [
            'Unified data source',
            'Automated report generation',
            'Real-time updates',
            '5-minute custom reports'
          ]
        },
        imagePlaceholder: 'Before/After comparison: Reporting workflow'
      }
    ],
    keyFeatures: [
      'AI-powered alert prioritization',
      'Custom automation workflows',
      'Role-based dashboards',
      'Predictive maintenance',
      'Real-time KPI tracking',
      'Automated coaching workflows'
    ]
  },

  features: {
    introduction: [
      "The automation workflow system became the platform's killer feature, allowing users to create custom rules that matched their specific operational needs."
    ],
    automationWorkflow: {
      title: 'Flexible Automation Engine',
      description: 'Visual workflow builder that allows users to create IF-THIS-THEN-THAT rules for any fleet operation',
      steps: [
        {
          number: 1,
          title: 'Define Trigger',
          description: 'Select from 50+ event types including driving behavior, vehicle health, geofence entry/exit, and time-based schedules'
        },
        {
          number: 2,
          title: 'Set Conditions',
          description: 'Add filters and logic to ensure automation only runs when specific criteria are met'
        },
        {
          number: 3,
          title: 'Configure Actions',
          description: 'Choose from 30+ actions like sending notifications, creating tasks, generating reports, or updating records'
        },
        {
          number: 4,
          title: 'Monitor Results',
          description: 'Track automation performance with detailed analytics and optimize rules based on outcomes'
        }
      ],
      benefits: [
        'Users created 10,000+ custom automation rules',
        'Reduced manual work by average of 15 hours per week per user',
        'Enabled 24/7 fleet monitoring without additional staff',
        'Scaled operations without linear cost increase'
      ]
    },
    personaFeatures: [
      {
        personaId: 'safety-manager',
        personaName: 'Sarah Chen',
        personaTitle: 'Fleet Safety Manager',
        jobToBeDone: 'Identify high-risk drivers and prevent accidents before they happen',
        features: [
          {
            title: 'AI-Powered Alert Prioritization',
            description: 'Machine learning ranks alerts by severity and impact, surfacing critical safety issues first',
            solves: [
              'Overwhelmed by 500+ daily alerts',
              'No clear prioritization of safety issues',
              'Critical incidents buried in noise'
            ],
            benefits: [
              'Reduced alert processing time by 75%',
              '42% reduction in accidents',
              'Focus on high-impact interventions'
            ]
          },
          {
            title: 'AI Dashcam Analysis',
            description: 'Computer vision automatically detects distracted driving, harsh events, and near-misses in real-time',
            solves: [
              'Spends 3+ hours manually reviewing footage',
              'Can\'t review all incidents',
              'Delayed response to safety issues'
            ],
            benefits: [
              'Automatic incident detection and compilation',
              'Real-time alerts for critical events',
              'Video evidence ready for coaching'
            ]
          },
          {
            title: 'Automated Driver Coaching',
            description: 'System automatically assigns coaching sessions based on driving patterns and tracks completion',
            solves: [
              'No systematic way to track coaching',
              'Manual assignment is time-consuming',
              'Can\'t measure coaching effectiveness'
            ],
            benefits: [
              '94% coaching completion rate',
              'Automated assignment and tracking',
              'Measurable improvement trends'
            ]
          }
        ],
        impact: 'Sarah now spends 6 hours less per week on manual review, accident rates dropped 42%, and driver engagement increased to 94%'
      },
      {
        personaId: 'operations-manager',
        personaName: 'Marcus Thompson',
        personaTitle: 'Fleet Operations Manager',
        jobToBeDone: 'Optimize fuel costs and vehicle utilization while preventing breakdowns',
        features: [
          {
            title: 'Predictive Maintenance',
            description: 'Machine learning analyzes diagnostic codes and usage patterns to predict maintenance needs before failures',
            solves: [
              'Discovers issues only when vehicles break down',
              'Can\'t predict availability',
              'Unexpected breakdowns disrupt operations'
            ],
            benefits: [
              '28% reduction in unexpected breakdowns',
              '7-day advance warning for maintenance',
              'Automatic parts ordering integration'
            ]
          },
          {
            title: 'Automated Route Reassignment',
            description: 'When maintenance is scheduled, system automatically reassigns routes to available vehicles',
            solves: [
              'Manual route planning is time-consuming',
              'Last-minute scrambles for vehicle swaps',
              'Poor vehicle utilization'
            ],
            benefits: [
              '91% vehicle utilization rate',
              'Automated route optimization',
              'Reduced operational disruptions'
            ]
          },
          {
            title: 'Fuel Optimization Tracking',
            description: 'Real-time fuel consumption monitoring with anomaly detection and driver coaching',
            solves: [
              'Manual fuel cost tracking',
              'Can\'t identify fuel waste patterns',
              'No driver accountability'
            ],
            benefits: [
              '$1.2M annual fuel savings',
              '18% improvement in fuel efficiency',
              'Automated driver feedback'
            ]
          }
        ],
        impact: 'Marcus achieved 28% fewer breakdowns, 91% vehicle utilization, and saved $1.2M annually in fuel costs'
      },
      {
        personaId: 'executive',
        personaName: 'Jennifer Rodriguez',
        personaTitle: 'VP of Fleet Operations',
        jobToBeDone: 'Demonstrate ROI and operational improvements with real-time data',
        features: [
          {
            title: 'Automated Executive Reports',
            description: 'One-click report generation with KPIs, trends, and ROI calculations across all fleet operations',
            solves: [
              'Report generation takes 2-3 days',
              'Data scattered across 5 systems',
              'Always out of date by presentation time'
            ],
            benefits: [
              'Reports generated in 5 minutes',
              'Real-time data updates',
              'Customizable for different audiences'
            ]
          },
          {
            title: 'Real-Time KPI Dashboard',
            description: 'Live dashboard with customizable metrics, trends, and comparisons across time periods',
            solves: [
              'Can\'t quickly answer "what if" questions',
              'No real-time visibility into KPIs',
              'Manual data compilation'
            ],
            benefits: [
              'Instant access to all metrics',
              'Historical trend analysis',
              'Scenario planning capabilities'
            ]
          },
          {
            title: 'ROI Calculator',
            description: 'Automated calculation of cost savings, accident prevention value, and operational improvements',
            solves: [
              'Difficult to quantify platform value',
              'Manual ROI calculations',
              'No unified data source'
            ],
            benefits: [
              '450% average first-year ROI',
              '$180M+ in customer savings tracked',
              'Automated stakeholder reporting'
            ]
          }
        ],
        impact: 'Jennifer reduced report generation from 3 days to 5 minutes, enabling data-driven decisions and demonstrating $180M+ in customer value'
      }
    ],
    detailedFeatures: [
      {
        title: 'AI Dashcam Analysis',
        description: 'Computer vision analyzes dashcam footage in real-time to detect distracted driving, harsh events, and near-misses',
        capabilities: [
          'Real-time driver behavior scoring',
          'Automatic incident video compilation',
          'Privacy-focused facial detection',
          'Integration with coaching workflows'
        ]
      },
      {
        title: 'Predictive Maintenance',
        description: 'Machine learning predicts vehicle maintenance needs before breakdowns occur',
        capabilities: [
          'Engine diagnostic code interpretation',
          'Fuel consumption anomaly detection',
          'Tire pressure monitoring',
          'Automatic parts ordering integration'
        ]
      },
      {
        title: 'Driver Coaching System',
        description: 'Automated workflow for identifying, coaching, and tracking driver improvement',
        capabilities: [
          'Automatic coaching assignment',
          'Progress tracking dashboard',
          'Gamification and incentives',
          'Improvement trend analysis'
        ]
      }
    ]
  },

  scale: {
    introduction: [
      'Scaling from 10,000 to 250,000+ vehicles required rethinking our entire technical architecture while maintaining sub-second response times.'
    ],
    technicalImplementation: {
      title: 'Cloud-Native Architecture',
      description: 'Microservices architecture with event-driven processing and real-time data streaming',
      components: [
        {
          name: 'Real-Time Processing Engine',
          description: 'Processes 5M+ events per minute from IoT devices',
          technologies: ['Apache Kafka', 'AWS Kinesis', 'Redis']
        },
        {
          name: 'AI/ML Pipeline',
          description: 'Runs 20+ machine learning models for prediction and classification',
          technologies: ['TensorFlow', 'AWS SageMaker', 'Python']
        },
        {
          name: 'Frontend Platform',
          description: 'React-based SPA with optimized rendering for large datasets',
          technologies: ['React', 'TypeScript', 'GraphQL', 'Tailwind CSS']
        }
      ]
    },
    architecture: [
      {
        title: 'Event-Driven Processing',
        description: 'All vehicle events flow through Kafka for real-time processing and historical analysis',
        details: [
          'Decoupled microservices for independent scaling',
          'Event sourcing for complete audit trail',
          'CQRS pattern for read/write optimization'
        ]
      },
      {
        title: 'Intelligent Caching',
        description: 'Multi-layer caching strategy keeps most-accessed data instantly available',
        details: [
          'Redis for hot data (active vehicles)',
          'ElasticSearch for search and analytics',
          'CloudFront CDN for static assets'
        ]
      }
    ],
    performanceMetrics: [
      { metric: 'API Response Time', value: '<200ms', description: '99th percentile' },
      { metric: 'Dashboard Load', value: '<1.5s', description: 'First contentful paint' },
      { metric: 'Real-time Updates', value: '<2s', description: 'From device to dashboard' },
      { metric: 'System Uptime', value: '99.95%', description: 'Monthly average' }
    ]
  },

  impact: {
    introduction: [
      'The platform delivered measurable impact across safety, operational efficiency, and financial performance.'
    ],
    categories: [
      {
        id: 'safety',
        title: 'Safety Improvements',
        description: 'Significant reduction in accidents and driver incidents',
        metrics: [
          { value: '42%', label: 'Accident Reduction', trend: 'positive' },
          { value: '67%', label: 'Harsh Braking Events', trend: 'positive' },
          { value: '84%', label: 'Speeding Incidents', trend: 'positive' }
        ],
        details: [
          'Predictive alerts prevented 12,000+ potential accidents',
          'Driver coaching completion rate increased to 94%',
          'Average safety score improved from 72 to 89',
          'Insurance premiums reduced by average of 23%'
        ]
      },
      {
        id: 'efficiency',
        title: 'Operational Efficiency',
        description: 'Streamlined workflows and automation reduced manual work',
        metrics: [
          { value: '15 hrs', label: 'Time Saved Weekly', trend: 'positive' },
          { value: '28%', label: 'Breakdown Reduction', trend: 'positive' },
          { value: '91%', label: 'Vehicle Utilization', trend: 'positive' }
        ],
        details: [
          'Report generation time reduced from 3 days to 5 minutes',
          'Automation handled 85% of routine tasks',
          'Maintenance costs decreased by 31%',
          'Vehicle downtime reduced by 43%'
        ]
      },
      {
        id: 'financial',
        title: 'Financial Impact',
        description: 'Significant cost savings and revenue growth for customers',
        metrics: [
          { value: '$180M+', label: 'Customer Savings', trend: 'positive' },
          { value: '18%', label: 'Fuel Cost Reduction', trend: 'positive' },
          { value: '250K+', label: 'Vehicles Monitored', trend: 'positive' }
        ],
        details: [
          'Average customer ROI of 450% in first year',
          'Fuel optimization saved $1.2M+ per large fleet annually',
          'Reduced insurance costs by $800K+ per 1000 vehicles',
          'Platform scaled 25x with only 2x operational cost increase'
        ]
      }
    ]
  },

  challenges: {
    introduction: [
      'Building a platform at this scale came with significant technical and design challenges that required innovative solutions.'
    ],
    challenges: [
      {
        title: 'Balancing Power and Simplicity',
        description: 'The platform needed to serve both novice users who wanted simple defaults and power users who needed deep customization.',
        solution: 'We implemented a progressive disclosure pattern with smart defaults. New users saw simplified views with preset workflows, while experienced users could access advanced customization through clear secondary navigation.',
        learnings: [
          'Default configurations handled 80% of use cases',
          'Power users discovered advanced features through in-app guidance',
          'Reduced support tickets by 45% with better onboarding'
        ]
      },
      {
        title: 'Real-Time Performance at Scale',
        description: 'Processing 5M+ events per minute while maintaining sub-second dashboard updates was technically challenging.',
        solution: 'We implemented a tiered architecture with hot/warm/cold data paths. Critical real-time data flowed through Redis, while historical analysis used ElasticSearch and S3.',
        learnings: [
          'Optimizing the data layer had more impact than frontend optimization',
          'Strategic caching reduced API calls by 90%',
          'WebSocket connections for real-time updates were more efficient than polling'
        ]
      },
      {
        title: 'Privacy and Dashcam Ethics',
        description: 'Balancing safety monitoring with driver privacy concerns was a constant challenge.',
        solution: 'We designed privacy-first features: blur faces by default, no audio recording, driver-triggered recording deletion, and transparent data policies displayed in the product.',
        learnings: [
          'Transparency builds trust - drivers appreciated knowing exactly what was recorded',
          'Privacy features actually increased adoption rates',
          'Clear policies reduced legal concerns for fleet managers'
        ]
      }
    ]
  },

  learnings: {
    introduction: [
      'Four years of building and scaling this platform taught us valuable lessons about product design at scale.'
    ],
    keyTakeaways: [
      {
        title: 'Jobs to Be Done > Feature Lists',
        description: 'Understanding what users are trying to accomplish led to better features than copying competitors.',
        impact: "Our automation workflows became the platform's key differentiator, cited by 87% of customers as the primary reason they chose Numaris."
      },
      {
        title: 'AI Should Augment, Not Replace',
        description: 'The best AI features enhanced human decision-making rather than trying to fully automate it.',
        impact: 'Alert prioritization + human review performed 35% better than either AI alone or manual triage.'
      },
      {
        title: 'Design Systems Enable Scale',
        description: 'Investing early in a robust design system paid dividends as the team and product grew.',
        impact: 'Design system reduced new feature design time by 60% and maintained visual consistency across 200+ screens.'
      },
      {
        title: 'Performance is a Feature',
        description: 'Users explicitly mentioned speed and reliability as reasons for platform adoption.',
        impact: 'Maintaining <200ms API response times became a competitive advantage mentioned in 12% of sales wins.'
      }
    ],
    recommendations: [
      'Invest in understanding user jobs before building features',
      'Build automation that adapts to user workflows, not vice versa',
      'Design for scale from day one - refactoring is expensive',
      'Make privacy and ethics core product values, not afterthoughts',
      'Measure what matters - vanity metrics mislead, outcome metrics guide'
    ]
  },

  results: {
    introduction: [
      'The Numaris platform transformed fleet operations for hundreds of companies and continues to grow rapidly.'
    ],
    categories: [
      {
        id: 'platform-growth',
        title: 'Platform Growth',
        metrics: [
          { value: '250,000+', label: 'Vehicles Monitored', change: '+2,400%' },
          { value: '500+', label: 'Enterprise Customers', change: '+380%' },
          { value: '94%', label: 'Customer Retention', change: '+12%' },
          { value: '10,000+', label: 'Custom Automations', change: 'New capability' }
        ],
        highlights: [
          'Scaled from 10K to 250K+ vehicles in 2 years',
          'Expanded from US market to 15 countries',
          'Industry-leading 94% customer retention rate',
          'Zero unplanned downtime in last 18 months'
        ]
      },
      {
        id: 'customer-outcomes',
        title: 'Customer Outcomes',
        metrics: [
          { value: '$180M+', label: 'Total Customer Savings', change: '+$180M' },
          { value: '42%', label: 'Average Accident Reduction', change: '+42%' },
          { value: '450%', label: 'Average First-Year ROI', change: '+450%' },
          { value: '15 hrs', label: 'Weekly Time Savings', change: '-75%' }
        ],
        highlights: [
          'Customers saved $180M+ in operational costs',
          'Prevented 12,000+ accidents through predictive alerts',
          'Reduced driver coaching time by 75% through automation',
          'Improved fleet fuel efficiency by average of 18%'
        ]
      },
      {
        id: 'product-excellence',
        title: 'Product Excellence',
        metrics: [
          { value: '4.8/5', label: 'User Satisfaction Score', change: '+0.6' },
          { value: '<200ms', label: 'Average API Response', change: '-65%' },
          { value: '99.95%', label: 'System Uptime', change: '+0.15%' },
          { value: '87%', label: 'Feature Adoption', change: '+42%' }
        ],
        highlights: [
          'Highest rated fleet management platform on G2 and Capterra',
          'Maintained sub-second performance while scaling 25x',
          'Design system enabled 60% faster feature development',
          'Accessibility AA compliance across all features'
        ]
      }
    ],
    quote: {
      text: "Numaris transformed how we operate. The AI automation handles the routine work, so our team can focus on strategic improvements. We've reduced accidents by 47% and saved over $2.3M in the first year alone.",
      author: 'Jennifer Martinez',
      role: 'VP of Fleet Operations, National Logistics Company'
    }
  },

  relatedStudies: []
}
