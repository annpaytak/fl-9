function calculatePrice() {
    const amount = parseInt(prompt('Please enter the amount of money', '0'));
	const discount = parseInt(prompt('Please enter the discount', '%'));
    if (validateInput(amount) || validateInput(discount)) {
        alert('Input not valid! Please, try again');
    } else {
         const saved = amount * discount / 100;
         const totalPrice = amount - saved;
         console.log(`
			Price without discount: ${+amount.toFixed(2)}
			Discount: ${+discount.toFixed(2)}%
			Price with discount: ${+totalPrice.toFixed(2)}
			Saved:  ${+saved.toFixed(2)}
    `);
    }
}
function validateInput(number) {
    return isNaN(number) || typeof number !== 'number' || number < 0;
}

 calculatePrice()