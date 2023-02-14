import fs from "fs";
import * as licenseChecker from "license-checker";

const Licenses = [];

licenseChecker.init(
  {
    start: "./",
    production: false,
  },
  function (err, packages) {
    if (err) {
      console.log(err);
    } else {
      Object.keys(packages).map((software) => {
        Licenses.push({
          name: software.slice(0, software.indexOf("@", 1)),
          license: packages[software].licenses,
        });
      });

      fs.writeFileSync(
        "./pages/licenses/licenses.json",
        JSON.stringify(Licenses)
      );
    }
  }
);

export {};
