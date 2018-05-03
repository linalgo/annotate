import * as data from './db.json';

let f = document.getElementById('first').firstChild;
let s = document.createElement('span');
s.style.backgroundColor = 'yellow';

let r = document.createRange();
r.setStart(f, 4);
r.setEnd(f, 8);
r.surroundContents(s);

let range: any;
document.addEventListener("selectionchange", function() {
  let selection = window.getSelection();
  range = selection.getRangeAt(0);
  // console.log(range);
});

function highlight(range: Range): boolean {
  console.log(range);
  const s = document.createElement('span');
  s.style.backgroundColor = 'yellow';
  range.surroundContents(s);
  return true;
}

let btn = document.getElementById("button");
btn.addEventListener("click", (e:Event) => highlight(range));

console.log(data);
console.log((data as any)[5].target[0])


function annotate(annotation: any) {
  let nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT)

  let start: number = <any>annotation.target[0].selector[1].start
  let end: number = <any>annotation.target[0].selector[1].end

  let position = 0;
  let node: Node;
  let l: number;
  let r2 = document.createRange();
  while (node = nodeIterator.nextNode()) {
    l = node.nodeValue.length
    if (position + l >= start && start - position >= 0) {
      console.log("startOffset", start - position)
      r2.setStart(node, start - position)
    }
    if (position + l >= end && start - position >= 0) {
      r2.setEnd(node, end - position)
      console.log("stopOffset", end - position)
    }
    position += l;
  }
  console.log(r2);
  let s2 = document.createElement('span');
  s2.style.backgroundColor = 'blue';
  r2.surroundContents(s2)
}

for (let i = 0; i < 6; i++) {
 let annotation = (<any>data)[i];
 annotate(annotation)
}
