import { FC, useContext } from "react";
import { EditTermContext } from "./EditTermContext";
import {
  AcademicCapIcon,
  StatusOnlineIcon,
  MinusCircleIcon,
} from '@heroicons/react/outline'
import { TermContext } from "./TermContext";

export const EditTermDescriptionIcon: FC = () => {
  const { term } = useContext(TermContext)
  const { describe, setDescribe } = useContext(EditTermContext)
  return (
    <>
      {(!describe && term) ? (
        term.description && term.description.length > 0 ? (
          <AcademicCapIcon
            className="w-4 h-4 cursor-pointer"
            onClick={() => setDescribe(!describe)}
          />
        ) : (
          <StatusOnlineIcon
            className="w-4 h-4 cursor-pointer"
            onClick={() => setDescribe(!describe)}
          />
        )
      ) : (
        <MinusCircleIcon
          className="w-4 h-4 cursor-pointer"
          onClick={() => setDescribe(!describe)}
        />
      )}
    </>
  )
}