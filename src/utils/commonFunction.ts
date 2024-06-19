import seedrandom from "seedrandom";


// const seedrandom = require('seedrandom'); // npm i --save-dev @types/node


export const isOneOf = (value: string, ...args: string[]): boolean => {
    return args.filter(x => x === value).length > 0;
}


export const generateRandomGameId = (): number => {
    var rng = seedrandom();
    var id = rng();

    return Math.floor(id * 10000);
}

export const shuffle = (array: string[], seed: number) => {
    for (let i = array.length - 1; i > 0; i--) {
        var rng = seedrandom((seed + i).toString());
        const j = Math.floor(rng() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
