class AsyncPipeline {
    constructor() {
        this.steps = [];
    }

    addStep(stepFn) {
        this.steps.push(stepFn);
        return this;
    }

    async execute(input) {
        let result = input;
        for (const step of this.steps) {
            result = await step(result);
        }
        return result;
    }

    static async parallel(pipelines) {
        const results = await Promise.all(
            pipelines.map(pipeline => pipeline.execute())
        );
        return results;
    }
}

const pipeline = new AsyncPipeline()
    .addStep(async (data) => data.filter(x => x > 0))
    .addStep(async (data) => data.map(x => x * 2))
    .addStep(async (data) => data.reduce((a, b) => a + b, 0));

pipeline.execute([-1, 2, -3, 4, 5]).then(console.log); // 22


const pipeline1 = new AsyncPipeline().addStep(async data => data * 2);
const pipeline2 = new AsyncPipeline().addStep(async data => data + 10);

AsyncPipeline.parallel([
    pipeline1.execute(5),
    pipeline2.execute(5)
]).then(console.log); // [10, 15]