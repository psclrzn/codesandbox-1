import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FlagData } from "./flag-data.model";
import { convertFlagDataElement, FlagDataElement } from "./fem";

const flagDataElements: FlagDataElement[] = [
  {
    id: "10",
    label: "International",
    isChecked: false,
    parent: "-1",
    sectionElements: [
      {
        id: "1",
        label: "Anti-Piracy",
        isChecked: false,
        parent: "10",
        sectionElements: []
      },
      {
        id: "2",
        label: "EU",
        isChecked: false,
        parent: "10",
        sectionElements: []
      },
      {
        id: "3",
        label: "ILO",
        isChecked: false,
        parent: "10",
        sectionElements: []
      },
      {
        id: "4",
        label: "IMO",
        isChecked: false,
        parent: "10",
        sectionElements: []
      },
      {
        id: "5",
        label: "Us Coast Guard",
        isChecked: false,
        parent: "10",
        sectionElements: []
      }
    ]
  },
  {
    id: "11",
    label: "Nation",
    isChecked: false,
    parent: "-1",
    sectionElements: [
      {
        id: "6",
        label: "Canada",
        isChecked: false,
        parent: "11",
        sectionElements: []
      },
      {
        id: "7",
        label: "Greece",
        isChecked: false,
        parent: "11",
        sectionElements: []
      },
      {
        id: "8",
        label: "United States",
        isChecked: false,
        parent: "11",
        sectionElements: []
      },
      {
        id: "9",
        label: "France",
        isChecked: false,
        parent: "11",
        sectionElements: []
      }
    ]
  }
];

@Injectable({ providedIn: "root" })
export class FlagSearchService {
  public data: FlagData; // = new FlagData();

  public dataSubject: BehaviorSubject<FlagData>;
  constructor() {
    const data = convertFlagDataElement(flagDataElements);
    this.dataSubject = new BehaviorSubject<FlagData>(new FlagData(data));
  }

  getData(): Observable<FlagData> {
    return this.dataSubject.asObservable();
  }
}
