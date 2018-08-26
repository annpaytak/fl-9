function getMin(...num) {
    return num.reduce((a, b) => Math.min(a, b));
}