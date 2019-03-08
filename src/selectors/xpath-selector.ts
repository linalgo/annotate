import { XPathSelection } from './selection';
import { Selector } from './selector'

export class XPathSelector extends Selector {

  selectionFromRange(range: Range): XPathSelection {
    this.range = range;
    this.selection = {
      startContainer: getPathTo(range.startContainer, document, this.ignoreNodeName),
      endContainer: getPathTo(range.endContainer, document, this.ignoreNodeName),
      startOffset: getNormalizedOffset(range.startContainer, range.startOffset, this.ignoreNodeName),
      endOffset: getNormalizedOffset(range.endContainer, range.endOffset, this.ignoreNodeName)
    }
    return this.selection;
  }

  rangeFromSelection(selection: XPathSelection): Range {
    this.selection = selection
    let range = document.createRange();
    var { node, offset } = findOriginalNodeAndOffset(selection.startContainer, selection.startOffset);
    range.setStart(node, offset);
    var { node, offset } = findOriginalNodeAndOffset(selection.endContainer, selection.endOffset);
    range.setEnd(node, offset);
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

function getTextNodes(node: Node) {
  let textNodes: Node[] = [];
  if (node.nodeType === Node.TEXT_NODE) {
    textNodes.push(node);
  }
  for (let child of node.childNodes as any) {
    if (!(child.className === "material-icons back-arrow")) {
      textNodes = textNodes.concat(getTextNodes(child));
    }
  }
  return textNodes;
}

function getPathTo(node: Node, fromNode: Node, ignoreNodeName: string) {
  let path = '';
  while (node !== fromNode) {
    if (node.nodeType != Node.TEXT_NODE && nodeName(node) !== ignoreNodeName) {
      path = `/${nodeName(node)}[${nodePosition(node)}]${path}`;
    }
    node = node.parentNode;
  }
  return `/${path}`;
}

function findOriginalNodeAndOffset(path: string, offset: number) {
  const container = findNode(path);
  let newOffset = 0
  for (const node of getTextNodes(container)) {
    if (newOffset + node.nodeValue.length >= offset) {
      return { node: node, offset: offset - newOffset };
    } else {
      newOffset += node.nodeValue.length;
    }
  }
}

function getNormalizedOffset(node: Node, offset: number, ignoreNodeName: string): number {
  let parentNode = node.parentNode;
  while (parentNode.nodeType == node.TEXT_NODE || nodeName(parentNode) == ignoreNodeName) {
    parentNode = node.parentNode;
  }
  let newOffset = 0;
  for (const child of getTextNodes(parentNode)) {
    if (child === node) {
      return newOffset + offset;
    } else {
      newOffset += child.nodeValue.length;
    }
  }
  return newOffset;
}

function findNode(path: string): Node {
  let query = document.evaluate(path, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null)
  return query.singleNodeValue
}