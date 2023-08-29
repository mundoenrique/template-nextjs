'use client'

import useGetFormStore from '@/hooks/zustanHooks';
import { useCountStore } from '@/store/useCountStore';


export const metadata = {
  title: "Internal Page - Admin Console",
  description: "Your profile page",
};

export default function Interna() {

	const { addCount } = useCountStore();
	const bears = useGetFormStore(useCountStore, (state) => state.count)
	return (
		<>
			Pagina de interna {bears}
			<button onClick={addCount}>Agregar</button>
		</>

	)
}
