import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";
import log from 'loglevel'

interface Props {
  logout: any
}
export const Header: VFC<Props> = memo(({ logout }) => {
  log.setLevel("info")
  const navigate = useNavigate()


  return (
    <div className="flex top-0 inset-x-0 fixed z-50 h-16 items-center">
      <div className="flex justify-between w-screen z-50">
        <div className="z-50">
          <p className="z-50 w-auto pl-8 font-bold text-white text-xl">
            Quiz Editor
          </p>
        </div>
        <div className="pr-8">
          <button
            className={'rounded p-2 bg-blue-500 text-white font-bold'}
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