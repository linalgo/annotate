import { Selection, TextPositionSelection } from './selection'
import { Selector } from './selector'

export class TextPositionSelector extends Selector {

  selectionFromRange(range: Range): Selection {
    this.range = range;
    let nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
    let node: Node;
    let offset: number = 0;
    let selection: TextPositionSelection;
    while (node = nodeIterator.nextNode()) {
      if (node === range.startContainer) {
        selection.start = offset + range.startOffset;
      }
      if (node === range.endContainer) {
        selection.end = offset + range.endOffset;
      }
      offset += node.nodeValue.length;
    }
    this.selection = selection;
    return this.selection;
  }

  rangeFromSelection(selection: TextPositionSelection): Range {
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
    return `start: ${(this.selection as TextPositionSelection).start}, end: ${(this.selection as TextPositionSelection).end}`;
  }

}
