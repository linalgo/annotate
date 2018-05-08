import { annotations } from './db'
import { Selection, TextPositionSelector } from './selectors'
import { XPathSelector } from './selectors/xpath-selector';
import { Annotator } from './annotator';


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

let annotator = new Annotator();
for (let i = 0; i < annotations.length; i++) {
  let annotation = (<any>annotations)[i];
  // let start: number = <any>annotation.target[0].selector[1].start;
  // let end: number = <any>annotation.target[0].selector[1].end;
  // let selection: Selection = { start: start, end: end };
  let selection = <any>annotation.target[0].selector[0];
  annotator.annotate(selection);
}

console.log(annotator.annotations);
