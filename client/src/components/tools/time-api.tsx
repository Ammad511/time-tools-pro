import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const apiEndpoints = [
  { 
    name: "Current UTC Time", 
    endpoint: "/api/time/utc",
    description: "Get current UTC time in various formats"
  },
  { 
    name: "Current Local Time", 
    endpoint: "/api/time/local",
    description: "Get current local time"
  },
  { 
    name: "Unix Timestamp", 
    endpoint: "/api/time/timestamp",
    description: "Get current Unix timestamp"
  },
  { 
    name: "Time Zones List", 
    endpoint: "/api/time/timezones",
    description: "Get list of available time zones"
  }
];

export function TimeApi() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0].endpoint);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const makeApiCall = async () => {
    setLoading(true);
    try {
      // Since we don't have a real backend API, we'll simulate the responses
      const mockResponses: Record<string, any> = {
        "/api/time/utc": {
          utc: new Date().toISOString(),
          timestamp: Math.floor(Date.now() / 1000),
          date: new Date().toDateString(),
          time: new Date().toTimeString(),
        },
        "/api/time/local": {
          local: new Date().toString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          offset: new Date().getTimezoneOffset(),
        },
        "/api/time/timestamp": {
          timestamp: Math.floor(Date.now() / 1000),
          milliseconds: Date.now(),
        },
        "/api/time/timezones": {
          timezones: [
            "America/New_York",
            "America/Los_Angeles", 
            "Europe/London",
            "Europe/Paris",
            "Asia/Tokyo",
            "Asia/Shanghai",
            "Asia/Dubai",
            "Australia/Sydney"
          ]
        }
      };

      const mockResponse = mockResponses[selectedEndpoint];
      setResponse(JSON.stringify(mockResponse, null, 2));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data from API",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    toast({
      title: "Copied!",
      description: "API response copied to clipboard",
    });
  };

  const copyEndpoint = () => {
    const fullEndpoint = `${window.location.origin}${selectedEndpoint}`;
    navigator.clipboard.writeText(fullEndpoint);
    toast({
      title: "Copied!",
      description: "API endpoint copied to clipboard",
    });
  };

  const selectedApi = apiEndpoints.find(api => api.endpoint === selectedEndpoint);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Current Time API Tool</h2>
        <p className="text-gray-600 dark:text-gray-300">Access current time data via API for your applications</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label>Select API Endpoint</Label>
            <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {apiEndpoints.map((api) => (
                  <SelectItem key={api.endpoint} value={api.endpoint}>
                    {api.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedApi && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  {selectedApi.description}
                </div>
                <div className="font-mono text-sm text-blue-900 dark:text-blue-100 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  GET {window.location.origin}{selectedEndpoint}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Button onClick={makeApiCall} disabled={loading} className="w-full">
                {loading ? "Loading..." : "Make API Call"}
              </Button>
              <Button onClick={copyEndpoint} variant="outline" className="w-full">
                Copy Endpoint URL
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>API Response</Label>
              {response && (
                <Button onClick={copyToClipboard} variant="ghost" size="sm">
                  <i className="fas fa-copy mr-2"></i>
                  Copy
                </Button>
              )}
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg min-h-[300px] overflow-auto">
              {response ? (
                <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                  {response}
                </pre>
              ) : (
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  Click "Make API Call" to see the response
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start">
            <i className="fas fa-info-circle text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3"></i>
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Demo Mode</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                This is a demonstration of API endpoints. In a production environment, these would be real API endpoints 
                serving live time data. The responses shown are mock data for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
