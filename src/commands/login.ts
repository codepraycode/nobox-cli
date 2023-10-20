import { authenticate, receiveAuthInput } from "../helpers/authentication";
import printOut from "../utils/print";



export const Login = async () => {
    
    printOut("Login to your Nobox account", 'yellow')


    const auth = await receiveAuthInput();

    await authenticate(auth);
}
