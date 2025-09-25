function generatePassword(length, options = {}) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let charPool = '';
    
    if (options.uppercase !== false) charPool += uppercase;
    if (options.lowercase !== false) charPool += lowercase;
    if (options.numbers !== false) charPool += numbers;
    if (options.symbols !== false) charPool += symbols;
    
    if (charPool === '') {
        charPool = lowercase + numbers; 
    }
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charPool[Math.floor(Math.random() * charPool.length)];
    }
    return password;
}

function generateAndDisplayPassword() {
    const length = parseInt(document.getElementById('passwordLength').value) || 8;
    const options = {
        uppercase: document.getElementById('uppercase').checked,
        lowercase: document.getElementById('lowercase').checked,
        numbers: document.getElementById('numbers').checked,
        symbols: document.getElementById('symbols').checked
    };

    const password = generatePassword(length, options);
    
    document.getElementById('passwordResult').textContent = password;
}
console.log(generatePassword(12, { uppercase: true, lowercase: true, numbers: true, symbols: true }));