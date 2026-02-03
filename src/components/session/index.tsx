import { useSessionMasterList } from '@/hooks/useMaster';
import { useForm } from 'react-hook-form';
import { FormProviders, RHFSelectField } from '../forms';
import { useEffect } from 'react';
import { useAuth } from '@/store/useAuth';

export default function SessionField() {
  const { setSessionId, sessionId } = useAuth();
  const sessionList = useSessionMasterList();
  const methods = useForm({
    defaultValues: {
      sessionId: sessionId ?? ''
    }
  });
  const onSubmit = (data: any) => {
    setSessionId(data.sessionId);
  };

  useEffect(() => {
    if (methods.watch('sessionId')) {
      setSessionId(methods.watch('sessionId'));
    }
  }, [methods.watch('sessionId')]);

  return (
    <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <RHFSelectField
        name="sessionId"
        isReload
        data={
          sessionList?.data?.data?.docs?.map((item) => {
            return {
              label: item.session,
              value: item._id
            };
          }) || []
        }
      />
    </FormProviders>
  );
}
