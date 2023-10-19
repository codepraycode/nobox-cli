

import loading from 'loading-cli';
import printOut from '../utils/print';
import { Loading } from '../utils';


let loader: Loading | null;

class Preloader {


    private static setLoader() {
        if(!loader) loader = loading("Loading...")
    }

    static start(text: string = "Loading") {
        Preloader.setLoader();
        
        if (!loader) return;
        loader.text = text;
        loader.color = "yellow";


        loader.start();
    }

    static stop() {
        if (loader) loader.stop();
    }


    static success(text:string = "Done") {

        Preloader.stop();
        printOut(text, 'green');
    }

    static danger(text:string = "Error") {

        Preloader.stop();
        printOut(text, 'red');
    }

}


export default Preloader;

