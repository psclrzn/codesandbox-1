import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FlagSearchService } from "./data.service";
import { FlagDataElement } from "./fem";
import { FlagData } from "./flag-data.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public data: FlagData; //[] = [];
  public checkedData: FlagData;
  public checkedDataSubject: BehaviorSubject<FlagData> = new BehaviorSubject(
    new FlagData([])
  );
  public checkedDataObservable = this.checkedDataSubject.asObservable();

  constructor(public flagSearchService: FlagSearchService) {}

  ngOnInit() {
    this.flagSearchService.getData().subscribe((results) => {
      this.data = results;
    });

    this.checkedDataObservable.subscribe((results) => {
      this.checkedData = results;
    });
  }

  onChangeParent(id: string, checked: boolean) {
    var element: FlagDataElement = this.data.findElementById(id);

    if (element) {
      element.toggleAllChildren(checked);

      if (checked) {
        this.addElementToCheckedData(element);
      } else {
        this.removeElementFromCheckedData(element);
      }
    }
  }

  onClickChild(id: string, event) {
    var checked = event.target.checked;
    var element: FlagDataElement = this.data.findElementById(id);
    if (element) {
      if (checked) {
        if (this.allSiblingsChecked(element)) {
          event.preventDefault();
          this.toggleParent(element, checked);
          this.toggleAllSiblings(element, !checked);

          this.removeSiblingsFromCheckedData(element);
          this.addParentToCheckedData(element);
          // add parent to checkedData
        } else {
          this.addElementToCheckedData(element);
        }
      } else {
        if (this.isParentChecked(element)) {
          this.addSiblingsToCheckedData(element);
          this.removeParentFromCheckedData(element);
        }
        this.removeElementFromCheckedData(element);
      }
    }
  }

  onChangeSelected(id: string, checked: boolean) {
    var element: FlagDataElement = this.data.findElementById(id);
    if (element) {
      if (element.isParent()) {
        element.toggleAllChildren(checked);
      }
      if (checked) {
        this.addElementToCheckedData(element);
      } else {
        this.removeElementFromCheckedData(element);
      }
    }
  }

  private isParentChecked(element) {
    return this.data.getParent(element).isChecked;
  }
  private addParentToCheckedData(element) {
    this.data.getParent(element);
  }

  private removeSiblingsFromCheckedData(element) {
    this.data.getSiblings(element).forEach((sibling) => {
      this.removeElementFromCheckedData(element);
    });
  }

  private toggleAllSiblings(element, checked) {
    this.data.getSiblings(element).forEach((sibling) => {
      sibling.isChecked = checked;
    });
  }

  private toggleParent(element, checked) {
    this.data.getParent(element).isChecked = checked;
  }

  private allSiblingsChecked(element) {
    const siblingsChecked = this.data
      .getSiblings(element)
      .reduce((n, sibling) => {
        return n + +(sibling.isChecked === true);
      }, 0);

    return (
      this.data.getParent(element).sectionElements.length - 1 ===
      siblingsChecked
    );
  }

  private removeParentFromCheckedData(element) {
    const parent = this.data.getParent(element);

    if (parent) {
      parent.isChecked = !parent.isChecked;
      this.removeElementFromCheckedData(parent);
    }
  }

  private addSiblingsToCheckedData(element) {
    this.data.getSiblings(element).forEach((sibling) => {
      this.addElementToCheckedData(sibling);
    });
  }

  private addElementToCheckedData(element: FlagDataElement) {
    const data = this.checkedDataSubject.getValue();
    data.addElement(element);
    this.checkedDataSubject.next(data);
  }

  private removeElementFromCheckedData(element: FlagDataElement) {
    const currentCheckedData = this.checkedDataSubject.getValue();
    const index = currentCheckedData.getElementIndex(element);

    this.checkedDataSubject.getValue().removeElementByIndex(index);
  }
}
