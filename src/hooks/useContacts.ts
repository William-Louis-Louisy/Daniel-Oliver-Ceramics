'use client';

import {
  Contact,
  contactKeys,
  ContactMessage,
  retrieveContacts,
  sendContactMessage,
} from '@/lib/api/contact';
import type { ApiError } from '../lib/api/client';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useContacts() {
  return useQuery<{ contacts: Contact[] }, ApiError, Contact[]>({
    queryKey: contactKeys.list(),
    queryFn: retrieveContacts,
    select: (data) => data.contacts,
    staleTime: 30_000,
  });
}

export function useSendContactMessage() {
  return useMutation<{ message: string }, ApiError, ContactMessage>({
    mutationFn: sendContactMessage,
  });
}
