import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('рендерит детей', () => {
    render(<Button>Нажми меня</Button>);
    expect(screen.getByRole('button', { name: 'Нажми меня' })).toBeInTheDocument();
  });

  it('по умолчанию имеет вариант primary', () => {
    render(<Button>Click</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('btn-primary');
  });

  it('применяет вариант ghost', () => {
    render(<Button variant="ghost">Click</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('btn-ghost');
  });

  it('добавляет btn-full при fullWidth', () => {
    render(<Button fullWidth>Click</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('btn-full');
  });

  it('вызывает onClick при клике', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('передаёт disabled', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
