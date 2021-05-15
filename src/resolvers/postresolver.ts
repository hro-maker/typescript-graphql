import { Query, Resolver } from "type-graphql";

@Resolver()
export class Postresolver{

    @Query(() => String)
    hello():String{
            return "hello world"
    }
}