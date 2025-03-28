import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ProfileImage')
export default class ProfileImage{
    @PrimaryGeneratedColumn()
    public id!: number;
    
    @Column("text", { nullable: false })
    private url?: string;

    constructor(url: string){
        this.url = url;
    }

    public getId(): number {
        return this.id;
    }
}