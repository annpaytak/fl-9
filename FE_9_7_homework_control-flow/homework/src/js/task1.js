const login = prompt('Enter a login');

if(login === 'User'){
		const password = prompt('Enter a password');
		if(password === 'SuperUser'){
			Date().getHours() < 20 ? 'Good day!' : 'Good evening!'
		}else if(password === '' || password === null){
			alert('Canceled.');
		}else{
			alert('Wrong password');
		}
	}else if(login === '' || login === null){
			alert('Canceled.');
		}else{
			alert('I don’t know you');
		}