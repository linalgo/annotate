import { Selection } from '../selectors';

export interface Annotation {
  id?: string
  nodeMapIndex?: number;
  document?: string;
  entity?: string;
  task?: string;
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