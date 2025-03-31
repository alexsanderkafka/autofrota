import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import Plan from "./Plan";
import Business from "./Business";

@Entity('Payment')
export default class Payment{
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column("varchar", { nullable: true, name : "collector_id" })
    public collectorId?: string;

    @Column("varchar", { nullable: true, name : "payment_id" })
    public paymentId?: string;

    @Column("varchar", { nullable: false })
    public status: string;

    @Column("varchar",{ nullable: true, name : "external_reference" })
    public externalReference?: string;

    @Column("varchar", { nullable: true, name : "payment_type"})
    public paymentType?: string;

    @Column("varchar", { nullable: true, name : "processing_mode" })
    public processingMode?: string;

    @Column("varchar", { nullable: true, name : "merchant_account_id" })
    public merchantAccountId?: string;

    @Column("date", { nullable: true, name : "confirmed_date_payment" })
    public confirmedDatePayment?: String;

    @ManyToOne(() => Plan, ( plan ) => plan.getId)
    @JoinColumn({ name : "plan_id" })
    public plan: Plan;

    @ManyToOne(() => Business, ( business ) => business.getId)
    @JoinColumn({ name : "business_id" })
    public business: Business;

    constructor(collectorId: string | undefined, paymentId: string | undefined, status: string, externalReference: string | undefined, paymentType: string | undefined, processingMode: string | undefined, merchantAccountId: string | undefined, confirmedDatePayment: String | undefined, plan: Plan, business: Business){
        this.collectorId = collectorId;
        this.paymentId = paymentId;
        this.status = status;
        this.externalReference = externalReference;
        this.paymentType = paymentType;
        this.processingMode = processingMode;
        this.merchantAccountId = merchantAccountId;
        this.confirmedDatePayment = confirmedDatePayment;
        this.plan = plan;
        this.business = business;
    }

    public getId(): number{
        return this.id;
    }

    public getStatus(): string | undefined {
        return this.status;
    }

    public setId(id: number) {
        this.id = id;
    }

    /*
    public getPlan(): Plan {
        return this.plan;
    }*/
}