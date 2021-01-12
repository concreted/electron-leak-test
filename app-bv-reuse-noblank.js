const { app, BrowserWindow, BrowserView } = require("electron");

const init = () => {
	const win = new BrowserWindow({
		show: true,
	});

	const view = new BrowserView()
	win.setBrowserView(view)
	view.setBounds({ x: 0, y: 0, width: 500, height: 300 })


	reloadWin(win, view, 1000);
};


const reloadWin = (win, view, count) => {
	console.log(`reloadWin count: ${count}`);

	if (count > 0) {
		view.webContents.loadURL('https://google.com')

		view.webContents.once('ready-to-show', () => {
			if (count > 0) {

				reloadWin(win, view, count-1);

			}
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
