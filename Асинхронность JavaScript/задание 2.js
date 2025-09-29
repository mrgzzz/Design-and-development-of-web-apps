async function processDataAsync(data, processorFn, options = {}) {
    const { concurrency = 1, retryAttempts = 1 } = options;
    const results = [];
    const stats = { success: 0, failed: 0 };
    let currentIndex = 0;

    async function processItem() {
        while (currentIndex < data.length) {
            const index = currentIndex++;
            const item = data[index];
            
            for (let attempt = 1; attempt <= retryAttempts; attempt++) {
                try {
                    results[index] = await processorFn(item);
                    stats.success++;
                    break;
                } catch (error) {
                    if (attempt === retryAttempts) {
                        results[index] = { error: error.message };
                        stats.failed++;
                    }
                }
            }
        }
    }

    const workers = Array(Math.min(concurrency, data.length)).fill().map(processItem);
    await Promise.all(workers);
    
    return { results, stats };
}

processDataAsync(
    [1, 2, 3, 4, 5],
    async (num) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        if (num === 3) throw new Error('Test error');
        return num * 2;
    },
    { concurrency: 2, retryAttempts: 3 }
).then(({ results, stats }) => {
    console.log('Results:', results);
    console.log('Stats:', stats);
});