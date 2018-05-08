import { annotations } from './db'
import { TextPositionSelector } from './selectors'
import { XPathSelector } from './selectors/xpath-selector';


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

for (let i = 0; i < 6; i++) {
  let annotation = (<any>annotations)[i];
  let start: number = <any>annotation.target[0].selector[1].start;
  let end: number = <any>annotation.target[0].selector[1].end;
  let selector = new TextPositionSelector({start: start, end: end});
  let range = selector.getRange();
  let selection = document.createElement('span');
  selection.style.backgroundColor = 'blue';
  range.surroundContents(selection);
}
