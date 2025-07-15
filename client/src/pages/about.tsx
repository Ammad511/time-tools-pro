import { Head } from "@/components/seo/head";

export default function About() {
  return (
    <div className="min-h-screen py-20 bg-white dark:bg-slate-900">
      <Head 
        title="About TimeTools Pro - Professional Time Utilities"
        description="Learn about TimeTools Pro, our mission to provide professional-grade time and date utilities for developers and professionals worldwide."
        keywords="about timetools pro, time utilities, date tools, professional tools"
        path="/about"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About TimeTools Pro
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Professional time and date utilities for modern workflows
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 mb-8">
            <p className="text-lg mb-6">
              TimeTools Pro is a comprehensive suite of time and date utilities designed for developers, 
              professionals, and anyone who needs reliable time calculations. Our tools are built with 
              accuracy, speed, and user experience in mind.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Features</h2>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>10 Professional time and date tools</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Mobile-responsive design</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Dark mode support</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Privacy-focused (all calculations done locally)</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Fast loading and optimized performance</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>SEO-optimized for easy discovery</span>
              </li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  <i className="fas fa-exchange-alt text-primary mr-2"></i>
                  Epoch/Unix Timestamp Converter
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Convert between Unix timestamps and human-readable dates with precision.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  <i className="fas fa-globe text-emerald-600 mr-2"></i>
                  World Clock
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  View current time in multiple time zones simultaneously.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  <i className="fas fa-map-marked-alt text-purple-600 mr-2"></i>
                  Time Zone Converter
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Convert time between different time zones effortlessly.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  <i className="fas fa-hourglass-half text-red-600 mr-2"></i>
                  Countdown Timer
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Create customizable countdown timers for events and deadlines.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  <i className="fas fa-birthday-cake text-orange-600 mr-2"></i>
                  Age Calculator
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Calculate exact age in years, months, days, and more units.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  <i className="fas fa-briefcase text-green-600 mr-2"></i>
                  Working Days Calculator
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Calculate business days between dates, excluding weekends.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Privacy & Security</h2>
            <p className="mb-6">
              Your privacy is important to us. All calculations are performed locally in your browser, 
              and no data is sent to our servers. We don't track your usage or store any personal information.
              This ensures your sensitive time data remains completely private and secure.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Technical Excellence</h2>
            <p className="mb-6">
              TimeTools Pro is built using modern web technologies including React, TypeScript, and Tailwind CSS.
              Our tools are optimized for performance, accessibility, and mobile devices. We follow SEO best 
              practices to ensure our tools are easily discoverable when you need them most.
            </p>
            
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 mt-8">
              <div className="flex items-start">
                <i className="fas fa-lightbulb text-primary mt-1 mr-3"></i>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Built for Professionals</h4>
                  <p className="text-sm text-primary-700 dark:text-primary-300">
                    Whether you're a developer working with APIs, a project manager tracking deadlines, 
                    or a professional dealing with international time zones, TimeTools Pro provides 
                    the accuracy and reliability you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
