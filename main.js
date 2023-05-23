const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require ('axios');

const isDev = true;

const createWindow = () => {
  const win = new BrowserWindow({
    width: isDev ? 1200 : 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.loadFile(path.join(__dirname, "./renderer/index.html"));
};

app.whenReady().then(() => {
  ipcMain.handle('axios.openAI',openAI )

 
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

async function openAI(event,sentence) { 
  let res = null;

  await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/completions',
      data: {
    model: "text-davinci-003",
    prompt: "Correct this to standard English:\n\n " + sentence,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
      },
      headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer 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 '
    }
  })
    .then (function(response){
      res= response.data;
    })
    .catch(function(error){
      res = error;
    });
    
    return res;
}