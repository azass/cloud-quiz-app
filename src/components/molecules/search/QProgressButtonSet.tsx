import { memo, VFC } from "react";
import { useQueryClient } from "react-query";
import { useQueryProgressState } from "../../../hooks/useQueryProgressState";
import { QExcludeButton } from "./QExcludeButton";
import { QMistakeButton } from "./QMistakeButton";

interface Props {
  exam_id: string
}
export const QSProgressButtonSet: VFC<Props> = memo(({ exam_id }) => {
  const queryClient = useQueryClient()
  const { status, data } = useQueryProgressState(exam_id)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  return (
    <>
      <div className="pt-1">
        <div className="px-1 py-1"><span className="">対象外</span></div>
        <div className="items-center">
          {[0, 1].map((i) => (
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((j) => (
                <div className="w-1/5 px-1 pb-1">
                  <QExcludeButton index={5 * i + j} execute_progress={data?.execute || []} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="pt-1">
        <div className="px-1 py-1"><span className="">間違え</span></div>
        <div className="items-center">
          {[0, 1].map((i) => (
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((j) => (
                <div className="w-1/5 px-1 pb-1">
                  <QMistakeButton index={5 * i + j} mistake_progress={data?.mistake || []} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
})