'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import dayjs from '@/utils/dayjs';
import { TrashIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import type { ConvertedImageRecord } from '@/types/history';
import { deleteHistoryRequested } from '@/store/slices/historySlice';
import { IconButton } from '@/components/common/IconButton';

type HistoryCardProps = {
  record: ConvertedImageRecord;
};

export function HistoryCard({ record }: HistoryCardProps) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteHistoryRequested(record.id));
  };

  const createdAt = dayjs(record.createdAt).format('L LT');
  const expiresAt = dayjs(record.expiresAt).format('L LT');

  const objectUrl = URL.createObjectURL(record.blob);

  return (
    <article className="history-card">
      <div className="history-preview">
        <Image
          src={objectUrl}
          alt={record.fileName}
          className="history-img"
          width={record.width || 80}
          height={record.height || 80}
          unoptimized
        />
      </div>
      <div className="history-content">
        <div className="history-row">
          <p className="history-name" title={record.fileName}>
            {record.fileName}
          </p>
          <div className="history-actions">
            <IconButton aria-label="Reconvert">
              <ArrowPathRoundedSquareIcon className="icon-md" />
            </IconButton>
            <IconButton aria-label="Delete" onClick={onDelete}>
              <TrashIcon className="icon-md" />
            </IconButton>
          </div>
        </div>
        <p className="history-subtitle">
          {record.width}×{record.height}px • {(record.sizeBytes / 1024).toFixed(1)} KB
        </p>
        <p className="history-subtitle">
          {createdAt} → {expiresAt}
        </p>
      </div>
    </article>
  );
}
