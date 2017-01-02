'use strict';

const {readFileSync} = require('fs')
const {homedir} = require('os')
const {resolve} = require('path')

var commands;
const timeout = 1000;


exports.onApp = (app) => {
  const path = resolve(homedir(), '.hyper_plugins/local/hyper-run/.hyper-run');
  commands = readFileSync(path, 'utf8');
}

exports.onWindow = function (win) {
	setTimeout(() => {
        win.sessions.forEach(session => {
            session.write(commands);
            session.write('\x0a');
        })
    }, timeout)
};