import { useToast } from '@chakra-ui/react';

export function useCustomToast() {
  const toast = useToast();

  function toastSuccess(title: string) {
    toast({
      title: title,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  }

  function toastError(title: string) {
    toast({
      title: title,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  }

  return { toastSuccess, toastError };
}
