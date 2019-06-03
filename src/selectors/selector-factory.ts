import { XPathSelector } from "./xpath-selector";
import { isXPathSelection, isTextPositionSelection, Selection } from "./selection";
import { Selector } from "./selector";
import { TextPositionSelector } from "./text-position-selector";

export class SelectorFactory {

  static getBestSelector(rs: Range | Selection, rootNode: Node = document, ignoreNodeName: string): Selector {
    if (rs instanceof Range) {
      return new XPathSelector(rs, rootNode, ignoreNodeName);
    } else if (isXPathSelection(rs)) {
      return new XPathSelector(rs, rootNode, ignoreNodeName);
    } else if (isTextPositionSelection(rs)) {
      return new TextPositionSelector(rs, rootNode, ignoreNodeName);
    } else {
      throw new Error('Range or Selection only.')
    }
  }
}