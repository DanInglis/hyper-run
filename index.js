'use strict';

let curPid;
let curUid;
let uids = {};

let fs = require('fs');
let cmdDefault = [];	//cmdTyper = 0
let cmdTab = [];		//cmdType = 1
//let cmdWindow = [];		//cmdType = 2

let winType = 0;
let running = false;




exports.middleware = (store) => (next) => (action) => {
	console.log(action);
  switch (action.type) {
  	case 'TERM_GROUP_REQUEST': 	//new tab/window
  		//setCwd(curPid);
  		//winType = 2;
  		break;
  	case 'SESSION_REQUEST':

  		break;
	case 'SESSION_PTY_DATA':
      //if (curPid && uids[action.uid] === curPid) setCwd(curPid);
      break;
    case 'SESSION_ADD':
      uids[action.uid] = action.pid;
      curPid = action.pid;
      curUid = action.uid;
      //setCwd(curPid);

      if (!running){
      	winType = 0;
      	running = true;
      }
      else{
      	winType = 1;
      }

      
      break;
    case 'SESSION_SET_ACTIVE':
      curPid = uids[action.uid];
      //setCwd(curPid);
      break;
    case 'SESSION_PTY_EXIT':
      delete uids[action.uid];
      break;
    case 'SESSION_USER_EXIT':
      delete uids[action.uid];
      break;
  }
  next(action);
}



function waitFor(object, key, fn) {
	if (key in object) {
 		fn(object[key]);
 	} else {
 		setTimeout(() => waitFor(object, key, fn), 10);
  	}
  }


exports.onApp = function (obj) {
	const config = obj.config.getConfig();
	if (config.hyperRun) {
		cmdDefault = config.hyperRun;
	}
	if (config.hyperRunTab){
		cmdTab = config.hyperRunTab;
	}
	if (config.hyperRunWindow){
		cmdWindow = config.hyperRunWindow;
	}
};

exports.onWindow = win => {
 	win.rpc.on('execute commands', ({uid, type}) => {
 		switch(type){
 			case 0:
 			cmdDefault.forEach(cmd => {
 				win.sessions.get(uid).write(cmd + '\r');
 			});
 			break;
 			case 1:
 			cmdTab.forEach(cmd => {
 				win.sessions.get(uid).write(cmd + '\r');
 			});
 			break;
 			case 2:
 			cmdWindow.forEach(cmd => {
 				win.sessions.get(uid).write(cmd + '\r');
 			});
 			break;
 		}
 	});
 };

exports.onRendererWindow = win => {
 	waitFor(win, 'rpc', rpc => {
 		rpc.on('session add', details => {
 			const { uid } = details;
 			const type = winType;
 			rpc.emit('execute commands', ({uid, type}));
 		});
 	});
};


