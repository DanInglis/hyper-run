# hyper-run
Extension for hyper.app terminal. Runs a command before hyperterm starts. Intended to be used with hyperlayout

## Usage
This plugin is still in development so you will need to download the repo and put the files in `~/.hyper_plugins/local/hyper-run`

Add commands to `.hyper-run` 
If you want the screen to clear after the commands are done executing simply add `clear` as the last line

Add hyper-run to the local plugins
```js
localPlugins: [
  'hyper-run'
]
```

## Known Bugs
If hyper opens fine but does not run the commands try increasing the timeout constant. This delay needs to be different on different machines. 1000 is the lowest that works for me 
