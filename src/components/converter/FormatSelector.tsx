'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { setTargetFormat, type TargetMimeType } from '@/store/slices/converterSlice';
import type { RootState } from '@/store/rootReducer';
import { SUPPORTED_IMAGE_FORMATS } from '@/utils/converterFormats';

export function FormatSelector() {
  const dispatch = useDispatch();
  const t = useTranslations('converter');
  const targetFormat = useSelector((state: RootState) => state.converter.targetFormat);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTargetFormat(event.target.value as TargetMimeType));
  };

  return (
    <div className="format-selector">
      <label className="field-label">
        {t('targetFormat')}
        <select className="select" value={targetFormat} onChange={handleChange}>
          {SUPPORTED_IMAGE_FORMATS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
