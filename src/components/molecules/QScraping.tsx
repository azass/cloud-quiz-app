import { VFC, memo, useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import axios from 'axios'
import { useScraping } from '../../hooks/useScraping'
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  PencilIcon,
  CheckIcon,
} from '@heroicons/react/solid'
import { AcademicCapIcon } from '@heroicons/react/outline'

interface Props {
  questId: string
  setQuestion?: any
}
export const QScraping: VFC<Props> = memo(({ questId, setQuestion }) => {
  const { showFlg, setShowFlg, onChange, onClick } = useScraping(setQuestion)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const [editFlg, setEditFlg] = useState(false)
  const [url, setUrl] = useState('')
  const onChangeText = (text: string) => {
    console.log(`onChangeText:${text}`)
    setUrl(text)
  }
  const onClick2 = () => {
    console.log(`scraping?url=${url}`)
    axios
      .get(`${process.env.REACT_APP_REST_URL}/scraping?url=${url}`, config)
      .then((response) => {
        let result = response.data
        console.log(result)
        console.log(questId)
        if (result && questId === 'new') {
          console.log('onClick2 setQuestion !!!')
          result['keywords'] = []
          setQuestion(result)
        }
      })
      .catch((error) => console.log(error))
  }
  return (
    <div className="w-full border-blue-500 border-opacity-100">
      {showFlg && (
        <>
          <div className="flex flex-row-reverse">
            <ChevronDoubleDownIcon
              className="h-3 w-3 text-blue-500 cursor-pointer"
              fill="currentColor"
              onClick={() => {
                setShowFlg(false)
              }}
            />
          </div>
          <textarea
            className="form-textarea mt-1 block w-full border-blue-500 border-opacity-100"
            rows={13}
            onChange={(e) => onChange(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 mt-4 rounded-lg bg-blue-500 text-white font-bold flex justify-center mx-auto"
            onClick={() => {
              onClick(questId)
            }}
          >
            取り込み
          </button>
        </>
      )}
      {!showFlg && (
        <>
          <div className="flex flex-row-reverse">
            <ChevronDoubleUpIcon
              className="flex flex-row-reverse h-3 w-3 text-blue-500 cursor-pointer"
              fill="currentColor"
              onClick={() => {
                setShowFlg(true)
              }}
            />
          </div>
        </>
      )}
      <div className="flex justify-start mt-2">
        <span className="pr-2 text-blue-700 font-bold text-xs">URL</span>
        {!editFlg && (
          <>
            <PencilIcon
              className="h-4 w-4 cursor-pointer"
              fill="currentColor"
              onClick={() => setEditFlg(true)}
            />
            <AcademicCapIcon
              className="h-4 w-4 ml-4 text-blue-500 cursor-pointer"
              fill="none"
              stroke="currentColor"
              onClick={() => {
                onClick2()
              }}
            />
          </>
        )}
        {editFlg && (
          <>
            <CheckIcon
              className="h-4 w-4 text-teal-400 cursor-pointer"
              fill="currentColor"
              onClick={() => setEditFlg(false)}
            />
          </>
        )}
      </div>
      {editFlg && (
        <TextareaAutosize
          className="px-6 py-1 mt-1 w-full border-gray-300 text-xs"
          onChange={(e) => onChangeText(e.target.value)}
        />
      )}
      <div className="pl-4 py-2 font-bold underline text-blue-700 text-base">
        <a href="" target="_blank">
          {}
        </a>
      </div>
    </div>
  )
})
