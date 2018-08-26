function reverseNumber(num) {
    let reversed = +Math.abs(num).toString().split('').reverse().join('');
	return num > 0 ? reversed : -reversed
}