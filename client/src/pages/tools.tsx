import { useState } from "react";
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
  
  const ActiveToolComponent = toolComponents[activeTool as keyof typeof toolComponents];

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
        
        <ToolSelector activeTool={activeTool} onToolChange={setActiveTool} />
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8">
          <ActiveToolComponent />
        </div>
      </div>
    </div>
  );
}
