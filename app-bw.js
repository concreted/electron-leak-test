const { app, BrowserWindow, BrowserView } = require("electron");

const init = () => {
	let j = 0;
	const interval = setInterval(() => {
		j++;
		if (j > 0) {
			clearInterval(interval);
		}
		for(let i = 0; i < 1; i++) {
			console.log(`bw count: ${i}`)
			let browserWindow = new BrowserWindow({
				show: true,
			});

			browserWindow.loadURL(`https://www.google.com?count=${1}`)

			browserWindow.once('ready-to-show', () => {
			  	browserWindow.show();
				if (i > 0) {
					browserWindow.close();
				}
			});
		}
	}, 1000);

};


setInterval(() => {
	if (global.gc) {
		console.log('garbage collecting');
		global.gc();
	}
}, 5000);

app.on("ready", () => {
	init();
});
