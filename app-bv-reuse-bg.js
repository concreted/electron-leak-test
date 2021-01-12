const { app, BrowserWindow, BrowserView } = require("electron");

const init = () => {
	const bgwin = new BrowserWindow({
		show: true,
	});

	const win = new BrowserWindow({
		show: true,
	});

	const view = new BrowserView()

	// bgwin.setBrowserView(view)
	// view.setBounds({ x: 0, y: 0, width: 500, height: 300 })


	reloadWin(win, bgwin, view, 1000);
};


const reloadWin = (win, bgwin, view, count) => {
	console.log(`reloadWin count: ${count}`);

	win.removeBrowserView(view);
	bgwin.addBrowserView(view)
	view.setBounds({ x: 0, y: 0, width: 500, height: 300 })

	if (count > 0) {
		view.webContents.loadURL('https://google.com')

		view.webContents.once('ready-to-show', () => {

			bgwin.removeBrowserView(view);
			win.addBrowserView(view);
			view.setBounds({ x: 0, y: 0, width: 500, height: 300 })

			view.webContents.loadURL("about:blank");
			if (count > 0) {
				view.webContents.once('ready-to-show', () => {
					reloadWin(win, bgwin, view, count-1);
				});
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
