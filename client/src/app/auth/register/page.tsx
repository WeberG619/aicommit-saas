'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { Code2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    plan: 'individual',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    const planFromUrl = searchParams.get('plan');
    if (planFromUrl && ['individual', 'team', 'enterprise'].includes(planFromUrl)) {
      setFormData(prev => ({ ...prev, plan: planFromUrl }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const planDetails = {
    individual: { name: 'Individual', price: '$19', color: 'text-blue-600' },
    team: { name: 'Team', price: '$47', color: 'text-purple-600' },
    enterprise: { name: 'Enterprise', price: '$97', color: 'text-green-600' },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
            <Code2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">Git Commit AI</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            Start your free trial
          </h2>
          <p className="mt-2 text-gray-600">
            14 days free, then {planDetails[formData.plan as keyof typeof planDetails].price}/month
          </p>
        </div>

        {/* Plan Selection */}
        <div className="bg-white p-4 rounded-lg border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selected Plan
          </label>
          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="individual">Individual - $19/month</option>
            <option value="team">Team - $47/month</option>
            <option value="enterprise">Enterprise - $97/month</option>
          </select>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {/* Trial Benefits */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-2">Your 14-day free trial includes:</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <CheckCircle2 className="h-4 w-4" />
                Unlimited AI-generated commits
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <CheckCircle2 className="h-4 w-4" />
                All commit styles and customization
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <CheckCircle2 className="h-4 w-4" />
                VS Code extension & CLI access
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <CheckCircle2 className="h-4 w-4" />
                No credit card required
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Creating account...' : 'Start free trial'}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Code2 className="h-8 w-8 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}