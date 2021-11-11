const fsProm = require("fs/promises");
const path = require("path");
const fs = require("fs");
const { readdir } = require("fs/promises");
const { stat } = require("fs");

const projectPath = path.join(__dirname, "project-dist");
const assetsPath = path.join(__dirname, "assets");
const assetsPathNew = path.join(projectPath, "assets");
const stylePath = path.join(__dirname, "styles");
const styleFilePath = path.join(projectPath, "style.css");
const templatePath = path.join(__dirname, "template.html");
const indexPath = path.join(projectPath, "index.html");
const componentsPath = path.join(__dirname, "components");

async function createFolder() {
  await fsProm.mkdir(projectPath, { recursive: true });
}

async function createCopyFolder(pathPrew, pathNew) {
  fs.access(pathNew, async function (error) {
    if (error) {
      try {
        await fsProm.mkdir(pathNew, { recursive: true });
        const files = await readdir(pathPrew, { withFileTypes: true });

        for (const file of files) {
          if (!file.isDirectory()) {
            const filePath = path.join(pathPrew, file.name);
            const filePathNew = path.join(pathNew, file.name);
            fs.promises.copyFile(filePath, filePathNew);
          } else {
            createCopyFolder(
              path.join(pathPrew, file.name),
              path.join(pathNew, file.name)
            );
          }
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await fsProm.rm(pathNew, { recursive: true });
        await fsProm.mkdir(pathNew, { recursive: true });
        const files = await readdir(pathPrew, { withFileTypes: true });

        for (const file of files) {
          if (!file.isDirectory()) {
            const filePath = path.join(pathPrew, file.name);
            const filePathNew = path.join(pathNew, file.name);
            fs.promises.copyFile(filePath, filePathNew);
          } else {
            createCopyFolder(
              path.join(pathPrew, file.name),
              path.join(pathNew, file.name)
            );
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  });
}

async function makeStyleFile() {
  const style = fs.createWriteStream(styleFilePath);

  try {
    const files = await fsProm.readdir(stylePath, { withFileTypes: true });

    for (const file of files) {
      let filePath = path.join(stylePath, `${file.name}`);
      const fileInf = path.parse(filePath);

      if (!file.isDirectory() && fileInf.ext == ".css") {
        await stat(filePath, async (err, stats) => {
          let readableStream = fs.createReadStream(filePath, "utf8");

          await readableStream.on("data", function (chunk) {
            style.write(chunk.trim() + "\n");
          });
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function createIndexHtml() {
  const readableStream = fs.createReadStream(templatePath, "utf-8");
  const writeableStream = fs.createWriteStream(indexPath);

  await readableStream.on("data", async function (data) {
    const newHtml = await addTags(data);

    writeableStream.write(newHtml);
  });
}

async function addTags(data) {
  let text = data.toString();
  const tags = text.match(/{{.+}}/gi);
  for (let tag of tags) {
    const tagName = tag.match(/\w+/)[0];
    const sample = await fs.promises.readFile(
      path.join(componentsPath, `${tagName}.html`)
    );
    text = text.replace(new RegExp(tag, "g"), sample.toString());
  }
  return text;
}

async function buildPage() {
  await createFolder();
  await createCopyFolder(assetsPath, assetsPathNew);
  await makeStyleFile();
  await createIndexHtml();
}

buildPage();
