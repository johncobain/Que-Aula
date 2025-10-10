import { useEffect, useRef, useState } from "react";
import { classNames } from "../../utils/functions/classNames";
import { ISwitcher } from "./switcher.interface";

import "./switcher.style.scss";

export const Switcher = ({ icon, label, selected = false, onClick = () => {} }: ISwitcher) => {
  const [isSelected, setIsSelected] = useState(selected);
  const inputRef = useRef<HTMLInputElement>(null);

  const switcherInputClasses = classNames({
    switcher__input: true,
    "switcher__input--selected": isSelected,
  });

  const switcherBallClasses = classNames({
    switcher__ball: true,
    "switcher__ball--selected": isSelected,
  });

  const handleSelect = () => {
    if (inputRef.current) inputRef.current.checked = !isSelected;
    setIsSelected((prev) => !prev);
    onClick();
  };

  useEffect(() => {
    setIsSelected(selected);
    if (inputRef.current) inputRef.current.checked = selected;
  }, [selected]);

  return (
    <div className="switcher" onClick={handleSelect}>
      {icon && <img src={icon} />}
      {label && <p>{label}</p>}
      <div className={switcherInputClasses}>
        <input type="checkbox" ref={inputRef} />
        <div className={switcherBallClasses} />
      </div>
    </div>
  );
};
