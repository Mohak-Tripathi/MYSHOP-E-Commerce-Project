import bcrypt from "bcryptjs";


const users = [

    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Mohak ",
        email: "mohak@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "Rahul",
        email: "rahul@example.com",
        password:bcrypt.hashSync("123456", 10),
    },
    

]

export default users;