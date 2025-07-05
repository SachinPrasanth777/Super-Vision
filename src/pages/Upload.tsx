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

      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const blob = await response.blob();
      const processedUrl = URL.createObjectURL(blob);

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
      
      <div className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-6 px-2">
              AI Image Enhancement
            </h1>
            <p className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-2">
              Upload images for super-resolution and AI object detection
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

          {/* Processed Images Results - Now Much Wider */}
          {processedImages.length > 0 && (
            <Card className="mb-8 bg-white/5 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 sm:pb-6 space-y-2 sm:space-y-0">
                <CardTitle className="text-white text-xl sm:text-2xl font-bold">
                  AI Enhanced Results ({processedImages.length})
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
                <div className="space-y-8">
                  {processedImages.map((processedImg) => (
                    <div
                      key={processedImg.id}
                      className="relative group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Original Image */}
                        <div className="space-y-4">
                          <h4 className="text-white/90 text-lg font-semibold mb-3 text-center">Original Image</h4>
                          <div className="aspect-[4/3] bg-white/10 rounded-xl overflow-hidden border border-white/20">
                            <img
                              src={URL.createObjectURL(processedImg.originalFile)}
                              alt="Original"
                              className="w-full h-full object-contain bg-black/20"
                            />
                          </div>
                        </div>
                        
                        {/* Processed Image */}
                        <div className="space-y-4">
                          <h4 className="text-white/90 text-lg font-semibold mb-3 text-center">AI Enhanced & Object Detection</h4>
                          <div className="aspect-[4/3] bg-white/10 rounded-xl overflow-hidden border border-white/20 flex items-center justify-center">
                            {processedImg.isProcessing ? (
                              <div className="flex flex-col items-center gap-4">
                                <Loader2 className="w-12 h-12 text-white/50 animate-spin" />
                                <span className="text-white/70 text-sm font-medium">Processing with AI...</span>
                                <div className="text-white/50 text-xs text-center max-w-xs">
                                  Applying super-resolution and detecting objects
                                </div>
                              </div>
                            ) : processedImg.processedUrl ? (
                              <img
                                src={processedImg.processedUrl}
                                alt="AI Enhanced with Object Detection"
                                className="w-full h-full object-contain bg-black/20"
                              />
                            ) : (
                              <ImageIcon className="w-12 h-12 text-white/50" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-white/10 text-center">
                        <p className="text-white/90 text-base font-medium mb-1">
                          {processedImg.originalFile.name}
                        </p>
                        <p className="text-white/60 text-sm">
                          Size: {(processedImg.originalFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-3 -right-3 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg rounded-full"
                        onClick={() => removeProcessedImage(processedImg.id)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Original Uploaded Images - Simplified */}
          {uploadedImages.length > 0 && (
            <Card className="bg-white/5 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg sm:text-xl">
                  Upload Queue ({uploadedImages.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
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
                        className="absolute -top-1 -right-1 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
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