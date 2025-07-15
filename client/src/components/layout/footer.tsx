import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <i className="fas fa-clock text-2xl text-primary-400 mr-2"></i>
              <span className="text-xl font-bold">TimeTools Pro</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional time and date utilities for modern workflows. Fast, accurate, and privacy-focused.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/tools" className="hover:text-white transition-colors">Epoch Converter</Link></li>
              <li><Link href="/tools" className="hover:text-white transition-colors">World Clock</Link></li>
              <li><Link href="/tools" className="hover:text-white transition-colors">Timezone Converter</Link></li>
              <li><Link href="/tools" className="hover:text-white transition-colors">Age Calculator</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TimeTools Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
