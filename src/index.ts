import { Annotation, Annotator } from './annotator';
import { Selection, TextPositionSelector } from './selectors'
import { XPathSelector } from './selectors/xpath-selector';

import { annotations } from './annotations'


let range: Range;
document.addEventListener("selectionchange", function() {
  let selection = window.getSelection();
  range = selection.getRangeAt(0);
});

function highlight(range: Range): boolean {
  let textSelector = new TextPositionSelector(range);
  let xpathSelector = new XPathSelector(range);
  console.log(range);
  console.log(textSelector);
  console.log(xpathSelector);
  const s = document.createElement('span');
  s.style.backgroundColor = 'yellow';
  range.surroundContents(s);
  return true;
}

let btn = document.getElementById("button");
btn.addEventListener("click", (e:Event) => highlight(range));

let annotator = new Annotator(annotations);

console.log(annotator.annotations);
