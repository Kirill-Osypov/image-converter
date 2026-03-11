'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { saveAs } from '@/utils/saveAs';
import type { ConvertedImageRecord } from '@/types/history';
import dayjs from 'dayjs';
import { Button } from '@/components/common/Button';

type ResultCardProps = {
  record: ConvertedImageRecord;
};

export function ResultCard({ record }: ResultCardProps) {
  const t = useTranslations('converter');

  const onDownload = () => {
    const extension = record.targetMimeType.split('/')[1] ?? 'image';
    const fileName = `${record.originalName}.${extension}`;
    saveAs(record.blob, fileName);
  };

  const createdAt = dayjs(record.createdAt).format('YYYY-MM-DD HH:mm');

  const objectUrl = URL.createObjectURL(record.blob);

  return (
    <article className="result-card">
      <div className="result-preview">
        <Image
          src={objectUrl}
          alt={record.originalName}
          className="result-img"
          width={record.width || 400}
          height={record.height || 300}
          unoptimized
        />
      </div>
      <div className="result-meta">
        <p className="result-name" title={record.originalName}>
          {record.originalName}
        </p>
        <p className="result-subtitle">
          {record.width}×{record.height}px • {(record.sizeBytes / 1024).toFixed(1)} KB
        </p>
        <p className="result-subtitle">{createdAt}</p>
      </div>
      <Button variant="ghost" fullWidth onClick={onDownload}>
        {t('download')}
      </Button>
    </article>
  );
}
