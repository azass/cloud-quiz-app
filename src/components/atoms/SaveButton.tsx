import { VFC } from 'react'
import log from 'loglevel'

interface Props {
  onClick: any
}

export const SaveButton: VFC<Props> = ({ onClick }) => {
  log.debug('save button')
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center space-x-2 py-3 px-4 border border-transparent text-sm font-medium rounded text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
      onClick={() => {
        onClick()
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        {' '}
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clip-rule="evenodd"
        />
      </svg>{' '}
      <div>SAVE</div>
    </button>
  )
}
