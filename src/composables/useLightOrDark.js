import { Dark } from 'quasar'

export const useLightOrDark = (lightString, darkString) => {
  return !Dark.isActive ? lightString : darkString
}
