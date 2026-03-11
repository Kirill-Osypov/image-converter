type LoaderProps = {
  size?: 'sm' | 'md';
};

export function Loader({ size = 'md' }: LoaderProps) {
  return <span className={`loader loader-${size}`} aria-hidden="true" />;
}
