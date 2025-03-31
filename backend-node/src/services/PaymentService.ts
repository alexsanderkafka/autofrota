import { InternalServerError } from "routing-controllers";

import PlanRepository from "../repository/PlanRepository";
import PaymentRepository from "../repository/PaymentRepository";
import BusinessRepository from "../repository/BusinessRepository";
import Business from "../entity/Business";

import { client } from "../mercadopago"
import { Preference } from "mercadopago";
import Plan from "../entity/Plan";
import Payment from "../entity/Payment";
import NotFound from "../errors/NotFound";

import { format } from "date-fns";


export default class PaymentService{

    private planRepository: PlanRepository = new PlanRepository();
    private paymentRepository: PaymentRepository = new PaymentRepository();

    private businessRepository: BusinessRepository = new BusinessRepository();
    

    public async createCheckoutPro(business: Business, origin: string, plan: number, testId: number){
        const currentPlan = await this.planRepository.findOnePlanById(plan);

        const userEmail = business.getLogin().getEmail();

        try {
            const preference = new Preference(client);

            const createdPreference = await preference.create({
                body: {
                external_reference: `${testId}`,
                metadata: {
                    id: business.getId(),
                    userEmail: userEmail,
                    plan: plan,
                },
                ...(userEmail && {
                    payer: {
                    email: userEmail,
                    },
                }),
                items: [
                    {
                    id: `${currentPlan.getId()}`,
                    description: currentPlan.getDescription(),
                    title: currentPlan.getName(),
                    quantity: 1,
                    unit_price: currentPlan.getPrice(),
                    currency_id: "BRL",
                    category_id: "category",
                    },
                ],
                payment_methods: {
                    installments: 12,
                },
                auto_return: "approved",
                back_urls: {
                    success: `${origin}/?status=sucesso`,
                    failure: `${origin}/?status=falha`,
                    pending: `${origin}/api/mercado-pago/pending`,
                },
                },
            });

            if (!createdPreference.id) {
                throw new Error("No preferenceID");
            }

            await this.savePayment(business, plan);

            return JSON.stringify({
                preferenceId: createdPreference.id,
                initPoint: createdPreference.init_point,
            });

            } catch (err) {
                console.log(err);
                throw new InternalServerError("Internal Server Error");
        }
    }

    public async updatePayment(data: any){
        console.log(data);

        const payment: any = await this.paymentRepository.findOnePaymentByBusinessId(data.personId);

        if(!payment){
            console.log("Payment not found");
            throw new NotFound("Payment not found");
        }

        const confirmedDatePayment = new Date();

        data["confirmedDatePayment"] = format(confirmedDatePayment, "yyyy-MM-dd HH:mm:ss");

        const updatedPayment = await this.paymentRepository.updatePayment(data, payment.id);

        console.log("Update: \n" + updatedPayment);

        return updatedPayment;

        //Ou aqui pode colocar a parte de enviar o email
    }

    private async savePayment(business: Business, planId: number){
        const plan: Plan = await this.planRepository.findOnePlanById(planId);

        const currentPayment: Payment = new Payment(undefined, undefined, "unpaid", undefined, undefined, undefined, undefined, undefined, plan, business);
    
        await this.paymentRepository.save(currentPayment);
    }
}