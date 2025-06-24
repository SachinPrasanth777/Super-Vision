
import { useState, useRef, DragEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      toast.error("Only image files are allowed");
    }
    
    if (imageFiles.length > 0) {
      setUploadedImages(prev => [...prev, ...imageFiles]);
      toast.success(`${imageFiles.length} image(s) uploaded successfully`);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setUploadedImages(prev => [...prev, ...imageFiles]);
      toast.success(`${imageFiles.length} image(s) uploaded successfully`);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    toast.success("Image removed");
  };

  const clearAll = () => {
    setUploadedImages([]);
    toast.success("All images cleared");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Header />
      
      <div className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-6 px-2">
              Image Upload
            </h1>
            <p className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-2">
              Drag and drop your images or click to browse
            </p>
          </div>

          {/* Upload Area */}
          <Card className="mb-8 sm:mb-12 bg-white/5 backdrop-blur-md border-white/20 shadow-2xl">
            <CardContent className="p-4 sm:p-8 lg:p-12">
              <div
                className={`border-2 border-dashed rounded-xl p-6 sm:p-12 lg:p-16 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-teal-400 bg-teal-400/10 scale-[1.02]'
                    : 'border-white/30 hover:border-white/50 hover:bg-white/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    dragActive ? 'bg-teal-400/20 scale-110' : 'bg-white/10'
                  }`}>
                    <Upload className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 transition-colors duration-300 ${
                      dragActive ? 'text-teal-400' : 'text-white/70'
                    }`} />
                  </div>
                  
                  <div className="space-y-2 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
                      {dragActive ? 'Drop images here' : 'Upload Images'}
                    </h3>
                    <p className="text-white/60 text-sm sm:text-base lg:text-lg max-w-md mx-auto px-2">
                      Drag and drop images here, or click the button below
                    </p>
                    
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      size="lg"
                      className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg mt-3 sm:mt-6"
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Images */}
          {uploadedImages.length > 0 && (
            <Card className="bg-white/5 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 sm:pb-6 space-y-2 sm:space-y-0">
                <CardTitle className="text-white text-lg sm:text-xl">
                  Uploaded Images ({uploadedImages.length})
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-sm"
                >
                  Clear All
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                  {uploadedImages.map((file, index) => (
                    <div
                      key={index}
                      className="relative group bg-white/5 rounded-xl p-2 sm:p-3 lg:p-4 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center mb-2 sm:mb-3 overflow-hidden">
                        {file.type.startsWith('image/') ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white/50" />
                        )}
                      </div>
                      
                      <p className="text-white/80 text-xs sm:text-sm truncate mb-1 font-medium">
                        {file.name}
                      </p>
                      <p className="text-white/50 text-xs">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;