## annotate-core

### Installation 

```
npm i @linalgo/annotate-core
```

### How to use

```
import { Annotator } from './annotators/annotator';

document.addEventListener('selectionchange', function () {
  let selection = window.getSelection();
  range = selection.getRangeAt(0);
});

function highlight(range: Range) {
  const annotation = annotator.createAnnotation(range, 'test', 'test', document.URL, 'test');
  annotator.showAnnotation(annotation);
  console.log(JSON.stringify(annotation));
}

let range: Range;
const annotator = new Annotator(document, 'mark');
let btn = document.getElementById('button');
btn.addEventListener('click', (e: Event) => highlight(range));
```