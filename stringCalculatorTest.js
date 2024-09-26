const StringCalculator = require('./StringCalculator');

let stringCalculator;

beforeEach(() => {
    stringCalculator = new StringCalculator();
});

afterEach(() => {
    stringCalculator = null;
});

test('Test Empty String', () => {
    expect(stringCalculator.add("")).toBe(0);
});

test('Test One Number', () => {
    expect(stringCalculator.add("1")).toBe(1);
});

test('Test Multiple Numbers', () => {
    expect(stringCalculator.add("1,2")).toBe(3);
});

test('Test New Line', () => {
    expect(stringCalculator.add("1\n2,3\n4")).toBe(10);
});

test('Test Negative Number', () => {
    expect(() => stringCalculator.add("-1,2")).toThrow("Negatives not allowed: -1");
    expect(() => stringCalculator.add("1,-2,3,-5")).toThrow("Negatives not allowed: -2,-5");
});

test('Test Over Thousand', () => {
    expect(stringCalculator.add("1000,10")).toBe(10);
});

test('Test Other Delimiter', () => {
    expect(stringCalculator.add("//;\n1;2")).toBe(3);
});