
import { Eye, Zap, Target, Cpu } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Eye,
      title: "Enhanced Visibility",
      description: "Transform blurry satellite imagery into crystal-clear visuals with up to 4x resolution improvement.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Precision Detection",
      description: "Achieve superior object detection accuracy in remote sensing applications with enhanced image quality.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Lightning-fast super-resolution processing optimized for large-scale satellite image datasets.",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "State-of-the-art deep learning models trained specifically on DOTA dataset for optimal results.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Revolutionary Features
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience the next generation of remote sensing image processing with our advanced super-resolution technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
