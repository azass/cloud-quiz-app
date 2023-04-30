import { FC, memo } from 'react'
import { useAppDispatch } from '../../../../app/hooks'
import { useKeywords } from '../../../../hooks/useKeywords'
import { useTags } from '../../../../hooks/useTags'
import { setEditContext, setShowContent } from '../../../../slices/editSlice'
import { NoteBlockContent } from '../NoteBlockContent'
import { useQuestionContext } from './QuestionProvider'
import { NoteItemProvider } from '../NoteItemProvider'
import { NoteItemsProvider } from '../NoteItemsProvider'
import { strongText } from '../../../../styles/util'
import Colors from '../../../../consts/colors'

export const QTermDescriptions: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { question } = useQuestionContext()
  const { getTag, getTagName } = useTags()
  const { getKeywordsJson } = useKeywords(question)
  const keywords = getKeywordsJson()

  const callTermEdit = (key: string) => {
    dispatch(setShowContent('TermEdit'))
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
              className={
                `rounded-full border mr-1 py-1 px-3` +
                ` bg-pink-600 text-xs ${strongText} cursor-pointer`
              }
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
                      `rounded-full border mr-1 py-1 px-3` +
                      ` text-left text-xs ${strongText} ` +
                      `${Colors.termNodeBgcolors[term.level - 1]}`
                    }
                  >
                    {term.word}
                  </span>
                </div>
              )}
              <NoteItemsProvider
                name="description"
                noteItems={term.description || []}
                editable={false}
              >
                {term.description?.map(
                  (editElem, index) =>
                    editElem.quest_ids?.includes(question.quest_id) && (
                      <div className="pl-2">
                        <NoteItemProvider editElem={editElem} index={index}>
                          <NoteBlockContent />
                        </NoteItemProvider>
                      </div>
                    )
                )}
              </NoteItemsProvider>
            </>
          ))}
        </>
      ))}
    </div>
  )
})
