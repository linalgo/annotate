import { Selection } from '../selectors';

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