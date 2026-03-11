import {
  SUPPORTED_IMAGE_FORMATS,
  type TargetMimeType,
} from './converterFormats';

describe('converterFormats', () => {
  describe('SUPPORTED_IMAGE_FORMATS', () => {
    it('содержит PNG, JPEG, WEBP', () => {
      const values = SUPPORTED_IMAGE_FORMATS.map((f) => f.value);
      expect(values).toContain('image/png');
      expect(values).toContain('image/jpeg');
      expect(values).toContain('image/webp');
    });

    it('содержит соответствующие label для каждого формата', () => {
      const labels = SUPPORTED_IMAGE_FORMATS.map((f) => f.label);
      expect(labels).toContain('PNG');
      expect(labels).toContain('JPEG');
      expect(labels).toContain('WEBP');
    });

    it('имеет ровно 3 формата', () => {
      expect(SUPPORTED_IMAGE_FORMATS).toHaveLength(3);
    });
  });

  describe('TargetMimeType', () => {
    it('допускает только поддерживаемые MIME-типы', () => {
      const format: TargetMimeType = 'image/png';
      expect(format).toBe('image/png');
    });
  });
});
