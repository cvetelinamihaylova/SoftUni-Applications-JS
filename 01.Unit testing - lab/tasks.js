module.exports.sum = function (arr) {
    let sum = 0;
    for (num of arr)
        sum += Number(num);
    return sum;
}

module.exports.isSymmetric = function (arr) {
    if (!Array.isArray(arr)) { return false; }
    let reversed = arr.slice(0).reverse();
    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}

module.exports.rgbToHexColor = function rgbToHexColor(red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255)) { return undefined; } // Red value is invalid
    if (!Number.isInteger(green) || (green < 0) || (green > 255)) { return undefined; } // Green value is invalid
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255)) { return undefined; } // Blue value is invalid
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
}

module.exports.createCalculator = function () {
    let value = 0;
    return {
        add: function(num) { value += Number(num); },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    }
}
