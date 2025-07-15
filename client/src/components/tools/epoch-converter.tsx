import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getCurrentTimestamp, formatDateForInput } from "@/lib/time-utils";

export function EpochConverter() {
  const [currentTimestamp, setCurrentTimestamp] = useState(getCurrentTimestamp());
  const [timestampInput, setTimestampInput] = useState("");
  const [dateTimeInput, setDateTimeInput] = useState(formatDateForInput(new Date()));
  const [result, setResult] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(getCurrentTimestamp());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertTimestamp = () => {
    if (!timestampInput) return;
    
    const timestamp = parseInt(timestampInput);
    const date = new Date(timestamp * 1000);
    
    if (isNaN(date.getTime())) {
      setResult("Invalid timestamp");
      return;
    }
    
    setResult(`
      Converted Date:
      ${date.toString()}
      
      ISO Format: ${date.toISOString()}
      UTC: ${date.toUTCString()}
    `);
  };

  const convertDateTime = () => {
    if (!dateTimeInput) return;
    
    const date = new Date(dateTimeInput);
    const timestamp = Math.floor(date.getTime() / 1000);
    
    setResult(`
      Unix Timestamp: ${timestamp}
      Milliseconds: ${date.getTime()}
    `);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unix Timestamp Converter</h2>
        <p className="text-gray-600 dark:text-gray-300">Convert between Unix timestamps and human-readable dates</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label>Current Unix Timestamp</Label>
          <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
            <div className="font-mono text-lg text-gray-900 dark:text-white">{currentTimestamp}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Updates every second</div>
          </div>
          
          <Label htmlFor="timestampInput">Enter Unix Timestamp</Label>
          <Input
            id="timestampInput"
            type="number"
            placeholder="e.g., 1703097600"
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
          />
          <Button onClick={convertTimestamp} className="w-full">
            Convert to Date
          </Button>
        </div>
        
        <div className="space-y-4">
          <Label htmlFor="dateTimeInput">Select Date & Time</Label>
          <Input
            id="dateTimeInput"
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
          />
          <Button onClick={convertDateTime} className="w-full bg-emerald-600 hover:bg-emerald-700">
            Convert to Timestamp
          </Button>
        </div>
      </div>
      
      {result && (
        <div className="mt-8 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Result</h3>
          <pre className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}
