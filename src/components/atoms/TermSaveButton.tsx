/* eslint-disable array-callback-return */
import { memo, useState, VFC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectUpdateTerm } from '../../slices/editSlice'
import { ArrowCircleUpIcon } from '@heroicons/react/solid'
import { Tag } from '../../types/types'
import { useMutateTerms } from '../../hooks/useMutateTerms'
import log from 'loglevel'

interface Props {
  chosenTag: Tag
}
export const TermSaveButton: VFC<Props> = memo(({ chosenTag }) => {
  log.setLevel("info")
  log.debug("TermSaveButton start")
  const { save } = useMutateTerms()

  const update = useAppSelector(selectUpdateTerm)
  const [saving, setSaving] = useState(false)
  const saveTerms = () => {
    setSaving(true)
    save(setSaving)
  }
  return (
    <>
      {update && (!saving ? (
        <ArrowCircleUpIcon
          className="w-16 h-16 pl-8 pb-8 text-pink-300 cursor-pointer"
          onClick={() => saveTerms()}
        />
      ) : (
        <div className="flex justify-center pl-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ))}
    </>
  )
})
