const { app, BrowserWindow } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "./assets/logo.png"),
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: "#ffffff",
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
