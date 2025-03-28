import { MysqlDataSource } from "../database";
import Business from "../entity/Business";

export default class BusinessRepository {
    private orm = MysqlDataSource.getRepository(Business);

    public async save(business: Business){
        return await this.orm.save(business);
    }
}