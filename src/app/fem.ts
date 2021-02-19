import { FlagData } from "./flag-data.model";

interface IFlagDataElement {
  id: string;
  label: string;
  parent: string;
  isChecked: boolean;
  sectionElements?: FlagDataElement[];
}

function toFlagDataElementList(values: IFlagDataElement[]): FlagDataElement[] {
  return values.map((element) => new FlagDataElement(element));
}

export { toFlagDataElementList as convertFlagDataElement };

export class FlagDataElement implements IFlagDataElement {
  public id: string;
  public label: string;
  public parent: string;
  public isChecked: boolean;
  public sectionElements?: FlagDataElement[];

  constructor(values: IFlagDataElement) {
    this.id = values.id;
    this.label = values.label;
    this.parent = values.parent;
    this.isChecked = values.isChecked;
    this.sectionElements =
      values.sectionElements !== undefined
        ? toFlagDataElementList(values.sectionElements)
        : undefined;
  }

  public getParent(data: FlagData) {
    return data.findElementById(this.parent);
  }

  public toggleAllChildren(checkedStatus: boolean) {
    this.sectionElements.forEach((child: FlagDataElement) => {
      child.isChecked = checkedStatus;
    });
  }

  public isParent(): boolean {
    return +this.parent < 0 && this.sectionElements.length > 0;
  }
}
