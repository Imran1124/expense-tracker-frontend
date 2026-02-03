import React, { useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CardTitle } from '@/components/ui/card';
import { Bell, X } from 'lucide-react';
import { useApi, usePostMutation } from '@/hooks/useCustomQuery';
import { useQueryClient } from '@tanstack/react-query';
import { circularApi } from '@/lib';
import { I_CIRCULAR_EVENT } from './type';

type Props = {
  readonly setIsDialogOpen: React.Dispatch<boolean>;
  readonly isDialogOpen: boolean;
  readonly id: string;
};

export default function CircularEventById({
  setIsDialogOpen,
  isDialogOpen,
  id
}: Props) {
  const circularData = useApi<I_CIRCULAR_EVENT>({
    api: `${circularApi?.eventById}/${id}`,
    options: {
      enabled: !!id && isDialogOpen
    }
  });

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="sm:max-w-[500px] my-auto">
        <div className="py-4">
          <CardTitle className="text-xl flex items-center justify-between font-bold mb-6">
            <div className="flex items-center">
              <span className="w-7 h-7 bg-primary rounded-full bg-red-5500 text-white inline-flex justify-center items-center mr-2">
                <Bell className="inline" />
              </span>{' '}
              Event
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
              {circularData?.data?.data?.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {circularData?.data?.data?.description}
            </p>

            {/* Action: mark as seen / view details which sets isActionBtn true on server */}
            <div className="mt-4 flex justify-end">
              {/* Mutation to toggle action button on server */}
              {/* send id in body as { id } */}
              <ActionButton id={id} setIsDialogOpen={setIsDialogOpen} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type ActionButtonProps = {
  id: string;
  setIsDialogOpen: React.Dispatch<boolean>;
};

function ActionButton({ id, setIsDialogOpen }: ActionButtonProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = usePostMutation({});

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          try {
            const key = (query.queryKey as any)?.[0];
            return (
              typeof key === 'string' &&
              key.includes('circular-event/circular-event-by-class-id')
            );
          } catch (e) {
            return false;
          }
        }
      });
      // close the dialog after marking it
      setIsDialogOpen(false);
    }
  }, [isSuccess, setIsDialogOpen, queryClient]);

  const handleClick = () => {
    if (!id) return;
    // send id in body; backend expects id in params/body
    mutate({ api: circularApi.updateActionBtn, data: { id } });
  };

  return (
    <button
      disabled={isPending || !id}
      onClick={handleClick}
      className={`py-2 px-4 rounded-2xl font-bold text-sm transition-all duration-200 ${
        isPending
          ? 'opacity-60 cursor-wait'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      {isPending ? 'Please wait...' : 'View Details'}
    </button>
  );
}
