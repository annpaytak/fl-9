 function isPrime(integer) {
            if (integer === 1){
                return false;
            }
            for (let d = 2; d * d <= integer; d++) {
                if (integer % d === 0){
                    return false;
                }
            }
            return true;
        }
