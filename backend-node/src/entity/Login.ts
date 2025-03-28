import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('Login')
export default class Login{
    @PrimaryGeneratedColumn()
    private id!: number;

    @Column("varchar", { nullable: true })
    private email?: string;

    @Column("text", { nullable: true })
    private password?: string;

    @Column("boolean", { nullable: true })
    private active?: boolean;

    constructor(email: string, password: string, active: boolean){
        this.email = email;
        this.password = password;
        this.active = active;
    }

    public getId(): number {
        return this.id;
    }

    public getEmail(): string {
        return this.email!;
    }

}