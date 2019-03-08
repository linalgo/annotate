import { XPathSelector } from "./xpath-selector";
import { isXPathSelection, isTextPositionSelection, Selection } from "./selection";
import { Selector } from "./selector";
import { TextPositionSelector } from "./text-position-selector";

export class SelectorFactory {

  static getBestSelector(rs: Range | Selection, ignoreNodeName: string): Selector {
    if (rs instanceof Range) {
      return new XPathSelector(rs, ignoreNodeName);
    } else if (isXPathSelection(rs)) {
      return new XPathSelector(rs, ignoreNodeName);
    } else if (isTextPositionSelection(rs)) {
      return new TextPositionSelector(rs, ignoreNodeName);
    } else {
      throw new Error('Range or Selection only.')
    }
  }
}