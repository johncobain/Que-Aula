import { IClassListItem } from './classListItem.interface'

export const ClassListItem = ({
  classCode,
  teacher,
  description,
  selected,
  onClick = () => {}
}: IClassListItem) => {
  return (
    <div>
      <div>{classCode}</div>
    </div>
  )
}
