'use strict';

const child_process = require('child_process');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const CronJob = require('cron').CronJob;

cluster.setupMaster({ exec: './node_modules/@ludoblues/front' });
cluster.fork();
cluster.fork();

const core = {
	'wac-contest': [ child_process.fork('./node_modules/@ludoblues/contest') ],
	'wac-jobs': [ child_process.fork('./node_modules/@ludoblues/jobs') ]
};

const job = new CronJob('0 0 0 * * *', function() { core['wac-contest'][0].send({ event: 'end-of-the-day' }); });
job.start();