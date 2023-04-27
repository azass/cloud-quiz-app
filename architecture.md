QuizEditor
  QuizHeader
  QTabs
  ExamSelectTab
  QuizSelectTab
    QListHeader
    QuizSelectFrame
    TagSelectPanel
    TermsLoader
      TermsEditor
        TermSaveButton
        TermAddButton
        TermTree
          TermTreeNode
            TermProvider
              EditElemsProvider
                TermEditor
                  TermDescriptionIcon TermKeyword TermOperateIconSet
                    TermDescription
                      EditElemAdds
                      EditElemProvider
                        EditBlockContent
                          EditElemAdds
                          EditBlockContentBar
                          EditBlockContentBody
                            EditElemOption
                            EditElemTextarea
                            EditElemLinkMemo
                            EditElemImage
                            EditElemTextbox
                          EditElemAdds
                    SaveButton
                  TermHeader
                  EditElemsProvider
                    TermDescription
              TermAddButton
        SelectTerm
     SearchProvider
      QSearchQuery
  QListQuery
  TermNoteTab
  EditPanel
    QuestionProvider
      QuestionCaseProvider
        EditQuestion
          EditQuestionHeader
          EditQuestionCase
            EditElemsProvider
              EditBlock
          EditElemsProvider(name,editElems,editable,draggable,star)=>editElemsState,enableEdit,showCheckbox,showAllQuestionCase,saveButtonToggle
            EditBlock(title)
              EditBlockHeader(title)
              EditElemAdds(index)
              EditElemProvider(editElem,index)
                EditBlockContent
                  EditElemAdds
                  EditBlockContentBar
                  EditBlockContentBody
                    EditElemOption
                    EditElemTextarea
                    EditElemLinkMemo
                    EditElemImage
                    EditElemTextbox
                  EditElemAdds
          EditElemsProvider
            EditBlock
          QScraping
            QComments
              EditContext.Provider
                EditElemProvider
                  EditBlockContent
                QComment
          QBug
          QKeywords
          QTermDescriptions
            EditElemsProvider
              EditBlock
                EditElemProvider(editElem,name,index,editable,enableEdit)
                  EditBlockContent
          EditElemsProvider
            EditBlock
          QLeaningProfiles
          QLabels
    TermProvider
      EditTermProvider
        EditTerm
  TermNotePanel
            
editable
追加、編集等できる

enableEdit
EditElemsProvider
      <EnableEditContext.Provider value={{ enableEdit, setEnableEdit }}>
EditBlock
      {enableEdit && editElemsState.length === 0 ? (
        <EditElemAdds index={-1} />
EditBlockContent
      if (editting !== enableEdit) {
        setEditting(enableEdit)
      }
        {enableEdit && <EditBlockContentBar />}
EditBlockHeader
        {enableEdit ? (
          <CheckCircleIcon
            className={`h-6 w-6 ml-8 ${color.iconColor} cursor-pointer text-blue-500`}
            onClick={() => setEnableEdit(!enableEdit)}
          />
          <PencilAltIcon
            className={`h-5 w-5 ml-8 ${color.iconColor} cursor-pointer hover:text-blue-500`}
            onClick={() => setEnableEdit(!enableEdit)}
          />
EditElemImage
      {editable && enableEdit && (
        <>
          <div>
            <span className="mx-6 py-4 my-2 text-blue-700 font-bold text-xs">
              画像パス
            </span>
EditElemLink
      {editable && enableEdit && (
        <>
          <div className="flex flex-row items-center">
            <span className="w-12 mx-2 my-2 text-gray-500 font-bold text-xs">
              表示名
            </span>
EditElemOption
      {enableEdit && (
        <div className="flex flex-row-reverse pr-8 py-2 space-x-8 ">
          <PhotographIcon
            className={getBgColor()}
            onClick={() => add(index, 'image')}
          />
EditElemTextarea
          {editable && enableEdit ? (
            <div>
              <button
                type="button"
                className={
                  'flex-shrink-0 border text-white text-xs h-4 mb-1' +
                  `${pre && ' bg-pink-500'}`
                }
                onClick={() => setPre(!pre)}
              >
          {editable && enableEdit ? (
            <TextareaAutosize
              value={editElem.text_en || ''}
              className={textareaStyle}
              onChange={(e) => changeText(index, 'text_en', e.target.value)}


const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 200000,
}

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 200000,
  }


