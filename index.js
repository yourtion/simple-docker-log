'use strict';

/**
 * @file Index
 * @author Yourtion Guo <yourtion@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const syslogd = require('syslogd');

const PORT = 514;
const LOG_PATH = process.env.LOG_PATH || path.resolve(__dirname, 'logs');

const logs = [];

Date.prototype.yyyymmdd = function() {
  const mm = this.getMonth() + 1;
  const dd = this.getDate();

  return [ 
    this.getFullYear(),
    (mm>9 ? '' : '0') + mm,
    (dd>9 ? '' : '0') + dd 
  ].join('');
};

function flush (callback) {
  if (logs < 1) return callback();

  const date = new Date();
  const filename = path.resolve(LOG_PATH, date.yyyymmdd() + '.log');

  const lines = logs.splice(0, logs.length).join("");
  fs.createWriteStream(filename, {
    flags:    'a+',
    encoding: 'utf-8',
    mode:     420 // 0644
  }).end(lines, callback);
};

syslogd((info) => {
  logs.push(info.msg);
}).listen(PORT, (err) => {
  console.log(`syslogd is started at ${ PORT }`);
  setInterval(() => {
    flush(() => {});
  }, 1000);
});
