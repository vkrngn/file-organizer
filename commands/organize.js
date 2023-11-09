const fs = require("fs"); // fs module
const path = require("path"); // path module

let types = {
  videos: ["mp4", "mkv"],
  audio: ["mp3"],
  archives: ["zip", "rar", "tar", "7z", "iso"],
  documents: ["pdf", "doc", "docx", "xls", "xlsx", "txt"],
  programs: ["exe", "dmg", "pkg"],
  images: ["jpg", "jpeg", "png"],
};

function organize(srcPath) {
  if (srcPath == undefined) {
    // cwd() method returns the current working directory of the Node.js process.
    srcPath = process.cwd();
  }

  let organizedFiles = path.join(srcPath, "organized_files");
  if (fs.existsSync(organizedFiles) == false) {
    // if 'organized_files' folder does not exist, create it else not
    fs.mkdirSync(organizedFiles);
  } else {
    console.log("Folder already exist.");
  }

  //reads the content of the directory
  let allFiles = fs.readdirSync(srcPath);

  // traverse over the directory and classify them on the basis of extension
  for (let i = 0; i < allFiles.length; i++) {
    // let extension = allFiles[i].split(".")[1];

    let fullPathOfFile = path.join(srcPath, allFiles[i]);
    // check it is a file or folder
    let isThisAFile = fs.lstatSync(fullPathOfFile).isFile();
    if (isThisAFile) {
      // get extension name
      let ext = path.extname(allFiles[i]).split(".")[1]; // returns the extension of file
      // get folder name from extension
      let folderName = getFolderName(ext);
      //copy file from src folder to destination folder
      copyFileToDest(srcPath, fullPathOfFile, folderName);
    }
  }
}

function getFolderName(ext) {
  for (let key in types) {
    for (let i = 0; i < types[key].length; i++) {
      if (types[key][i] == ext) {
        return key;
      }
    }
  }
  return "miscellaneous";
}

function copyFileToDest(srcPath, fullPathOfFile, folderName) {
  // create path for folderName
  let destFolderPath = path.join(srcPath, "organized_files", folderName);
  // if folder does not exist make one
  if (!fs.existsSync(destFolderPath)) {
    fs.mkdirSync(destFolderPath);
  }
  // copy file from source folder to destination folder
  // basename returns the last portion of path
  let fileName = path.basename(fullPathOfFile);
  let destFileName = path.join(destFolderPath, fileName);
  fs.copyFileSync(fullPathOfFile, destFileName);
}

// let srcPath = "<path>";
// organize(srcPath);
module.exports = {
  organize: organize,
};
