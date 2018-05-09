import { Selector, Selection } from './selectors'
import { TextPositionSelector } from './selectors';
import { XPathSelector } from './selectors/xpath-selector';


export interface Annotation {
  id?: number,
  type: string,
  body: string,
  target: {
    source: string,
    selector: Array<Selection>
  }
}

export function isAnnotation(obj: any): obj is Annotation {
  return obj.type && obj.target;
}

export class Annotator {

  target: string = document.URL;
  annotations: Array<Annotation> = [];

  constructor(annotations?: Array<Annotation>) {
    for (let i = 0; i < annotations.length; i++) {
      console.log(annotations[i]);
      this.annotate(<Selection>annotations[i].target.selector[1]);
      this.annotations.push(annotations[i]);
    }
  }

  getBestSelector(rs: Range | Selection) {
    if (rs instanceof Range) {
      return new XPathSelector(rs);
    }
    switch(rs.type) {
      case 'TextQuoteSelector': {
        throw new Error('TextQuoteSelector is not yet implemented.');
      }
      case 'TextPositionSelector': {
        return new TextPositionSelector(rs);
      }
      case 'RangeSelector': {
        return new XPathSelector(rs);
      }
    }
    throw new Error('Range or Selection only.')
  }

  makeAnnotation(selection: Selection): Annotation {
    let annotation = {
      type: '',
      body: '',
      target: {
        source: this.target,
        selector: [selection]
      }
    }
    return annotation;
  }

  annotate(rs: Range | Selection, color: string = 'yellow') {
    let selector = this.getBestSelector(rs);
    let range = selector.range;
    let selection = selector.getSelection();
    let annotation = this.makeAnnotation(selection);
    this.annotations.push(annotation);
    let span = document.createElement('span');
    span.style.backgroundColor = color;
    range.surroundContents(span);
  }

}