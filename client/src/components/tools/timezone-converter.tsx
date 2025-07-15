import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertTimezone, timeZones, formatDateForInput } from "@/lib/time-utils";

export function TimezoneConverter() {
  const [sourceDateTime, setSourceDateTime] = useState(formatDateForInput(new Date()));
  const [sourceTimezone, setSourceTimezone] = useState("America/New_York");
  const [targetTimezone, setTargetTimezone] = useState("Europe/London");
  const [result, setResult] = useState({ time: "--:--:--", date: "Select time to convert" });

  const handleConvert = () => {
    if (!sourceDateTime) return;
    const converted = convertTimezone(sourceDateTime, sourceTimezone, targetTimezone);
    setResult(converted);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Time Zone Converter</h2>
        <p className="text-gray-600 dark:text-gray-300">Convert time between different time zones</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label>From</Label>
          <Input
            type="datetime-local"
            value={sourceDateTime}
            onChange={(e) => setSourceDateTime(e.target.value)}
          />
          <Select value={sourceTimezone} onValueChange={setSourceTimezone}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeZones.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          <Label>To</Label>
          <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
            <div className="font-mono text-lg text-gray-900 dark:text-white">{result.time}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{result.date}</div>
          </div>
          <Select value={targetTimezone} onValueChange={setTargetTimezone}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeZones.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Button onClick={handleConvert} className="px-8 py-3">
          Convert Time Zone
        </Button>
      </div>
    </div>
  );
}
