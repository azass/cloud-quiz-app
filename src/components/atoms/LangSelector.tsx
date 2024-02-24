import { memo, FC } from 'react'
import { useLangContext } from './LangProvider'
interface Props {
  w: string
  text_size: string
}
export const LangSelector: FC<Props> = memo(({ w, text_size }) => {
  const { lang, setLang } = useLangContext()
  const nowLang = lang
  const bgcolor = (lang: number) => {
    if (nowLang === 0 || nowLang === lang) {
      return lang === 1 ? 'bg-orange-500' : 'bg-yellow-500'
    } else {
      return ''
    }
  }
  const clickLang = (lang: number) => {
    if (nowLang === 0 || nowLang === lang) {
      const newLang = lang + (-1) ** (lang - 1)
      setLang(newLang)
    } else {
      setLang(0)
    }
  }
  return (
    <div className="flex items-center">
      <button
        type="button"
        className={
          `flex-shrink-0 border p-1 text-white` +
          ` ${w} ${text_size} ${bgcolor(1)}`
        }
        onClick={() => clickLang(1)}
      >
        日本語
      </button>
      <button
        type="button"
        className={
          `flex-shrink-0 border-t border-r border-b p-1 text-white` +
          ` ${w} ${text_size} ${bgcolor(2)}`
        }
        onClick={() => clickLang(2)}
      >
        English
      </button>
    </div>
  )
})
