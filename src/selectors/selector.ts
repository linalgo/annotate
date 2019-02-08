import { Selection, isSelection } from './selection';


export abstract class Selector {
  range: Range;
  selection: Selection;

  constructor(rs?: Range | Selection) {
    if (rs instanceof Range) {
      this.selectionFromRange(rs);
    } else if (isSelection(rs)) {
      this.rangeFromSelection(rs);
    }
  }

  abstract selectionFromRange(range: Range): Selection;
  abstract rangeFromSelection(selection: Selection): Range;

}
