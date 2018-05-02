var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Colors;
(function (Colors) {
    Colors[Colors["Green"] = 0] = "Green";
    Colors[Colors["Red"] = 1] = "Red";
    Colors[Colors["Blue"] = 2] = "Blue";
    Colors[Colors["Orange"] = 3] = "Orange";
})(Colors || (Colors = {}));
var ColorChange = /** @class */ (function () {
    function ColorChange(div) {
        this.div = div;
        this.div.style.width = squareSize;
        this.div.style.height = squareSize;
    }
    ColorChange.prototype.changeColor = function (color) {
        if (typeof (color) === 'number') {
            return true;
        }
        this.div.style.backgroundColor = color;
        return true;
    };
    return ColorChange;
}());
var NumericColor = /** @class */ (function (_super) {
    __extends(NumericColor, _super);
    function NumericColor(div) {
        return _super.call(this, div) || this;
    }
    NumericColor.prototype.changeColor = function (color) {
        this.div.style.backgroundColor = Colors[color];
        return true;
    };
    NumericColor.Colors = Colors;
    return NumericColor;
}(ColorChange));
var elementSets = [];
var squareSizeNum = 100;
var squareSize = squareSizeNum + "px";
for (var index = 0; index < 4; index++) {
    elementSets.push({
        'div': document.createElement('div'),
        'button': document.createElement('button')
    });
}
var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
elementSets.map(function (elem, index) {
    var colorChangeClass = new NumericColor(elem.div);
    elem.button.textContent = 'Change Color';
    elem.button.onclick = function (event) {
        colorChangeClass.changeColor(getRandomIntInclusive(0, 3));
    };
    document.body.appendChild(elem.button);
    document.body.appendChild(elem.div);
});
