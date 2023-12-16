import { FC, memo } from 'react'
import { useTags } from '../../hooks/useTags'
import { setEditContext, setShowContent, setTab } from '../../slices/editSlice'
import Label from '../../consts/labels'
import { useAppDispatch } from '../../app/hooks'
import { useKeywords } from '../../hooks/useKeywords'
import { strongText } from '../../styles/util'
import { Question } from '../../types/types'
interface Props {
  tagkey: string
  question: Question
}
export const ServiceTag: FC<Props> = memo(({ tagkey, question }) => {
  const dispatch = useAppDispatch()
  const { getKeywordsJson } = useKeywords()
  const keywords = getKeywordsJson(question)
  const { getTag, getTagName } = useTags()

  const callTermEdit = () => {
    dispatch(setTab(Label.tabs[2]))
    dispatch(setShowContent('TermEdit'))
    dispatch(
      setEditContext({
        quest_id: question.quest_id,
        keywordsJson: JSON.stringify(keywords),
        chosenTag: getTag(tagkey),
        forQuestion: true,
      })
    )
  }
  return (
    <span
      className={
        `rounded-full border mr-1 my-1 py-1 px-3` +
        ` bg-pink-600 ${strongText} cursor-pointer`
      }
      onClick={() => callTermEdit()}
    >
      {getTagName(tagkey)}
    </span>
  )
})
