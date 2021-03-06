import { useAppSelector } from '../app/hooks'
import { selectProviderTags } from '../slices/editSlice'
import { voidTag } from '../types/types'

export const useTags = () => {
  const examTags = useAppSelector(selectProviderTags)
  const getTag = (tagName: string) => {
    const tag = examTags.find((t) => t.tag_name === tagName)
    return tag || voidTag
  }
  const getTagOfNo = (tagNo: number) => {
    const tag = examTags.find((t) => t.tag_no === tagNo)
    return tag || voidTag
  }
  return {
    getTag,
    getTagOfNo,
  }
}
