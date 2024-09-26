class StringCalculator {
    add(numbers) {
        if (!numbers) return 0;

        let delimiters = [',', '\n'];
        let customDelimiter = numbers.match(/^\/\/(.)\n/);

        if (customDelimiter) {
            delimiters.push(customDelimiter[1]);
            numbers = numbers.substring(4);
        }

        let numArray = numbers.split(new RegExp(`[${delimiters.join('')}]`));

        let negatives = numArray.filter(num => parseInt(num) < 0);
        if (negatives.length > 0) {
            throw new Error(`Negatives not allowed: ${negatives.join(',')}`);
        }

        return numArray
            .map(num => parseInt(num))
            .filter(num => num <= 1000)
            .reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
    }
}

module.exports = StringCalculator;