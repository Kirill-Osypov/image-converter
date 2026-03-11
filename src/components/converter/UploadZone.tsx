'use client';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { setFiles, clearResults } from '@/store/slices/converterSlice';

export function UploadZone() {
  const dispatch = useDispatch();
  const t = useTranslations('converter');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const list = Array.from(files);
    dispatch(setFiles(list));
    dispatch(clearResults());
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className="upload-zone"
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
      onClick={openFileDialog}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="upload-input"
        onChange={onChange}
      />
      <ArrowUpTrayIcon className="icon-lg upload-icon" />
      <p className="upload-title">{t('uploadHint')}</p>
    </div>
  );
}
