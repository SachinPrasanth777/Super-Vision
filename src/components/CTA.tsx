
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, FileText, Mail } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent block mt-2">
              Remote Sensing Projects?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
            Join researchers and organizations worldwide who are already leveraging our super-resolution 
            technology to unlock new insights from satellite imagery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg group">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-purple-400/40 bg-purple-400/10 backdrop-blur-sm text-white hover:bg-purple-400/20 hover:border-purple-400/60 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300">
              Request Demo
            </Button>
          </div>
        </div>
        
        {/* Resource Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group">
            <Github className="w-10 h-10 sm:w-12 sm:h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">Open Source</h3>
            <p className="text-white/70 text-sm mb-4">Access our codebase and contribute to the community</p>
            <Button variant="ghost" className="text-teal-400 hover:text-teal-300 hover:bg-teal-400/10 w-full sm:w-auto">
              View on GitHub
            </Button>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group">
            <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">Research Paper</h3>
            <p className="text-white/70 text-sm mb-4">Read our latest findings and methodology</p>
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 w-full sm:w-auto">
              Read Paper
            </Button>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group">
            <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
            <p className="text-white/70 text-sm mb-4">Get in touch for collaborations and support</p>
            <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-400/10 w-full sm:w-auto">
              Send Message
            </Button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 px-4">
          <p className="text-white/50 text-xs sm:text-sm">
            © 2025 Sachin Prasanth
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
