import { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const CustomPDFViewer = ({ pdfUrl, title, onClose }: any) => {
  const canvasRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState<any>(false);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState<any>(0);
  const [scale, setScale] = useState<any>(1.0);
  const [rotation, setRotation] = useState<any>(0);
  const [isLoading, setIsLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [orientation, setOrientation] = useState<any>('portrait');

  // Check device orientation
  useEffect(() => {
    const checkOrientation = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      );
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  // Load PDF.js script dynamically
  useEffect(() => {
    const loadPdfJs = async () => {
      // @ts-ignore
      if (window.pdfjsLib) return window.pdfjsLib;

      // Add PDF.js script
      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.async = true;
      document.body.appendChild(script);

      return new Promise((resolve) => {
        script.onload = () => {
          // Set up PDF.js worker
          const workerScript = document.createElement('script');
          workerScript.src =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          workerScript.async = true;
          document.body.appendChild(workerScript);

          workerScript.onload = () => {
            // @ts-ignore
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = workerScript.src;
            // @ts-ignore
            resolve(window.pdfjsLib);
          };
        };
      });
    };

    const initPdf = async () => {
      try {
        setIsLoading(true);
        const pdfjsLib = await loadPdfJs();

        // Load the PDF
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdfDoc = await loadingTask.promise;

        setPdf(pdfDoc);
        setTotalPages(pdfDoc.numPages);
        setCurrentPage(1);
        setError(null);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load PDF. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (pdfUrl) {
      initPdf();
    }

    return () => {
      // Cleanup
      if (pdf) {
        pdf.destroy();
      }
    };
  }, [pdfUrl]);

  // Render current page
  useEffect(() => {
    const renderPage = async () => {
      if (!pdf || !canvasRef.current) return;

      try {
        setIsLoading(true);
        const page = await pdf.getPage(currentPage);

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Calculate scale to fit width based on container
        const containerWidth =
          containerRef.current?.clientWidth || window.innerWidth * 0.9;
        // const containerHeight =
        //   containerRef.current?.clientHeight || window.innerHeight * 0.7;

        // Handle rotation
        let viewport;
        if (rotation % 180 === 0) {
          const scaleFactor =
            (containerWidth / page.getViewport({ scale: 1 }).width) * scale;
          viewport = page.getViewport({ scale: scaleFactor, rotation });
        } else {
          // For 90/270 degree rotation, we need to adjust for height/width swap
          const scaleFactor =
            (containerWidth / page.getViewport({ scale: 1 }).height) * scale;
          viewport = page.getViewport({ scale: scaleFactor, rotation });
        }

        // Set canvas dimensions
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Center canvas in view if smaller than container
        if (containerRef.current) {
          containerRef.current.style.justifyContent = 'center';
          containerRef.current.style.alignItems = 'center';
        }

        // Render PDF page
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;
        setIsLoading(false);
      } catch (err) {
        console.error('Error rendering page:', err);
        setError('Failed to render page.');
        setIsLoading(false);
      }
    };

    renderPage();
  }, [pdf, currentPage, scale, rotation]);

  // Navigation functions
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => {
    setScale(Math.min(scale + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(Math.max(scale - 0.2, 0.6));
  };

  const rotate = () => {
    setRotation((rotation + 90) % 360);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);

    // Rerender current page after fullscreen toggle
    setTimeout(() => {
      const currentPageValue = currentPage;
      setCurrentPage(0);
      setTimeout(() => setCurrentPage(currentPageValue), 50);
    }, 100);
  };

  // Handle swipe gestures for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: any) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: any) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      // Minimum distance for swipe
      const minDistance = 50;

      if (touchStartX - touchEndX > minDistance) {
        // Swipe left
        nextPage();
      } else if (touchEndX - touchStartX > minDistance) {
        // Swipe right
        prevPage();
      }
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('touchstart', handleTouchStart, {
        passive: true
      });
      element.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (element) {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentPage, totalPages]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-white flex flex-col ${
        isFullscreen ? 'h-screen' : 'h-[90vh] mx-2 my-auto rounded-lg shadow-lg'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-primary/90 text-white rounded-t-lg">
        <h2 className="text-lg font-semibold truncate max-w-[70%]">
          {title || 'PDF Viewer'}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-blue-700 rounded-full"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-blue-700 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Container */}
      <div
        ref={containerRef}
        className="flex-grow relative bg-gray-100 overflow-auto flex items-center justify-center"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )}

        {error && (
          <div className="text-center p-6">
            <p className="text-red-500 font-medium">{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setIsLoading(true);
                setError(null);
                // Force reload
                const currentPdfUrl = pdfUrl;
                setPdf(null);
                setTimeout(() => {
                  // @ts-ignore
                  if (window.pdfjsLib) {
                    const loadingTask =
                      // @ts-ignore
                      window.pdfjsLib.getDocument(currentPdfUrl);
                    loadingTask.promise
                      // @ts-ignore
                      .then((pdfDoc) => {
                        setPdf(pdfDoc);
                        setTotalPages(pdfDoc.numPages);
                        setCurrentPage(1);
                      })
                      .catch((err: any) => {
                        console.error('Error reloading PDF:', err);
                        setError(
                          'Failed to reload PDF. Please try again later.'
                        );
                        setIsLoading(false);
                      });
                  }
                }, 500);
              }}
            >
              Try Again
            </Button>
          </div>
        )}

        <canvas ref={canvasRef} className="shadow-md max-w-full touch-none" />
      </div>

      {/* Controls */}
      <div className="bg-white border-t px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={zoomOut}
              variant="outline"
              size="sm"
              className="w-9 p-0"
              disabled={scale <= 0.6}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{Math.round(scale * 100)}%</span>
            <Button
              onClick={zoomIn}
              variant="outline"
              size="sm"
              className="w-9 p-0"
              disabled={scale >= 3.0}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              onClick={rotate}
              variant="outline"
              size="sm"
              className="w-9 p-0 ml-2"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm mr-2">
              Page {currentPage} of {totalPages}
            </span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) =>
                setCurrentPage(
                  Math.min(
                    Math.max(1, parseInt(e.target.value) || 1),
                    totalPages
                  )
                )
              }
              className="w-12 h-8 text-center border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button
            onClick={prevPage}
            disabled={currentPage <= 1}
            variant="outline"
            className="flex items-center justify-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <Button
            onClick={nextPage}
            disabled={currentPage >= totalPages}
            variant="outline"
            className="flex items-center justify-center gap-1"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Orientation tip */}
      {orientation === 'portrait' && (
        <div className="text-xs text-gray-500 text-center py-1 bg-gray-50">
          Tip: Rotate your device for a better reading experience
        </div>
      )}
    </div>
  );
};

export default CustomPDFViewer;
