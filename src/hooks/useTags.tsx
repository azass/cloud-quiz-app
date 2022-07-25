import { useAppSelector } from '../app/hooks'
import { selectProviderTags } from '../slices/editSlice'
import { voidTag } from '../types/types'

export const useTags = () => {
  const examTags = useAppSelector(selectProviderTags)
  const getTag = (key: any) => {
    // 数値チェック
    if (isFinite(key)) {
      return getTagOfNo(Number(key))
    } else {
      const tag = examTags.find((t) => t.tag_name === key)
      return tag || voidTag
    }
  }
  const getTagOfNo = (tagNo: number) => {
    const tag = examTags.find((t) => t.tag_no === tagNo)
    return tag || voidTag
  }
  const getTagName = (key: any) => {
    // 数値チェック
    if (isFinite(key)) {
      // 数値変換
      return getTagOfNo(Number(key)).tag_name
    } else {
      return key
    }
  }
  return {
    getTag,
    getTagOfNo,
    getTagName,
  }
}
