
import { Button } from "@/components/ui/button";
import { Zap, Eye } from "lucide-react";

const Demo = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-teal-400" />
            <span className="text-xs sm:text-sm text-white/90 font-medium">Live Demo</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            See the{" "}
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-8 sm:mb-12">
            Watch how our super-resolution technology enhances satellite imagery in real-time, 
            revealing details that were previously invisible.
          </p>
        </div>

        {/* Demo Frames */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Frame 1 - Low Resolution */}
          <div className="group relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-white/60 text-sm font-medium">Original - 256x256</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10 p-1">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Image Container */}
              <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=256&h=256&fit=crop&crop=center" 
                  alt="Low resolution satellite imagery"
                  className="w-full h-full object-cover filter blur-[2px] opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between text-white/80 text-sm">
                      <span>Resolution: Low</span>
                      <span>Quality: 30%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frame 2 - High Resolution */}
          <div className="group relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-white/60 text-sm font-medium">Enhanced - 1024x1024</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10 p-1">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Image Container */}
              <div className="aspect-square bg-gradient-to-br from-teal-900/20 to-blue-900/20 flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1024&h=1024&fit=crop&crop=center" 
                  alt="High resolution enhanced satellite imagery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between text-white/80 text-sm">
                      <span>Resolution: High</span>
                      <span>Quality: 95%</span>
                    </div>
                  </div>
                </div>
                {/* Enhancement Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    4x Enhanced
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
