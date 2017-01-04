'use strict';
///

const { exec } = require('child_process');

let curPid;
let uids = {};

let cmdType = 0;


const setCwd = (pid) =>
  exec(`lsof -p ${pid} | grep cwd | tr -s ' ' | cut -d ' ' -f9-`, (err, cwd) => {
    if (err) {
      console.error(err);
    } else {
      cwd = cwd.trim();
      store.dispatch({
        type: 'SESSION_SET_CWD',
        cwd
      });
    }
  });

exports.middleware = (store) => (next) => (action) => {
	cmdType = 0;
	console.log(action);
  switch (action.type) {
    case 'SESSION_PTY_DATA':
      if (curPid && uids[action.uid] === curPid) setCwd(curPid);
      break;
    case 'SESSION_ADD':
      uids[action.uid] = action.pid;
      curPid = action.pid;
      setCwd(curPid);

      cmdType = 1;	//new tab
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
let fs = require('fs');
let loaded = false;
let cmdDefault = [];	//winType = 0
let cmdTab = [];		//winType = 1
//let cmdWindow = [];		//winType = 2


//let cmdType = 1;


function output(session) {

	cmdDefault.forEach(cmd => {
			session.write(cmd + '\r');
		});

	/*if(!loaded){
		cmdDefault.forEach(cmd => {
			session.write(cmd + '\r');
		});
		loaded = true;
	}
	
	setTimeout(() => output(session), 10);

		/*switch(cmdType){
				case 0:
				cmdDefault.forEach(cmd => {
					session.write(cmd + '\r');
				});
				break;
				case 1:
				cmdTab.forEach(cmd => {
					session.write(cmd + '\r');
				});
				break;
			};*/

	/*if (!loaded) {
		sessions.forEach(session => {
			switch(cmdType){
				case 0:
				cmdDefault.forEach(cmd => {
					session.write(cmd + '\r');
				});
				break;
				case 1:
				cmdTab.forEach(cmd => {
					session.write(cmd + '\r');
				});
				break;
			}

			loaded = true;
		});

		setTimeout(() => output(sessions), 10);
	}*/
};

exports.onApp = function (obj) {
	const config = obj.config.getConfig();
	if (config.hyperRun) {
		cmdDefault = config.hyperRun;
	}
	if (config.hyperRunTab){
		cmdTab = config.hyperRunTab;
	}
};

exports.onWindow = function (win) {
	//write(win.sessions);
	//output(win.sessions);

	/*setTimeout(() => {
        win.sessions.forEach(session => {
            output(session);
        })
    }, 1000)*/

	setTimeout(() => {
		output(win.sessions.get(curPid));
	}, 1000);

};

