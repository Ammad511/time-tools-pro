import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
}

interface BlogPostCardProps {
  post: BlogPost;
  onReadMore?: (post: BlogPost) => void;
}

export function BlogPostCard({ post, onReadMore }: BlogPostCardProps) {
  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore(post);
    } else {
      // Default behavior - could navigate to full post
      window.open(`/blog/${post.slug}`, '_blank');
    }
  };

  return (
    <article className="group">
      <Card className="h-full blog-post-card cursor-pointer" onClick={handleReadMore}>
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={post.thumbnail} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
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
          <div className="flex items-center justify-between mb-4">
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
            className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleReadMore();
            }}
          >
            Read More
          </Button>
        </CardContent>
      </Card>
    </article>
  );
}