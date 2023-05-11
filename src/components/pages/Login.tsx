import { memo, FC } from 'react'
import log from 'loglevel'
import { strongText } from '../../styles/util'
import { useAuthentication } from '../../hooks/useAuthentication'

export const Login: FC = memo(() => {
  log.setLevel('info')
  const { signIn, changedEmailHaldler, changedPasswordHandler } =
    useAuthentication()
  return (
    <div
      className={
        `login-form border-solid border border-gray-200 w-8/12` +
        ` mx-auto mt-16 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col`
      }
    >
      <a
        href="/"
        className={
          `fit-content m-auto flex text-lg font-semibold tracking-widest text-gray-900` +
          ` rounded-lg dark-mode:text-white focus:outline-none`
        }
      >
        <span className="text-3xl my-auto mx-0 font-black tracking-normal">
          Cloud Quiz
        </span>
      </a>
      <div className="flex mx-auto my-12">
        <div className="list-none text-center mr-2">
          <a
            className={`bg-blue-600 hover:opacity-75 py-3 px-16 rounded ${strongText}`}
            href="{{ route('login') }}"
          >
            ログイン
          </a>
        </div>
        <div className="list-none text-center">
          <a
            className={
              `border-solid border border-gray-400 text-gray-600 font-bold` +
              ` py-3 px-16 rounded hover:bg-gray-200`
            }
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
            className={
              `shadow appearance-none border rounded w-full` +
              ` py-2 px-3 text-grey-darker`
            }
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
            className={
              `shadow appearance-none border border-red rounded w-full` +
              ` py-2 px-3 text-grey-darker mb-3`
            }
            id="password"
            type="password"
            placeholder="******************"
            onChange={changedPasswordHandler}
          />
        </div>
        <div className="text-center">
          <button
            id="login-button"
            className={`bg-blue-600 hover:bg-blue-dark ${strongText} py-2 px-4 rounded`}
            type="button"
            onClick={signIn}
          >
            ログイン
          </button>
          <a
            className={
              `fit-content mt-10 block align-baseline font-bold text-sm text-blue` +
              ` hover:text-blue-darker`
            }
            href="{{ route('password.request') }}"
          >
            パスワードを忘れたかた
          </a>
        </div>
      </form>
    </div>
  )
})
