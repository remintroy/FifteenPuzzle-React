const LevelA = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, -1],
]

const randomMatrixGenerator = (matrixSize) => {
    
    let array = [];
    let output = [];

    // generates correct metrix array
    const generateArray = () => {
        for (let i = 0; i < matrixSize * matrixSize; i++) {
            if (i != (matrixSize * matrixSize) - 1) array.push(i + 1);
            else array.push(-1);
        }
    };
    generateArray();

    // randomizes array matrix
    for (let i = 0; i < matrixSize; i++) {
        let carrier = [];
        for (let j = 0; j < matrixSize; j++) {
            carrier.push(array.splice(Math.floor(Math.random() * array.length), 1)[0]);
        }
        output.push(carrier)
    }

    // return output
    return output;
};

console.log(randomMatrixGenerator(4));

