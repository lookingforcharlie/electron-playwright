import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
// import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateHashedPassword } from './NodeFunctions'

app.disableHardwareAcceleration()

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

let win: BrowserWindow | null

console.log('Main process is running')
function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  console.log(path.join(__dirname, 'preload.mjs'))
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  args.forEach((arg) => {
    if (arg === '--action') {
      console.log('Action flag is set')
      // Implement your action flag behavior here
    } else if (arg.startsWith('--path=')) {
      const path = arg.split('=')[1]
      console.log('Path provided:', path)
      // Use the path in your application logic
    }
  })
}

// Parse command line arguments
const args = process.argv.slice(2) // Skip the first two default arguments
console.log('Received command line arguments:', args)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// helho
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// app.whenReady().then(createWindow)
app.on('ready', () => {
  console.log('Electron app is ready, creating window...')
  createWindow()
})

ipcMain.on('execute-function', (event: IpcMainEvent, functionName: string) => {
  if (functionName === 'myFunction') {
    event.reply('function-executed', myFunction())
  }
})

function myFunction(): string {
  return 'Function executed successfully!'
}

ipcMain.handle('hash-password', async (_event, password: string) => {
  return generateHashedPassword(password)
})
