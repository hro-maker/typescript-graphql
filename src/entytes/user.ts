import { Field, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
@ObjectType()
@Entity("user")
export class User  extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id?: string;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    email!: string;

    @Field()
    @Column()
    password!:string

}