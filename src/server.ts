import 'reflect-metadata'
import { createTypeormConn } from './utiles/typeormm';
import expres from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { Postresolver } from './resolvers/postresolver'
import { Authresolver } from './resolvers/authresolver'
try {
    const main = async function () {
        await createTypeormConn()
        const PORT = process.env.PORT || 7000
        const app = expres()
        const apoloserver = new ApolloServer({
            uploads:false,
            schema: await buildSchema({
                resolvers: [Postresolver,Authresolver],
                validate: false,
            }),
            context:((req: expres.Request,res: expres.Response)=>({req,res}))
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
