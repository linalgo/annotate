import { Selection, XPathSelection } from './selection';
import { Selector } from './selector'

export class XPathSelector extends Selector {

  selectionFromRange(range: Range): XPathSelection {
    this.range = range;
    this.selection = {
      startContainer: getPathTo(range.startContainer),
      endContainer: getPathTo(range.endContainer),
      startOffset: range.startOffset,
      endOffset: range.endOffset
    }
    return this.selection;
  }

  rangeFromSelection(selection: XPathSelection): Range {
    this.selection = selection
    let range = document.createRange();
    range.setStart(findNode(selection.startContainer), selection.startOffset);
    range.setEnd(findNode(selection.endContainer), selection.endOffset);
    this.range = range;
    return this.range;
  }
}

function nodeName(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return 'text()';
  }
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

function getPathTo(node: Node, fromNode: Node = document): string {
  let path = '';
  while (node !== fromNode) {
    path = `/${nodeName(node)}[${nodePosition(node)}]${path}`;
    node = node.parentNode;
  }
  return `/${path}`;
}

function findNode(path: string): Node {
  let query = document.evaluate(path, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null)
  return query.singleNodeValue
}