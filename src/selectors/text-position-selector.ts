import { isSelection, Selection, Selector } from './selector'

export class TextPositionSelector extends Selector {

  start: number;
  end: number;

  fromRange(range: Range): Selection {
    let nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
    let node: Node;
    let offset: number = 0;
    while (node = nodeIterator.nextNode()) {
      if (node === range.startContainer) {
        this.start = offset + range.startOffset;
      }
      if (node === range.endContainer) {
        this.end = offset + range.endOffset;
      }
      offset += node.nodeValue.length;
    }
    return this.getSelection();
  }

  fromSelection(selection: Selection): Range {
    let startContainer: Node, endContainer: Node;
    let startOffset: number, endOffset: number;
    let nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
    let node: Node;
    let { start, end } = selection;
    let offset = 0;
    while (node = nodeIterator.nextNode()) {
      let nodeLength = node.nodeValue.length;
      if (offset + nodeLength >= start && start >= offset) {
        startContainer = node;
        startOffset = start - offset;
      }
      if (offset <= end && offset + nodeLength >= end) {
        endContainer = node;
        endOffset = end - offset;
      }
      offset += nodeLength;
    }
    let range = document.createRange()
    range.setStart(startContainer, startOffset);
    range.setEnd(endContainer, endOffset);
    this.range = range;
    return this.range;
  }

  toString(): string {
    return `start: ${this.start}, end: ${this.end}`;
  }

  getRange(): Range {
    return this.range;
  }

  getSelection(): Selection {
    return { start: this.start, end: this.end }
  }
}