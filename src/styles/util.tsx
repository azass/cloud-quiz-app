import styled from 'styled-components'
import Colors from '../consts/colors'

/**
 * Padding Margin 汎用コンポーネント
 *
 * <Margin top="2rem" bottom="40px" right="auto" left="auto">
 *   <調整したいコンポーネント />
 * </Margin>
 */

type Props = {
  top?: string | number
  right?: string | number
  bottom?: string | number
  left?: string | number
  inline?: boolean
}

export const Padding = styled.div<Props>`
  padding-top: ${(props) => props.top};
  padding-right: ${(props) => props.right};
  padding-bottom: ${(props) => props.bottom};
  padding-left: ${(props) => props.left};
`

Padding.defaultProps = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

export const Margin = styled.div<Props>`
  margin-top: ${(props) => props.top};
  margin-right: ${(props) => props.right};
  margin-bottom: ${(props) => props.bottom};
  margin-left: ${(props) => props.left};
  ${(props) => (props.inline ? 'display: inline-block;' : 'display: block;')}
`

Margin.defaultProps = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

/** media query
 *
 *  ${media.phone} {
 *    font-size: 1rem;
 *  }
 */

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`

export const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(922),
  tablet: customMediaQuery(768),
  phone: customMediaQuery(576),
}

export const strongText = `font-bold ${Colors.strong}`
export const weaknessText = `font-bold ${Colors.weakness}`
export const shineText = `font-bold text-sky-300`
export const iconHover = `cursor-pointer hover:${Colors.shining}`
export const iconBase = `${Colors.icon} ${iconHover}`
export const iconShine = `${Colors.shining} cursor-pointer`
export const iconAccent = `${Colors.strong} cursor-pointer`
export const iconStrong = `${strongText} cursor-pointer`
export const searchKeyOn = `text-white bg-pink-500`
export const searchKeyOff = `text-gray-500 bg-gray-300`
export const normalDocument = `${Colors.document} ${Colors.documentBgcolor}`
export const weaknessDocument = `${Colors.weakness} ${Colors.weaknessBgcolor}`
