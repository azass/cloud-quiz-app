import { useState } from 'react'
import { Tag } from '../types/types'

export const useSearch = () => {
  const [selectSearchTags, setSelectSearchTags] = useState<string[]>([])

  const onClickSearchTag = (tag: Tag, include: boolean) => {
    if (include) {
      setSelectSearchTags([...selectSearchTags, tag.tag_name])
    } else {
      setSelectSearchTags(
        selectSearchTags.filter((tagName) => {
          return tagName !== tag.tag_name
        })
      )
    }
  }
  return {
    selectSearchTags,
    setSelectSearchTags,
    onClickSearchTag,
  }
}
