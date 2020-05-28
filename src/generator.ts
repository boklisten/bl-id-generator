class Generator {
  public generate(numberOfIds?: number): string | string[] {
    let randomIds = [];
    const charactersLength = this.characters.length;
    const total = numberOfIds ? numberOfIds : 1;

    for (let i = 0; i < total; i++) {
      let randomId = [];
      for (let j = 0; j < 12; j++) {
        randomId.push(
          this.characters[Math.floor(Math.random() * charactersLength)]
        );
      }
      randomIds.push(randomId.join(""));
    }

    return numberOfIds ? randomIds : randomIds[0];
  }

  private characters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];
}

export const generator = new Generator();
