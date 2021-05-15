import { InputType, Field } from "type-graphql"

@InputType()
export class registerdto {
    @Field()
    name!: string

    @Field()
    email!: string

    @Field()
    password!: string
}
@InputType()
export class logindto {

    @Field()
    email!: string

    @Field()
    password!: string
}