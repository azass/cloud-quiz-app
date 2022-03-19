import { useAppSelector } from '../app/hooks'
import { selectExamTags } from '../slices/editSlice'
import { voidTag } from '../types/types'

export const useTags = () => {
  const examTags = useAppSelector(selectExamTags)
  const getTag = (tagName: string) => {
    const tag = examTags.find((t) => t.tag_name === tagName)
    return tag || voidTag
  }
  return { getTag }
}
