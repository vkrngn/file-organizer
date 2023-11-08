const fs = require("fs"); // fs module
const path = require("path"); // path module

let types = {
  videos: ["mp4", "mkv"],
  audio: ["mp3"],
  archives: ["zip", "rar", "tar", "7z", "iso "],
  documents: ["pdf", "doc", "docx", "xls", "xlsx", "txt"],
  programs: ["exe", "dmg", "pkg"],
  images: ["jpg", "jpeg", "png"],
};

function organize(srcPath) {
  if (organize == undefined) {
    // cwd() method returns the current working directory of the Node.js process.
    srcPath = process.cwd();
  }

  let organizedFiles = path.join(srcPath, "organized_files");
  if (!fs.existsSync(organizedFiles)) {
    // if 'organized_files' folder does not exist, create it else not
    fs.mkdirSync(organizedFiles);
  } else {
    console.log("Folder already exist.");
  }
}
