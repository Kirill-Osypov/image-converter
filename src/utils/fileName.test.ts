import { getFileNameWithNewExtension } from './fileName';

describe('getFileNameWithNewExtension', () => {
  it('заменяет расширение у файла с расширением', () => {
    expect(getFileNameWithNewExtension('photo.jpg', 'png')).toBe('photo.png');
    expect(getFileNameWithNewExtension('image.jpeg', 'webp')).toBe('image.webp');
  });

  it('добавляет расширение, если в имени точки нет', () => {
    expect(getFileNameWithNewExtension('image', 'png')).toBe('image.png');
  });

  it('убирает ведущую точку из newExtension', () => {
    expect(getFileNameWithNewExtension('photo.jpg', '.png')).toBe('photo.png');
  });

  it('корректно обрабатывает имя с несколькими точками', () => {
    expect(getFileNameWithNewExtension('my.file.name.jpg', 'png')).toBe(
      'my.file.name.png',
    );
  });

  it('корректно обрабатывает имя, где точка только в начале', () => {
    expect(getFileNameWithNewExtension('.gitignore', 'txt')).toBe('.gitignore.txt');
  });
});
