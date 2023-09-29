
import { applyModifiers, appyTextColor } from "../../utils/print";


const text = "Sample test";
const regex = /Sample test/;

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});


test('Colored-applied text should contain original text', () => {
    expect(appyTextColor(text, 'red')).toMatch(regex)
});


test('Modified-applied text should contain original text', () => {
    expect(applyModifiers(text, 'underline')).toMatch(regex)
});


test('Modified-applied text and Colored-applied text should contain original text', () => {
    const clrText = appyTextColor(text, "blue");
    const txt = applyModifiers(clrText, 'underline');

    expect(txt).toMatch(regex)
});

