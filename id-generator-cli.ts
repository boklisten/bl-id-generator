import { idGenerator } from "./src/id-generator";
import { labelMaker } from "./src/label-maker/label-maker";
import { PrinterDimensions } from "./src/settings";

const action = process.argv[2];

if (action === "print") {
  const numOfIds = parseInt(process.argv[3]);
  const numOfLabels = parseInt(process.argv[4]);
  const dimension = process.argv[5] as PrinterDimensions;

  if (!numOfIds || numOfIds <= 0 || !numOfLabels || numOfLabels <= 0) {
    console.log("must specify <number of IDs> and <number of labels>");
    process.exit();
  }

  console.log(`printing ${numOfIds} ids with ${numOfLabels} labels each`);

  idGenerator
    .print(numOfIds, numOfLabels, dimension)
    .then(() => {
      console.log(`printed all ${numOfIds} ids`);
    })
    .catch(e => {
      console.log("failed to print: ", e);
    });
} else if (action === "png") {
  const numOfIds = parseInt(process.argv[3]);
  const location = process.argv[4];

  if (!numOfIds || numOfIds <= 0 || !location || location.length <= 0) {
    console.log("must specify <number of IDs> and <location path>");
  }

  if (location.charAt(location.length - 1) !== "/") {
    console.log("location is not a folder, must be a folder");
    process.exit();
  }

  const ids = idGenerator.generate(numOfIds);

  for (let id of ids) {
    labelMaker.createIdLabelPNGFile(id, location);
  }

  console.log(`created ${numOfIds} PNG files at ${location}`);
} else if (action === "generate") {
  const numOfIds = parseInt(process.argv[3]);

  if (!numOfIds) {
    console.log("must specify <number of IDs>");
    process.exit();
  }

  console.log(idGenerator.generate(numOfIds));
} else {
  console.log(" HOW TO USE");
  console.log(" <> means required");
  console.log("");
  console.log(" print <number of IDs> <number of Labels>");
  console.log("");
  console.log(" png <number of IDs> <location path>");
  console.log("");
  console.log(" generate <number of IDs>");
  console.log("");
}
