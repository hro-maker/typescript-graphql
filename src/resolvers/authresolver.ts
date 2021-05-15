import { logindto } from './../dtos/auth.dto';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { registerdto } from "../dtos/auth.dto";
import { User } from "../entytes/user";
import {compare, hash} from 'bcrypt'
import * as jwt from 'jsonwebtoken'
@ObjectType()
class FieldError {
  @Field()
  field?: string ;
  @Field()
  message?: string ;
}
@ObjectType()
class UserResponse {
  @Field(() => FieldError, { nullable: true })
  errors?: FieldError;

  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => String, { nullable: true })
  token?: string;
}

@Resolver()
export class Authresolver {
    @Mutation(() => UserResponse, { nullable: true })
    async register(
        @Arg("registerinput") registerargs: registerdto
    ): Promise<UserResponse> {   
        const canditate=await User.findOne({email:registerargs.email})
        if(canditate){
            return {errors:{message:"user already regsitret",field:"email"}}
        }
        const user = new User();
        user.name = registerargs.name;
        user.email = registerargs.email;
        user.password =await hash(registerargs.password,12);
        await user.save() 
        return {user}
    }

    @Mutation(()=>UserResponse)
    async login(@Arg("logindto")loginn:logindto):Promise<UserResponse>{
        const user=await User.findOne({email:loginn.email})
        if(!user){
            return {errors:{
                field:"email",
                message:"user with this email dont found"
            }}
        }
        const validpass=await compare(loginn.password,user.password)
        if(!validpass){
            return {errors:{
                field:"password",
                message:"password is incorect"
            }}
        }
        const token=await jwt.sign({id:user.id},"hello_world")
        return {
            token,user
        }
    }
}