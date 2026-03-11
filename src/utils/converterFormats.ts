export const SUPPORTED_IMAGE_FORMATS = [
  { value: 'image/png' as const, label: 'PNG' },
  { value: 'image/jpeg' as const, label: 'JPEG' },
  { value: 'image/webp' as const, label: 'WEBP' },
] as const;

export type TargetMimeType = (typeof SUPPORTED_IMAGE_FORMATS)[number]['value'];
