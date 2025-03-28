import { ExpressErrorMiddlewareInterface, ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import RegisterDTO from "../dto/RegisterDTO";
import EmptyField from "../errors/EmptyField";


@Middleware({ type: 'before' })
export default class RegisterValidationMiddleware implements ExpressMiddlewareInterface {

    use(request: any, response: any, next: (err?: any) => any) {
        const dto: RegisterDTO = request.body;

        console.log(request.body);

        console.log(dto);

         // Name validation
         if (!dto.name) {
            throw new EmptyField('Nome inválido. O nome deve ter no mínimo 2 caracteres.');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!dto.email || !emailRegex.test(dto.email)) {
            throw new EmptyField('E-mail inválido.');
        }
        if (!dto.pass || dto.pass.length < 8) {
            throw new EmptyField('Senha inválida. A senha deve ter no mínimo 8 caracteres.');
        }

        if (dto.pass !== dto.confirmPass) {
            throw new EmptyField('As senhas não coincidem.');
        }

        // Zip code validation (assuming Brazilian format)
        const zipCodeRegex = /^\d{5}-\d{3}$/;
        if (!dto.zipCode || !zipCodeRegex.test(dto.zipCode)) {
            throw new EmptyField('CEP inválido. Use o formato 12345-678.');
        }

        /*
        if (dto.cnpj) {
            const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
            if (!cnpjRegex.test(dto.cnpj)) {
                throw new EmptyField('CNPJ inválido. Use o formato 12.345.678/0001-90.');
            }
        }*/

        // Phone validation (assuming Brazilian format)
        const phoneRegex = /^\+55 \(\d{2}\) \d{4,5}-\d{4}$/;
        if (!dto.phone || !phoneRegex.test(dto.phone)) {
            throw new EmptyField('Telefone inválido. Use o formato +55 (11) 98765-4321.');
        }

        // Address validation
        if (!dto.address) {
            throw new EmptyField('Endereço inválido. Forneça um endereço completo.');
        }

        // Plan validation
        if (dto.plan === undefined || !dto.plan) {
            throw new EmptyField('Plano inválido.');
        }

        // If no errors, proceed to the next middleware/route handler
        next();
    }
}