export * from './annotators';
export * from './selectors';

// import { Annotator } from './annotators/annotator';

// let range: Range;
// document.addEventListener('selectionchange', function () {
//   let selection = window.getSelection();
//   range = selection.getRangeAt(0);
// });

// const annotator = new Annotator();
// annotator.annotate({ "startContainer": "//html[1]/body[1]/annotate[1]/p[1]/text()[3]", "endContainer": "//html[1]/body[1]/annotate[1]/p[1]/text()[3]", "startOffset": 20, "endOffset": 29 });
// function highlight(range: Range) {
//   const annotation = annotator.annotate(range, 'span');
//   console.log(JSON.stringify(annotation));
// }

// let btn = document.getElementById('button');
// btn.addEventListener('click', (e: Event) => highlight(range));
