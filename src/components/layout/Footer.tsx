import { Film, Github, Heart } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Film className="w-6 h-6 text-red-500" />
              <span className="text-xl font-bold text-white">MovieManiac</span>
            </div>
            <p className="text-slate-400 text-sm">
              Your personal movie management hub. Track, organize, and discover your next favorite film.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/movies" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Browse Movies
              </Link>
              <Link to="/recommendations" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Recommendations
              </Link>
              <Link to="/favorites" className="block text-slate-400 hover:text-white transition-colors text-sm">
                My Favorites
              </Link>
              <Link to="/settings" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Settings
              </Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <p className="text-slate-400 text-sm mb-4">
              Built with React, Redux Toolkit, and Tailwind CSS. A modern movie management application.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by MovieManiac Team</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} MovieManiac. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>600+ Movies</span>
            <span>•</span>
            <span>Smart Recommendations</span>
            <span>•</span>
            <span>Kids Mode</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
