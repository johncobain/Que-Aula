import { IClassesData, IClassesDataEach } from "../../../../types/dataClasses.interface";

export interface IClassesContainer {
  classesData: IClassesData[];
  onClickTag: (item: IClassesData, specificItem?: IClassesDataEach) => void;
  title: string;
  semestre: number;
  detailed?: boolean;
}
