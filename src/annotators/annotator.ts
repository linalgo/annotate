import { Selection, Selector, isXPathSelection, isTextPositionSelection } from '../selectors'
import { TextPositionSelector } from '../selectors';
import { XPathSelector } from '../selectors/xpath-selector';

import { Annotation } from './annotation';


export class Annotator {

  annotations: Array<Annotation> = [];

  constructor() { }

  getBestSelector(rs: Range | Selection): Selector {
    if (rs instanceof Range) {
      return new XPathSelector(rs);
    } else if (isXPathSelection(rs)) {
      return new XPathSelector(rs);
    } else if (isTextPositionSelection(rs)) {
      return new TextPositionSelector(rs);
    } else {
      throw new Error('Range or Selection only.')
    }
  }

  getTextNodes(node: Node) {
    const textNodes = [];
    const children = [node];
    while (children.length > 0) {
      const node = children.pop()
      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node)
      }
      if (node.childNodes.length > 0) {
        for (const child of node.childNodes) {
          children.push(child);
        }
      }
    }
    return textNodes;
  }

  getSubRanges(range: Range) {
    if (range.commonAncestorContainer.childNodes.length === 0) {
      return [range];
    }
    const ranges: Range[] = [];
    for (const node of this.getTextNodes(range.commonAncestorContainer)) {
      const subRange = document.createRange();
      if (node === range.startContainer) {
        subRange.setStart(node, range.startOffset);
        subRange.setEndAfter(node);
        ranges.push(subRange);
      } else if (node === range.endContainer) {
        subRange.setStartBefore(node);
        subRange.setEnd(node, range.endOffset);
        ranges.push(subRange);
      } else if ((range as any).intersectsNode(node)) {
        subRange.setStartBefore(node);
        subRange.setEndAfter(node);
        ranges.push(subRange);
      }
    }
    return ranges;
  }

  createAnnotation(selection: Selection): Annotation {
    const annotation = {
      type: '',
      body: '',
      target: {
        source: document.URL,
        selector: [selection]
      }
    }
    this.annotations.push(annotation);
    return annotation;
  }

  highlightRange(range: Range, tag: string) {
    for (const subRange of this.getSubRanges(range)) {
      const newNode = document.createElement(tag);
      subRange.surroundContents(newNode);
    }
  }

  annotate(rs: Range | Selection, tag = 'span') {
    let selector = this.getBestSelector(rs);
    const annotation = this.createAnnotation(selector.selection);
    this.highlightRange(selector.range, tag);
    return annotation;
  }

  remove(node: Node) {
    var parent = node.parentNode;
    while (node.firstChild) {
      const child = node.firstChild;
      if (child.nodeType == Node.TEXT_NODE) {
        parent.insertBefore(child, node);
      } else {
        node.removeChild(child);
      }
    }
    parent.removeChild(node);
    parent.normalize();
  }

}