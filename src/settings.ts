type IdGeneratorSettings = {
  printer: {
    model: "QL-700";
    location: string;
  };
  dimension: "62" | "62x29" | "29x90";
  dimensions: {
    [dimensionId: string]: {
      label: {
        height: number;
        width: number;
        margin: number;
        spaceBetween: number;
      };
      qrcode: {
        height: number;
        width: number;
        scale: number;
        margin: number;
        paddingTop: number;
      };
      barcode: {
        height: number;
        width: number;
        fontSize: number;
        barcodeWidth: number;
        barcodeHeight: number;
        margin: number;
        marginBottom: number;
      };
    };
  };
};

export const SETTINGS: IdGeneratorSettings = {
  printer: {
    model: "QL-700",
    location: "/dev/usb/lp1"
  },
  dimension: "62x29",
  dimensions: {
    "62": {
      label: {
        height: 271,
        width: 696,
        margin: 0,
        spaceBetween: 20
      },
      qrcode: {
        height: 250,
        width: 250,
        scale: 6,
        margin: 0,
        paddingTop: 40
      },
      barcode: {
        height: 0,
        width: 0,
        fontSize: 40,
        barcodeWidth: 3,
        barcodeHeight: 210,
        margin: 5,
        marginBottom: 15
      }
    },
    "62x29": {
      label: {
        height: 271,
        width: 696,
        margin: 0,
        spaceBetween: 20
      },
      qrcode: {
        height: 250,
        width: 250,
        scale: 6,
        margin: 0,
        paddingTop: 40
      },
      barcode: {
        height: 0,
        width: 0,
        fontSize: 40,
        barcodeWidth: 3,
        barcodeHeight: 210,
        margin: 5,
        marginBottom: 15
      }
    },
    "29x90": {
      label: {
        height: 306,
        width: 991,
        margin: 10,
        spaceBetween: 10
      },
      qrcode: {
        height: 250,
        width: 250,
        scale: 10,
        margin: 2,
        paddingTop: 0
      },
      barcode: {
        height: 400,
        width: 680,
        fontSize: 50,
        barcodeWidth: 4,
        barcodeHeight: 230,
        margin: 5,
        marginBottom: 20
      }
    }
  }
};
