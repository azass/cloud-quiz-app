import { memo, VFC } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useTags } from '../../hooks/useTags'
import {
  setCallTermEdit,
  setEditContext,
  setEditedContent,
} from '../../slices/editSlice'
import { bgcolor, TagTerms } from '../../types/types'
import { EditBlockContent } from './EditBlockContent'

interface Props {
  quest_id: string
  keywords: TagTerms
}

export const QTermDescriptions: VFC<Props> = memo(({ quest_id, keywords }) => {
  const dispatch = useAppDispatch()
  const { getTag } = useTags()
  const callTermEdit = (tagName: string) => {
    dispatch(setEditedContent('TermEdit'))
    dispatch(
      setEditContext({
        quest_id: quest_id,
        keywordsJson: JSON.stringify(keywords),
        chosenTag: getTag(tagName),
        forQuestion: true,
      })
    )
    dispatch(setCallTermEdit(true))
  }
  return (
    <div className="pb-4" title="QTermDescriptions">
      {Object.keys(keywords).map((tagName, index) => (
        <>
          <div className="pt-4">
            <span
              className="rounded-full border mr-1 py-1 px-3 bg-pink-600 text-white font-bold text-xs cursor-pointer"
              onClick={() => callTermEdit(tagName)}
            >
              {tagName}
            </span>
          </div>
          {keywords[tagName].map((term) => (
            <>
              {term.word !== 'is ?' && (
                <div className="pl-2 pt-4">
                  <span
                    key={term.term_id}
                    className={
                      'rounded-full border mr-1 py-1 px-3 text-white font-bold text-left text-xs ' +
                      `${bgcolor[term.level - 1]}`
                    }
                  >
                    {term.word}
                  </span>
                </div>
              )}

              {term.description?.map(
                (editElem, index) =>
                  editElem.quest_ids?.includes(quest_id) && (
                    <div className="pl-2">
                      <EditBlockContent
                        editElem={editElem}
                        name="description"
                        index={index}
                        onClickAdd={undefined}
                        onClickDelete={undefined}
                        onChangeText={undefined}
                        onChangeCheck={undefined}
                        editable={false}
                        enableEdit={false}
                      />
                    </div>
                  )
              )}
            </>
          ))}
        </>
      ))}
    </div>
  )
})
