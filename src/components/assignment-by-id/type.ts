import { assignmentType } from '@/hooks/useMaster'; // changed import

export type I_ASSIGNMENT = {
  data: assignmentType; // updated type name
  success: boolean;
  message: string;
};
