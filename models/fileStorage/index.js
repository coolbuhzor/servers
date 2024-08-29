import fs from "node:fs";
import { writeFile } from "node:fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export class FileStorage {
  #object = {};
  fileName = path.join(__dirname, "../../", "blogAppDb.json");

  starter() {
    fs.stat(this.fileName, (err, stat) => {
      if (err == null) {
        fs.readFile(this.fileName, "utf-8", (error, data) => {
          if (error) {
            console.log({ error });
            return;
          }
          this.#object = JSON.parse(data);
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
    return this.#object;
  }

  async save(value) {
    // let update;
    try {
      await writeFile(this.fileName, JSON.stringify(this.#object));
      return value;
    } catch (error) {
      throw new Error(err.message);
    }
    //  , (err) => {
    //     if (err) ;
    //     return value;
    //   });
    // return update;
  }

  async update(name, value) {
    const obj = this.#object;
    if (obj[name]) {
      obj[name] = obj[name].map((item) => {
        if (item.id === value.id) {
          return value;
        } else {
          return item;
        }
      });
    } else {
      throw new Error("invalid data #object");
    }
    this.#object = obj;
    const res = await this.save(value);
    return res;
  }

  async new(name, value) {
    const obj = this.#object;
    if (obj[name]) {
      obj[name].push(value);
    } else {
      throw new Error("invalid data #object");
    }
    this.#object = obj;
    const res = await this.save(value);
    console.log({ res });
    return res;
  }
  static delete() {}
}
