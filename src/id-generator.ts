import { generator } from "./generator/generator";
import { labelMaker } from "./label-maker/label-maker";
import { printer } from "./printer/printer";
import { SETTINGS, IdGeneratorSettings, PrinterDimensions } from "./settings";

class IdGenerator {
  public generate(numberOfIds: number): string[] | string {
    return generator.generate(numberOfIds);
  }

  public async print(
    numberOfIds: number,
    numberOfLabels: number,
    printerLocation: string,
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

    this.setPrinterLocation(printerLocation);

    const ids = generator.generate(numberOfIds);
    const labelLocations = [];

    for (let id of ids) {
      labelLocations.push(labelMaker.createIdLabelPNGFile(id, ids[0]));
    }

    try {
      await printer.print(labelLocations, numberOfLabels);
    } catch (e) {
      console.log("ERROR printing labels: ", e);
    }

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

  private setPrinterLocation(location: string) {
    SETTINGS.printer.location = location;
  }
}

export const idGenerator = new IdGenerator();
