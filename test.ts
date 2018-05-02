interface ElemSet {
  'div': Element,
  'button': Element
}

enum Colors {
  Green,
  Red,
  Blue,
  Orange
}

class ColorChange {
  div: Element;

  constructor(div: Element) {
    this.div = div;
    (<HTMLElement>this.div).style.width = squareSize;
    (<HTMLElement>this.div).style.height = squareSize;
  }

  changeColor(color: number | string): boolean {
    if (typeof(color) === 'number') {
      return true;
    }
    (this.div as HTMLElement).style.backgroundColor = color;
    return true;
  }

}

class NumericColor extends ColorChange {
  static Colors = Colors;
  constructor(div: Element) {
    super(div);
  }

  changeColor(color: number): boolean {
    (this.div as HTMLElement).style.backgroundColor = Colors[color];
    return true;
  }
}

let elementSets: Array<ElemSet> = [];
let squareSizeNum: number = 100;
let squareSize: string = `${ squareSizeNum }px`;

for (let index: number = 0; index < 4; index++) {
  elementSets.push({
    'div': document.createElement('div'),
    'button': document.createElement('button')
  })
}

let getRandomIntInclusive: Function = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

elementSets.map((elem, index) => {
  let colorChangeClass = new NumericColor(elem.div);
  elem.button.textContent = 'Change Color';
  (elem.button as HTMLElement).onclick = (event) => {
    colorChangeClass.changeColor(getRandomIntInclusive(0, 3));
  }
  document.body.appendChild(elem.button);
  document.body.appendChild(elem.div);
})







