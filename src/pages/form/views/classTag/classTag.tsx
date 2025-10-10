import { classNames } from "../../../../utils/functions/classNames";
import { IClassTag } from "./classTag.Interface";

export const ClassTag = ({
  selected = false,
  title = "title",
  whichClass,
  loading = false,
  onClick = () => {},
}: IClassTag) => {
  const tagClasses = classNames({
    ["form__classes__tag"]: true,
    "form__classes__tag--selected": selected,
    shimmer: loading,
  });

  const tagSpanClasses = classNames({
    form__classes__tag__class: true,
    "form__classes__tag__class--selected": selected,
  });

  return (
    <div className={tagClasses} onClick={onClick}>
      <span className="form__classes__tag__title">{title} </span>
      {whichClass && <span className={tagSpanClasses}>{whichClass}</span>}
    </div>
  );
};
