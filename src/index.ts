let f = document.getElementById('first').firstChild;
console.log(f);

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

  console.log(range);
});

function highlight(range: Range): boolean {
  const s = document.createElement('span');
  s.style.backgroundColor = 'yellow';
  range.surroundContents(s);
  return true;
}

let btn = document.createElement("button");
btn.innerHTML = 'highlight';
btn.addEventListener("click", (e:Event) => highlight(range));
document.body.appendChild(btn);