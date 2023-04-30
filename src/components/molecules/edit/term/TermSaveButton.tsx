/* eslint-disable array-callback-return */
import { memo, useState, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { resetUpdateTerm, selectUpdateTerm } from '../../../../slices/editSlice'
import { ArrowCircleUpIcon, XCircleIcon } from '@heroicons/react/solid'
import { useMutateTerms } from '../../../../hooks/useMutateTerms'
import log from 'loglevel'

export const TermSaveButton: FC = memo(() => {
  log.setLevel('info')
  const dispatch = useAppDispatch()
  const { save } = useMutateTerms()

  const update = useAppSelector(selectUpdateTerm)
  const [saving, setSaving] = useState(false)
  const saveTerms = () => {
    setSaving(true)
    save(setSaving)
  }
  const cancel = () => {
    dispatch(resetUpdateTerm())
  }
  return (
    <>
      {update &&
        (!saving ? (
          <div
            className={`flex justify-start items-center`}
            title="TermSaveButton => useMutateTerms.save()"
          >
            <ArrowCircleUpIcon
              className="w-8 h-8 ml-8 text-pink-300 cursor-pointer"
              onClick={() => saveTerms()}
            />
            <XCircleIcon
              className="w-8 h-8 ml-8 text-pink-300 cursor-pointer"
              onClick={() => cancel()}
            />
          </div>
        ) : (
          <div className="flex justify-center pl-8">
            <div
              className={
                `animate-spin h-8 w-8 border-4` +
                ` border-blue-500 rounded-full border-t-transparent`
              }
            ></div>
          </div>
        ))}
    </>
  )
})
