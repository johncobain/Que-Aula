import Checkbox from "../../../../components/checkbox/checkbox";
import { classNames } from "../../../../utils/functions/classNames";
import { IClassListItem } from "./classListItem.interface";

export const ClassListItem = ({
  classCode,
  teacher,
  description,
  whichClass,
  selected = false,
  onClick = () => {},
}: IClassListItem) => {
  const classListItemClasses = classNames({
    form__classes__classListItem: true,
    "form__classes__classListItem--selected": selected,
  });
  const classListItemTitleClasses = classNames({
    form__classes__classListItem__title: true,
    "form__classes__classListItem__title--selected": selected,
  });

  return (
    <div className={classListItemClasses} onClick={onClick} data-testid="class-list-item">
      <Checkbox selected={selected} size="small" />
      <div className="form__classes__classListItem__content">
        <h4 className={classListItemTitleClasses}>
          {classCode} - {teacher} <span>{whichClass}</span>
        </h4>
        <p className="form__classes__classListItem__subtitle">{description}</p>
      </div>
    </div>
  );
};
