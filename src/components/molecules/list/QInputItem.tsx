import { memo, useState, VFC } from "react";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from '@heroicons/react/solid'

interface Props {
  examId: String
}

export const QInputItem: VFC<Props> = memo(({ examId }) => {
  const [selectNo, setSelectNo] = useState('')
  return (
    <div className="inline-flex pl-6 pb-6 space-x-4" title="QInputItem">
      <Link to={`/editor/${examId}/${examId}-${selectNo}`}>
        <ExternalLinkIcon className="h-5 w-5 mx-1 text-blue-500 cursor-pointer" />
      </Link>
      <div className="flex justify-start">
        <div className="pl-2 text-white">
          <i>{examId}-</i>
        </div>
        <input
          type="text"
          className="w-20 ml-1 px-1"
          value={selectNo}
          onChange={(e) => {
            if (Number.isInteger(e.target.value)) {
              alert('')
            } else {
              if (examId !== 'PM-551') {
                setSelectNo(('0000' + e.target.value).slice(-4))
              } else {
                setSelectNo(e.target.value)
              }
            }
          }}
        ></input>
      </div>
    </div>
  )
})