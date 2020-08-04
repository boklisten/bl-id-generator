import { spawn } from "child_process";
import { SETTINGS } from "../settings";

class Printer {
  public async print(
    imagePaths: string[],
    numberOfLabelsForEachImage: number
  ): Promise<boolean> {
    if (!imagePaths || imagePaths.length <= 0) {
      throw new TypeError("imagePaths is empty or undefined");
    }

    if (!numberOfLabelsForEachImage || numberOfLabelsForEachImage <= 0) {
      throw new TypeError("numberOfLabelsForEachImage must be at least 1");
    }

    let i = 1;

    for (let imagePath of imagePaths) {
      try {
        await this.printLabels(imagePath, numberOfLabelsForEachImage);
        const imageNameSplit = imagePath.split("/");
        const imageName = imageNameSplit[imageNameSplit.length - 1];

        console.log(
          `(${i}): PRINTED LABEL "${imageName}" - LABELS LEFT TO PRINT: ${
            imagePaths.length - i
          }`
        );
        i++;
      } catch (e) {
        console.log("could not print", e);
      }
    }
    return true;
  }

  private async printLabels(
    imagePath: string,
    numberOfLabels: number
  ): Promise<boolean> {
    try {
      for (let i = 1; i < numberOfLabels; i++) {
        await this.printLabel(imagePath, i == numberOfLabels);
      }
      return true;
    } catch (e) {
      throw e;
    }
  }

  private printLabel(imagePath: string, cut?: boolean): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let options = [
        "--backend",
        "linux_kernel",
        "--model",
        SETTINGS.printer.model,
        "--printer",
        SETTINGS.printer.location,
        "print",
        "--label",
        SETTINGS.dimension
      ];

      if (!cut) {
        options.push("--no-cut");
      }

      options.push(imagePath);

      let brotherPrinter = spawn("brother_ql", options);

      brotherPrinter.stderr.on("data", data => {
        console.log(">> ERROR when spawning brother_ql");
        console.error(data.toString("utf8"));
      });

      brotherPrinter.on("message", message => {});

      brotherPrinter.on("error", error => {
        reject(error);
      });

      brotherPrinter.on("close", code => {
        resolve(true);
      });

      brotherPrinter.on("exit", code => {
        resolve(true);
      });
    });
  }
}

export const printer = new Printer();
