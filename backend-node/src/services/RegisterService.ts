import RegisterDTO from "../dto/RegisterDTO";
import Business from "../entity/Business";
import Login from "../entity/Login";
import LoginRepository from "../repository/LoginRepository";
import BusinessRepository from "../repository/BusinessRepository";
import Payment from "../entity/Payment";
import Plan from "../entity/Plan";
import ProfileImage from "../entity/ProfileImage";
import ProfileImageRepository from "../repository/ProfileImageRepository";


export default class RegisterService{ 

    private loginRepository: LoginRepository = new LoginRepository()
    private businessRepository: BusinessRepository = new BusinessRepository();
    private profileImageRepository: ProfileImageRepository = new ProfileImageRepository();
    

    public async create(dto: RegisterDTO): Promise<Business>{
        const currentLogin: Login = new Login(dto.email, dto.pass, false);

        //Falta colocar o criptografia na senha
        const savedLogin: Login = await this.loginRepository.save(currentLogin);

        const profileImage: ProfileImage = await this.profileImageRepository.findOneById(1);
        

        const business: Business = new Business(dto.name, dto.cnpj, dto.zipCode, dto.address, dto.phone, profileImage, savedLogin);

        return await this.businessRepository.save(business);
        //const currentPayment: Payment = new Payment(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, plan: Plan, business: Business)
    }
}