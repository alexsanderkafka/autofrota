import { MysqlDataSource } from "../database";
import Login from "../entity/Login";

export default class LoginRepository{

    private orm = MysqlDataSource.getRepository(Login);

    public async save(login: Login){
        return await this.orm.save(login);
    }
}