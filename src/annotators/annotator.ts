import * as uuid from 'uuid';

import { Selection, SelectorFactory, Selector, isSelection } from '../selectors'
import { Annotation, AnnotationType } from './annotation';

export class Annotator {

  schema: AnnotationType[];
  colorSchema: { [id: string]: string } = {};
  annotationMap: { [id: string]: Annotation } = {};
  nodeMap: { [id: string]: Node[] } = {};

  constructor(private rootNode: Node = document, private tag: string = 'span') { }

  setRoot(rootNode: Node) {
    this.rootNode = rootNode;
  }

  setSchema(schema: AnnotationType[]) {
    this.schema = schema;
    for (const entity of this.schema) {
      this.colorSchema[entity.id] = entity.color;
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
        for (const child of node.childNodes as any) {
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

  createAnnotation(
    rs: Range | Selection,
    task: string,
    entity: string,
    document: string,
    body: string = null
  ): Annotation {
    let selector: Selector;
    if (rs) {
      selector = SelectorFactory.getBestSelector(rs, this.rootNode, this.tag);
    } else {
      selector = { selection: {} } as Selector;
    }
    if (!body) {
      if (isSelection(rs)) {
        rs = selector.rangeFromSelection(rs, this.rootNode);
      }
      body = rs.toString();
    }
    const annotation = {
      id: uuid.v4(),
      body: body,
      task: task,
      entity: entity,
      document: document,
      target: {
        source: document,
        selector: [selector.selection]
      }
    }
    this.annotationMap[annotation.id] = annotation;
    return annotation;
  }

  showAnnotation(annotation: Annotation) {
    const selection = annotation.target.selector[0];
    const selector = SelectorFactory.getBestSelector(selection, this.rootNode, this.tag);
    const range = selector.range;
    const newNodes: Node[] = [];
    for (const subRange of this.getSubRanges(range)) {
      const newNode = document.createElement(this.tag);
      newNode.setAttribute('annotation', annotation.id);
      newNode.setAttribute('entity', annotation.entity);
      // newNode.setAttribute('color', `#${this.colorSchema[annotation.entity]}`);
      subRange.surroundContents(newNode);
      newNodes.push(newNode);
    }
    this.nodeMap[annotation.id] = newNodes;
    if (!this.annotationMap[annotation.id]) {
      this.annotationMap[annotation.id] = annotation;
    }
    range.commonAncestorContainer.normalize();
    return newNodes;
  }

  hideAnnotation(annotationId: string) {
    for (const node of this.nodeMap[annotationId]) {
      var parent = node.parentNode;
      while (node.firstChild) {
        const child = node.firstChild;
        if (child.nodeType == Node.TEXT_NODE || child.nodeName.toLowerCase() == this.tag) {
          parent.insertBefore(child, node);
        } else {
          node.removeChild(child);
        }
      }
      parent.removeChild(node);
      parent.normalize();
    }
  }

}