import Preloader from "../helpers/preloader";
import printOut from "../utils/print";


const removeUser = async () => {
    
    Preloader.start("working on that...");

    setTimeout(()=>{
        Preloader.stop();
        printOut("You're logged out", 'grey')
    }, 2000)
}


export const logout = async () => {

    await removeUser();

    return;

}