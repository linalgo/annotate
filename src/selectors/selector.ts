export interface Selection {
  startContainer?: string,
  endContainer?: string,
  startOffset?: number,
  endOffset?: number,
  start?: number,
  end?: number
}

export function isSelection(obj: any): obj is Selection {
  if (obj.start && obj.end) {
    return true;
  } else if (obj.startContainer && obj.endContainer && obj.startOffset && obj.endOffset) {
    return true;
  } else {
    return false;
  }
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
