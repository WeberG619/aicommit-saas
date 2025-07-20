'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Sparkles, CheckCircle2, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const demoSteps = [
  {
    id: 1,
    title: "1. Make your changes",
    description: "Write your code and stage your changes with git add",
    code: `// Before: Authentication logic
function login(email, password) {
  // Basic auth
  return authenticate(email, password);
}

// After: Enhanced with remember me
function login(email, password, rememberMe = false) {
  const user = authenticate(email, password);
  
  if (user && rememberMe) {
    localStorage.setItem('rememberUser', user.id);
  }
  
  return user;
}`,
    gitDiff: `+ Added remember me functionality to login
+ Enhanced user authentication flow
+ Added localStorage for persistent sessions`,
    fileName: "auth.js"
  },
  {
    id: 2,
    title: "2. Run Git Commit AI",
    description: "Let AI analyze your changes and generate the perfect commit message",
    command: "gca commit",
    processing: true
  },
  {
    id: 3,
    title: "3. Get your AI-generated commit",
    description: "Review the intelligent, contextual commit message",
    commitMessage: "feat(auth): add remember me functionality and persistent sessions\n\n- Add rememberMe parameter to login function\n- Implement localStorage for session persistence\n- Enhance user authentication flow with optional memory\n- Improve user experience with persistent login state",
    commitType: "feat",
    commitScope: "auth"
  }
];

export function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCommitMessage, setShowCommitMessage] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStep < demoSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, currentStep === 1 ? 2000 : 3000); // Shorter delay for processing step

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying]);

  // Typing effect for commit message
  useEffect(() => {
    if (currentStep === 2) {
      setShowCommitMessage(true);
      const message = demoSteps[2].commitMessage;
      if (!message) return;
      
      let i = 0;
      const typing = setInterval(() => {
        setTypedText(message.slice(0, i));
        i++;
        if (i > message.length) {
          clearInterval(typing);
        }
      }, 30);
      return () => clearInterval(typing);
    }
  }, [currentStep]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (currentStep === demoSteps.length - 1) {
      setCurrentStep(0);
      setShowCommitMessage(false);
      setTypedText('');
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setShowCommitMessage(false);
    setTypedText('');
  };

  const copyCommitMessage = () => {
    const message = demoSteps[2].commitMessage;
    if (message) {
      navigator.clipboard.writeText(message);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            See Git Commit AI in Action
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Watch how AI transforms your code changes into professional, meaningful commit messages
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Demo Controls */}
            <div className="space-y-6">
              {/* Progress Indicator */}
              <div className="flex items-center space-x-4 mb-8">
                {demoSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        index <= currentStep 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      {index < currentStep ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                    </div>
                    {index < demoSteps.length - 1 && (
                      <div 
                        className={`w-16 h-0.5 mx-2 transition-colors ${
                          index < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`} 
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Current Step */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {demoSteps[currentStep].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {demoSteps[currentStep].description}
                  </p>

                  {/* Step-specific content */}
                  {currentStep === 0 && (
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                      <div className="text-green-400 mb-2"># {demoSteps[0].fileName}</div>
                      <pre className="text-gray-300 whitespace-pre-wrap overflow-x-auto">
                        {demoSteps[0].code}
                      </pre>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                        <div className="text-blue-400">$ {demoSteps[1].command}</div>
                        <div className="text-yellow-400 mt-2 flex items-center">
                          <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing your changes...
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-400">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-green-800 dark:text-green-200">
                              Commit message generated!
                            </span>
                          </div>
                          <button
                            onClick={copyCommitMessage}
                            className="p-1 hover:bg-green-100 dark:hover:bg-green-800 rounded"
                          >
                            {copiedMessage ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4 text-green-600" />
                            )}
                          </button>
                        </div>
                        <div className="bg-gray-900 rounded p-3 font-mono text-sm">
                          <pre className="text-green-400">{typedText}</pre>
                          {typedText.length < (demoSteps[2].commitMessage?.length || 0) && (
                            <span className="animate-pulse">|</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                          <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Type</div>
                          <div className="text-blue-600 dark:text-blue-400 font-mono">{demoSteps[2].commitType || 'feat'}</div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                          <div className="text-sm font-medium text-purple-800 dark:text-purple-200">Scope</div>
                          <div className="text-purple-600 dark:text-purple-400 font-mono">{demoSteps[2].commitScope || 'auth'}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={isPlaying ? () => setIsPlaying(false) : handlePlay}
                  className="flex items-center space-x-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play Demo'}</span>
                </Button>
                
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Benefits Sidebar */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Why Developers Love Git Commit AI
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Saves 10+ minutes daily</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">No more struggling with commit messages</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Follows best practices</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Conventional commits, proper formatting</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Improves team collaboration</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Clear, descriptive commit history</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Works with any codebase</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Supports all programming languages</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Ready to try it yourself?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Start your free 14-day trial and experience the magic of AI-powered commits.
                </p>
                <Button className="w-full">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}