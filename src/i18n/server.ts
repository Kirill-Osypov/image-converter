import type { Locale } from './routing';
import ukMessages from '@/messages/uk.json';
import enMessages from '@/messages/en.json';

export async function getMessages(locale: Locale) {
  switch (locale) {
    case 'uk':
      return ukMessages;
    case 'en':
    default:
      return enMessages;
  }
}
