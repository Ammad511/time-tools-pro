import { useState, useMemo } from "react";
import { Head } from "@/components/seo/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  date: Date;
  category: string;
  tags: string[];
  slug: string;
  readTime: number;
  content: string;
}

// Sample blog posts with dummy content
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Unix Timestamps: A Complete Guide",
    description: "Learn everything about Unix timestamps, their history, and practical applications in modern web development and data processing.",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f8fafc'/%3E%3Cg fill='%23334155'%3E%3Ctext x='200' y='130' text-anchor='middle' font-size='20' font-family='Arial'%3EUnix Timestamp%3C/text%3E%3Ctext x='200' y='160' text-anchor='middle' font-size='14' font-family='Arial'%3EGuide%3C/text%3E%3C/g%3E%3C/svg%3E",
    date: new Date("2025-01-10"),
    category: "Development",
    tags: ["unix", "timestamp", "programming", "time"],
    slug: "understanding-unix-timestamps-complete-guide",
    readTime: 8,
    content: "Unix timestamps are a fundamental concept in programming and data storage..."
  },
  {
    id: "2",
    title: "Time Zone Conversion Best Practices",
    description: "Master the art of time zone handling in web applications with practical examples and common pitfalls to avoid.",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f1f5f9'/%3E%3Cg fill='%23475569'%3E%3Ctext x='200' y='130' text-anchor='middle' font-size='20' font-family='Arial'%3ETime Zone%3C/text%3E%3Ctext x='200' y='160' text-anchor='middle' font-size='14' font-family='Arial'%3EConversion%3C/text%3E%3C/g%3E%3C/svg%3E",
    date: new Date("2025-01-08"),
    category: "Development",
    tags: ["timezone", "javascript", "web development", "localization"],
    slug: "time-zone-conversion-best-practices",
    readTime: 6,
    content: "Time zone conversion is one of the most challenging aspects of web development..."
  },
  {
    id: "3",
    title: "Building Better Date Pickers: UX Considerations",
    description: "Explore user experience principles for designing intuitive date picker interfaces that work across all devices.",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f0f9ff'/%3E%3Cg fill='%230369a1'%3E%3Ctext x='200' y='130' text-anchor='middle' font-size='20' font-family='Arial'%3EDate Picker%3C/text%3E%3Ctext x='200' y='160' text-anchor='middle' font-size='14' font-family='Arial'%3EUX Guide%3C/text%3E%3C/g%3E%3C/svg%3E",
    date: new Date("2025-01-05"),
    category: "Design",
    tags: ["ux", "ui", "date picker", "accessibility"],
    slug: "building-better-date-pickers-ux-considerations",
    readTime: 5,
    content: "Date pickers are essential UI components that can make or break user experience..."
  },
  {
    id: "4",
    title: "Working with Date Libraries: A Comparison",
    description: "Compare popular JavaScript date libraries including date-fns, moment.js, and dayjs to choose the right one for your project.",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23fefce8'/%3E%3Cg fill='%23a16207'%3E%3Ctext x='200' y='130' text-anchor='middle' font-size='20' font-family='Arial'%3EDate Libraries%3C/text%3E%3Ctext x='200' y='160' text-anchor='middle' font-size='14' font-family='Arial'%3EComparison%3C/text%3E%3C/g%3E%3C/svg%3E",
    date: new Date("2025-01-03"),
    category: "Development",
    tags: ["javascript", "libraries", "date-fns", "moment.js"],
    slug: "working-with-date-libraries-comparison",
    readTime: 7,
    content: "Choosing the right date library is crucial for maintainable and efficient code..."
  },
  {
    id: "5",
    title: "Performance Optimization for Time-Critical Applications",
    description: "Learn advanced techniques to optimize time calculations and date operations for high-performance web applications.",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f0fdf4'/%3E%3Cg fill='%23166534'%3E%3Ctext x='200' y='130' text-anchor='middle' font-size='20' font-family='Arial'%3EPerformance%3C/text%3E%3Ctext x='200' y='160' text-anchor='middle' font-size='14' font-family='Arial'%3EOptimization%3C/text%3E%3C/g%3E%3C/svg%3E",
    date: new Date("2025-01-01"),
    category: "Performance",
    tags: ["performance", "optimization", "javascript", "time"],
    slug: "performance-optimization-time-critical-applications",
    readTime: 9,
    content: "Performance optimization in time-critical applications requires careful consideration..."
  }
];

const categories = ["All", "Development", "Design", "Performance"];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-slate-900">
      <Head 
        title="Blog - TimeTools Pro | Time & Date Development Insights"
        description="Discover expert insights on time and date handling in web development. Learn about Unix timestamps, time zones, date libraries, and performance optimization techniques."
        keywords="time development blog, unix timestamp guide, timezone handling, date picker UX, javascript date libraries, performance optimization"
        path="/blog"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            TimeTools Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert insights on time and date handling in web development
          </p>
        </header>

        {/* Search and Filter Controls */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="group">
              <Card className="h-full blog-post-card cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <time 
                      dateTime={post.date.toISOString()}
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      {format(post.date, 'MMM d, yyyy')}
                    </time>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    <h2>{post.title}</h2>
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime} min read
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-colors"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </article>
          ))}
        </section>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search terms or category filter
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "TimeTools Blog",
              "description": "Expert insights on time and date handling in web development",
              "url": "https://timetools.pro/blog",
              "blogPost": filteredPosts.map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.description,
                "datePublished": post.date.toISOString(),
                "author": {
                  "@type": "Organization",
                  "name": "TimeTools Pro"
                },
                "image": post.thumbnail,
                "url": `https://timetools.pro/blog/${post.slug}`
              }))
            })
          }}
        />
      </div>
    </div>
  );
}