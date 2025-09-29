class AdvancedPromise {
    static async retry(promiseFn, maxAttempts = 3, delay = 1000) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const result = await promiseFn();
                return result;
            } catch (error) {
                if (attempt === maxAttempts) throw error;
                await new Promise(resolve => setTimeout(resolve, delay * attempt));
            }
        }
    }

    static timeout(promise, ms) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('Timeout')), ms);
            promise.then(
                result => {
                    clearTimeout(timer);
                    resolve(result);
                },
                error => {
                    clearTimeout(timer);
                    reject(error);
                }
            );
        });
    }

    static async queue(tasks, concurrency = 1) {
        const results = [];
        let currentIndex = 0;
        
        async function runWorker() {
            while (currentIndex < tasks.length) {
                const taskIndex = currentIndex++;
                try {
                    results[taskIndex] = await tasks[taskIndex]();
                } catch (error) {
                    results[taskIndex] = error;
                }
            }
        }
        
        const workers = Array(Math.min(concurrency, tasks.length)).fill().map(runWorker);
        await Promise.all(workers);
        return results;
    }
}

AdvancedPromise.retry(
    () => fetch("https://jsonplaceholder.typicode.com/users/1"),
    3,
    1000
).then(response => response.json()).then(console.log).catch(console.error);