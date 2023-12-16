import { memo, FC } from 'react'
import { useLangContext } from './LangProvider'

export const LangSelector: FC = memo(() => {
  const { lang, setLang } = useLangContext()
  const nowLang = lang
  const bgcolor = (lang: number) => {
    if (nowLang === 0 || nowLang === lang) {
      return 'bg-orange-500'
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
        className={`flex-shrink-0 w-20 border p-1 text-white ${bgcolor(1)}`}
        onClick={() => clickLang(1)}
      >
        日本語
      </button>
      <button
        type="button"
        className={
          `flex-shrink-0 w-20 border-t border-r border-b` +
          ` p-1 text-white ${bgcolor(2)}`
        }
        onClick={() => clickLang(2)}
      >
        English
      </button>
    </div>
  )
})
