import { MysqlDataSource } from "../database";
import ProfileImage from "../entity/ProfileImage";
import NotFoundImage from "../errors/NotFound";

export default class ProfileImageRepository{

    private orm = MysqlDataSource.getRepository(ProfileImage);

    public async findOneById(id: number): Promise<ProfileImage>{
        const image = await this.orm.findOneBy({id: id});
        
        if(!image) throw new NotFoundImage("Profile image does not exist");

        return image;
    }
}