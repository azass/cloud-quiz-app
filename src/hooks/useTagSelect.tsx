/* eslint-disable array-callback-return */
import { Tag } from '../types/types'
import log from 'loglevel'
import { useKeywords } from './useKeywords'

export const useTagSelect = () => {
  log.setLevel('debug')
  const { getEditContextKeywords, getTags, putKeywords } = useKeywords()

  const getSelectTags = () => {
    return Object.keys(getEditContextKeywords())
  }
  const onClickTag = (tag: Tag, include: boolean) => {
    const keywords = getEditContextKeywords()
    if (include) {
      keywords[tag.tag_no] = []
    } else {
      if (tag.tag_name in keywords) {
        if (keywords[tag.tag_name].length !== 0) {
          var res = window.confirm('用語も削除されます')
          if (!res) return
        }
        delete keywords[tag.tag_name] // 連想配列の要素（キー）を削除
      } else {
        if (keywords[tag.tag_no].length !== 0) {
          var res2 = window.confirm('用語も削除されます')
          if (!res2) return
        }
        delete keywords[tag.tag_no] // 連想配列の要素（キー）を削除
      }
    }
    putKeywords(getTags(keywords), keywords)
  }

  return {
    getSelectTags,
    onClickTag,
  }
}
