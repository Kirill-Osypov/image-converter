import type { Locale } from './routing';
import ukMessages from '@/messages/uk.json';
import enMessages from '@/messages/en.json';

export async function getMessages(locale: Locale) {
  switch (locale) {
    case 'en':
      return enMessages;
    case 'uk':
    default:
      return ukMessages;
  }
}
