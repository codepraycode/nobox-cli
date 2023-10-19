
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


const PromptFactory = (promptType:PromptType, params?: PromptParams) => {

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



export default PromptFactory;