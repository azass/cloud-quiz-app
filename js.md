        {enableEdit && editElemsState.length === 0 ? (
          <EditElemAdds index={-1} name={name} onClickAdd={add} />
        ) : (
## 色切り替え
  const bgcolor = selected
    ? 'text-white bg-pink-600'
    : 'text-gray-500 bg-gray-300'

      className={
        'rounded-md border my-1 py-1 mx-1 px-3 font-extrabold text-sm cursor-pointer ' +
        `${bgcolor}`
      }

        <div className="flex justify-between items-center w-full pb-2 z-10">

  const autoTag = () => {
    question.options
      ?.filter((option) => option.correct)
      .flatMap((option) => {
        const tags = findTags(option.text || '', exam.provider)
        return [...tags]
      })
      .reduce(
        (newTags, tagNo) =>
          newTags.includes(tagNo) ? newTags : [...newTags, tagNo],
        [] as string[]
      )
      .forEach((tagNo) => {
        if (!question.tags?.includes(tagNo)) {
          keywords[tagNo] = []
        }
      })
    putKeywords(getTags(keywords), keywords)
  }
