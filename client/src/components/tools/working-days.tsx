import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { calculateWorkingDays } from "@/lib/time-utils";

export function WorkingDays() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{
    workingDays: number;
    totalDays: number;
    weekends: number;
    startDate: string;
    endDate: string;
  } | null>(null);

  const calculateDays = () => {
    if (!startDate || !endDate) return;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Ensure start date is before end date
    if (start > end) {
      const temp = startDate;
      setStartDate(endDate);
      setEndDate(temp);
      return;
    }
    
    const workingDays = calculateWorkingDays(startDate, endDate);
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const weekends = totalDays - workingDays;
    
    setResult({
      workingDays,
      totalDays,
      weekends,
      startDate: start.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      endDate: end.toLocaleDateString('en-US', {
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Working Days Calculator</h2>
        <p className="text-gray-600 dark:text-gray-300">Calculate working days between two dates, excluding weekends</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          
          <Button onClick={calculateDays} className="w-full">
            Calculate Working Days
          </Button>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            * Excludes Saturdays and Sundays. Does not account for holidays.
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Calculation Results</h3>
            
            {result ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{result.workingDays}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Working Days</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.totalDays}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total Days</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-500">{result.weekends}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Weekend Days</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-slate-600 space-y-2">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">From:</div>
                    <div className="font-medium text-gray-900 dark:text-white">{result.startDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">To:</div>
                    <div className="font-medium text-gray-900 dark:text-white">{result.endDate}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                Select dates to calculate working days
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
