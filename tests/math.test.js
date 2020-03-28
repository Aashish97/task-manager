const {farenheitToCelsius, celsiusToFarenheit, add } = require('./../src/math');

test('Should convert 32 F to 0 C', () => {
    const temperature = farenheitToCelsius(32);
    expect(temperature).toBe(0);
})

test('Should convert 0 C to 32 F', () => {
    const temperature = celsiusToFarenheit(0);
    expect(temperature).toBe(32);
})

test('Should add two numbers with the async/await function', async (done) => {
    const sum = await add(5,10);
    expect(sum).toBe(15);
    done();
})