import { memo, FC } from 'react'
import { QConditionButton } from './QConditionButton'
import { QScoreButton } from './QScoreButton'
import { useSelectOptionsContext } from './SearchProvider'

export const QSearchButtonSet: FC = memo(() => {
  const { selectOptions, setSelectOptions } = useSelectOptionsContext()
  const getBgColor = () => {
    return selectOptions?.length === 0
      ? 'text-white bg-blue-600'
      : 'text-white bg-red-300'
  }
  const onClick0 = () => {
    if (selectOptions?.includes(-2)) {
      setSelectOptions([])
    } else {
      if (selectOptions) {
        setSelectOptions([...selectOptions, -2])
      }
    }
  }

  return (
    <>
      <div className="flex justify-around pr-4">
        <div className="w-1/6 px-1">
          <button
            className={
              'rounded-full w-full p-2 bg-blue-500 text-white font-bold ' +
              getBgColor()
            }
            onClick={() => onClick0()}
          >
            {selectOptions?.includes(-2) ? '対象外' : 'すべて'}
          </button>
        </div>
        <div className="w-1/6 px-1">
          <QConditionButton index={0} />
        </div>
        <div className="w-1/6 px-1">
          <QConditionButton index={1} />
        </div>
        <div className="w-1/6 px-1">
          <QConditionButton index={2} />
        </div>
        <div className="w-1/6 px-1">
          <QConditionButton index={3} />
        </div>
        <div className="w-1/6 px-1">
          <QConditionButton index={4} />
        </div>
      </div>
      <div className="flex justify-around pt-6 pr-4">
        <div className="w-1/6 px-1">
          <QScoreButton index={0} />
        </div>
        <div className="w-1/6 px-1">
          <QScoreButton index={1} />
        </div>
        <div className="w-1/6 px-1">
          <QScoreButton index={2} />
        </div>
        <div className="w-1/6 px-1">
          <QScoreButton index={3} />
        </div>
        <div className="w-1/6 px-1">
          <QScoreButton index={4} />
        </div>
        <div className="w-1/6 px-1">
          <QScoreButton index={5} />
        </div>
      </div>
      <div className="flex justify-start pt-2 pr-4">
        <div className="w-1/6 px-1">
          <QScoreButton index={6} />
        </div>
        <div className="w-1/6 px-1">
          <QScoreButton index={7} />
        </div>
        <div className="w-1/6 px-1">
          <QScoreButton index={8} />
        </div>
        <div className="w-1/6 px-1">
          <QScoreButton index={9} />
        </div>
        <div className="w-1/6 px-1">
          <QScoreButton index={10} />
        </div>
      </div>
    </>
  )
})
