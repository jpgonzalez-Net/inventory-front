const randomNumber = (min: number = 0, max: number = 2147483647): number => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min
}

export default randomNumber
