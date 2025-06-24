
import { Button } from "@/components/ui/button";
import { ArrowRight, Satellite, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 lg:px-8 overflow-hidden pt-16 sm:pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-teal-900/20"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 mb-4 sm:mb-6 lg:mb-8">
          <Satellite className="w-3 h-3 sm:w-4 sm:h-4 text-teal-400" />
          <span className="text-xs sm:text-sm text-white/90 font-medium">DOTA Dataset Enhancement</span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight px-2">
          A New Dimension of{" "}
          <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            Clarity
          </span>
        </h1>
        
        {/* Subheading */}
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-1 sm:mb-2 lg:mb-4 font-light px-2">
          Super-Resolution Empowered Object Detection
        </h2>
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 mb-6 sm:mb-8 lg:mb-12 font-light px-2">
          in Remote Sensing Imagery
        </h3>
        
        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
          Transform low-resolution satellite imagery into crystal-clear, high-definition visuals with our 
          cutting-edge super-resolution technology. Enhance object detection accuracy and unlock new 
          possibilities in remote sensing analysis.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Link to="/upload">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg group">
              Upload Images
              <Upload className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/60 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg transition-all duration-300">
              Get Started
              <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;