const isEmail = (email) => {
    try {
        if (typeof email !== "string") return false;
        const isContain = email.includes("@" && ".com");
        if (!isContain) {
            return false
        } else {
            return true;
        }
    } catch (error) {
        console.log(error)
    }
}

const isPhoneNumber = (number) => {
    try {
        let arr = number.toString(10).split('');
        const countOfNumber = (arr) => {
            let count = 0
            for (let i = 0; i < arr.length; i++) {
                count = 0
                for (let j = 0; j < arr.length; j++) {
                    if (arr[i] === arr[j]) {
                        if (i > j) {
                            break
                        }
                        count++
                    }
                }
                if (count >= 5) return false
            }
            return true
        }

        const startWith = (arr) => {
            if (arr[0] <= 5) return false
            return true
        }
        const checkLength = (arr) => {
            if (arr.length != 10) return false
            return true
        }
        const containsOnlyNumbers = (arr) => {
            for (let i = 0; i < arr.length; i++) {
                if (isNaN(arr[i])) {
                    return false; 
                }
            }
            return true; 
        }

        if (countOfNumber(arr) && startWith(arr) && checkLength(arr) && containsOnlyNumbers(arr)) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}


const isValiedusername = (username) => {
    try {
        const checkLength = (username) => {
            if (username.length <= 3) return false
            return true
        }
        const checkUsername = (username) => {
            const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
            return !/\s/.test(username) && usernameRegex.test(username);
        }
        const checkFirstLetter = (username) => {
            const firstRegex = /^[0-9_.-]+$/;
            return !/\s/.test(username.charAt(0)) && !firstRegex.test(username.charAt(0));
        }
        if (checkLength(username) && checkUsername(username)&&checkFirstLetter(username)) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}


const isStrongPassword = (password) => {
    try {
        const checkLength = (password) => {
            if (password.length <= 8) {
                return false
            }
            return true
        }
        const checkUpperCase = (password) => password.match(/[A-Z]/) !== null
        const checkLowerCase = (password) => password.match(/[a-z]/) !== null
        const checkDigits = (password) => password.match(/[\d\W]/) !== null
        const checkSpecialCharacter = (password) => {
            let specialCharacters = "~!@#$%^&*()_+`-=[];,./<>?:\\"
            for (let char of password) {
                if (specialCharacters.includes(char)) {
                    return true; 
                }
            }
            return false;
        }
        function containsWhitespace(passwsord) {
            return !/\s/.test(passwsord); 
        }
        if (checkLength(password) && checkUpperCase(password) && checkLowerCase(password) && checkSpecialCharacter(password) && checkDigits(password)&&containsWhitespace(password)) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}


export {isEmail,isPhoneNumber,isStrongPassword,isValiedusername}