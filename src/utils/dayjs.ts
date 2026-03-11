import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/en';
import 'dayjs/locale/uk';

dayjs.extend(localizedFormat);

export function setDayjsLocale(locale: string) {
  dayjs.locale(locale === 'uk' ? 'uk' : 'en');
}

export default dayjs;

