//import { FlagDataElement } from "./fem";

import { FlagDataElement } from "./fem";

export class FlagData {
  public data: Array<FlagDataElement>;

  constructor(data) {
    this.data = data;
  }

  public findElementById(id: string) {
    var result;
    function iterate(element) {
      if (element.id === id) {
        result = element;
        return true;
      }
      return (
        Array.isArray(element.sectionElements) &&
        element.sectionElements.some(iterate)
      );
    }

    this.data.some(iterate);
    return result;
  }

  public getElementIndex(element: FlagDataElement): number {
    return this.data.findIndex((flagItem) => {
      return flagItem.id === element.id;
    });
  }

  public addElement(element: FlagDataElement): void {
    this.data.push(element);
  }
  public removeElementByIndex(id: number): void {
    this.data.splice(id, 1);
  }

  public getSiblings(element: FlagDataElement): Array<FlagDataElement> {
    const parentId = element.parent;

    return element.getParent(this).sectionElements.filter((sibling) => {
      return sibling.parent === parentId && sibling.id !== element.id;
    });
  }

  public parentElementIsChecked(element: FlagDataElement): boolean {
    return element.getParent(this).isChecked;
  }

  public getParent(element: FlagDataElement): FlagDataElement {
    return element.getParent(this);
  }
}
