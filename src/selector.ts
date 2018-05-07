interface Selection {
  start: number,
  end: number
}

export class Selector {
  range: Range;

  constructor(rs?: Range | Selection){
    if (rs instanceof Range) {
      this.range = rs;
    }
  }
}

function isSelection(obj: any): obj is Selection {
  return (obj.start && obj.end);
}

export class TextPositionSelector extends Selector {

  start: number;
  end: number;

  constructor(rs?: Range | Selection) {
    super(rs);
    if (rs instanceof Range) {
      this.fromRange(rs);
    } else if (isSelection(rs)) {
      this.fromSelection(rs);
    }
  }

  fromRange(range: Range): Selector {
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
    return this;
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