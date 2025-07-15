interface ToolSelectorProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
}

const tools = [
  { id: "epoch-converter", icon: "fas fa-exchange-alt", label: "Epoch Converter" },
  { id: "world-clock", icon: "fas fa-globe", label: "World Clock" },
  { id: "timezone-converter", icon: "fas fa-map-marked-alt", label: "Timezone Converter" },
  { id: "countdown-timer", icon: "fas fa-hourglass-half", label: "Countdown Timer" },
  { id: "age-calculator", icon: "fas fa-birthday-cake", label: "Age Calculator" },
  { id: "time-difference", icon: "fas fa-minus", label: "Time Difference" },
  { id: "date-generator", icon: "fas fa-calendar-plus", label: "Date Generator" },
  { id: "week-number", icon: "fas fa-calendar-week", label: "Week Number" },
  { id: "working-days", icon: "fas fa-briefcase", label: "Working Days" },
  { id: "time-api", icon: "fas fa-code", label: "Time API" },
];

export function ToolSelector({ activeTool, onToolChange }: ToolSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-12">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onToolChange(tool.id)}
          className={`bg-white dark:bg-slate-800 border rounded-lg p-4 text-center hover:shadow-md transition-all duration-300 flex flex-col items-center transform hover:scale-105 ${
            activeTool === tool.id
              ? "border-primary bg-primary-50 dark:bg-primary-900/20 text-primary shadow-lg scale-105"
              : "border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:border-primary/50"
          }`}
        >
          <i className={`${tool.icon} text-xl mb-2 transition-transform duration-200`}></i>
          <span className="text-sm md:text-base font-medium">{tool.label}</span>
        </button>
      ))}
    </div>
  );
}
