const fsPromises = require("fs/promises");
const { google } = require("googleapis");
const { parse } = require("node-html-parser");
const matter = require("gray-matter");
const TurndownService = require("turndown");
const dayjs = require("dayjs");

async function main({ googleDriveFolderId, outputDirectoryPath }) {
  const drive = google.drive({
    auth: new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    }),
    version: "v3",
  });

  const exportedFiles = await exportFiles({
    drive,
    files: await listFiles({ drive, googleDriveFolderId }),
  });

  await writeExportedFiles({ exportedFiles, outputDirectoryPath });
}

async function exportFiles({ drive, files }) {
  return Promise.all(
    files.map(async (file) => {
      const html = await exportFile({
        drive,
        fileId: file.id,
      });
      return {
        ...file,
        html,
      };
    })
  );
}

async function exportFile({ drive, fileId }) {
  const response = await drive.files.export({
    fileId,
    mimeType: "text/html",
  });
  return response.data;
}

async function listFiles({ drive, googleDriveFolderId }) {
  const response = await drive.files.list({
    fields: "nextPageToken, files(id, name, createdTime, modifiedTime)",
    orderBy: "modifiedTime desc",
    pageSize: 1000,
    q: `'${googleDriveFolderId}' in parents and mimeType = 'application/vnd.google-apps.document'`,
  });
  return response.data.files;
}

async function writeExportedFiles({ exportedFiles, outputDirectoryPath }) {
  const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;
  exportedFiles.forEach(async (exportedFile) => {
    if (!regex.exec(exportedFile.name)) {
      return;
    }
    const { body, title } = convertHtml(exportedFile.html);
    const created = dayjs(regex.exec(exportedFile.name)[0]);
    const createdDate = created.format();
    const updated = dayjs(exportedFile.modifiedTime);
    const updatedDate = updated.format();

    await createDirectory({ outputDirectoryPath: `${outputDirectoryPath}/${exportedFile.name}` });
    await fsPromises.writeFile(
      `${outputDirectoryPath}/${exportedFile.name}/index.md`,
      matter.stringify(body, { title, createdDate, updatedDate })
    );
  });
}

function convertHtml(html) {
  const root = parse(html);
  const bodyElement = root.querySelector("body");

  bodyElement.querySelectorAll("*[style]").forEach((element) => {
    element.removeAttribute("style");
  });
  bodyElement.querySelectorAll("*[id]").forEach((element) => {
    element.removeAttribute("id");
  });
  bodyElement.querySelectorAll("p").forEach((element) => {
    if (element.innerHTML === "<span></span>") {
      element.remove();
    }
  });
  bodyElement.querySelectorAll("span").forEach((element) => {
    element.replaceWith(...element.childNodes);
  });
  bodyElement.querySelectorAll("a[href]").forEach((element) => {
    const href = element.getAttribute("href");
    if (!href) {
      return;
    }
    const url = new URL(href);
    const q = url.searchParams.get("q");
    element.setAttribute("href", q);
  });

  const firstElement = bodyElement.querySelector("*");
  const title = firstElement.text;
  firstElement.remove();

  const markdown = new TurndownService().turndown(bodyElement.innerHTML);

  // TODO: codeblock parse

  return {
    body: markdown,
    title,
  };
}

async function createDirectory({ outputDirectoryPath }) {
  await fsPromises.stat(outputDirectoryPath).catch((err) => {
    if (err.code === "ENOENT") {
      fsPromises.mkdir(outputDirectoryPath, { recursive: true });
    }
  });
}

module.exports = { main };
