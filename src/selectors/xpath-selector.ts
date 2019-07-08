import { XPathSelection } from './selection';
import { Selector } from './selector'

export class XPathSelector extends Selector {

  selectionFromRange(range: Range, rootNode: Node = document): XPathSelection {
    this.range = range;
    this.selection = {
      startContainer: getPathTo(range.startContainer, rootNode, this.ignoreNodeName),
      endContainer: getPathTo(range.endContainer, rootNode, this.ignoreNodeName),
      startOffset: getNormalizedOffset(range.startContainer, range.startOffset, this.ignoreNodeName),
      endOffset: getNormalizedOffset(range.endContainer, range.endOffset, this.ignoreNodeName)
    }
    return this.selection;
  }

  rangeFromSelection(selection: XPathSelection, rootNode: Node = document): Range {
    this.selection = selection
    let range = document.createRange();
    try {
      var { node, offset } = findOriginalNodeAndOffset(selection.startContainer, selection.startOffset, rootNode, this.ignoreNodeName);
      range.setStart(node, offset);
      var { node, offset } = findOriginalNodeAndOffset(selection.endContainer, selection.endOffset, rootNode, this.ignoreNodeName);
      range.setEnd(node, offset);
      this.range = range;
      return this.range;
    } catch(e) {
      throw new Error(`Could not find node with selection ${selection}`);
    }
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
    if (!(child.className && child.className.includes('linpop-ignore'))) {
      textNodes = textNodes.concat(getTextNodes(child));
    }
  }
  return textNodes;
}

function getPathTo(node: Node, fromNode: Node, ignoreNodeName: string) {
  let path = '';
  while (!node.isSameNode(fromNode)) {
    if (node.nodeType != Node.TEXT_NODE && nodeName(node) !== ignoreNodeName) {
      path = `/${nodeName(node)}[${nodePosition(node)}]${path}`;
    }
    node = node.parentNode;
  }
  return `/${path}`;
}

function findOriginalNodeAndOffset(path: string, offset: number, rootNode: Node, ignoreNodeName: string) {
  const container = findNode(path, rootNode, ignoreNodeName);
  let newOffset = 0
  for (const node of getTextNodes(container)) {
    if (newOffset + node.nodeValue.length >= offset) {
      return { node: node, offset: offset - newOffset };
    } else {
      newOffset += node.nodeValue.length;
    }
  }
  throw new Error('Could not find node');
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

function findNode(path: string, rootNode: Node = document, ignoreNodeName: string): Node {
  const prefix = getPathTo(rootNode, document, ignoreNodeName);
  let newPath = prefix.concat(path.slice(1, path.length));
  let query = document.evaluate(newPath, rootNode, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null)
  return query.singleNodeValue
}