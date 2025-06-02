import { usePathname } from 'next/navigation';

export default function useSource() {
  const pathname = usePathname();
  const source = pathname.split('/').find((_, index, array) => array[index - 1] === 'external');

  return source;
}
