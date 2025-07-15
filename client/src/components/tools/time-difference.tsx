import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { calculateTimeDifference, formatDateForInput } from "@/lib/time-utils";

export function TimeDifference() {
  const [startDateTime, setStartDateTime] = useState(formatDateForInput(new Date()));
  const [endDateTime, setEndDateTime] = useState(formatDateForInput(new Date()));
  const [result, setResult] = useState<ReturnType<typeof calculateTimeDifference> | null>(null);

  const handleCalculate = () => {
    if (!startDateTime || !endDateTime) return;
    
    const difference = calculateTimeDifference(startDateTime, endDateTime);
    setResult(difference);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Time Difference Calculator</h2>
        <p className="text-gray-600 dark:text-gray-300">Calculate the difference between two dates and times</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label htmlFor="startDateTime">Start Date & Time</Label>
          <Input
            id="startDateTime"
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
          
          <Label htmlFor="endDateTime">End Date & Time</Label>
          <Input
            id="endDateTime"
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
          
          <Button onClick={handleCalculate} className="w-full">
            Calculate Difference
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Time Difference</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Years:</span>
                <span className="font-mono text-gray-900 dark:text-white">{result?.years ?? "--"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Months:</span>
                <span className="font-mono text-gray-900 dark:text-white">{result?.months ?? "--"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Days:</span>
                <span className="font-mono text-gray-900 dark:text-white">{result?.days ?? "--"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Hours:</span>
                <span className="font-mono text-gray-900 dark:text-white">{result?.hours ?? "--"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Minutes:</span>
                <span className="font-mono text-gray-900 dark:text-white">{result?.minutes ?? "--"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Seconds:</span>
                <span className="font-mono text-gray-900 dark:text-white">{result?.seconds ?? "--"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
