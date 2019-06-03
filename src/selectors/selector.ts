import { Selection, isSelection } from './selection';


export abstract class Selector {
  rootNode: Node;
  range: Range;
  selection: Selection;
  ignoreNodeName: string;

  constructor(rs?: Range | Selection, rootNode: Node = document, ignoreNodeName: string = null) {
    this.ignoreNodeName = ignoreNodeName;
    this.rootNode = rootNode;
    if (rs instanceof Range) {
      this.range = rs;
      this.selectionFromRange(rs, rootNode);
    } else if (isSelection(rs)) {
      this.selection = rs;
      this.rangeFromSelection(rs, rootNode);
    }
  }

  abstract selectionFromRange(range: Range, rootNode: Node): Selection;
  abstract rangeFromSelection(selection: Selection, rootNode: Node): Range;

}
