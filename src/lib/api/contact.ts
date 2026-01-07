import { apiFetch } from './client';

export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  email: string;
  firstName: string;
  lastName: string;
  subject: string;
  message: string;
}

export const sendContactMessage = (payload: ContactMessage) =>
  apiFetch<{ message: string }>('/send-contact-email', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const retrieveContacts = () =>
  apiFetch<{ contacts: Contact[] }>('/retrieve-contacts', { cache: 'no-store' });

export const contactKeys = {
  all: ['contacts'] as const,
  list: () => [...contactKeys.all, 'list'] as const,
  detail: (id: string) => [...contactKeys.all, 'detail', id] as const,
};
