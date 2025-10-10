import { useState } from "react";
import { classNames } from "../../utils/functions/classNames";
import { ICheckbox } from "./checkbox.interface";

import "./checkbox.style.scss";
import { useMediaQuery } from "../../utils/functions/useMediaQuery";

const Checkbox = ({ size, selected, onClick }: ICheckbox) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useMediaQuery((media) => setIsDesktop(media.matches), 711);

  const checkboxClasses = classNames({
    checkbox: true,
    "checkbox--small": size === "small",
    "checkbox--large": size === "large" || isDesktop,
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
