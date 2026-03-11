'use client';

import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { removeFile } from '@/store/slices/converterSlice';
import type { RootState } from '@/store/rootReducer';
import { IconButton } from '@/components/common/IconButton';

export function UploadPreviewList() {
  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.converter.files);

  if (files.length === 0) return null;

  return (
    <div className="upload-preview-list">
      {files.map((file, index) => (
        <div key={`${file.name}-${index}`} className="upload-preview-item">
          <div className="upload-preview-thumb">
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              width={80}
              height={80}
              className="upload-preview-img"
              unoptimized
            />
          </div>
          <span className="upload-preview-name" title={file.name}>
            {file.name}
          </span>
          <IconButton
            aria-label="Remove"
            className="upload-preview-remove"
            onClick={() => dispatch(removeFile(index))}
          >
            <XMarkIcon className="icon-md" />
          </IconButton>
        </div>
      ))}
    </div>
  );
}
