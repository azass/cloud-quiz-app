import { BaseSyntheticEvent, FC, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { useAppSelector } from '../../../../app/hooks'
import { selectProviderTags } from '../../../../slices/editSlice'
import { Tag } from '../../../../types/types'
import { useRefTagContext } from './TermProvider'

export const TermRefTags: FC = () => {
  const tags = [...useAppSelector(selectProviderTags)]
  const { refTag, setRefTag } = useRefTagContext()
  const [value, setValue] = useState(refTag?.tag_name || '')
  const [suggestions, setSuggestions] = useState<Tag[]>([])

  const getSuggestions = (value: string): Tag[] => {
    const inputValue = value.trim()
    const inputLength = value.trim().length
    return inputLength === 0
      ? tags
      : tags.filter((tag) => tag.tag_name.slice(0, inputLength) === inputValue)
  }

  const getSuggestionValue = (suggestion: Tag): string => {
    const { tag_name } = suggestion
    return tag_name
  }

  const renderSuggestion = (suggestion: Tag) => {
    return <div>{suggestion.tag_name}</div>
  }

  const onChange = (
    event: BaseSyntheticEvent,
    { newValue }: { newValue: string }
  ) => {
    if (event) setValue(newValue)
  }

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const suggestions: Tag[] = getSuggestions(value)
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
    const tag = suggestion.suggestion
    setRefTag(tag)
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
