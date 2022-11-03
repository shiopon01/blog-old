const core = require("@actions/core");
const { main } = require("./google-docs-to-markdown");

main({
  googleDriveFolderId: process.env.DRIVE_FOLDER,
  outputDirectoryPath: process.env.OUTPUT_DIR,
}).catch(core.setFailed);
