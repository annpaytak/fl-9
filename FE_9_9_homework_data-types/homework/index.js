function findType(el){
    return typeof el;
}

function forEach(arr, f) {
  for(let i = 0; i < arr.length; i++) {
        f(arr[i]);
    }
  }

function map(arr, f){
    const transformed = [];
    forEach(arr, item => transformed.push(f(item)));
    return transformed;
}

function filter(arr, f){
    const transformed = [];
    forEach(arr, (item) => {
    if (f(item)) {
    transformed.push(item);
    }
});
    return transformed;
}

function getAdultAppleLovers(data) {
    return map(filter(data, item => item.age > 18 && item.favoriteFruit === 'apple'),
    item => item.name);
}

function Data(_id, index, age, eyeColor, name, favoriteFruit) {
	this._id = _id;
	this.index = index;
	this.age = age;
	this.eyeColor = eyeColor;
	this.name = name;
	this.favoriteFruit = favoriteFruit;
	return this;
}
    
let arrData = [];
arrData.push(new Data('5b5e3168c6bf40f2c1235cd6', '0', '39', 'green', 'Stein', 'apple');
arrData.push(new Data('5b5e3168e328c0d72e4f27d8', '1', '38', 'blue', 'Cortez', 'strawberry');
arrData.push(new Data('5b5e3168cc79132b631c666a', '2', '2', 'blue', 'Suzette', 'apple');
arrData.push(new Data('5b5e31682093adcc6cd0dde5', '3', '17', 'green', 'Weiss', 'banana');

function keys(obj) {
    const arrayOfKeys = [];
    for (const el in obj) {
        if (obj.hasOwnProperty(el)) {
            arrayOfKeys.push(el)
        }
    }
    return arrayOfKeys;
}

function value(obj) {
    const arrayOfValues = [];
    for (const el in obj) {
        if (obj.hasOwnProperty(el)) {
            arrayOfValues.push(obj[el])
        }
    }
    return arrayOfValues;
}

function showFormattedDate(date) {
	return `It is ${date.getDate()} of ${date.toLocaleString('en-US',{month: 'short'})}, ${date.getFullYear()}`;
}
