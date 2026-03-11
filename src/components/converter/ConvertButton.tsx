'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import type { RootState } from '@/store/rootReducer';
import { convertRequested } from '@/store/slices/converterSlice';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';

export function ConvertButton() {
  const dispatch = useDispatch();
  const t = useTranslations('converter');
  const isConverting = useSelector((state: RootState) => state.converter.isConverting);
  const hasFiles = useSelector((state: RootState) => state.converter.files.length > 0);

  const onClick = () => {
    if (!hasFiles || isConverting) return;
    dispatch(convertRequested());
  };

  return (
    <Button onClick={onClick} disabled={!hasFiles || isConverting} fullWidth>
      {isConverting ? (
        <span className="btn-content">
          <Loader size="sm" /> {t('converting')}
        </span>
      ) : (
        t('convertButton')
      )}
    </Button>
  );
}
