import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { calculateAge } from "@/lib/time-utils";

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [ageAsOf, setAgeAsOf] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateAge> | null>(null);

  const handleCalculate = () => {
    if (!birthDate) return;
    
    const ageResult = calculateAge(birthDate, ageAsOf);
    setResult(ageResult);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Age Calculator</h2>
        <p className="text-gray-600 dark:text-gray-300">Calculate exact age in years, months, days, and more</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label htmlFor="birthDate">Birth Date</Label>
          <Input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          
          <Label htmlFor="ageAsOf">Calculate Age As Of (Optional)</Label>
          <Input
            id="ageAsOf"
            type="date"
            value={ageAsOf}
            onChange={(e) => setAgeAsOf(e.target.value)}
            placeholder="Leave blank for current date"
          />
          
          <Button onClick={handleCalculate} className="w-full">
            Calculate Age
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Age Details</h3>
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
                <span className="text-gray-600 dark:text-gray-300">Total Days:</span>
                <span className="font-mono text-gray-900 dark:text-white">{result?.totalDays.toLocaleString() ?? "--"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Total Hours:</span>
                <span className="font-mono text-gray-900 dark:text-white">{result?.totalHours.toLocaleString() ?? "--"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Total Minutes:</span>
                <span className="font-mono text-gray-900 dark:text-white">{result?.totalMinutes.toLocaleString() ?? "--"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
