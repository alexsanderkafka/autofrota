import { MysqlDataSource } from "../database";
import Business from "../entity/Business";

export default class BusinessRepository {
    private orm = MysqlDataSource.getRepository(Business);

    public async save(business: Business){
        return await this.orm.save(business);
    }

    public async findOneBusinessById(id: number)/*: Promise<Business>*/{
        return this.orm.findOne({ 
            where: { id: id },
            relations: ["payment", "payment.plan"]
        });
    }
}