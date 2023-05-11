import { memo, FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import log from 'loglevel'
import { strongText } from '../../styles/util'
import { useAuthentication } from '../../hooks/useAuthentication'
import { BookOpenIcon } from '@heroicons/react/outline'
import { useOpenBookContext } from './QuizEditor'

export const QuizHeader: FC = memo(() => {
  log.setLevel('info')
  const navigate = useNavigate()
  const { logout } = useAuthentication()
  const { open, setOpen } = useOpenBookContext()
  return (
    <div className="flex top-0 inset-x-0 fixed z-50 h-16 items-center">
      <div className="flex justify-between w-screen z-50">
        <div className="z-50">
          <p className={`z-50 w-auto pl-8 text-xl ${strongText}`}>
            Quiz Editor
          </p>
        </div>
        <div className="">
          <BookOpenIcon
            className={
              'h-8 w-8 mr-8 cursor-pointer ' +
              `${open ? 'text-sky-500' : 'text-gray-700'}`
            }
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="pr-8">
          <button
            className={`rounded p-2 bg-blue-500 ${strongText}`}
            onClick={() => {
              logout()
              navigate('/login')
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
})
