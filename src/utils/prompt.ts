
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Select, Input, Toggle, Password   } from 'enquirer';


type PromptType = 'choice' | 'question' | 'secret' | 'option';


type PromptParams = {
    name: string,
    message: string,
    choices?: {
        name: string,
        message: string
    }[]
};


class Prompt {


    static question(params:PromptParams) {
        const prompt = new Input(params);

        return prompt.run();
    }

    static selection(params:PromptParams) {
        const prompt = new Select(params);

        return prompt.run();
    }

    static secret(params:PromptParams) {
        const prompt = new Password(params);

        return prompt.run();
    }

    static choice(params:PromptParams) {
        const prompt = new Toggle(params);
        return prompt.run();
    }
}

export const PromptFactory = (promptType:PromptType, params?: PromptParams) => {

    let prompt = new Input({
        name:'prompt',
        message:"Enter into prompt:"
    })

    switch (promptType) {
        case 'choice':  // Defaults to the quit option
            prompt = new Toggle(
                params || {
                    name:'quit',
                    message:"Are you sure you want to quit?"
                }
            );
            break;
        
        case 'question':
            prompt = new Input (params);
            break;
        
        case 'option':
            prompt = new Select(params);
            break;
        case 'secret':
            prompt = new Password(params);
            break;
        default:
            // Defaults to question
            break
    }


    return prompt.run();
}



export default Prompt;