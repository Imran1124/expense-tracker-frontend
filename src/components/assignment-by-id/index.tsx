import React from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { CardTitle } from '@/components/ui/card';
import { ClipboardList, X } from 'lucide-react'; // changed Bell to ClipboardList for assignment icon
import { useApi } from '@/hooks/useCustomQuery';
import { assignmentApi } from '@/lib'; // changed to assignmentApi
import { I_ASSIGNMENT } from './type'; // updated type

type Props = {
  readonly setIsDialogOpen: React.Dispatch<boolean>;
  readonly isDialogOpen: boolean;
  readonly id: string;
};

export default function AssignmentById({
  setIsDialogOpen,
  isDialogOpen,
  id
}: Props) {
  const assignmentData = useApi<I_ASSIGNMENT>({
    api: `${assignmentApi?.assignmentById}/${id}`,
    options: {
      enabled: !!id && isDialogOpen
    }
  });

  return (
    <Dialog open={isDialogOpen}>
      <DialogHeader />
      <DialogContent className="sm:max-w-[500px] my-auto">
        <div className="py-4">
          <CardTitle className="text-xl flex items-center justify-between font-bold mb-6">
            <div className="flex items-center">
              <span className="w-7 h-7 bg-primary rounded-full bg-blue-500 text-white inline-flex justify-center items-center mr-2">
                <ClipboardList className="inline" /> {/* changed icon */}
              </span>{' '}
              Assignment
            </div>
            <div>
              <X
                className="cursor-pointer hover:bg-red-100 rounded-lg inline"
                onClick={() => setIsDialogOpen(false)}
              />
            </div>
          </CardTitle>

          <div className="mt-6 overflow-y-auto">
            <h2 className="text-sm font-semibold truncate">
              {assignmentData?.data?.data?.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {assignmentData?.data?.data?.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
