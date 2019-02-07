import { Selection } from './selection';
import { Selector } from './selector'

export class XPathSelector extends Selector {

  startContainer: string;
  endContainer: string;
  startOffset: number;
  endOffset: number;

  selectionFromRange(range: Range): Selection {
    this.range = range;
    this.selection = {
      startContainer: getPathTo(range.startContainer),
      endContainer: getPathTo(range.endContainer),
      startOffset: range.startOffset,
      endOffset: range.endOffset
    }
    return this.selection;
  }

  rangeFromSelection(selection: Selection): Range {
    this.selection = selection
    let range = document.createRange();
    range.setStart(findNode(this.startContainer), this.startOffset);
    range.setEnd(findNode(this.endContainer), this.endOffset);
    this.range = range;
    return this.range;
  }
}

function nodeName(node: Node): string {
  return node.nodeName.replace('#', '').toLowerCase();
}

function nodePosition(node: Node): number {
  let name = node.nodeName;
  let position = 1;
  while (node = node.previousSibling) {
    if (name === node.nodeName) {
      position += 1;
    }
  }
  return position;
}

function getPathTo(node: Node, fromNode: Node = (document as any).rootElement): string {
  let path = '';
  while (node !== fromNode) {
    path = `${nodeName(node)}[${nodePosition(node)}]/${path}`;
    node = node.parentNode;
  }
  return `//${path}`;
}

function findNode(path: string): Node {
  let query = document.evaluate(path, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null)
  return query.singleNodeValue
}