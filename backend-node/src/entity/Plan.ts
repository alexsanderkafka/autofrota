import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Plan')
export default class Plan{
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column("varchar", { length: 100, nullable: false })
    private name: string;

    @Column("int", { nullable: false })
    private days?: number;

    @Column("float", { nullable: false })
    private price: number;

    @Column("text", { nullable: false })
    private description: string;


    constructor(name: string, price: number, description: string, days: number){
        this.name = name;
        this.price = price;
        this.description = description;
        this.days = days;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public getDays(): number {
        return this.days!;
    }

    public getDescription(): string {
        return this.description;
    }
}
