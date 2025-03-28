import { Payment } from "mercadopago";
import { MysqlDataSource } from "../database";

export default class PaymentRepository{

    private orm = MysqlDataSource.getRepository(Payment);
}