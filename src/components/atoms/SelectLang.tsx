import { VFC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLang, setLangs } from "../../slices/editSlice";

export const SelectLang: VFC = (() => {
  const nowLang = useAppSelector(selectLang)
  const dispatch = useAppDispatch()
  const bgcolor = (lang: number) => {
    if (nowLang === 0 || nowLang === lang) {
      return "bg-teal-500"
    } else {
      return ""
    }
  }
  const setLang = (lang: number) => {
    if (nowLang === 0 || nowLang === lang) {
      const newLang = lang + (-1) ** (lang - 1)
      dispatch(setLangs(newLang))
    } else {
      dispatch(setLangs(0))
    }
  }
  return (
    <div className="flex items-center py-4">
      <button type="button"
        className={`flex-shrink-0  w-20 border p-1 text-white ${bgcolor(1)}`}
        onClick={() => setLang(1)}>
        日本語
      </button>
      <button type="button"
        className={`flex-shrink-0 w-20 border-t border-r border-b p-1 text-white ${bgcolor(2)}`}
        onClick={() => setLang(2)}>
        English
      </button>
    </div>
  )
})