export * from './annotators';
export * from './selectors';

// import { Annotator } from './annotators/annotator';

// let range: Range;
// document.addEventListener('selectionchange', function () {
//   let selection = window.getSelection();
//   range = selection.getRangeAt(0);
// });

// const annotator = new Annotator(document, 'mark');
// function highlight(range: Range) {
//   const annotation = annotator.createAnnotation(range, 'test', 'test', document.URL, 'test');
//   annotator.showAnnotation(annotation);
//   console.log(JSON.stringify(annotation));
// }
// (window as any).annotator = annotator;
// console.log(annotator)
// let btn = document.getElementById('button');
// btn.addEventListener('click', (e: Event) => highlight(range));
