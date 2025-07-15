import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { generateRandomDate } from "@/lib/time-utils";

export function DateGenerator() {
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(2030);
  const [generatedDates, setGeneratedDates] = useState<string[]>([]);

  const generateDates = () => {
    const dates: string[] = [];
    for (let i = 0; i < 10; i++) {
      const randomDate = generateRandomDate(startYear, endYear);
      dates.push(randomDate.toISOString());
    }
    setGeneratedDates(dates);
  };

  const generateSingleDate = () => {
    const randomDate = generateRandomDate(startYear, endYear);
    setGeneratedDates([randomDate.toISOString()]);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Time and Date Generator</h2>
        <p className="text-gray-600 dark:text-gray-300">Generate random dates and times for testing purposes</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="startYear">Start Year</Label>
            <Input
              id="startYear"
              type="number"
              value={startYear}
              onChange={(e) => setStartYear(parseInt(e.target.value) || 2000)}
              min="1900"
              max="2200"
            />
          </div>
          <div>
            <Label htmlFor="endYear">End Year</Label>
            <Input
              id="endYear"
              type="number"
              value={endYear}
              onChange={(e) => setEndYear(parseInt(e.target.value) || 2030)}
              min="1900"
              max="2200"
            />
          </div>
        </div>
        
        <div className="text-center space-x-4">
          <Button onClick={generateSingleDate}>
            Generate Single Date
          </Button>
          <Button onClick={generateDates} variant="secondary">
            Generate 10 Dates
          </Button>
        </div>
        
        {generatedDates.length > 0 && (
          <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Generated Dates</h3>
            <div className="space-y-2">
              {generatedDates.map((date, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-white dark:bg-slate-800 rounded border">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">ISO Format:</span>
                    <div className="font-mono text-sm">{date}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Human Readable:</span>
                    <div className="font-mono text-sm">{new Date(date).toString()}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Unix Timestamp:</span>
                    <div className="font-mono text-sm">{Math.floor(new Date(date).getTime() / 1000)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
