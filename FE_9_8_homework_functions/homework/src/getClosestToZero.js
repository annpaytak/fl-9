function getClosestToZero(...num) {
    return num.reduce((a, b) => {
    return Math.abs(a) > Math.abs(b) ? b : a;
    })
}
