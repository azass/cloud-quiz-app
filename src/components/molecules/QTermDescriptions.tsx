import { memo, VFC } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useTags } from "../../hooks/useTags";
import { setCallTermEdit, setEditContext, setEditedContent } from "../../slices/editSlice";
import { bgcolor, TagTerms } from "../../types/types";
import { EditBlockContent } from "./EditBlockContent";

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
        forQuestion: true
        // tag_terms: keywords
      })
    )
    dispatch(setCallTermEdit(true))
  }
  return (
    <ul className="py-4" title="QTermDescriptions">
      {Object.keys(keywords).map((tagName, index) => (
        <>
          <li className="pb-4">
            <span
              className="rounded-full border my-1 mr-1 py-1 px-3 bg-pink-600 text-white font-bold text-xs cursor-pointer"
              onClick={() => callTermEdit(tagName)}
            >
              {tagName}
            </span>
          </li>
          {(keywords[tagName].map((term) => (
            <>
              {term.word !== "is ?" && <li className="pl-2 pb-3">
                <span
                  key={term.term_id}
                  className={
                    'rounded-full border my-1 mr-1 py-1 px-3 text-white font-bold text-left text-xs ' +
                    `${bgcolor[term.level - 1]}`
                  }
                >
                  {term.word}
                </span>
              </li>}

              {term.description?.map((editElem, index) => (
                (editElem.quest_ids?.includes(quest_id) && (
                  <li className="pl-2">
                    <EditBlockContent
                      editElem={editElem}
                      name='description'
                      index={index}
                      onClickAdd={undefined}
                      onClickDelete={undefined}
                      onChangeText={undefined}
                      onChangeCheck={undefined}
                      editable={false}
                    />
                  </li>))
              ))}
            </>
          )))}
        </>
      ))}
    </ul>
  )
})