import { memo, VFC } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { useKeywords } from '../../../hooks/useKeywords'
import { useTags } from '../../../hooks/useTags'
import {
  setEditContext,
  setEditedContent,
} from '../../../slices/editSlice'
import { bgcolor, Question } from '../../../types/types'
import { EditBlockContent } from '../EditBlockContent'

interface Props {
  question: Question
}

export const QTermDescriptions: VFC<Props> = memo(({ question }) => {
  const dispatch = useAppDispatch()
  const { getTag, getTagName } = useTags()
  const { getKeywordsJson } = useKeywords(question)
  const keywords = getKeywordsJson()

  const callTermEdit = (key: string) => {
    dispatch(setEditedContent('TermEdit'))
    dispatch(
      setEditContext({
        quest_id: question.quest_id,
        keywordsJson: JSON.stringify(keywords),
        chosenTag: getTag(key),
        forQuestion: true,
      })
    )
  }
  return (
    <div className="pb-4" title="QTermDescriptions">
      {Object.keys(keywords).map((key, index) => (
        <>
          <div className="pt-4">
            <span
              className="rounded-full border mr-1 py-1 px-3 bg-pink-600 text-white font-bold text-xs cursor-pointer"
              onClick={() => callTermEdit(key)}
            >
              {getTagName(key)}
            </span>
          </div>
          {keywords[key].map((term) => (
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
                  editElem.quest_ids?.includes(question.quest_id) && (
                    <div className="pl-2">
                      <EditBlockContent
                        editElem={editElem}
                        name="description"
                        index={index}
                        onClickAdd={undefined}
                        onClickDelete={undefined}
                        onChangeText={undefined}
                        onChangeCheck={undefined}
                        onSelectCase={undefined}
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
