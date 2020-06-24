import { spawn } from "child_process";

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

    for (let imagePath of imagePaths) {
      try {
        await this.printLabels(imagePath, numberOfLabelsForEachImage);
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
        await this.printLabel(imagePath);
      }

      await this.printLabel(imagePath, true);
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
        "QL-700",
        "--printer",
        "/dev/usb/lp1",
        "print",
        "--label",
        "29x90"
      ];

      if (!cut) {
        options.push("--no-cut");
      }

      options.push(imagePath);

      let brotherPrinter = spawn("brother_ql", options);

      brotherPrinter.stderr.on("data", data => {
        console.log(new Buffer(data).toString("utf8"));
      });

      brotherPrinter.on("error", error => {
        reject(error);
      });

      brotherPrinter.on("close", data => {
        resolve(true);
      });
    });
  }
}

export const printer = new Printer();
