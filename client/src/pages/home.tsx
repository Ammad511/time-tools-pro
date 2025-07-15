import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Head } from "@/components/seo/head";

const tools = [
  {
    id: "epoch-converter",
    title: "Epoch/Unix Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates instantly.",
    icon: "fas fa-exchange-alt",
    color: "primary"
  },
  {
    id: "world-clock",
    title: "World Clock",
    description: "View current time in multiple time zones around the world.",
    icon: "fas fa-globe",
    color: "emerald"
  },
  {
    id: "timezone-converter",
    title: "Time Zone Converter",
    description: "Convert time between different time zones with ease.",
    icon: "fas fa-map-marked-alt",
    color: "purple"
  },
  {
    id: "countdown-timer",
    title: "Countdown Timer",
    description: "Create customizable countdown timers for any date or time.",
    icon: "fas fa-hourglass-half",
    color: "red"
  },
  {
    id: "age-calculator",
    title: "Age Calculator",
    description: "Calculate exact age in years, months, days, and more.",
    icon: "fas fa-birthday-cake",
    color: "orange"
  },
  {
    id: "time-difference",
    title: "Time Difference Calculator",
    description: "Calculate the difference between two dates and times.",
    icon: "fas fa-minus",
    color: "teal"
  },
  {
    id: "date-generator",
    title: "Time and Date Generator",
    description: "Generate random dates and times for testing purposes.",
    icon: "fas fa-calendar-plus",
    color: "indigo"
  },
  {
    id: "week-number",
    title: "Week Number Finder",
    description: "Find the ISO week number for any given date.",
    icon: "fas fa-calendar-week",
    color: "pink"
  },
  {
    id: "working-days",
    title: "Working Days Calculator",
    description: "Calculate working days between two dates, excluding weekends.",
    icon: "fas fa-briefcase",
    color: "green"
  },
  {
    id: "time-api",
    title: "Current Time API Tool",
    description: "Access current time data via API for your applications.",
    icon: "fas fa-code",
    color: "blue"
  }
];

const features = [
  {
    icon: "fas fa-rocket",
    title: "Fast & Reliable",
    description: "Lightning-fast calculations with 99.9% accuracy guarantee",
    color: "primary"
  },
  {
    icon: "fas fa-mobile-alt",
    title: "Mobile Friendly",
    description: "Fully responsive design works perfectly on all devices",
    color: "emerald"
  },
  {
    icon: "fas fa-shield-alt",
    title: "Privacy First",
    description: "All calculations are done locally - your data never leaves your device",
    color: "purple"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head 
        title="TimeTools Pro - Professional Date & Time Utilities"
        description="Professional suite of date and time tools including Unix timestamp converter, world clock, timezone converter, countdown timer, age calculator and more."
        keywords="unix timestamp, epoch converter, world clock, timezone converter, countdown timer, age calculator, time tools"
        path="/"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Professional <span className="text-primary">Time Tools</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Complete suite of date and time utilities for developers, professionals, and anyone who works with time data. Fast, accurate, and mobile-friendly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools">
                <Button size="lg" className="px-8 py-3">
                  Explore Tools
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="px-8 py-3">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from our comprehensive collection of time and date utilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link key={tool.id} href="/tools">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 dark:border-slate-700 cursor-pointer group">
                  <div className="flex items-center mb-4">
                    <div className={`bg-${tool.color}-100 dark:bg-${tool.color}-900 p-3 rounded-lg`}>
                      <i className={`${tool.icon} text-${tool.color}-600 dark:text-${tool.color}-400 text-xl`}></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">{tool.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
                  <div className="text-primary group-hover:text-primary-700 font-medium">
                    Use Tool <i className="fas fa-arrow-right ml-1"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose TimeTools Pro?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built for professionals who need reliable, fast, and accurate time utilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`bg-${feature.color}-100 dark:bg-${feature.color}-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${feature.icon} text-${feature.color}-600 dark:text-${feature.color}-400 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
