import { generator } from "./generator/generator";
import { labelMaker } from "./label-maker/label-maker";
import { printer } from "./printer/printer";
import { SETTINGS, IdGeneratorSettings, PrinterDimensions } from "./settings";
import * as fs from "fs";

class IdGenerator {
  public generate(numberOfIds: number): string[] | string {
    return generator.generate(numberOfIds);
  }

  public async print(
    numberOfIds: number,
    numberOfLabels: number,
    dimension?: PrinterDimensions
  ): Promise<boolean> {
    if (!numberOfIds || numberOfIds <= 0) {
      numberOfIds = 1;
    }

    if (!numberOfLabels || numberOfLabels <= 0) {
      numberOfLabels = 1;
    }

    if (dimension) {
      this.setDimension(dimension);
    }

    const ids = generator.generate(numberOfIds);
    const labelLocations = [];

    for (let id of ids) {
      labelLocations.push(labelMaker.createIdLabelPNGFile(id));
    }

    try {
      await printer.print(labelLocations, numberOfLabels);
    } catch (e) {
      console.log("ERROR printing labels: ", e);
    }

    /*
    for (let location of labelLocations) {
      await new Promise((resolve, reject) => {
        fs.unlink(location, error => {
          if (error) {
            resolve(false);
          }
          resolve(true);
        });
      });
    }
    */

    return true;
  }

  public setSettings(settings: IdGeneratorSettings) {
    SETTINGS.printer = settings.printer;
    SETTINGS.dimension = settings.dimension;
    SETTINGS.dimensions = settings.dimensions;
  }

  private setDimension(dimension: PrinterDimensions) {
    SETTINGS.dimension = dimension;
  }
}

export const idGenerator = new IdGenerator();
