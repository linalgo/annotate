import { Selection, isSelection } from './selection';


export abstract class Selector {
  range: Range;
  selection: Selection;
  ignoreNodeName: string;

  constructor(rs?: Range | Selection, ignoreNodeName: string = null) {
    this.ignoreNodeName = ignoreNodeName;
    if (rs instanceof Range) {
      this.selectionFromRange(rs);
    } else if (isSelection(rs)) {
      this.rangeFromSelection(rs);
    }
  }

  abstract selectionFromRange(range: Range): Selection;
  abstract rangeFromSelection(selection: Selection): Range;

}
