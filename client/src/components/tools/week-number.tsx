import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getWeekNumber } from "@/lib/time-utils";

export function WeekNumber() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{ weekNumber: number; year: number; date: string } | null>(null);

  const calculateWeekNumber = () => {
    if (!selectedDate) return;
    
    const date = new Date(selectedDate);
    const weekNumber = getWeekNumber(date);
    
    setResult({
      weekNumber,
      year: date.getFullYear(),
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });
  };

  const getCurrentWeek = () => {
    const today = new Date();
    setSelectedDate(today.toISOString().split('T')[0]);
    const weekNumber = getWeekNumber(today);
    
    setResult({
      weekNumber,
      year: today.getFullYear(),
      date: today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Week Number Finder</h2>
        <p className="text-gray-600 dark:text-gray-300">Find the ISO week number for any given date</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label htmlFor="selectedDate">Select Date</Label>
          <Input
            id="selectedDate"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          
          <div className="space-y-2">
            <Button onClick={calculateWeekNumber} className="w-full">
              Calculate Week Number
            </Button>
            <Button onClick={getCurrentWeek} variant="secondary" className="w-full">
              Current Week
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Week Information</h3>
            
            {result ? (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    Week {result.weekNumber}
                  </div>
                  <div className="text-lg text-gray-900 dark:text-white">
                    of {result.year}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-slate-600">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Selected Date:</div>
                  <div className="font-medium text-gray-900 dark:text-white">{result.date}</div>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400 pt-2">
                  * Week numbers are calculated according to ISO 8601 standard
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                Select a date to see week information
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
