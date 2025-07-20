'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import { loadStripe } from '@stripe/stripe-js';
import { subscriptionsAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowLeft, CreditCard } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState('individual');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
      return;
    }

    const planFromUrl = searchParams.get('plan');
    if (planFromUrl && ['individual', 'team', 'enterprise'].includes(planFromUrl)) {
      setSelectedPlan(planFromUrl);
    }
  }, [user, loading, router, searchParams]);

  const plans = {
    individual: {
      name: 'Individual',
      price: 19,
      description: 'Perfect for individual developers',
      features: [
        'Unlimited AI-generated commits',
        'All commit styles',
        'VS Code extension',
        'CLI tool access',
        'Basic analytics',
        'Email support'
      ]
    },
    team: {
      name: 'Team',
      price: 47,
      description: 'Great for small development teams',
      features: [
        'Everything in Individual',
        'Up to 10 team members',
        'Shared commit styles',
        'Team analytics & insights',
        'Commit approval workflows',
        'Priority support'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      price: 97,
      description: 'For large organizations',
      features: [
        'Everything in Team',
        'Unlimited team members',
        'Custom integrations',
        'SSO authentication',
        'Advanced analytics',
        'Dedicated support manager'
      ]
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please log in to continue');
      return;
    }

    setIsLoading(true);
    try {
      const response = await subscriptionsAPI.createCheckout(selectedPlan);
      const checkoutUrl = response.data.checkoutUrl;
      
      // Redirect to Stripe Checkout
      window.location.href = checkoutUrl;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to create checkout session');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const currentPlan = plans[selectedPlan as keyof typeof plans];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ThemeToggle />
          </div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Start your 14-day free trial today</p>
        </div>

        {/* Plan Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer transition-all ${
                selectedPlan === key
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedPlan(key)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold dark:text-white">{plan.name}</h3>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPlan === key
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedPlan === key && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>
                
                <ul className="space-y-2">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-sm text-gray-500 dark:text-gray-400">
                      +{plan.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Order Summary */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Order Summary</h2>
              
              <div className="border dark:border-gray-700 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium dark:text-white">{currentPlan.name} Plan</span>
                  <span className="font-medium dark:text-white">${currentPlan.price}/month</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{currentPlan.description}</p>
                
                <div className="border-t dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center text-sm mb-2 dark:text-gray-300">
                    <span>14-day free trial</span>
                    <span className="text-green-600">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center font-medium dark:text-white">
                    <span>After trial period</span>
                    <span>${currentPlan.price}/month</span>
                  </div>
                </div>
              </div>

              {/* Trial Benefits */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                  Your free trial includes:
                </h3>
                <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Full access to all features
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    No credit card required
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Cancel anytime during trial
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Email reminders before billing
                  </li>
                </ul>
              </div>
            </div>

            {/* Account Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Account Information</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    value={user.name}
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  />
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                size="lg"
                className="w-full mb-4"
              >
                {isLoading ? (
                  'Processing...'
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Start Free Trial
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                You'll be redirected to Stripe to securely complete your subscription setup.
                No payment will be charged during your 14-day free trial.
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg className="h-4 w-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secured by Stripe • Your payment information is encrypted and secure
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}