const { app, BrowserWindow, BrowserView } = require("electron");

const init = () => {
	reloadWin(1000);
};

const reloadWin = (count) => {
	console.log(`reloadWin count: ${count}`);

	let browserWindow = new BrowserWindow({
		show: true,
	});
	browserWindow.loadURL(`https://www.google.com?count=${count}`)


	browserWindow.once('ready-to-show', () => {
		browserWindow.loadURL("about:blank");
		if (count > 0) {
			browserWindow.once('ready-to-show', () => {
				reloadWin(count-1);
				browserWindow.close();
			});
		}
	});
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
