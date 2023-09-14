'use client';

import useGetFormStore from '@/hooks/zustanHooks';
import { useCountStore } from '@/store/useCountStore';

export default function Internal() {
  const { addCount } = useCountStore();
  const bears = useGetFormStore(useCountStore, (state) => state.count);
  return (
    <>
      Pagina de interna {bears}
      <button onClick={addCount}>Agregar</button>
    </>
  );
}
