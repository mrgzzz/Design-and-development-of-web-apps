function memoize(fn) {
    // Объект для сохранения ранее полученных значений функций
    // Аргументы преобразуются в строку, результат сохраняется в значении
    const cache = new Map();
    return function(...args) {
        // Формируем уникальный ключ для каждого набора аргументов
        // Применяется JSON.stringify для поддержки разных типов аргументов
        const key = JSON.stringify(args);
        // Проверяем наличие готового значения в кэше и сразу возвращаем его
        if (cache.has(key)) {
            return cache.get(key);
        }
        // Если кэш пуст, выполняем оригинальную функцию,
        // запоминаем результат и возвращаем его
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}
// Пример использования
function expensiveCalculation(n) {
    console.log(`Выполняются расчеты для ${n}`);
    return n * 3;
}
const memoizedCalculation = memoize(expensiveCalculation);
console.log(memoizedCalculation(5));  // Выполнятся расчет для 5, выводится 15
console.log(memoizedCalculation(5));  // Результат берется из кэша: 15
console.log(memoizedCalculation(9)); // Выполнятся расчет для 9, выводится 27
console.log(memoizedCalculation(9)); // Результат также берётся из кэша: 27