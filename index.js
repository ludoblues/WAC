'use strict';

const child_process = require('child_process');
const numCPUs = require('os').cpus().length;
const CronJob = require('cron').CronJob;

const core = {
	'wac-front': [ child_process.fork('./node_modules/@ludoblues/front', [ '2000' ]), child_process.fork('./node_modules/@ludoblues/front', [ '2001' ]) ],
	'wac-contest': [ child_process.fork('./node_modules/@ludoblues/contest') ],
	'wac-jobs': [ child_process.fork('./node_modules/@ludoblues/jobs') ]
};

const job = new CronJob('0 0 0 * * *', function() { core['wac-contest'][0].send({ event: 'end-of-the-day' }); });
job.start();