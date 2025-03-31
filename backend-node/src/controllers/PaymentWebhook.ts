import { Payment } from "mercadopago";
import { client } from "../mercadopago";
import MercadoPagoSecurity from "../security/MercadoPagoSecutiry";
import PaymentService from "../services/PaymentService";

import { 
    JsonController,
    Post,
    Body,
    Req,
    Res,
 } from "routing-controllers";

@JsonController("/webhook/mercado-pago")
export default class PaymentWebhook{
    private mpSecurity: MercadoPagoSecurity = new MercadoPagoSecurity();
    private paymentService: PaymentService = new PaymentService();

    //private mailService: EmailService = new EmailService();

    @Post()
    public async paying(@Body() body: any, @Req() req: any, @Res() res: any){
        const xSignature = req.headers['x-signature'];
        const xRequestId = req.headers['x-request-id'];

        await this.mpSecurity.verifySignature(xSignature, xRequestId, req);

        try{

            const { type, data } = body;

            if(type == "payment"){

                const payment = new Payment(client);
                const paymentData = await payment.get({ id: data.id});

                const dataToUpdate = {
                    personId: paymentData.metadata.id,
                    collectorId: paymentData.collector_id,
                    paymentId: paymentData.payment_method?.id,
                    status: paymentData.status,
                    externalReference: paymentData.external_reference,
                    paymentType: paymentData.payment_method?.type,
                    processingMode: paymentData.processing_mode,
                    merchantAccountId: paymentData.merchant_account_id,
                    planId: paymentData.metadata.plan
                }

                const response: any = await this.paymentService.updatePayment(dataToUpdate);

                if(!response){
                    console.log("Error 400, payment not updated")
                    return res.status(400).send();
                }

                //Chamar a parte que envia o email
            }

        }catch(err){
            console.log("Payment confirm error: " + err);
            //colocar um error 400
        }

        return res.status(200).send();

    }
}