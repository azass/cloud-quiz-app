import { FC, useContext, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { bgcolor } from "../../../../types/types";
import { EditTermRefEdittingTerms } from "./EditTermRefEdittingTerms";
import { EditTermRefTags } from "./EditTermRefTags";
import { EditTermRefTerms } from "./EditTermRefTerms";
import { EditTermContext } from "./EditTermContext";
import { TermContext } from "./TermContext";

export const EditTermKeyword: FC = () => {
  const { term, forQuestion } = useContext(TermContext)
  const {
    editting,
    word,
    setWord,
    level,
    setLevel,
    refTag,
    update,
    select,
    getBgColor
  } = useContext(EditTermContext)
  const [ref, setRef] = useState('ref' in term)
  return (
    <>
      {!editting ? (
        <span
          key={term.term_id}
          className={
            'rounded-full px-6 py-1 text-left text-white text-sm font-black ' +
            `${forQuestion && 'cursor-pointer '}` +
            getBgColor(level)
          }
          onClick={() => select()}
        >
          {word}
        </span>
      ) : (
        <form
          className="bg-opacity-0 pl-6"
          onSubmit={(e) => {
            e.preventDefault()
            update()
          }}
        >
          <div
            className={`place-items-center flex border-0 bg-opacity-0 ${getBgColor(
              level
            )}`}
          >
            <div className="text-black text-sm">
              {ref && refTag ? (
                term.tag_no === refTag?.tag_no ? (
                  <EditTermRefEdittingTerms />
                ) : (
                  <EditTermRefTerms />
                )
              ) : (
                <ReactTextareaAutosize
                  className="text-black px-2 py-1 my-1 w-80 border-0 resize"
                  autoFocus
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                />
              )}
            </div>
            <select
              className={`pl-1 ${bgcolor[level - 1]}`}
              onChange={(e) => setLevel(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <option
                  className={getBgColor(i)}
                  value={`${i}`}
                >{`${i}`}</option>
              ))}
            </select>
            <input
              type="checkbox"
              className="ml-4"
              checked={ref}
              onChange={() => setRef(!ref)}
            />
            <div className="text-black text-xs">
              {ref && (<EditTermRefTags />)}
            </div>
          </div>
        </form>
      )}
    </>
  )
}