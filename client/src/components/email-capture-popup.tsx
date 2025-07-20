'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Mail, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailCapturePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export function EmailCapturePopup({ isOpen, onClose, onSubmit }: EmailCapturePopupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await onSubmit(email);
    setIsSubmitting(false);
    setEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Content */}
              <div className="text-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Get 50% Off Your First Month!
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300">
                  Join our newsletter and get exclusive Git tips, plus a discount code for your first subscription.
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <div className="flex items-center text-sm text-blue-800 dark:text-blue-200 mb-2">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="font-medium">What you'll get:</span>
                </div>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Weekly Git best practices and tips</li>
                  <li>• Early access to new features</li>
                  <li>• Exclusive discount codes</li>
                  <li>• Free Git workflow templates</li>
                </ul>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !email}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Get My 50% Discount'}
                </Button>
              </form>

              {/* Trust Elements */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No spam. Unsubscribe anytime. Used by 12,000+ developers.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook for managing the popup
export function useEmailCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup was already shown
    const popupShown = localStorage.getItem('emailPopupShown');
    if (popupShown) {
      setHasShown(true);
      return;
    }

    // Show popup after 30 seconds or on exit intent
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem('emailPopupShown', 'true');
      }
    }, 30000);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem('emailPopupShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const closePopup = () => setIsOpen(false);
  
  const handleEmailSubmit = async (email: string) => {
    // Here you would integrate with your email service (Mailchimp, ConvertKit, etc.)
    console.log('Email submitted:', email);
    
    // For now, just show a success message
    alert('Thanks! Check your email for your discount code.');
    
    // In production, you'd call your API:
    // await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
  };

  return {
    isOpen,
    closePopup,
    handleEmailSubmit,
  };
}