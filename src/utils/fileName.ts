export function getFileNameWithNewExtension(originalName: string, newExtension: string): string {
  const safeExt = newExtension.replace(/^\./, '');

  const lastDotIndex = originalName.lastIndexOf('.');
  if (lastDotIndex <= 0) {
    return `${originalName}.${safeExt}`;
  }

  const base = originalName.slice(0, lastDotIndex);
  return `${base}.${safeExt}`;
}

