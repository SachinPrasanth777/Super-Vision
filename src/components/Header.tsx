
import { Button } from "@/components/ui/button";
import { Satellite, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Satellite className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white">SuperRes</h1>
          </div>

          {/* Desktop Authentication Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/10 py-4">
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-white/80 hover:text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;