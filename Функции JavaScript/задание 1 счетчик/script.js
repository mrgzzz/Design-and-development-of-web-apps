function createCounter() {
    let count = 0;
    let history = [];
    return {
        increment: function() {
            count++;
            history.push(`Увеличили до: ${count}`);
            return count;
        },
        decrement: function() {
            count--;
            history.push(`Уменьшили до: ${count}`);
            return count;
        },
        getValue: function() {
            return count;
        },
        reset: function() {
            history.push(`Сбросили с ${count} до 0`);
            count = 0;
            return count;
        },
        getHistory: function() {
            return history.slice();
        }
    };
}
const counter = createCounter();

function updateDisplay() {
    document.getElementById('counterValue').textContent = counter.getValue();
    updateHistory();
}
function incrementCounter() {
    counter.increment();
    updateDisplay();
}
function decrementCounter() {
    counter.decrement();
    updateDisplay();
}
function resetCounter() {
    counter.reset();
    updateDisplay();
}
function updateHistory() {
    const historyList = document.getElementById('historyList');
    const history = counter.getHistory();
    
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});