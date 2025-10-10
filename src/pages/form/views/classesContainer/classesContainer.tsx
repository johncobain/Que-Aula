import { classNames } from "../../../../utils/functions/classNames";
import { ClassTag } from "../classTag/classTag";
import { IClassesContainer } from "./classesContainer.interface";

import List from "../../../../assets/list.svg";
import { useEffect, useState } from "react";
import { ClassListItem } from "../classListItem/classListItem";
import { Switcher } from "../../../../components/switcher/switcher";

export const ClassesContainer = ({
  classesData,
  onClickTag,
  title,
  semestre,
  detailed = false,
}: IClassesContainer) => {
  const [isDetailed, setIsDetailed] = useState(detailed);

  const tagContainerClasses = classNames({
    ["form__classes__tag__container"]: true,
    ["form__classes__tag__container--detailed"]: isDetailed,
  });

  const handleSwitcherClick = () => {
    setIsDetailed((prev) => !prev);
  };

  useEffect(() => {
    setIsDetailed(detailed);
  }, [detailed]);

  return (
    <div className="form__classes__container">
      <div className="form__classes__subtitle__container">
        <h4 className="form__classes__subtitle">{title}</h4>
        <div className="form__classes__switcher">
          <Switcher icon={List} onClick={handleSwitcherClick} selected={isDetailed} />
        </div>
      </div>
      <div className={tagContainerClasses}>
        {classesData
          .filter((filter) => +filter.semester === semestre)
          .map((classData, index) => {
            const seen = new Set<string>();

            const filteredClasses = classData.classes.filter((classInfo) => {
              const key = `${classData.name}-${classInfo.whichClass}`;
              if (seen.has(key)) {
                return false;
              } else {
                seen.add(key);
                return true;
              }
            });

            return !classData.multiClass ? (
              isDetailed ? (
                <ClassListItem
                  classCode={classData.name}
                  teacher={classData.classes[0].teacher}
                  description={classData.description}
                  selected={classData.classes.some((cls) => cls.selected)}
                  key={`${index}${classData.name}`}
                  onClick={() => onClickTag(classData)}
                />
              ) : (
                <ClassTag
                  title={classData.name}
                  key={`${index}${classData.name}`}
                  selected={classData.classes.some((cls) => cls.selected)}
                  onClick={() => onClickTag(classData)}
                />
              )
            ) : (
              filteredClasses &&
                filteredClasses.map((classInfo, i) => {
                  return isDetailed ? (
                    <ClassListItem
                      classCode={classData.name}
                      teacher={classInfo.teacher}
                      description={classData.description}
                      whichClass={classInfo.whichClass}
                      selected={classData.classes.some(
                        (cls) => cls.whichClass === classInfo.whichClass && cls.selected
                      )}
                      key={`${i}${classInfo.whichClass}`}
                      onClick={() => onClickTag(classData, classInfo)}
                    />
                  ) : (
                    <ClassTag
                      title={`${classData.name} ${classInfo.whichClass}`}
                      key={`${i}${classInfo.whichClass}`}
                      selected={classData.classes.some(
                        (cls) => cls.whichClass === classInfo.whichClass && cls.selected
                      )}
                      onClick={() => onClickTag(classData, classInfo)}
                    />
                  );
                })
            );
          })}
      </div>
    </div>
  );
};
