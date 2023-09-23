import { Space } from 'nobox-client';
import { createRowSchema } from '../config';


interface IUser {
    id: string,
    email: string,
    password: string,
    firstName: string,
    age: number
}

export type IUserRecord = Omit<IUser, "id">;

const UserStructure: Space<IUserRecord> = {
    space: "User",
    description: "A record space for users",
    structure: {
        email: {
            description: "User's mail",
            type: String,
            required: true
        },
        password: {
            description: "User's password",
            type: String,
            required: true,
            hashed: true
        },
        firstName: {
            description: "User's first name",
            type: String,
            required: true
        },
        age: {
            description: "User's age",
            type: Number,
            required: false
        },

    }
}

const UserModel = createRowSchema<IUserRecord>(UserStructure);


class User implements Omit<IUser, "password"> {
    id: string;
    email: string;
    // password: string;
    firstName: string;
    age: number;

    constructor (record: IUser) {
        this.id = record.id;
        this.email = record.email;
        this.firstName = record.firstName;
        this.age = record.age;
    }


    static async create(data: IUserRecord):Promise<User | void> {
        // console.log(data);

        try {
            const newRecord = await UserModel.insertOne(data);

            console.log(`Created user with id: ${newRecord.id}`);
            return new User(newRecord);
        } catch (err) {
            // console.log(err)
        }
        // Returns a new instance of User
        
    }
    
    static async update(id: string, data: Partial<IUserRecord>): Promise<User | void | Error > {
        // console.log("Update:", user.id, "with", data);

        try {
            const updatedRecord = await UserModel.updateOneById(id, data);

            // console.log(updatedRecord);
            console.log(`Updated user with id: ${updatedRecord.id}`);
            return new User(updatedRecord);

        } catch(err) {
            return err as Error;
        }
    }

    static async get(id: string): Promise<User | void | Error> {
        // console.log("Fetch:", id);

        try {
            const record = await UserModel.findOne({ id });

            if (!record) {
                console.log("No record found");
                return
            }

            return new User(record);

        } catch(err) {
            return err as Error;
        }
    }

    static async fetch(query: Partial<IUserRecord>): Promise<User[] | void | Error > {
        // console.log("Fetch:", query);
        let records:IUser[];

        try {
            records = await UserModel.find(query);
        } catch(err) {
            return err as Error;
        }


        // Returns an array of instances of User
        try {

            return records.map((record)=> new User(record));
        } catch(err){}

    }
}


export default User;