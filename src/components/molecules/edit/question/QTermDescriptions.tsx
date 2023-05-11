import { FC, memo } from 'react'
import { useAppDispatch } from '../../../../app/hooks'
import { useKeywords } from '../../../../hooks/useKeywords'
import { useTags } from '../../../../hooks/useTags'
import { setEditContext, setShowContent, setTab } from '../../../../slices/editSlice'
import { NoteItemTile } from '../NoteItemTile'
import { useQuestionContext } from './QuestionProvider'
import { NoteItemProvider } from '../NoteItemProvider'
import { NoteItemsProvider } from '../NoteItemsProvider'
import { strongText } from '../../../../styles/util'
import Colors from '../../../../consts/colors'
import Label from '../../../../consts/labels'

export const QTermDescriptions: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { question } = useQuestionContext()
  const { getTag, getTagName } = useTags()
  const { getKeywordsJson } = useKeywords()
  const keywords = getKeywordsJson(question)

  const callTermEdit = (key: string) => {
    dispatch(setTab(Label.tabs[2]))
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
          <div className="py-2">
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
                <div className={`pl-${2 * (term.level - 1)} py-1`}>
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
              {term.description &&
                term.description.filter((item) =>
                  item.quest_ids?.includes(question.quest_id)
                ).length > 0 && (
                  <div className={`pb-2 pl-${2 * (term.level - 1)}`}>
                    <NoteItemsProvider
                      name="description"
                      noteItems={term.description || []}
                      editable={false}
                    >
                      {term.description?.map(
                        (editElem, index) =>
                          editElem.quest_ids?.includes(question.quest_id) && (
                            <div className="pl-0">
                              <NoteItemProvider
                                noteItem={editElem}
                                index={index}
                              >
                                <NoteItemTile />
                              </NoteItemProvider>
                            </div>
                          )
                      )}
                    </NoteItemsProvider>
                  </div>
                )}
            </>
          ))}
        </>
      ))}
    </div>
  )
})
