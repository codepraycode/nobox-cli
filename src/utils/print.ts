/* 
    Display messages in terminal 

    Reference: https://www.npmjs.com/package/kleur
*/
import {$, white, red, green, 
        yellow, blue, grey, bold,
        reset, dim, underline, inverse,
        hidden, strikethrough
} from 'kleur/colors';
// import colorSupportLevel from 'color-support';


// ===============
// Reference: https://www.npmjs.com/package/color-support
// If you understand how color-support works, you can implement
// the check if terminal supports color.
// till then, we'll be seeing colors.



// manually disable
// kleur.enabled = false;

// console.log("Color level", colorSupportLevel({level: 3}))

// or use another library to detect support
// kleur.enabled = colorSupportLevel > 0;

// ===============
$.enabled = true;

// Configuration: https://www.npmjs.com/package/kleur#api
type textColors = "white" | "red" | "green" | "yellow" | "blue" | "grey" // | "magenta" | "cyan" | "white" | "gray" | "grey"
// type bgColors = "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite"
type modifiers = "reset" | "bold" | "dim" | "underline" | "inverse" | "hidden" | "strikethrough"



const Log = console.log;



export const appyTextColor = (str: string, color:textColors) => {

    let text: string;

    switch (color) {
        case 'blue':
            text = blue(str);
            break;
        case 'green':
            text = green(str);
            break;
        case 'grey':
            text = grey(str);
            break;
        case 'red':
            text = red(str);
            break;
        case 'white':
            text = white(str);
            break;
        case 'yellow':
            text = yellow(str);
            break;
        default:
            text = str;
            break;
    }


    return text;
}

export const applyModifiers = (str: string, modifier:modifiers) => {
    let text:string;

    switch (modifier) {
        case 'bold':
            text = bold(str);
            break;
        case 'hidden':
            text = hidden(str);
            break;
        case 'dim':
            text = dim(str);
            break;
        case 'inverse':
            text = inverse(str);
            break;
        case 'reset':
            text = reset(str);
            break;
        case 'strikethrough':
            text = strikethrough(str);
            break;
        case 'underline':
            text = underline(str);
            break;
        default:
            text = str;
            break;
    }

    return text;
}


const printOut = (
    message: string = "Sample",
    color:textColors = 'red',
    modifier:modifiers = 'reset') => {


    const txt = applyModifiers(
            appyTextColor(message, color), modifier);
    Log(
        txt
    );
}



export default printOut;