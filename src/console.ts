import { createInterface } from "readline";
import User, { IUserRecord } from "./models/user";

interface IDocs {
    [key: string]: string | number
}

const Docs: IDocs = {
    help: `
        Console to interact with Nobox console

        Reference NoBox doc => https://www.docs.nobox.cloud/

        Commands:
            Help - 'help', 'help [command]'
            Inser/Update - 'create [...args]', 'update [...args]'
            Retrieve = 'get [id]', 'all'
            
            Use 'quit' or 'exit' to terminate console.

        To get decription of a command, enter "help [command]"

        To view this anytime, enter "help"
    `,
    create: `
    create - Used to create a new User
        receives email, password, firstname, age

        Usage:
            create email="sample@mail.com" password="letmein" firstname="Precious" age="20"
        
        Fields:
            email: required
            password: required
            firstname: required
            age: optional
        
        Note:
            You can skip the use of quotation marks (' or ")
    `,
    update: `
    update - Used to update a User by id
        receives id, email, password, firstname, age

        Usage: update id=[id] age=[id]
        
        Fields:
            id: required
            email: optional
            password: optional
            firstname: optional
            age: optional
    
        Note:
            - You can skip the use of quotation marks (' or ")
            - At least, one of email, password, firstname or age must be provided.
    `,
    get: `
    get - Used to retrieve a User by id

        Usage: get [id]
        
        Fields:
            id: required
    
        Note:
            You can skip the use of quotation marks (' or ")
    `,
    all: `
    all - Used to fetch all users

        Usage:
            all
    `
}


const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});

class Console {
    

    private static async readLine(prompt:string): Promise<string> {
        return new Promise((resolve)=>{
            readline.question(prompt, (input)=>{
                resolve(input);
            })
        })
    }

    private static closeInputReader () {
        readline.close()
    }


    // Methods

    static async readInput(prompt="> ") {
        return await Console.readLine(prompt);
    }


    static help(args:string[]) {

        // Reading just the first arg given

        const command = args[0];

        if (command) {
            const doc = Docs[command];

            if (!doc) console.log(`No help for "${command}"`);
            else console.log(doc)

        } else console.log(Docs['help'])

        return;
    }

    static async create(args: string[]) {
        // console.log(args);

        // Parse args
        const params:IDocs = {}
        const fields = ['email', 'firstName', 'password', 'age'];

        args.forEach((item)=>{
            const [field, val] = item.split("=");

            if (fields.includes(field)) params[field] = val.replace(/"/g, '');
        });

        const missen_fields = fields.filter((item)=>!params[item])

        if (missen_fields.length > 0) {
            const field_count = missen_fields.length;

            console.log(`"${missen_fields.join('", "')}" field${field_count > 1 ? 's':''} ${field_count > 1 ? 'are':'is'} required.`);

            return;
        }

        // console.log(params);
        params["age"] = Number(params["age"]);

        await User.create(params as any);
        
        return;
    }


    static async update(args: string[]) {
        // console.log(args);

        // Parse args
        const params:IDocs = {}
        const fields = ['email', 'firstName', 'password', 'age'];

        args.forEach((item)=>{
            const [field, val] = item.split("=");
            if (field === "id" || fields.includes(field)) params[field] = val.replace(/"/g, '').replace(/'/g, '');
        });

        let {id, ...rest} = params;

        if (!id) {
            console.log("'id' is required!");
            return;
        }

        const missen_fields = fields.filter((item)=>!params[item])

        if (missen_fields.length > 3) {
            const field_count = missen_fields.length;

            console.log(`One of "${missen_fields.join('", "')}" field${field_count > 1 ? 's':''} ${field_count > 1 ? 'are':'is'} required.`);

            return;
        }


        if(params["age"]) params["age"] = Number(params["age"]);

        await User.update(id as string, rest);

        return;
    }


    static async get(args: string[]) {
        // console.log(args);

        const id = args[0];

        if (id) {
            const record = await User.get(id);
            console.log(record);

        } else console.log("Id not specified");

        return;
    }


    static async all() {
        
        const records = await User.fetch({});
        console.log(records);
    }


    // Console switch
    static async run() {
        let running = true;

        do {
            let input = await Console.readInput();

            // Parse the command
            let [command, ...args] = input.trim().split(" ")
            // console.log(command, args);

            command = command.toLowerCase();

            if (!command) {
                continue
            }

            // Terminate consolse process
            if (command === 'quit' || command === 'exit') {
                running = false;
                continue;
            }

            if (command === 'help') {
                this.help(args)
                continue
            }

            if (command === 'create') {
                this.create(args);
                continue
            }

            if (command === 'update') {
                this.update(args);
                continue
            }

            if (command === 'get') {
                this.get(args);
                continue
            }

            if (command === 'all') {
                this.all();
                continue
            }


            console.log(`Unknown command ${command}`);

        } while(running);

        Console.closeInputReader();
    }
}

export default Console;