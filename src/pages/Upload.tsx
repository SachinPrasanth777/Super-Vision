import { useState, useRef, DragEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";

interface ProcessedImage {
  id: string;
  originalFile: File;
  processedUrl: string;
  isProcessing: boolean;
}

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
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

  const processImage = async (file: File) => {
    const imageId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    // Add to processed images with loading state
    const newProcessedImage: ProcessedImage = {
      id: imageId,
      originalFile: file,
      processedUrl: '',
      isProcessing: true
    };
    
    setProcessedImages(prev => [...prev, newProcessedImage]);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://deployment-i6o2.onrender.com/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const blob = await response.blob();
      const processedUrl = URL.createObjectURL(blob);

      // Update the processed image with the result
      setProcessedImages(prev => 
        prev.map(img => 
          img.id === imageId 
            ? { ...img, processedUrl, isProcessing: false }
            : img
        )
      );

      toast.success("Image processed successfully!");
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error("Failed to process image. Make sure the backend is running.");
      
      // Remove the failed image from processed images
      setProcessedImages(prev => prev.filter(img => img.id !== imageId));
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
      imageFiles.forEach(file => processImage(file));
      toast.success(`${imageFiles.length} image(s) uploaded and processing...`);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setUploadedImages(prev => [...prev, ...imageFiles]);
      imageFiles.forEach(file => processImage(file));
      toast.success(`${imageFiles.length} image(s) uploaded and processing...`);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    toast.success("Image removed");
  };

  const removeProcessedImage = (id: string) => {
    setProcessedImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove && imageToRemove.processedUrl) {
        URL.revokeObjectURL(imageToRemove.processedUrl);
      }
      return prev.filter(img => img.id !== id);
    });
    toast.success("Processed image removed");
  };

  const clearAll = () => {
    setUploadedImages([]);
    // Clean up object URLs
    processedImages.forEach(img => {
      if (img.processedUrl) {
        URL.revokeObjectURL(img.processedUrl);
      }
    });
    setProcessedImages([]);
    toast.success("All images cleared");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Header />
      
      <div className="pt-16 sm:pt-20 pb-6 sm:pb-8 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4 px-2">
              AI Image Enhancement
            </h1>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
              Upload images for super-resolution and AI object detection
            </p>
          </div>

          {/* Upload Area */}
          <Card className="mb-6 sm:mb-8 bg-white/5 backdrop-blur-md border-white/20 shadow-2xl">
            <CardContent className="p-3 sm:p-6">
              <div
                className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-teal-400 bg-teal-400/10 scale-[1.02]'
                    : 'border-white/30 hover:border-white/50 hover:bg-white/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    dragActive ? 'bg-teal-400/20 scale-110' : 'bg-white/10'
                  }`}>
                    <Upload className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                      dragActive ? 'text-teal-400' : 'text-white/70'
                    }`} />
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {dragActive ? 'Drop images here' : 'Upload Images'}
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm max-w-xs mx-auto px-2">
                      Drag and drop images here, or click the button below
                    </p>
                    
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      size="sm"
                      className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 px-4 sm:px-6 py-2 text-xs sm:text-sm mt-3"
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

          {/* Processed Images Results - Mobile Optimized */}
          {processedImages.length > 0 && (
            <Card className="mb-6 sm:mb-8 bg-white/5 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-3 sm:pb-4 space-y-0 px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="text-white text-base sm:text-lg font-bold">
                  AI Enhanced ({processedImages.length})
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-xs px-2 py-1 h-auto"
                >
                  Clear All
                </Button>
              </CardHeader>
              <CardContent className="pt-0 px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="space-y-4 sm:space-y-6">
                  {processedImages.map((processedImg) => (
                    <div
                      key={processedImg.id}
                      className="relative group bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-white/30 transition-all duration-300"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Original Image */}
                        <div className="space-y-2 sm:space-y-3">
                          <h4 className="text-white/90 text-sm sm:text-base font-medium text-center">Original</h4>
                          <div className="aspect-square bg-white/10 rounded-lg overflow-hidden border border-white/20">
                            <img
                              src={URL.createObjectURL(processedImg.originalFile)}
                              alt="Original"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Processed Image */}
                        <div className="space-y-2 sm:space-y-3">
                          <h4 className="text-white/90 text-sm sm:text-base font-medium text-center">AI Enhanced</h4>
                          <div className="aspect-square bg-white/10 rounded-lg overflow-hidden border border-white/20 flex items-center justify-center">
                            {processedImg.isProcessing ? (
                              <div className="flex flex-col items-center gap-2 sm:gap-3">
                                <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-white/50 animate-spin" />
                                <span className="text-white/70 text-xs sm:text-sm font-medium">Processing...</span>
                                <div className="text-white/50 text-xs text-center max-w-xs px-2">
                                  Applying super-resolution and object detection
                                </div>
                              </div>
                            ) : processedImg.processedUrl ? (
                              <img
                                src={processedImg.processedUrl}
                                alt="AI Enhanced with Object Detection"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white/50" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 sm:mt-4 pt-3 border-t border-white/10 text-center">
                        <p className="text-white/90 text-xs sm:text-sm font-medium mb-1">
                          {processedImg.originalFile.name}
                        </p>
                        <p className="text-white/60 text-xs">
                          {(processedImg.originalFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg rounded-full"
                        onClick={() => removeProcessedImage(processedImg.id)}
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Queue - Mobile Optimized */}
          {uploadedImages.length > 0 && (
            <Card className="bg-white/5 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-3">
                <CardTitle className="text-white text-base sm:text-lg">
                  Upload Queue ({uploadedImages.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                  {uploadedImages.map((file, index) => (
                    <div
                      key={index}
                      className="relative group bg-white/5 rounded-lg p-2 border border-white/10 hover:border-white/30 transition-all duration-300"
                    >
                      <div className="aspect-square bg-white/10 rounded overflow-hidden mb-2">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <p className="text-white/80 text-xs truncate font-medium">
                        {file.name.split('.')[0]}
                      </p>
                      
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-2 h-2 sm:w-3 sm:h-3" />
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