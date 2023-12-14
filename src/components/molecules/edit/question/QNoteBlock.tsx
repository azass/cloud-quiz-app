import log from 'loglevel'
import { useState, FC } from 'react'
import { NoteItemTile } from '../NoteItemTile'
import { SaveButton } from '../../../atoms/SaveButton'
import { NoteItemAdds } from '../NoteItemAdds'
import { NoteBlockHeader } from '../NoteBlockHeader'
import { useQuestionContext } from './QuestionProvider'
import { NoteItemProvider } from '../NoteItemProvider'
import {
  useNoteItemsContext,
  useEditItemsContext,
  useEdittingContext,
  useShowSaveBtnContext,
} from '../NoteItemsProvider'
import Colors from '../../../../consts/colors'
import { useQuestion } from '../../../../hooks/useQuestion'

interface Props {
  title: string
}

export const QNoteBlock: FC<Props> = ({ title }) => {
  const { noteItems, name, editable } = useNoteItemsContext()
  const { question } = useQuestionContext()
  const { editItems, setEditItems } = useEditItemsContext()
  const { editting } = useEdittingContext()
  const { showSaveBtn, setShowSaveBtn } = useShowSaveBtnContext()
  const { isShow, saveNote } = useQuestion()
  const questId = question.quest_id
  const [questIdState, setQuestIdState] = useState(questId)
  if (questIdState !== questId) {
    setQuestIdState(questId)
    setEditItems(noteItems)
    setShowSaveBtn(false)
  }
  /**
   * for scraping
   * if no content; set new content
   */
  if (
    editItems.length === 0 &&
    editItems !== noteItems &&
    name !== 'explanation'
  ) {
    log.debug('EditBlock new!!!')
    setEditItems(noteItems)
  }

  return (
    <div className={`pb-2  ${Colors.baseBg}`} title="QNoteBlock">
      {editable && <NoteBlockHeader title={title} />}
      {editting && editItems.length === 0 ? (
        <NoteItemAdds index={-1} />
      ) : (
        editItems.map((editItem, index) => (
          <>
            {isShow(editItem) && (
              <NoteItemProvider
                noteItem={editItem}
                index={index}
                hasSelectCheck={name === 'case_items'}
                hasSelectLevel={'explanation' && name !== 'options'}
                hasPutOptionImage={name === 'options'}
              >
                <NoteItemTile />
              </NoteItemProvider>
            )}
          </>
        ))
      )}
      <div className="flex justify-center mx-auto">
        {showSaveBtn && <SaveButton onClick={() => saveNote()} />}
      </div>
    </div>
  )
}
