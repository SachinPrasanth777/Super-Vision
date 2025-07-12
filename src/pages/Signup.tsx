import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Satellite, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://express-deployment-l56z.onrender.com/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        toast({
          title: "Account Created Successfully! 🎉",
          description: "Welcome to SuperRes! You can now start enhancing satellite imagery.",
        });
        
        // Reset form
        setUsername("");
        setPassword("");
      } else {
        const errorData = await response.json();
        toast({
          title: "Signup Failed",
          description: errorData.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Connection Error",
        description: "Unable to connect to the server. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "Contains numbers", met: /\d/.test(password) },
    { text: "Contains letters", met: /[a-zA-Z]/.test(password) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-3 sm:p-4 lg:p-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto">
        {/* Logo/Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Satellite className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">SuperRes</h1>
          </div>
          <p className="text-white/70 text-sm sm:text-base px-2">Join the future of satellite imaging</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Create Account</h2>
            <p className="text-white/60 text-xs sm:text-sm">Start enhancing satellite imagery today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Username Field */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="username" className="text-white/80 text-xs sm:text-sm font-medium">
                Choose Username
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10 sm:h-12 rounded-lg sm:rounded-xl focus:border-purple-400 focus:ring-purple-400/20 text-sm sm:text-base"
                  placeholder="Your unique identifier"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="password" className="text-white/80 text-xs sm:text-sm font-medium">
                Create Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10 sm:h-12 rounded-lg sm:rounded-xl pr-10 sm:pr-12 focus:border-purple-400 focus:ring-purple-400/20 text-sm sm:text-base"
                  placeholder="Secure your account"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {password && (
                <div className="space-y-1 mt-2 sm:mt-3">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-1 sm:gap-2 text-xs">
                      <CheckCircle 
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${req.met ? 'text-green-400' : 'text-white/30'}`}
                      />
                      <span className={req.met ? 'text-green-400' : 'text-white/60'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-12 bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Launch Your Journey"}
              {!isLoading && <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          {/* Terms */}
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-white/40 text-xs px-2">
              By creating an account, you agree to enhance responsibly
            </p>
          </div>

          {/* Divider */}
          <div className="my-4 sm:my-6 flex items-center">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="px-2 sm:px-3 text-white/40 text-xs sm:text-sm">Already have access?</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Login Link */}
          <Link to="/login">
            <Button
              variant="ghost"
              className="w-full h-10 sm:h-12 text-white/80 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-300"
            >
              Sign In Instead
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-white/40 text-xs px-2">
            Join thousands of researchers worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;