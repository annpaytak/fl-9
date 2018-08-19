
const a = parseInt(prompt('first side', '0'));
const b = parseInt(prompt('second side', '0'));
const angle = parseInt(prompt('angle', '0°'));

const maxAngle = 180;
const alfa = Math.PI / maxAngle * angle;

const c = Math.sqrt(a*a + b*b - 2*a*b*Math.cos(alfa));
const square = 1 / 2 * a * b * Math.sin(alfa);
const perimeter = a + b + c;

if(a > 0 && b > 0 && angle > 0 && angle < maxAngle) {
    console.log(`c length: ` + +c.toFixed(2) + `\nTriangle square: ` +
    +square.toFixed(2) + `\nTriangle perimeter: ` +
    +perimeter.toFixed(2));
} else {
    console.log(`Invalid data`);
}