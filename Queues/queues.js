const { config: { redis } } = require('./config')
const Queue = require('bull')
const { json } = require('express')

const bar = new Queue('bar', { redis })
const { bar: barWorker, barEntrance: barEntranceWorker } = require('./workers')
const barEntrance = new Queue('bar-entrance', { redis });


const queues = [

    {
        type: 'bull',

        // Name of the bullmq queue, this name must match up exactly with what you've defined in bullmq.
        name: "bar",

        // Hostname or queue prefix, you can put whatever you want.
        hostId: "Bar Queues Manager",

        // Redis auth.
        redis,
    },
    {
        type: 'bull',

        // Name of the bullmq queue, this name must match up exactly with what you've defined in bullmq.
        name: "bar-entrance",

        // Hostname or queue prefix, you can put whatever you want.
        hostId: "Bar Queues Manager",

        // Redis auth.
        redis,
    },
]
bar.process((job, done) => barWorker(job, done));
barEntrance.process((job, done) => barEntranceWorker(job, done))
module.exports = { bar, barEntrance,queues }