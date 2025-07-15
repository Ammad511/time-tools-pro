import { useState, useRef, useEffect } from "react";
import { Head } from "@/components/seo/head";
import { ToolSelector } from "@/components/tools/tool-selector";
import { EpochConverter } from "@/components/tools/epoch-converter";
import { WorldClock } from "@/components/tools/world-clock";
import { TimezoneConverter } from "@/components/tools/timezone-converter";
import { CountdownTimer } from "@/components/tools/countdown-timer";
import { AgeCalculator } from "@/components/tools/age-calculator";
import { TimeDifference } from "@/components/tools/time-difference";
import { DateGenerator } from "@/components/tools/date-generator";
import { WeekNumber } from "@/components/tools/week-number";
import { WorkingDays } from "@/components/tools/working-days";
import { TimeApi } from "@/components/tools/time-api";

const toolComponents = {
  "epoch-converter": EpochConverter,
  "world-clock": WorldClock,
  "timezone-converter": TimezoneConverter,
  "countdown-timer": CountdownTimer,
  "age-calculator": AgeCalculator,
  "time-difference": TimeDifference,
  "date-generator": DateGenerator,
  "week-number": WeekNumber,
  "working-days": WorkingDays,
  "time-api": TimeApi,
};

export default function Tools() {
  const [activeTool, setActiveTool] = useState("epoch-converter");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const toolSectionRef = useRef<HTMLDivElement>(null);
  
  const ActiveToolComponent = toolComponents[activeTool as keyof typeof toolComponents];

  // Handle URL hash changes for direct tool links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && toolComponents[hash as keyof typeof toolComponents]) {
        setActiveTool(hash);
        setTimeout(() => {
          if (toolSectionRef.current) {
            const headerHeight = 64;
            const elementPosition = toolSectionRef.current.offsetTop - headerHeight;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    // Check hash on component mount
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleToolChange = (toolId: string) => {
    if (toolId === activeTool) return;
    
    setIsTransitioning(true);
    
    // Small delay to show transition
    setTimeout(() => {
      setActiveTool(toolId);
      setIsTransitioning(false);
    }, 150);
    
    // Update URL hash
    window.history.pushState(null, '', `#${toolId}`);
    
    // Smooth scroll to tool section
    if (toolSectionRef.current) {
      const headerHeight = 64; // Account for navbar height
      const elementPosition = toolSectionRef.current.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen py-8 bg-white dark:bg-slate-900">
      <Head 
        title="Professional Time Tools - TimeTools Pro"
        description="Access our complete suite of time and date tools including Unix timestamp converter, world clock, timezone converter, and more professional utilities."
        keywords="time tools, date tools, unix timestamp, world clock, timezone converter, countdown timer"
        path="/tools"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Time Tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select a tool to get started with your time and date calculations
          </p>
        </div>
        
        <ToolSelector activeTool={activeTool} onToolChange={handleToolChange} />
        
        <div 
          ref={toolSectionRef}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-4 md:p-6 lg:p-8 transition-all duration-500 ease-in-out transform tool-section-scroll-indicator"
          style={{
            minHeight: '500px',
            opacity: !isTransitioning ? 1 : 0.7,
            transform: !isTransitioning ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          <div className="tool-content-wrapper">
            {isTransitioning ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            ) : (
              <ActiveToolComponent />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
