import { atom } from 'recoil'
import { EditElem } from '../types/types'

export const questElemsState = atom({
  key: 'questElemsState',
  default: [],
})

export const optionElemsState = atom({
  key: 'optionElemsState',
  default: [],
})

export const explanationElemsState = atom({
  key: 'explanationElemsState',
  default: [],
})
