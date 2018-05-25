const electron = require('electron')
const path = require('path')
const url = require('url')

process.env.NODE_ENV = 'development'

const {app, BrowserWindow, Menu, ipcMain} = electron

let mainWindow
let vehicleWindow

app.on('ready', function(){
  PrepareMainWindoe()
  // PrepareVehicleWindow()
})


function PrepareVehicleWindow() {
  let {width, height} = require('electron').screen.getPrimaryDisplay().size
  vehicleWindow = new BrowserWindow({ width: width/3, height: height, frame: true })
  vehicleWindow.setResizable(false)
  vehicleWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/html/vehicleWindow.html'),
    protocol: 'file:',
    slashes: true
  }))
  vehicleWindow.on('closed', function(){
    vehicleWindow = null
  })
}

// ipcMain.on('VEHICLE_FETCH_REQ', function (e) {
//   vehicleWindow.webContents.send('TranslatedCode', output)
// })

// ipcMain.on('VEHICLE_SEARCH_REQ', function (e, filter) {
//   vehicleWindow.webContents.send('TranslatedCode', output)
// })

// ipcMain.on('VEHICLE_DELETE_REQ', function (e, vehicleId) {
//   vehicleWindow.webContents.send('TranslatedCode', output)
// })

// ipcMain.on('VEHICLE_ADD_REQ', function (e, vehicleModel) {
//   vehicleWindow.webContents.send('TranslatedCode', output)
// })

// ipcMain.on('VEHICLE_EDIT_REQ', function (e, vehicleModel) {
//   vehicleWindow.webContents.send('TranslatedCode', output)
// })


function PrepareMainWindoe() {
  let {width, height} = require('electron').screen.getPrimaryDisplay().size
  mainWindow = new BrowserWindow({ width: width, height: height, frame: false })
  mainWindow.setResizable(false)
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/html/mainWindow.html'),
    protocol: 'file:',
    slashes:true
  }))
  mainWindow.on('closed', function(){
    mainWindow = null
    app.quit()
  })
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
}

// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label:'New',
        accelerator:process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N'
      },
      {
        label:'Import',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
      },
      {
        label:'Export',
        accelerator:process.platform == 'darwin' ? 'Command+E' : 'Ctrl+E',
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Actions',
    submenu: [
      {
        label: 'Play',
        accelerator:process.platform == 'darwin' ? 'Command+P' : 'Ctrl+P'
      },
      {
        label: 'Step Play',
        accelerator:process.platform == 'darwin' ? 'Command+S' : 'Ctrl+S',       
      },
      {
        label: 'Stop',
        accelerator:process.platform == 'darwin' ? 'Command+T' : 'Ctrl+T'
      },
      {
        label: 'Reload',
        accelerator:process.platform == 'darwin' ? 'Command+L' : 'Ctrl+L'
      }
    ]
  },
  {
    label: 'Generators',
    submenu: [
      {
        label: 'Random Vehicles',
        accelerator:process.platform == 'darwin' ? 'Command+1' : 'Ctrl+1'
      },
      {
        label: 'Random Receivers',
        accelerator:process.platform == 'darwin' ? 'Command+2' : 'Ctrl+2',       
      },
      {
        label: 'Reset Vehicles',
        accelerator:process.platform == 'darwin' ? 'Command+3' : 'Ctrl+3'
      },
      {
        label: 'Reset Receivers',
        accelerator:process.platform == 'darwin' ? 'Command+4' : 'Ctrl+4'
      }
    ]
  },
  {
    label: 'Controllers',
    submenu: [
      {
        label: 'Start Engins',
        accelerator:process.platform == 'darwin' ? 'Command+5' : 'Ctrl+5'
      },
      {
        label: 'Stop Engins',
        accelerator:process.platform == 'darwin' ? 'Command+6' : 'Ctrl+6',       
      },
      {
        label: 'Start Receivers',
        accelerator:process.platform == 'darwin' ? 'Command+7' : 'Ctrl+7'
      },
      {
        label: 'Stop Receivers',
        accelerator:process.platform == 'darwin' ? 'Command+8' : 'Ctrl+8'
      }
    ]
  }
]

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({})
}

// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      }
    ]
  })
}