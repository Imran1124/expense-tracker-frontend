// Modal Component Usage Guide
// Location: src/components/modal/Modal.tsx

/**
 * RESPONSIVE MODAL COMPONENT WITH CLOSE BUTTON
 * 
 * Features:
 * - ✅ Responsive design (mobile, tablet, desktop)
 * - ✅ Close button (X icon) in top-right corner
 * - ✅ Click outside to close (backdrop click)
 * - ✅ Dark mode support
 * - ✅ Customizable width with maxWidth prop
 * - ✅ Optional action buttons section
 * 
 * Props:
 * - isOpen (boolean): Controls modal visibility
 * - onClose (function): Called when modal should close
 * - title (string): Modal title
 * - children (ReactNode): Modal content
 * - maxWidth (string): Tailwind max-width class (default: max-w-2xl)
 * - actions (ReactNode): Optional button actions section
 * - showCloseButton (boolean): Show/hide close button (default: true)
 */

import { Modal } from '@/components/modal';
import { useState } from 'react';

export const ExampleUsage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal Title"
        maxWidth="max-w-2xl"
        actions={
          <>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-lg border border-gray-300 dark:border-slate-600 px-4 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle save
                setIsOpen(false);
              }}
              className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 font-medium text-white transition-colors"
            >
              Save
            </button>
          </>
        }
      >
        {/* Modal Content Here */}
        <div className="space-y-4">
          <p>Your modal content goes here...</p>
        </div>
      </Modal>
    </>
  );
};

/**
 * ALL MODAL IMPLEMENTATIONS IN APP
 * 
 * ✅ Updated Components:
 * 1. src/pages/expense-tracker/home/AdminDashboard.tsx - Uses new Modal
 * 2. src/pages/expense-tracker/roles/RoleManagementPage.tsx - Uses new Modal
 * 
 * ✅ Existing Components with Close Button:
 * 3. src/components/edit-dialog-box/index.tsx - DialogBox with close button
 * 4. src/components/pdf-viewer/index.tsx - PDF viewer with close button
 * 5. src/components/ui/dialog.tsx - Shadcn Dialog (Radix UI based)
 * 6. src/components/ui/alert-dialog.tsx - Shadcn AlertDialog
 * 7. src/components/ui/sheet.tsx - Shadcn Sheet (drawer)
 * 8. src/layouts/dashboard-layout/components/DashboardSidebar.tsx - Responsive sidebar
 * 
 * RESPONSIVENESS BREAKDOWN:
 * ✅ Mobile (< 640px):
 *    - Full width with padding
 *    - max-h-[90vh] for scrollable content
 *    - sm:p-6 responsive padding
 *    - Stack button actions vertically with flex-col
 *
 * ✅ Tablet/Desktop (>= 640px):
 *    - Centered with max-width
 *    - sm:p-6 responsive padding
 *    - Row layout for action buttons with flex-row
 *
 * ✅ All Modals Include:
 *    - Close button (X icon)
 *    - Dark mode classes
 *    - Smooth animations
 *    - Prevent body scroll when open
 *    - Backdrop click to close
 */
