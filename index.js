'use strict';

const child_process = require('child_process');
const numCPUs = require('os').cpus().length;

const core = {
	'wac-front': [ child_process.fork('./node_modules/@ludoblues/front', [ '2000' ]), child_process.fork('./node_modules/@ludoblues/front', [ '2001' ]) ],
	'wac-contest': [ child_process.fork('./node_modules/@ludoblues/contest') ],
	'wac-jobs': [ child_process.fork('./node_modules/@ludoblues/jobs') ]
};
