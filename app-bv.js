const { app, BrowserWindow, BrowserView } = require("electron");

const init = () => {
	const win = new BrowserWindow({
		show: true,
	});

	reloadWin(win, 1000);
};


const reloadWin = (win, count) => {
	console.log(`reloadWin count: ${count}`);

	const view = new BrowserView()
	win.setBrowserView(view)
	view.setBounds({ x: 0, y: 0, width: 500, height: 300 })
	view.webContents.loadURL('https://google.com')

	view.webContents.once('ready-to-show', () => {
		view.webContents.loadURL("about:blank");
		if (count > 0) {
			view.webContents.once('ready-to-show', () => {
				reloadWin(win, count-1);
				view.webContents.destroy();
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
