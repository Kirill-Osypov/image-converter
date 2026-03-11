export async function convertImage(
  file: File,
  targetMimeType: string,
): Promise<{ blob: Blob; width: number; height: number; sizeBytes: number }> {
  const bitmap = await createImageBitmap(file);

  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Unable to acquire 2D context');
  }

  context.drawImage(bitmap, 0, 0);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (!result) {
        reject(new Error('Failed to export image'));
      } else {
        resolve(result);
      }
    }, targetMimeType);
  });

  return {
    blob,
    width: bitmap.width,
    height: bitmap.height,
    sizeBytes: blob.size,
  };
}
