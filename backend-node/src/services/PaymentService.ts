import { InternalServerError } from "routing-controllers";

import PlanRepository from "../repository/PlanRepository";
import PaymentRepository from "../repository/PaymentRepository";
import Business from "../entity/Business";

import { client } from "../mercadopago"
import { Preference } from "mercadopago";


export default class PaymentService{

    private planRepository: PlanRepository = new PlanRepository();
    private paymentRepository: PaymentRepository = new PaymentRepository();

    public async createCheckoutPro(business: Business, origin: string, plan: number, testId: number){
        const currentPlan = await this.planRepository.findOnePlanById(plan);

        const userEmail = business.getLogin().getEmail();

        try {
            const preference = new Preference(client);

            const createdPreference = await preference.create({
                body: {
                external_reference: `${testId}`,
                metadata: {
                    id: testId,
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

            return JSON.stringify({
                preferenceId: createdPreference.id,
                initPoint: createdPreference.init_point,
            });

            } catch (err) {
                console.log(err);
                throw new InternalServerError("Internal Server Error");
            }
        }
}