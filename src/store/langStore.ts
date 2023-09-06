import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LangState {
lang: string
changeLang: (lang: string) => void
}

export const useLangStore = create<LangState>()(
	persist(
	(set) => ({
		lang: 'es',
		changeLang: (lang) => set(() => ({ lang: lang })),
		}),
		{
      name: 'languaje'
    }
	)
)
