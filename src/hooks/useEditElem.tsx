/* eslint-disable array-callback-return */

import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  resetExamTags,
  selectEditContext,
  selectProviderTags,
  setEditContext,
} from '../slices/editSlice'
import { EditElem, EditElemType, Question, Tag } from '../types/types'
import axios from 'axios'
import log from 'loglevel'

export const useEditElem = (editElems: EditElem[]) => {
  log.setLevel("info")
  log.debug("useEditElem start!")
  const mark = ["A", "B", "C", "D", "E", "F"]
  const isCheckOn = editElems.some(x => x.correct)
  log.debug(isCheckOn)
  const [saveButtonToggle, setSaveButtonToggle] = useState(false)
  const [editElemsState, setEditElemsState] = useState<EditElem[]>(editElems)
  const [showCheckbox, setShowCheckbox] = useState(!isCheckOn)

  const add = (index: number, type: string) => {
    log.debug(index)
    const newEditElems = [...editElemsState]
    const newEditElem: EditElem = {
      type: type,
    }
    if (newEditElem.type === EditElemType.TEXTAREA) {
      newEditElem.text = ''
    } else if (newEditElem.type === EditElemType.LINK) {
      newEditElem.link = ''
      newEditElem.url = ''
    } else if (newEditElem.type === EditElemType.IMAGE) {
      newEditElem.image_path = ''
      newEditElem.image_height = ''
    } else if (newEditElem.type === EditElemType.OPTION) {
      newEditElem.text = ''
      newEditElem.mark = mark[index + 1]
    }
    newEditElems.splice(index + 1, 0, newEditElem)
    log.debug('add!!!')
    setEditElemsState(newEditElems)
    setSaveButtonToggle(false)
  }

  const del = (index: number) => {
    const newEditElems = [...editElemsState]
    newEditElems.splice(index, 1)
    log.debug('del!!!')
    setEditElemsState(newEditElems)
    setSaveButtonToggle(true)
  }

  const changeText = (index: number, attr: string, text: string) => {
    const newEditElems = [...editElemsState]
    if (
      attr === 'text' ||
      attr === 'text_en' ||
      attr === 'link' ||
      attr === 'url' ||
      attr === 'image_path' ||
      attr === 'image_height' ||
      attr === 'lv'
    ) {
      const newEditElem = { ...newEditElems[index] }
      newEditElem[attr] = text
      newEditElems.splice(index, 1, newEditElem)
    }
    log.debug('changeText!!!')
    setEditElemsState(newEditElems)
    validate(newEditElems)
  }

  const changeCheck = (index: number) => {
    const newEditElems = [...editElemsState]
    newEditElems[index].correct = !newEditElems[index].correct
    log.debug('changeCheck!!!')
    setEditElemsState(newEditElems)
    setSaveButtonToggle(true)
  }

  const validate = (newEditElems: EditElem[]) => {
    newEditElems.map((editElem) => {
      if (
        editElem.type === EditElemType.TEXTAREA ||
        editElem.type === EditElemType.OPTION
      ) {
        if (editElem.text === '') {
          setSaveButtonToggle(false)
        } else {
          setSaveButtonToggle(true)
        }
      } else if (editElem.type === EditElemType.LINK) {
        if (editElem.link === '' || editElem.url === '') {
          setSaveButtonToggle(false)
        } else {
          setSaveButtonToggle(true)
        }
      } else if (editElem.type === EditElemType.IMAGE) {
        if (editElem.image_path === '' || editElem.image_height === '') {
          setSaveButtonToggle(false)
        } else {
          setSaveButtonToggle(true)
        }
      } else {
        setSaveButtonToggle(false)
      }
    })
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const save = (requestData: any, api: string, post?: any) => {
    axios
      .put(`${process.env.REACT_APP_REST_URL}/${api}`, requestData, config)
      .then((response) => {
        let result = response.data
        log.debug(result)
        setSaveButtonToggle(false)
        if (post) post(requestData)
      })
      .catch((error) => log.debug(error))
  }

  const editedContext = useAppSelector(selectEditContext)
  const tags = useAppSelector(selectProviderTags)
  const dispatch = useAppDispatch()

  const keywords =
    !editedContext.keywordsJson || editedContext.keywordsJson === ''
      ? {}
      : JSON.parse(editedContext.keywordsJson || '{}')

  const onClickTag = (tag: Tag, include: boolean) => {
    if (include) {
      keywords[tag.tag_name] = []
    } else {
      if (keywords[tag.tag_name].length !== 0) {
        var res = window.confirm('用語も削除されます')
        if (!res) return
      }
      delete keywords[tag.tag_name]
    }
    log.debug('keys')
    log.debug(Object.keys(keywords))
    const requestData: Question = {
      quest_id: editedContext.quest_id,
      tags: tags
        .filter((tag) => Object.keys(keywords).includes(tag.tag_name))
        .map((tag) => tag.tag_no.toString()),
      keywords: JSON.stringify(keywords),
    }
    log.debug(requestData)
    axios
      .put<Question>(
        `${process.env.REACT_APP_REST_URL}/question`,
        requestData,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            setEditContext({
              ...editedContext,
              keywordsJson: JSON.stringify(keywords),
            })
          )
          dispatch(resetExamTags())
        }
      })
      .catch((error) => log.debug(error))
  }

  return {
    editElemsState,
    setEditElemsState,
    saveButtonToggle,
    setSaveButtonToggle,
    showCheckbox,
    setShowCheckbox,
    add,
    del,
    changeText,
    changeCheck,
    save,
    keywords,
    onClickTag,
  }
}