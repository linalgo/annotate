import { Selection, Selector } from './selector'

export class XPathSelector extends Selector {

  startContainer: string;
  endContainer: string;
  startOffset: number;
  endOffset: number;

  fromRange(range: Range): Selection {
    this.range = range;
    this.startContainer = getPathTo(range.startContainer);
    this.endContainer = getPathTo(range.endContainer);
    this.startOffset = range.startOffset;
    this.endOffset = range.endOffset;
    return this.getSelection();
  }

  fromSelection(selection: Selection): Range {
    this.startContainer = selection.startContainer;
    this.endContainer = selection.endContainer;
    this.startOffset = selection.startOffset;
    this.endOffset = selection.endOffset;
    let range = document.createRange();
    range.setStart(findNode(this.startContainer), this.startOffset);
    range.setEnd(findNode(this.endContainer), this.endOffset);
    return range;
  }

  getSelection(): Selection {
    let selection: Selection = {
      startContainer: this.startContainer,
      endContainer: this.endContainer,
      startOffset: this.startOffset,
      endOffset: this.endOffset
    }
    return selection;
  }

  getRange(): Range {
    return this.range;
  }
}

function nodeName(node: Node): string {
  return node.nodeName.replace('#', '').toLowerCase();
}

function nodePosition(node: Node): number {
  let name = node.nodeName;
  let position = 1;
  while(node = node.previousSibling) {
    if (name === node.nodeName) {
      position += 1;
    }
  }
  return position;
}

function getPathTo(node: Node, fromNode: Node = document.rootElement): string {
  let path = '';
  while (node !== fromNode) {
    path = `${nodeName(node)}[${nodePosition(node)}]/${path}`;
    node = node.parentNode;
  }
  return path;
}

function findNode(path: string): Node {
  let r = document.evaluate(path, document, null, XPathResult.ANY_TYPE, null)
  return r.singleNodeValue
}