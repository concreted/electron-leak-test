const { app, BrowserWindow, BrowserView } = require("electron");

const init = () => {
	let browserWindow = new BrowserWindow({
		show: true,
	});

	reloadWin(browserWindow, 1000);
};

const reloadWin = (browserWindow, count) => {
	console.log(`reloadWin count: ${count}`);
	if (count > 0) {
		browserWindow.loadURL(`https://www.google.com?count=${count}`)

		browserWindow.once('ready-to-show', () => {
		  	browserWindow.show();
			browserWindow.loadURL('about:blank');

			browserWindow.once('ready-to-show', () => {
				reloadWin(browserWindow, count-1);
			})
		});
	}
}

setInterval(() => {
	if (global.gc) {
		console.log('garbage collecting');
		global.gc();
	}
}, 5000);

app.on("ready", () => {
	init();
});
