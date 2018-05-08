import { Selection, Selector, TextPositionSelector } from './selectors'
import { XPathSelector } from './selectors/xpath-selector';
import { isSelection } from './selectors/selector';

export class Annotator {

  annotations: Array<any> = [];

  annotate(rs: Range | Selection, color: string = 'yellow') {
    let selector = new XPathSelector(rs);
    let range = (rs instanceof Range) ? rs : selector.range;
    let span = document.createElement('span');
    span.style.backgroundColor = color;
    range.surroundContents(span);
    this.annotations.push(selector);
  }

}