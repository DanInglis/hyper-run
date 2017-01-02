'use strict';

//const { exec } = require('child_process');
//const cp = require('child_process');

//import {hterm, lib} from 'hterm-umdjs';

//const {app, shell, dialog} = require('electron');

//const htrem = require('hyper/htrem');



/*exports.getTermProps = function(uid, parentProps, props){
  //console.log('uid = ', uid);

  id = uid;

  console.log('get', id);

  return Object.assign(uid, parentProps, props)
};*/



/*const retUid = () => {
  console.log(getTermProps());
};*/

//how to get the first value of an object
//var obj = { first: 'someVal' };
//obj[Object.keys(obj)[0]]; 


const Module = require('module');
//const h = require('hyper/component');
const os = require('os');
const path = require('path');
const {app, shell, dialog} = require('electron');

//const spawn = require('child_process').spawn;
//const e = spawn('echo', ['hi']);
//const ls = spawn('ls', ['-lh', '/usr']);

let curPid;
let uids = {};




//const throttle = require('lodash.throttle')

//const config = require('./run_config');

////
const setCwd = (pid) => {
  console.log('here');
  //exec(`lsof -p ${pid} | grep cwd | tr -s ' ' | cut -d ' ' -f9-`, (err, cwd) => {
  	//console.log('here');

  	//app.term.io.writeUTF8('hello world');

  	//e;
  	//console.log(e);

	//exec(' bash -c \'exec env ${EDITOR:=nano} ~/.hyper.js\'');
	//console.log(	exec(' bash -c \'exec env ${EDITOR:=nano} ~/.hyper.js\''));
  	//window.alert('hello world');
  	//HyperCmdExec('hyperlayout');

  	//console.log(HyperCmdExec('echo hello world'));

  };

exports.middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'SESSION_PTY_DATA':
      if (curPid && uids[action.uid] === curPid) setCwd(curPid);
      break;
    case 'SESSION_ADD':
      uids[action.uid] = action.pid;
      curPid = action.pid;
      setCwd(curPid);
      break;
    case 'SESSION_SET_ACTIVE':
      curPid = uids[action.uid];
      setCwd(curPid);
      break;
    case 'SESSION_PTY_EXIT':
      delete uids[action.uid];
      break;
    case 'SESSION_USER_EXIT':
      delete uids[action.uid];
      break;
  }
  next(action);
};


////






//exports.onApp = (app) => {
  //app.quit();
	//exec('echo hello world');
	//app.setName('my name');
	//app.hide();
	//app.commandLine.appendArgument(1);
	//app.createWindow(win => win.setTitle('My Title')); // works!
	/*app.createWindow(win => {
		win.setTitle('My Title'); 
		//win.center();
		
	});*/
	//app.commandLine.appendArgument('echo hi');
	//app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])});
	//app.relaunch({args: 'echo hi'});
	//app.relaunch({args: 'echo hi'});

//}

exports.onWindow = (win) => {
	win.setVibrancy('ultradark');
  //win.sessions.pty.stdin.write('hello world');
  console.log(win.sessions);
}
