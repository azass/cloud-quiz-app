import { useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectScArgs } from '../slices/editSlice'
import { Question, Term } from '../types/types'

export const useFilter = () => {
  const params = useParams()
  const scArgs = useAppSelector(selectScArgs)
  const args = { ...scArgs, exam_ids: [params.exam_id], except_old: false }

  const filterOtherOptions = (question: Question) => {
    if (args.other_options.length > 0) {
      if (args.other_options.includes(0)) {
        if (question.more_study) {
          return true
        }
      }
      if (args.other_options.includes(1)) {
        if (question.is_difficult) {
          return true
        }
      }
      if (args.other_options.includes(2)) {
        if (question.is_weak) {
          return true
        }
      }
      if (args.other_options.includes(3)) {
        if (question.is_mandatory) {
          return true
        }
      }
      if (args.other_options.includes(4)) {
        if (question.is_bug) {
          return true
        }
      }
      return false
    } else {
      return true
    }
  }

  const filterScorings = (question: Question) => {
    if (args.scorings.length > 0) {
      return args.scorings.includes(question.scoring)
    } else {
      return true
    }
  }

  const filterTags = (question: Question) => {
    if (args.category_ids.length > 0 && question.tags) {
      for (const tagId of question.tags) {
        if (args.category_ids.includes(tagId)) {
          return true
        }
      }
      return false
    } else {
      return true
    }
  }

  const filter = (question: Question) => {
    if (filterOtherOptions(question)) {
      if (filterScorings(question)) {
        if (filterTags(question)) {
          return true
        }
      }
    }
    return false
  }

  const show = (question: Question, searchWord: string) => {
    if (filter(question)) {
      if (searchWord !== '') {
        if (question.keywords) {
          const keywords = JSON.parse(question.keywords || '{}')
          for (const tagName of Object.keys(keywords)) {
            if (tagName.toLowerCase().includes(searchWord.toLowerCase())) {
              return true
            } else {
              if (keywords[tagName].length > 0) {
                if (
                  keywords[tagName].filter((term: Term) => {
                    return term.word
                      .toLowerCase()
                      .includes(searchWord.toLowerCase())
                  }).length > 0
                ) {
                  return true
                }
              }
            }
          }
        }
        if (question.labels) {
          if (
            question.labels.filter((label) => {
              return label.toLowerCase().includes(searchWord.toLowerCase())
            }).length > 0
          ) {
            return true
          }
        }
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }
  return {
    show,
  }
}
