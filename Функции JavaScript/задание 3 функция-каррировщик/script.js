function curry(fn) {
    // Создаем каррированную версию функции
    return function curried(...args) {
        // Если передано достаточно аргументов, вызываем исходную функцию
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            // Если аргументов недостаточно, возвращаем функцию для приема остальных
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}

// Функция для формирования приветствия
function greet(greeting, name, punctuation) {
    return `${greeting}, ${name}${punctuation}`;
}

// Каррируем функцию приветствия
const curriedGreet = curry(greet);

// Различные варианты использования
console.log(curriedGreet("Привет")("Дмитрий")("!"));        // "Привет, Дмитрий!"
console.log(curriedGreet("Здравствуйте", "Ольга")("!"));    // "Здравствуйте, Ольга!"
console.log(curriedGreet("Добрый день")("Елена", "!"));     // "Добрый день, Елена!"