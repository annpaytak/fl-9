const firstPrize = 10;
const secondPrize = 5;
const thirdPrize = 2;
let prizes = [firstPrize, secondPrize, thirdPrize];
let totalPrize = 0;
let maxValue = 5;
if(!confirm('Do you want to play a game?')){
	alert('You did not become a millionaire, but can.');
}else{
	guessingGame()
}
function guessingGame(){
	let RandomNumber = Math.floor(Math.random() * maxValue);
	for (let i = 0; i < 3; i++) {
		const usersInfo = +prompt(`Enter a number from 0 to ${maxValue}
Attempts left: ${3 - i}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${prizes[i]}$`);
	if(usersInfo === RandomNumber){
		totalPrize += prizes[i];
            alert(`Congratulation! Your prize is ${totalPrize}$`);
	if (confirm(`Do you want to play a game again?`)) {
                maxValue *= 2;
                prizes = prizes.map(function (prize) {
                    return prize * 3
                });
                prizes[2]++;
                guessingGame();
            }
            return;
        }
    }
    alert(`Thank you for a game. Your prize is: ${totalPrize}$`);
}