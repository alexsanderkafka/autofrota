import { MysqlDataSource } from "../database";
import Plan from "../entity/Plan";
import NotFound from "../errors/NotFound";

export default class PlanRepository{

    private orm = MysqlDataSource.getRepository(Plan);

    public async findOnePlanById(id: number): Promise<Plan>{
        const plan = await this.orm.findOneBy({id: id});
                
        if(!plan) throw new NotFound("Plan does not exist");
        
        return plan;
    }
}