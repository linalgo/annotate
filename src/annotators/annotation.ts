import { Selection } from '../selectors';

export interface Annotation {
  id?: number
  nodeMapIndex?: number;
  uri?: string;
  entity?: number;
  task?: number;
  type: string;
  body: any;
  target: {
    source: string;
    selector: Array<Selection>;
  }
  nodes?: Node[];
}

export function isAnnotation(obj: any): obj is Annotation {
  return obj.type && obj.target;
}