import { Annotation } from './annotator'

export const annotations: Array<Annotation> = [
  {
    id: 0,
    type: 'highlight',
    body: '',
    target: {
      source: 'http://localhost:8081/',
      selector:[
        {
          endContainer: '//annotate[1]/p[1]',
          endOffset: 8,
          type: 'RangeSelector',
          startOffset: 5,
          startContainer: '//annotate[1]/p[1]'
        }, {
          start: 136,
          end: 139,
          type: 'TextPositionSelector'
        }, {
          exact: 'The',
          prefix: 'ight\n\n    \n    Lyrics\n\n    \n    ',
          type: 'TextQuoteSelector',
          suffix: ' snow glows white on the mountai'
        }
      ]
    }
  }, {
    id: 1,
    type: 'highlight',
    body: '',
    target: {
      source: 'http://localhost:8081/',
      selector:[
        {
          endContainer: '//annotate[1]/p[1]',
          endOffset: 679,
          type: 'RangeSelector',
          startOffset: 659,
          startContainer: '//annotate[1]/p[1]'
        }, {
          start: 790,
          end: 810,
          type: 'TextPositionSelector'
        }, {
          exact: 'hold it back anymore',
          prefix: ' Let it go, let it go\n    Can\'t ',
          type: 'TextQuoteSelector',
          suffix: '\n    Let it go, let it go\n    Tu'
        }
      ]
    }
  }
]