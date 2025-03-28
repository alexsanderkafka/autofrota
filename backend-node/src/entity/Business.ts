import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from "typeorm";

import ProfileImage from "./ProfileImage";
import Login from "./Login";


@Entity('Business')
export default class Business{
    @PrimaryGeneratedColumn()
    private id!: number;

    @Column("varchar", { nullable: false })
    private name?: string;

    @Column("varchar", { nullable: true })
    private cnpj?: string | undefined | null;

    @Column("varchar", { nullable: false, name: "zip_code" })
    private zipCode?: string;

    @Column("varchar", { nullable: false })
    private address?: string;

    @Column("varchar", { nullable: false })
    private phone?: string;

    @JoinColumn({ name : "image_id" })
    @ManyToOne(() => ProfileImage, ( image ) => image.getId)
    private image?: ProfileImage;

    @JoinColumn({ name : "login_id" })
    @ManyToOne(() => Login, ( login ) => login.getId)
    private login?: Login;

    constructor(name: string, cnpj: string | null | undefined, zipCode: string, address: string, phone: string, image: ProfileImage, login: Login){
        this.name = name;
        this.cnpj = cnpj;
        this.zipCode = zipCode;
        this.address = address;
        this.phone = phone;
        this.image = image;
        this.login = login;
    }


    public getId(): number {
        return this.id;
    }

    public getLogin(): Login {
        return this.login!;
    }

}