import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  actions?: React.ReactNode;
  showCloseButton?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-2xl',
  actions,
  showCloseButton = true
}: ModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6"
      onClick={handleBackdropClick}
    >
      <div
        className={`w-full ${maxWidth} max-h-[90vh] overflow-y-auto rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 sm:p-6 shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between mb-4 gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white break-words">
            {title}
          </h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="mb-6">{children}</div>

        {/* Footer Actions */}
        {actions && (
          <div className="border-t border-gray-200 dark:border-slate-700 pt-4 flex gap-3 flex-col sm:flex-row">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
