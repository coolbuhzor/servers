import fs from "node:fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export class FileStorage {
  object = {};
  fileName = path.join(__dirname, "../../", "blogAppDb.json");

  starter() {
    fs.stat(this.fileName, (err, stat) => {
      if (err == null) {
        console.log("File exists");
        fs.readFile(this.fileName, "utf-8", (error, data) => {
          if (error) {
            console.log({ error });
            return;
          }
          this.object = JSON.parse(data);
          console.log({ data: this.object });
        });
      } else if (err.code === "ENOENT") {
        // file does not exist
        fs.writeFile(
          this.fileName,
          JSON.stringify({ user: [], blogs: [] }),
          "utf-8",
          (error) => {
            if (error) {
              return console.log({ error }, "erroorrr");
            }
            console.log("file created");
          }
        );
        return this.fileName;
      } else {
        console.log("Some other error: ", err.code);
        return null;
      }
    });
  }

  all() {
    return this.object;
  }
  save(value) {
    fs.writeFile(this.fileName, JSON.stringify(this.object), (err) => {
      if (err) throw new Error(err.message);
      return value;
    });
  }
  update() {}

  new(name, value) {
    const obj = this.object;
    console.log({ name, obj });
    if (obj[name]) {
      obj[name].push(value);
    } else {
      throw new Error("invalid data object");
    }
    this.object = obj;
    const res = this.save(value);
    return res;
  }
  delete() {}
}
