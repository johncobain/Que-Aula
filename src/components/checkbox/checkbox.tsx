import { classNames } from "../../utils/functions/classNames";
import { ICheckbox } from "./checkbox.interface";

import "./checkbox.style.scss";

const Checkbox = ({ size, selected, onClick }: ICheckbox) => {
  const checkboxClasses = classNames({
    checkbox: true,
    [`checkbox--${size}`]: true,
    "checkbox--selected": selected,
  });

  return (
    <div
      role="button"
      aria-pressed={selected}
      onClick={onClick}
      className={checkboxClasses}
      data-testid="checkbox"
    ></div>
  );
};

export default Checkbox;
