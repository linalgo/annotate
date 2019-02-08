export interface XPathSelection {
  type?: string;
  startContainer: string;
  endContainer: string;
  startOffset: number;
  endOffset: number;
}

export interface TextPositionSelection {
  type?: string;
  start: number;
  end: number;
}

export interface TextQuoteSelection {
  type?: string; 
  exact: string,
  prefix: string;
  suffix: string;
}

export type Selection = XPathSelection | TextPositionSelection | TextQuoteSelection;

export function isXPathSelection(obj: any): obj is XPathSelection {
  if (obj.startContainer && obj.endContainer && obj.startOffset && obj.endOffset) {
    return true;
  }
  return false;
}

export function isTextPositionSelection(obj: any): obj is TextPositionSelection {
  if (obj.start && obj.end) {
    return true;
  }
  return false;
}

export function isTectQuoteSelection(obj: any): obj is TextQuoteSelection {
  if (obj.exact && obj.prefix && obj.suffix) {
    return true;
  }
  return false;
}

export function isSelection(obj: any): obj is Selection {
  if (isXPathSelection(obj) || isTextPositionSelection(obj)) {
    return true;
  }
  return false;
}