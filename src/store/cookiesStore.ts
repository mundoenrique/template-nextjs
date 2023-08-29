import Cookies from 'js-cookie'
import { create } from 'zustand'

type cookiesState = {
  allCookies: any,
  acceptAll: (options: any, allCookies: number) => void,
}

const nCookies = Cookies.get('necessaryCookies}') || ''
const fCookies = Cookies.get('functionalCookies') || ''
const pCookies = Cookies.get('performanceCookies') || ''

export const useCookiesStore = create<cookiesState>((set) => ({
  allCookies: [{}],
  acceptAll: (options, allCookies) => {
    for (let i = 0; i < options.length; i++) {
      if (allCookies === 1) {
        options[i].value = true
        Cookies.set(options[i].name, 'accepted', { secure: true, sameSite: 'strict', path: '/' })
      } else if (allCookies === 2 && options[i].value === true)
        Cookies.set(options[i].name, 'accepted', { secure: true, sameSite: 'strict', path: '/' })
    }
    set({ allCookies })
  } 
}))
