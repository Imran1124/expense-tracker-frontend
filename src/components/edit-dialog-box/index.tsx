import React from 'react';
import { X } from 'lucide-react';

// Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="relative">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animation-delay-150"></div>
    </div>
  </div>
);

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title?: string;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
};

export default function DialogBox({
  children,
  open,
  setOpen,
  title,
  // edit,
  setEdit,
  isLoading
}: Readonly<Props>) {
  const handleOpen = () => {
    if (setEdit) {
      setEdit(false);
    }
    setOpen((prev) => !prev);
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleOpen();
    }
  };

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes backdropFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalFadeOut {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .modal-backdrop {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .modal-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .dark .modal-content {
          background: rgba(17, 24, 39, 0.95);
          border: 1px solid rgba(75, 85, 99, 0.3);
        }

        .modal-enter {
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .backdrop-enter {
          animation: backdropFadeIn 0.3s ease-out;
        }

        .close-button {
          background: linear-gradient(
            135deg,
            rgba(239, 68, 68, 0.1),
            rgba(147, 51, 234, 0.1)
          );
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .close-button:hover {
          background: linear-gradient(
            135deg,
            rgba(239, 68, 68, 0.2),
            rgba(147, 51, 234, 0.2)
          );
          transform: scale(1.05);
        }

        .header-gradient {
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.1),
            rgba(168, 85, 247, 0.1)
          );
          border-bottom: 1px solid rgba(99, 102, 241, 0.2);
        }

        .dark .header-gradient {
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.2),
            rgba(168, 85, 247, 0.2)
          );
          border-bottom: 1px solid rgba(99, 102, 241, 0.3);
        }

        .loading-shimmer {
          background: linear-gradient(
            90deg,
            rgba(99, 102, 241, 0.1) 0%,
            rgba(168, 85, 247, 0.2) 50%,
            rgba(99, 102, 241, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .animation-delay-150 {
          animation-delay: 150ms;
        }

        @media (max-width: 640px) {
          .modal-content {
            margin: 1rem;
          }
        }
      `}</style>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 modal-backdrop backdrop-enter"
          style={{
            background:
              'linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(17, 24, 39, 0.6))'
          }}
          onClick={handleBackdropClick}
        />
      )}

      {/* Modal */}
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden={!open}
        className={`${
          open ? 'flex' : 'hidden'
        } overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center p-1`}
        onClick={handleBackdropClick}
      >
        <div
          className="relative w-full max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal content */}
          <div className="modal-content modal-enter rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal header */}
            <div className="header-gradient flex items-center justify-between p-6">
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                  {title ?? 'Add/Edit'}
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2"></div>
              </div>

              <button
                onClick={handleOpen}
                type="button"
                className="close-button p-1.5 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-400 transition-all duration-200 group"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors duration-200" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-4 bg-white dark:bg-gray-800 min-h-[120px]">
              {isLoading ? (
                <div className="flex flex-col justify-center items-center h-32 space-y-4">
                  <div className="loading-shimmer w-full h-2 rounded-full"></div>
                  <Spinner />
                  <div className="loading-shimmer w-3/4 h-2 rounded-full"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                    Loading...
                  </p>
                </div>
              ) : (
                <div className="space-y-1">{children}</div>
              )}
            </div>

            {/* Decorative bottom border */}
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          </div>
        </div>
      </div>
    </>
  );
}
