QuizEditor
  QuizHeader
  QTabs
  ExamSelectTab
  QuizSelectTab
    QListHeader
    QuizSelectFrame
      QInputItem
      QuizListFrame
        QListFilter
        QItem
          QKeywords
            QTerms
    TagSelectPanel
      TagFilter
      SelectableTag
    TermsProvider
      TermsEditor
        TermSaveButton
        TermAddButton
        TermTree
          TermTreeNode
            TermProvider
              NoteItemsProvider
                TermEditor
                  TermDraggableSelect
                    TermDescriptionIcon 
                    TermKeyword 
                    TermOperateIconSet
                  TermNoteBlock
                    NoteBlockHeader
                    NoteItemAdds
                    NoteItemProvider
                      NoteBlockContent
                        NoteItemAdds
                        NoteBlockContentBar
                        NoteBlockContentBody
                          NoteOption
                          NoteTextarea
                          NoteLink
                          NoteImage
                          NoteTextbox
                        NoteItemAdds
                  SaveButton
                TermHeader
                NoteItemsProvider
                  TermDescription
              TermAddButton
        TermsVis
          TermSelect
     SearchProvider
      QSearchQuery
  QListQuery
    QuizSelectTab
  TermNoteTab
    TagSelectPanel
    TermsLoader

  EditPanel
    QuestionProvider
      QuestionCaseProvider
        EditQuestion
          EditQuestionHeader
            QRArchiveToggle
            QReadyButton
            QCaseButtonSet
            QNewRegister
            SelectLang
          EditQuestionCase
            NoteItemsProvider
              QNoteBlock
          NoteItemsProvider
            QNoteBlock(title)
              useQuestion
              NoteBlockHeader(title)
              NoteItemAdds(index)
              NoteItemProvider(editElem,index)
                NoteBlockContent
                  NoteItemAdds
                  NoteBlockContentBar
                  NoteBlockContentBody
                    NoteOption
                    NoteTextarea
                    NoteLink
                    NoteImage
                    NoteTextbox
                  NoteItemAdds
          NoteItemsProvider
            QNoteBlock
          QScraping
            QComments
              EditContext.Provider
                NoteItemProvider
                  NoteBlockContent
                QComment
          QBug
          QKeywords
          QTermDescriptions
            NoteItemsProvider
              QNoteBlock
                NoteItemProvider(editElem,name,index,editable,enableEdit)
                  NoteBlockContent
          NoteItemsProvider
            QNoteBlock
          QLeaningProfiles
          QLabels
    TermProvider
      EditTermProvider
        EditTerm
  TermNotePanel
            
editable
追加、編集等できる

enableEdit
NoteItemsProvider
      <EnableEditContext.Provider value={{ enableEdit, setEnableEdit }}>
QNoteBlock
      {enableEdit && editElemsState.length === 0 ? (
        <NoteItemAdds index={-1} />
NoteBlockContent
      if (editting !== enableEdit) {
        setEditting(enableEdit)
      }
        {enableEdit && <NoteBlockContentBar />}
NoteBlockHeader
        {enableEdit ? (
          <CheckCircleIcon
            className={`h-6 w-6 ml-8 ${color.iconColor} cursor-pointer text-blue-500`}
            onClick={() => setEnableEdit(!enableEdit)}
          />
          <PencilAltIcon
            className={`h-5 w-5 ml-8 ${color.iconColor} cursor-pointer hover:text-blue-500`}
            onClick={() => setEnableEdit(!enableEdit)}
          />
NoteImage
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
NoteOption
      {enableEdit && (
        <div className="flex flex-row-reverse pr-8 py-2 space-x-8 ">
          <PhotographIcon
            className={getBgColor()}
            onClick={() => add(index, 'image')}
          />
NoteTextarea
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


QuizSelectTab
  useTagSelect

QKeywords
  useKeywords
  useTagAuto

QTermDescriptions
  useKeywords


setEditContext

QKeywords
  addTag

QTermDescriptions
  callTermEdit

QuestionProvider


TermEditTile
  setChosenTerm

TermNoteHeader
  onClick

TermNoteLink
  setChosenTerm

TagTile
  openNote

useKeywords
  putKeywords

useMutateQuestion
  createQuestion

useMutateTerms
  save

useTerm
  updateCacheTerm


