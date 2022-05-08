import { CognitoUserPool } from "amazon-cognito-identity-js";
import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";
import log from 'loglevel'
import { useAppDispatch } from "../../app/hooks";
import { setTab, tabs } from "../../slices/editSlice";

export const Header: VFC = memo(() => {
  log.setLevel("info")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userPool = new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID || '',
    ClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID || '',
  })
  const logout = () => {
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) {
      cognitoUser.signOut()
      localStorage.clear()
      dispatch(setTab(tabs[0]))
      log.debug('signed out')
    } else {
      localStorage.clear()
      log.debug('no user signing in')
    }
    navigate('/login')
  }

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
            onClick={() => logout()}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
})