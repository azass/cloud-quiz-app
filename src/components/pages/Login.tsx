import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js'
import { memo, useState, VFC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { setIdToken } from '../../slices/editSlice'
import log from 'loglevel'

export const Login: VFC = memo(() => {
  log.setLevel("info")
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const changedEmailHaldler = (e: any) => setEmail(e.target.value)
  const changedPasswordHandler = (e: any) => setPassword(e.target.value)
  const navigate = useNavigate()
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID || '',
    ClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID || '',
  })

  const signIn = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    })
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        log.debug('result: ' + result)
        const accessToken = result.getAccessToken().getJwtToken()
        log.debug('AccessToken: ' + accessToken)
        const idToken = result.getIdToken().getJwtToken()
        log.debug('IdToken: ' + idToken)
        dispatch(setIdToken(idToken))
        setEmail('')
        setPassword('')
        navigate('/editor')
      },
      onFailure: (err) => {
        console.error(err)
      },
    })
  }
  return (
    <div className="login-form border-solid border border-gray-200 w-8/12 mx-auto mt-16 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <a
        href="/"
        className="fit-content m-auto flex text-lg font-semibold tracking-widest text-gray-900 rounded-lg dark-mode:text-white focus:outline-none"
      >
        <span className="text-3xl my-auto mx-0 font-black tracking-normal">
          Cloud Quiz
        </span>
      </a>
      <div className="flex mx-auto my-12">
        <div className="list-none text-center mr-2">
          <a
            className="bg-blue-600 hover:opacity-75 text-white font-bold py-3 px-16 rounded"
            href="{{ route('login') }}"
          >
            ログイン
          </a>
        </div>
        <div className="list-none text-center">
          <a
            className="border-solid border border-gray-400 text-gray-600 font-bold py-3 px-16 rounded hover:bg-gray-200"
            href="{{ route('register') }}"
          >
            新規登録
          </a>
        </div>
      </div>
      <form method="POST" action="{{ route('login') }}">
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            メールアドレス
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="mailaddress"
            type="text"
            placeholder="メールアドレス"
            onChange={changedEmailHaldler}
          />
        </div>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            パスワード
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
            onChange={changedPasswordHandler}
          />
        </div>
        <div className="text-center">
          <button
            id="login-button"
            className="bg-blue-600 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={signIn}
          >
            ログイン
          </button>

          <a
            className="fit-content mt-10 block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            href="{{ route('password.request') }}"
          >
            パスワードを忘れたかた
          </a>
        </div>
      </form>
    </div>
  )
})
