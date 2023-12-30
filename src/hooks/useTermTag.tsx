import Colors from '../consts/colors'

export const useTermTag = (level: number, selected?: boolean) => {
  const fromColor = () => {
    return `${
      selected
        ? Colors.fromcolorsSelected[level - 1]
        : Colors.fromcolors[level - 1]
    }`
  }
  const viaColor = () => {
    return `${
      selected
        ? Colors.viacolorsSelected[level - 1]
        : Colors.viacolors[level - 1]
    }`
  }
  const getTagColor = () => {
    return `bg-gradient-to-r ${fromColor()} from-10% ${viaColor()} via-20% to-black to-90%`
  }
  return {
    getTagColor,
  }
}
