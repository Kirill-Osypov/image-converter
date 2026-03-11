import { render } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader', () => {
  it('рендерит элемент с классом loader', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.loader')).not.toBeNull();
  });

  it('по умолчанию имеет размер md', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('.loader-md');
    expect(loader).not.toBeNull();
  });

  it('применяет размер sm', () => {
    const { container } = render(<Loader size="sm" />);
    const loader = container.querySelector('.loader-sm');
    expect(loader).not.toBeNull();
  });

  it('имеет aria-hidden для доступности', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('[aria-hidden="true"]');
    expect(loader).not.toBeNull();
  });
});
