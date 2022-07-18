import { memo, useState, VFC } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

export const EditElemTextbox: VFC = memo(() => {
  const [word, setWord] = useState('')

  return (
    <ReactTextareaAutosize
      className="text-black px-2 py-1 my-1 w-full border-0 resize"
      autoFocus
      value={word}
      onChange={(e) => setWord(e.target.value)}
    />
  )
})
