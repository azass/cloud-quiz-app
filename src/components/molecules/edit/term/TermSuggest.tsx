import { BaseSyntheticEvent, FC, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { useAppSelector } from '../../../../app/hooks'
import { selectSuggestTerms } from '../../../../slices/editSlice'
import { Term } from '../../../../types/types'
import { useRefTermContext } from './TermProvider'

export const TermSuggest: FC = () => {
  const { refTerm, setRefTerm } = useRefTermContext()
  const [value, setValue] = useState(refTerm?.word || '')
  const terms = useAppSelector(selectSuggestTerms)

  const getSuggestions = (word: string) => {
    const inputValue = word.trim()
    const inputLength = word.trim().length

    return inputLength === 0
      ? terms
      : terms.filter((term) => term.word.slice(0, inputLength) === inputValue)
  }

  const [suggestions, setSuggestions] = useState<Term[]>([])

  const getSuggestionValue = (suggestion: Term): string => {
    const { word } = suggestion
    return word
  }

  const renderSuggestion = (suggestion: Term) => {
    return <div>{suggestion.word}</div>
  }

  const onChange = (
    event: BaseSyntheticEvent,
    { newValue }: { newValue: string }
  ) => {
    if (event) setValue(newValue)
  }

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const suggestions: Term[] = getSuggestions(value)
    setSuggestions(suggestions)
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const inputProps = {
    value,
    onChange,
  }

  const onSuggestionSelected = (event: any, suggestion: any) => {
    event.preventDefault()
    const term: Term = suggestion.suggestion
    const term2: Term = {
      term_id: term.term_id,
      word: term.word,
      level: term.level,
      sort: term.sort,
      provider: term.provider,
      tag_no: term.tag_no,
    }
    setRefTerm(term2)
  }

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={onSuggestionSelected}
    />
  )
}
