 function isPrime(integer) {
            if (integer == 1)
                return false;
            for (var d = 2; d * d <= integer; d++) {
                if (integer % d == 0)
                    return false;
            }
            return true;
        }