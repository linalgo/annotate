import { Annotation, isAnnotation } from '../annotator'

export interface Selection {
  type?: string;
  startContainer?: string,
  endContainer?: string,
  startOffset?: number,
  endOffset?: number,
  start?: number,
  end?: number,
  exact?: string,
  prefix?: string,
  suffix?: string
}

export function isSelection(obj: any): obj is Selection {
  if (obj.type) {
    return true;
  }
  return false;
}

export interface SelectorType {
  type: string;
  selection: Selection;
}

export abstract class Selector {
  range: Range;

  constructor(rs?: Range | Selection) {
    if (rs instanceof Range) {
      this.fromRange(rs);
    } else if (isSelection(rs)) {
      this.fromSelection(rs);
    }
  }

  abstract fromRange(range: Range): Selection;
  abstract fromSelection(selection: Selection): Range;
  abstract getRange(): Range;
  abstract getSelection(): Selection;

}
