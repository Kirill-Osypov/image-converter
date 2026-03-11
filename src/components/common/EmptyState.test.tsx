import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('рендерит заголовок', () => {
    render(<EmptyState title="Нет результатов" />);
    expect(screen.getByText('Нет результатов')).toBeInTheDocument();
  });

  it('рендерит описание, если передано', () => {
    render(
      <EmptyState title="Заголовок" description="Дополнительное описание" />,
    );
    expect(screen.getByText('Дополнительное описание')).toBeInTheDocument();
  });

  it('не рендерит блок описания, если description не передан', () => {
    const { container } = render(<EmptyState title="Заголовок" />);
    expect(container.querySelector('.empty-state-description')).toBeNull();
  });
});
