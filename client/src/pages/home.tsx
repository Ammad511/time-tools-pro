import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Head } from "@/components/seo/head";
import { useEffect, useRef } from "react";

const tools = [
  {
    id: "epoch-converter",
    title: "Epoch/Unix Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates instantly.",
    icon: "fas fa-exchange-alt",
    color: "primary"
  },
  {
    id: "world-clock",
    title: "World Clock",
    description: "View current time in multiple time zones around the world.",
    icon: "fas fa-globe",
    color: "emerald"
  },
  {
    id: "timezone-converter",
    title: "Time Zone Converter",
    description: "Convert time between different time zones with ease.",
    icon: "fas fa-map-marked-alt",
    color: "purple"
  },
  {
    id: "countdown-timer",
    title: "Countdown Timer",
    description: "Create customizable countdown timers for any date or time.",
    icon: "fas fa-hourglass-half",
    color: "red"
  },
  {
    id: "age-calculator",
    title: "Age Calculator",
    description: "Calculate exact age in years, months, days, and more.",
    icon: "fas fa-birthday-cake",
    color: "orange"
  },
  {
    id: "time-difference",
    title: "Time Difference Calculator",
    description: "Calculate the difference between two dates and times.",
    icon: "fas fa-minus",
    color: "teal"
  },
  {
    id: "date-generator",
    title: "Time and Date Generator",
    description: "Generate random dates and times for testing purposes.",
    icon: "fas fa-calendar-plus",
    color: "indigo"
  },
  {
    id: "week-number",
    title: "Week Number Finder",
    description: "Find the ISO week number for any given date.",
    icon: "fas fa-calendar-week",
    color: "pink"
  },
  {
    id: "working-days",
    title: "Working Days Calculator",
    description: "Calculate working days between two dates, excluding weekends.",
    icon: "fas fa-briefcase",
    color: "green"
  },
  {
    id: "time-api",
    title: "Current Time API Tool",
    description: "Access current time data via API for your applications.",
    icon: "fas fa-code",
    color: "blue"
  }
];

const features = [
  {
    icon: "fas fa-rocket",
    title: "Fast & Reliable",
    description: "Lightning-fast calculations with 99.9% accuracy guarantee",
    color: "primary"
  },
  {
    icon: "fas fa-mobile-alt",
    title: "Mobile Friendly",
    description: "Fully responsive design works perfectly on all devices",
    color: "emerald"
  },
  {
    icon: "fas fa-shield-alt",
    title: "Privacy First",
    description: "All calculations are done locally - your data never leaves your device",
    color: "purple"
  }
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
    }> = [];

    // Create particles
    const particleCount = Math.min(80, Math.max(30, Math.floor(canvas.width * canvas.height / 15000)));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() * 80 + 180, // Blue to purple range
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += dx * force * 0.0005;
          particle.vy += dy * force * 0.0005;
          particle.opacity = Math.min(0.8, particle.opacity + force * 0.01);
          particle.size = Math.min(4, particle.size + force * 0.5);
        } else {
          particle.opacity = Math.max(0.1, particle.opacity - 0.003);
          particle.size = Math.max(0.5, particle.size - 0.01);
        }

        // Boundary wrap
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Apply friction and subtle drift
        particle.vx *= 0.995;
        particle.vy *= 0.995;
        
        // Add subtle random movement
        particle.vx += (Math.random() - 0.5) * 0.0001;
        particle.vy += (Math.random() - 0.5) * 0.0001;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        
        // Create glowing effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `hsl(${particle.hue}, 80%, 70%)`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 70%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        ctx.fillStyle = `hsl(${particle.hue}, 90%, 90%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Reduced movement for mobile devices
      const isMobile = window.innerWidth < 768;
      const multiplier = isMobile ? 10 : 20;
      
      const moveX = (x - 0.5) * multiplier;
      const moveY = (y - 0.5) * multiplier;
      
      hero.style.setProperty('--mouse-x', `${moveX}px`);
      hero.style.setProperty('--mouse-y', `${moveY}px`);
    };

    hero.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Head 
        title="TimeTools Pro - Professional Date & Time Utilities"
        description="Professional suite of date and time tools including Unix timestamp converter, world clock, timezone converter, countdown timer, age calculator and more."
        keywords="unix timestamp, epoch converter, world clock, timezone converter, countdown timer, age calculator, time tools"
        path="/"
      />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"
        style={{
          background: `
            radial-gradient(circle at calc(50% + var(--mouse-x, 0px)) calc(50% + var(--mouse-y, 0px)), 
              rgba(59, 130, 246, 0.15) 0%, 
              rgba(147, 51, 234, 0.1) 35%, 
              rgba(15, 23, 42, 0.8) 70%),
            linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%),
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.05) 0%, transparent 50%)
          `,
          transition: 'background 0.3s ease-out',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />
        
        {/* Animated Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Welcome to
              <br />
              <span className="glowing-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Date & Time Tools
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional suite of date and time utilities for developers, professionals, and anyone who works with time data. Fast, accurate, and mobile-friendly.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/tools">
                <Button 
                  size="lg" 
                  className="px-10 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    // Smooth scroll to tools section
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }, 100);
                  }}
                >
                  Explore Tools
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-10 py-4 text-lg border-2 border-blue-400/50 text-blue-300 hover:bg-blue-400/10 hover:border-blue-400 transition-all duration-300 transform hover:scale-105"
                >
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm">Scroll down</span>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from our comprehensive collection of time and date utilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link key={tool.id} href={`/tools#${tool.id}`}>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 dark:border-slate-700 cursor-pointer group">
                  <div className="flex items-center mb-4">
                    <div className={`bg-${tool.color}-100 dark:bg-${tool.color}-900 p-3 rounded-lg`}>
                      <i className={`${tool.icon} text-${tool.color}-600 dark:text-${tool.color}-400 text-xl`}></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">{tool.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
                  <div className="text-primary group-hover:text-primary-700 font-medium">
                    Use Tool <i className="fas fa-arrow-right ml-1"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose TimeTools Pro?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built for professionals who need reliable, fast, and accurate time utilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`bg-${feature.color}-100 dark:bg-${feature.color}-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${feature.icon} text-${feature.color}-600 dark:text-${feature.color}-400 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
