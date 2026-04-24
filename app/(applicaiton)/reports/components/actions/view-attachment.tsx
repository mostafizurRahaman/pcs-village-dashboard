import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Paperclip, Download, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import Image from "next/image";

export function AttachmentModal({ attachmentUrls = [] }: { attachmentUrls: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === attachmentUrls.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? attachmentUrls.length - 1 : prev - 1));
  };

  const getFileName = (url: string) => {
    return url.split("/").pop()?.split("?")[0] || "Attachment.jpg";
  };

  return (
    <Dialog onOpenChange={() => setCurrentIndex(0)}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-2 text-zinc-400 hover:text-white hover:bg-zinc-900">
          <Paperclip className="h-4 w-4" />
          <span className="text-xs">View Attachments</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] bg-[#09090b] border-zinc-800 p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-zinc-800/50">
          <DialogTitle className="flex items-center gap-2 text-sm font-medium text-zinc-200">
            <Paperclip className="h-4 w-4 text-zinc-500" />
            Post Attachments
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          {attachmentUrls.length > 0 ? (
            <>
              {/* Slider Container */}
              <div className="relative group">
                <div className="relative w-full h-[250px] rounded-xl overflow-hidden bg-[#121214] border border-zinc-800">
                  {/* Image Rendering */}
                  <div 
                    className="flex h-full transition-transform duration-500 ease-out" 
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {attachmentUrls.map((url, index) => (
                      <div key={index} className="relative min-w-full h-full flex items-center justify-center p-2">
                         {url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) ? (
                            <Image 
                              src={url} 
                              alt="preview" 
                              fill 
                              className="object-contain" 
                              unoptimized 
                            />
                         ) : (
                            <div className="flex flex-col items-center text-zinc-700">
                               <ImageIcon className="h-10 w-10 mb-2 opacity-10" />
                               <span className="text-[10px] uppercase">No Preview</span>
                            </div>
                         )}
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows (Only if > 1 image) */}
                  {attachmentUrls.length > 1 && (
                    <>
                      <button 
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-all z-10"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-all z-10"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Pagination Dots */}
                {attachmentUrls.length > 1 && (
                  <div className="flex justify-center gap-1.5 mt-3">
                    {attachmentUrls.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === i ? "w-4 bg-blue-500" : "w-1.5 bg-zinc-800"}`} 
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Info Card - Updates based on currentIndex */}
              <div className="flex items-center justify-between p-3 bg-[#18181b] border border-zinc-800 rounded-lg">
                <div className="flex flex-col overflow-hidden mr-4">
                  <span className="text-xs font-semibold text-zinc-100 truncate max-w-[280px]">
                    {getFileName(attachmentUrls[currentIndex])}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-bold mt-0.5 tracking-wider">
                    FILE {attachmentUrls.length > 1 && `(${currentIndex + 1}/${attachmentUrls.length})`}
                  </span>
                </div>
                <a
                  href={attachmentUrls[currentIndex]}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 p-2 text-blue-500 hover:bg-blue-500/10 rounded-md transition-all"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center bg-zinc-900/20 rounded-xl border border-dashed border-zinc-800">
               <ImageIcon className="h-8 w-8 text-zinc-800 mb-2" />
               <p className="text-xs text-zinc-500">No media attached</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}