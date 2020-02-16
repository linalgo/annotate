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

export interface BoundingBoxSelection {
  type?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Selection = XPathSelection | TextPositionSelection | TextQuoteSelection | BoundingBoxSelection;

export function isXPathSelection(obj: any): obj is XPathSelection {
  if ('startContainer' in obj && 'endContainer' in obj && 'startOffset' in obj && 'endOffset' in obj) {
    return true;
  }
  return false;
}

export function isTextPositionSelection(obj: any): obj is TextPositionSelection {
  if ('start' in obj && 'end' in obj) {
    return true;
  }
  return false;
}

export function isTectQuoteSelection(obj: any): obj is TextQuoteSelection {
  if ('exact' in obj && 'prefix' in obj && 'suffix' in obj) {
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