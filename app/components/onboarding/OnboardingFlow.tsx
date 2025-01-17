'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, BookOpen, Bookmark, Share, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: "Welcome to Stash Stash",
    description: "Your personal space for ideas that matter",
    icon: <BookOpen className="w-12 h-12" />,
    action: "Let's Begin"
  },
  {
    title: "Save Ideas",
    description: "Collect and organize ideas from anywhere on the web",
    icon: <Bookmark className="w-12 h-12" />,
    action: "Next"
  },
  {
    title: "Share & Connect",
    description: "Join a community of curious minds",
    icon: <Share className="w-12 h-12" />,
    action: "Get Started"
  }
];

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-lg mx-auto text-center px-4"
        >
          <div className="mb-8">
            {steps[currentStep].icon}
          </div>
          <h2 className="text-3xl font-bold mb-4">{steps[currentStep].title}</h2>
          <p className="text-xl text-gray-600 mb-8">{steps[currentStep].description}</p>
          <button
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-lg font-medium inline-flex items-center gap-2"
          >
            {steps[currentStep].action}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 