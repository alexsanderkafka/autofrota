import { MysqlDataSource } from "../database";
import Payment from "../entity/Payment";

export default class PaymentRepository{

    private orm = MysqlDataSource.getRepository(Payment);

    public async save(payment: Payment){
        await this.orm.save(payment);
    }

    public async findOnePaymentByBusinessId(id: number)/*: Promise<Business>*/{
        return await this.orm.findOne({ 
            where: { business: { id: id } },
            relations: ["business"]
        });
    }

    public async updatePayment(data: any, id: number){
        return await this.orm.createQueryBuilder()
                        .update(Payment)
                        .set({
                            collectorId: data.collectorId,
                            paymentId: data.paymentId,
                            status: data.status,
                            externalReference: data.externalReference,
                            paymentType: data.paymentType,
                            processingMode: data.processingMode,
                            merchantAccountId: data.merchantAccountId,
                            confirmedDatePayment: data.confirmedDatePayment,
                        })
                        .where("id = :id", { id: id })
                        .execute();
    }
}