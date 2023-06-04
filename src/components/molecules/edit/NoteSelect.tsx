import { FC, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useNoteItemContext } from './NoteItemProvider'
import { NoteTextarea } from './NoteTextarea'
import {
  useEditItemsContext,
  useEdittingContext,
  useShowSaveBtnContext,
} from './NoteItemsProvider'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { v4 as uuidv4 } from 'uuid'
import { useLangContext } from '../../atoms/LangProvider'
import Colors from '../../../consts/colors'
import { normalDocument, strongText } from '../../../styles/util'

export const NoteSelect: FC = () => {
  const { lang } = useLangContext()
  const { editItems, setEditItems } = useEditItemsContext()
  const { noteItem, index } = useNoteItemContext()
  const { editting } = useEdittingContext()
  const { setShowSaveBtn } = useShowSaveBtnContext()
  const [val, setVal] = useState(noteItem.correctValue || '')
  const [options, setOptions] = useState(noteItem.selectOptions || [])

  const textareaStyle = (lable: string) => {
    return (
      `bg-gradient-to-b from-white via-white to-white` +
      ` px-4 py-3 mt-1 w-full block rounded-md border border-gray-300` +
      ` focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50` +
      ` text-black text-base font-sans antialiased` +
      ` ${lable === '' && 'bg-pink-50'}`
    )
  }

  const add = () => {
    const option = {
      label: '',
      value: `${uuidv4().substring(0, 6)}`,
    }
    setOptions([...options, option])
  }
  const changeText = (no: number, attr: string, text: string) => {
    const newSelectOptions = [...options]
    const newSelectOption = newSelectOptions[no]
    if (attr === 'label') {
      newSelectOption.label = text
    } else {
      newSelectOption.label_en = text
    }
    const newNoteItem = { ...noteItem, selectOptions: newSelectOptions }
    const newEditElems = [...editItems]
    newEditElems.splice(index, 1, newNoteItem)
    setEditItems(newEditElems)
    setOptions(newSelectOptions)
    setShowSaveBtn(true)
  }
  const changeRadio = (value: string) => {
    const newNoteItem = { ...noteItem, correctValue: value }
    const newEditElems = [...editItems]
    newEditElems.splice(index, 1, newNoteItem)
    setEditItems(newEditElems)
    setVal(value)
    setShowSaveBtn(true)
  }
  return (
    <div className="mb-2">
      <NoteTextarea />
      <div className="mt-1 mr-4">
        {editting ? (
          <>
            <PlusCircleIcon
              className="h-5 w-5 mx-2 ml-3"
              onClick={() => add()}
            />
            {options.map((option, index) => (
              <>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={option.value}
                    value={option.value}
                    checked={val === option.value}
                    onChange={(e) => changeRadio(e.target.value)}
                    className="h-4 w-4 m-4"
                  />
                  <label htmlFor={option.value} className="w-full">
                    <TextareaAutosize
                      value={option.label}
                      className={`${textareaStyle(option.label)}`}
                      onChange={(e) =>
                        changeText(index, 'label', e.target.value)
                      }
                    ></TextareaAutosize>
                  </label>
                </div>
                {lang !== 1 && (
                  <div className="px-0 py-3 mt-1 ml-12">
                    {editting ? (
                      <TextareaAutosize
                        value={option.label_en || ''}
                        className={`${textareaStyle(option.label_en || '')}`}
                        onChange={(e) =>
                          changeText(index, 'text_en', e.target.value)
                        }
                      ></TextareaAutosize>
                    ) : (
                      <span className="text-white whitespace-pre-wrap">
                        {option.label_en || ''}
                      </span>
                    )}
                  </div>
                )}
              </>
            ))}
          </>
        ) : (
          <select
            className={`p-2 ml-4 ${normalDocument} ${Colors.documentBorder}`}
            value={noteItem.correctValue}
          >
            {noteItem.selectOptions?.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}
