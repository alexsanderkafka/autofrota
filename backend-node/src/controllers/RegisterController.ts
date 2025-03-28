import { Body, JsonController, Post, Req, Res } from "routing-controllers";

import RegisterService from "../services/RegisterService";
import RegisterDTO from "../dto/RegisterDTO";
import Business from "../entity/Business";
import PaymentService from "../services/PaymentService";


@JsonController("/register")
export default class RegisterController{

    private registerService: RegisterService = new RegisterService();
    private paymentService: PaymentService = new PaymentService();
    

    @Post()
    public async createUser(@Body( {required: true}) dto: RegisterDTO, @Res() res: any, @Req() req: any){
        console.log(dto);

        const business: Business = await this.registerService.create(dto);
        
        const response = await this.paymentService.createCheckoutPro(business, "http://localhost:3000", dto.plan, business.getId());

        return res.status(201).send(response);
    }

}