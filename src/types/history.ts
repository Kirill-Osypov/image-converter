export type ConvertedImageRecord = {
  id: string;
  originalName: string;
  originalMimeType: string;
  targetMimeType: 'image/png' | 'image/jpeg' | 'image/webp';
  createdAt: string;
  expiresAt: string;
  sizeBytes: number;
  width: number;
  height: number;
  blob: Blob;
};
