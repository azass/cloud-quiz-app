import { memo, useState, FC } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLinkIcon, FastForwardIcon } from '@heroicons/react/solid'
import { iconHover } from '../../../styles/util'

interface Props {
  examId: String
}
export const QInputItem: FC<Props> = memo(({ examId }) => {
  const [selectNo, setSelectNo] = useState('')

  const nextNo = () => {
    return ('0000' + (Number(selectNo) + 1)).slice(-4)
  }
  return (
    <div className="inline-flex space-x-4" title="QInputItem">
      <Link to={`/editor/${examId}/${examId}-${selectNo}`}>
        <ExternalLinkIcon className={`h-5 w-5 mx-1 ${iconHover}`} />
      </Link>
      <div className="flex justify-start">
        <div className="pl-2 text-white">
          <i>{examId}-</i>
        </div>
        <form className="bg-opacity-0">
          <input
            type="text"
            className="w-10 ml-1 px-1"
            value={selectNo}
            onChange={(e) => {
              if (Number.isInteger(e.target.value)) {
                alert('')
              } else {
                if (examId !== 'PM-551') {
                  setSelectNo(
                    ('0000' + e.target.value.replace(/[^0-9]/g, '')).slice(-4)
                  )
                } else {
                  setSelectNo(e.target.value)
                }
              }
            }}
          />
        </form>
      </div>
      <Link to={`/editor/${examId}/${examId}-${nextNo()}`}>
        <FastForwardIcon
          className={`h-6 w-6 mx-1 ${iconHover}`}
          onClick={() => setSelectNo(nextNo())}
        />
      </Link>
    </div>
  )
})
