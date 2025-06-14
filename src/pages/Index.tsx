
import Hero from "@/components/Hero";
import Demo from "@/components/Demo";
import CTA from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Hero />
      <Demo />
      <CTA />
    </div>
  );
};

export default Index;
