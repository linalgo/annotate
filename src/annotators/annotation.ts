import { Selection } from '../selectors';

export interface Annotation {
  id?: string
  nodeMapIndex?: number;
  document?: string;
  entity?: string;
  task?: string;
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

export interface AnnotationType {
  id?: string;
  title?: string;
  description?: string;
  color?: string;
  icon_name?: string;
  type_name?: string;
  flashcard_type?: string;
  action?: string;
}