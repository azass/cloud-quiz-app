import { FC, memo, useState } from 'react'
import axios from 'axios'
import log from 'loglevel'
import { useQuestionContext } from './QuestionProvider'
import Prop from '../../../../consts/props'

// -- 型定義 -------------------------------------------------------------------

export interface SelectOption {
  value: string
  label: string
}

interface QAnswerProps {
  /** ドロップダウンに表示する選択肢 */
  options: SelectOption[]
  /**
   * APIコール成功時のコールバック
   * @param data   - レスポンスボディ
   * @param selected - 実行時に選択されていた value
   */
  onSuccess?: (data: unknown, selected: string) => void
  /** ドロップダウン左側に表示するラベル（省略可） */
  label?: string
  /** ボタンに表示するテキスト（デフォルト: "実行"） */
  buttonLabel?: string
}

// -- コンポーネント -----------------------------------------------------------

export const QAnswer: FC<QAnswerProps> = memo(
  ({ options, onSuccess, label, buttonLabel = '実行' }) => {
    const { question } = useQuestionContext()

    const [selected, setSelected] = useState<string>(options[0]?.value ?? '')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleClick = async (): Promise<void> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_REST_URL}/answer?provider=${selected}&quest_id=${question.quest_id}`
        )
        if (response.data.statusCode === 200) {
          onSuccess?.(JSON.parse(response.data.body), selected)
        } else {
          throw new Error(
            `API error: ${response.data.statusCode} ${response.data.message}`
          )
        }
      } catch (err) {
        const message = axios.isAxiosError(err) ? err.message : String(err)
        log.error('[QAnswer]', message)
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    return (
      <div className="my-2">
        {/* ラベル */}
        {label && (
          <span className="pr-2 font-bold text-xs text-blue-400">{label}</span>
        )}

        {/* ドロップダウン + ボタン */}
        <div className="flex items-center gap-2">
          <select
            className="
              flex-1 px-2
              border border-gray-300 rounded-md
              bg-white text-gray-700
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            disabled={isLoading}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="
              flex items-center gap-1
              px-3
              border border-gray-300 rounded-md
              bg-white text-gray-700
              hover:bg-gray-50 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all
            "
            onClick={handleClick}
            disabled={isLoading || options.length === 0}
          >
            {isLoading ? (
              <>
                {/* スピナー */}
                <span
                  className="
                    h-3 w-3 rounded-full
                    border-2 border-gray-300 border-t-blue-500
                    animate-spin
                  "
                />
                <span>実行中</span>
              </>
            ) : (
              <span>{buttonLabel}</span>
            )}
          </button>
        </div>

        {/* エラーメッセージ */}
        {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
      </div>
    )
  }
)
