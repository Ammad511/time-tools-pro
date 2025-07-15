import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatDateForInput } from "@/lib/time-utils";

export function CountdownTimer() {
  const [targetDate, setTargetDate] = useState(() => {
    const oneHourLater = new Date(Date.now() + 60 * 60 * 1000);
    return formatDateForInput(oneHourLater);
  });
  const [eventName, setEventName] = useState("");
  const [display, setDisplay] = useState("--:--:--:--");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startCountdown = () => {
    if (!targetDate) return;
    
    setIsRunning(true);
    const target = new Date(targetDate).getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = target - now;
      
      if (distance < 0) {
        setDisplay("EXPIRED");
        setIsRunning(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setDisplay(
        `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };
    
    updateCountdown();
    intervalRef.current = setInterval(updateCountdown, 1000);
  };

  const stopCountdown = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplay("--:--:--:--");
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Countdown Timer</h2>
        <p className="text-gray-600 dark:text-gray-300">Create a countdown to any date and time</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="targetDate">Target Date & Time</Label>
            <Input
              id="targetDate"
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="eventName">Event Name (Optional)</Label>
            <Input
              id="eventName"
              type="text"
              placeholder="e.g., Product Launch"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
        </div>
        
        <div className="text-center space-x-4">
          <Button onClick={startCountdown} disabled={isRunning}>
            Start Countdown
          </Button>
          <Button onClick={stopCountdown} variant="secondary">
            Stop
          </Button>
        </div>
        
        <div className="bg-gray-50 dark:bg-slate-700 p-8 rounded-lg text-center">
          <div className="text-4xl font-mono text-primary mb-4">
            {display}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Days : Hours : Minutes : Seconds
          </div>
          {eventName && (
            <div className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
              Countdown to {eventName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
