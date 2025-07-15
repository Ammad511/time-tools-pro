import { useState, useEffect } from "react";
import { getTimeInZone, timeZones } from "@/lib/time-utils";

const worldClockZones = [
  { name: "New York", timezone: "America/New_York", abbreviation: "EST" },
  { name: "London", timezone: "Europe/London", abbreviation: "GMT" },
  { name: "Tokyo", timezone: "Asia/Tokyo", abbreviation: "JST" },
  { name: "Sydney", timezone: "Australia/Sydney", abbreviation: "AEDT" },
  { name: "Dubai", timezone: "Asia/Dubai", abbreviation: "GST" },
  { name: "Los Angeles", timezone: "America/Los_Angeles", abbreviation: "PST" },
];

export function WorldClock() {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, string> = {};
      worldClockZones.forEach(zone => {
        newTimes[zone.timezone] = getTimeInZone(zone.timezone);
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">World Clock</h2>
        <p className="text-gray-600 dark:text-gray-300">View current time in multiple time zones</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {worldClockZones.map((zone) => (
          <div key={zone.timezone} className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg text-center">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{zone.name}</h3>
            <div className="text-2xl font-mono text-primary mb-1">
              {times[zone.timezone] || "--:--:--"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{zone.abbreviation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
