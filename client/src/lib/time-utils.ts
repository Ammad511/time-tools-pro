export const timeZones = [
  { value: "America/New_York", label: "New York (EST)", offset: -5 },
  { value: "America/Los_Angeles", label: "Los Angeles (PST)", offset: -8 },
  { value: "Europe/London", label: "London (GMT)", offset: 0 },
  { value: "Europe/Paris", label: "Paris (CET)", offset: 1 },
  { value: "Asia/Tokyo", label: "Tokyo (JST)", offset: 9 },
  { value: "Asia/Shanghai", label: "Shanghai (CST)", offset: 8 },
  { value: "Asia/Dubai", label: "Dubai (GST)", offset: 4 },
  { value: "Australia/Sydney", label: "Sydney (AEDT)", offset: 11 },
];

export function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

export function formatDateForInput(date: Date): string {
  return date.toISOString().slice(0, 16);
}

export function getTimeInZone(timezone: string): string {
  try {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } catch {
    return '--:--:--';
  }
}

export function convertTimezone(datetime: string, fromZone: string, toZone: string) {
  try {
    const date = new Date(datetime);
    
    const time = date.toLocaleTimeString('en-US', {
      timeZone: toZone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const dateStr = date.toLocaleDateString('en-US', {
      timeZone: toZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return { time, date: dateStr };
  } catch {
    return { time: 'Error', date: 'Invalid input' };
  }
}

export function calculateAge(birthDate: string, asOfDate?: string) {
  const birth = new Date(birthDate);
  const asOf = asOfDate ? new Date(asOfDate) : new Date();
  
  const diffTime = asOf.getTime() - birth.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  let years = asOf.getFullYear() - birth.getFullYear();
  let months = asOf.getMonth() - birth.getMonth();
  let days = asOf.getDate() - birth.getDate();
  
  if (days < 0) {
    months--;
    const lastMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return {
    years,
    months,
    days,
    totalDays: diffDays,
    totalHours: diffDays * 24,
    totalMinutes: diffDays * 24 * 60
  };
}

export function calculateTimeDifference(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);
  
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  
  return {
    years,
    months,
    days: diffDays % 30,
    hours: diffHours,
    minutes: diffMinutes,
    seconds: diffSeconds
  };
}

export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export function calculateWorkingDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let count = 0;
  const current = new Date(start);
  
  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Monday = 1, Sunday = 0
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
}

export function generateRandomDate(startYear: number = 1900, endYear: number = 2100): Date {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
