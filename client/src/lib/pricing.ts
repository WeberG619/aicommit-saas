// Single source of truth for all pricing information
export const PRICING_PLANS = {
  individual: {
    name: 'Individual',
    price: '$9',
    period: '/month',
    description: 'Perfect for solo developers',
    features: [
      '500 commits/month',
      'All commit styles', 
      'Context-aware generation',
      'Quality scoring',
      'Web dashboard',
      'Email support'
    ],
    popular: false,
    ctaText: 'Start Free Trial',
    ctaLink: '/auth/register?plan=individual'
  },
  team: {
    name: 'Team',
    price: '$29',
    period: '/user/month',
    description: 'Growing development teams',
    features: [
      'Unlimited commits',
      'Team collaboration',
      'Advanced analytics', 
      'Priority support',
      'Custom styles',
      'Team insights',
      'Slack integration',
      'Advanced reporting'
    ],
    popular: true,
    ctaText: 'Start Free Trial',
    ctaLink: '/auth/register?plan=team'
  },
  enterprise: {
    name: 'Enterprise',
    price: 'Custom',
    period: '/month',
    description: 'Large organizations',
    features: [
      'Everything in Team',
      'On-premise deployment',
      'SAML/SSO authentication',
      'Advanced security controls',
      'SLA guarantees',
      'Dedicated support',
      'Custom integrations',
      'Compliance reporting'
    ],
    popular: false,
    ctaText: 'Contact Sales', 
    ctaLink: '/contact'
  }
} as const;

export type PlanType = keyof typeof PRICING_PLANS;