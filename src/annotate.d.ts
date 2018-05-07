import { Selector } from './selector'

export interface Annotation {
  "@context": string,
  id: string,
  type: string,
  body: string,
  target: {
    source: string,
    selector: Selector
  }
}