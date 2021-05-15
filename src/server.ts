import { createTypeormConn } from './utiles/typeormm';
import 'reflect-metadata'
import expres from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { Postresolver } from './resolvers/postresolver'
import {createConnection, Connection, ConnectionManager} from "typeorm";
import { Authresolver } from './resolvers/authresolver'
import { User } from './entytes/user'
// const connectionManager = new ConnectionManager();
// export const connection = connectionManager.create({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "tabacxur16",
//     entities:[User],
//     database: "express-graph"
// });

// createConnection({
//     type: "postgres",
//    host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "tabacxur16",
//     database: "test",
//     entities: [
//         User
//     ],
//     synchronize: true,
//     logging: false
// }).then(connection => {
//     // here you can start to work with your entities
// }).catch(error => console.log(error));
try {
    const main = async function () {
        
        // await connection.connect().then(()=>{
        //     console.log("database connectet")
        // })
        await createTypeormConn()
        const PORT = process.env.PORT || 7000
        const app = expres()
        const apoloserver = new ApolloServer({
            schema: await buildSchema({
                resolvers: [Postresolver,Authresolver],
                validate: false,
            }),
        })
        apoloserver.applyMiddleware({ app })
        app.listen(PORT, () => {
            console.log("server startet on port" + PORT)
        })
    }
    main()
} catch (error) {
    console.log(error)
}
