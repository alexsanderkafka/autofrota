package kafka.system.br.AutoFrota.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferencePayerRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import com.mercadopago.resources.preference.PreferenceBackUrls;

import kafka.system.br.AutoFrota.dto.MercadoPagoDTO;
import kafka.system.br.AutoFrota.dto.RegisterDTO;
import kafka.system.br.AutoFrota.exception.MercadoPagoException;
import kafka.system.br.AutoFrota.exception.NotFoundEntityException;
import kafka.system.br.AutoFrota.exception.PasswordIsNotConfirmedException;
import kafka.system.br.AutoFrota.model.Company;
import kafka.system.br.AutoFrota.model.Login;
import kafka.system.br.AutoFrota.model.Payment;
import kafka.system.br.AutoFrota.model.Plan;
import kafka.system.br.AutoFrota.repository.CompanyRepository;
import kafka.system.br.AutoFrota.repository.LoginRepository;
import kafka.system.br.AutoFrota.repository.PaymentRepository;
import kafka.system.br.AutoFrota.repository.PlanRepository;
import kafka.system.br.AutoFrota.utils.Email;

@Service
public class PaymentService {

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private Email emailUtil;

    public MercadoPagoDTO createCheckoutPro(RegisterDTO dto, Company company){

        Plan currentPlan = planRepository.findById(dto.planId()).orElseThrow(() -> new NotFoundEntityException("Esse plano não existe"));

        String userEmail = company.getLogin().getEmail();

        try {
            
            PreferenceItemRequest item = PreferenceItemRequest.builder()
                .title(currentPlan.getName())
                .description(currentPlan.getDescription())
                .quantity(1)
                .currencyId("BRL")
                .unitPrice(new BigDecimal(currentPlan.getPrice()))
                .build();



            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                .success("https://localhost:5173")
                .failure("https://localhost:5173")
                .pending("https://localhost:5173")
                .build();

            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(item);

            PreferencePayerRequest payer = PreferencePayerRequest.builder()
                .name(company.getName())
                .email(userEmail)
                .build();

            
            Payment savedPayment = this.savePayment(company, currentPlan);

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .metadata(createMetadata(company.getExternalId(), userEmail, dto.planId(), savedPayment.getId()))
                .externalReference(company.getExternalId())
                .payer(payer)
                .backUrls(backUrls)
                .items(items)
                .autoReturn("approved")
                .build();

    
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            if(preference.getId() == null){
                throw new MercadoPagoException("Não foi possível criar o pagamento");
            }

            MercadoPagoDTO mercadoPagoDTO = new MercadoPagoDTO(preference.getId(), preference.getInitPoint());

            return mercadoPagoDTO;

        } catch (Exception e) {
            System.out.println(e);
            System.out.println(e.getMessage());
            throw new MercadoPagoException("Não foi possível criar o pagamento");
        }
    }

    public void updatedPayment(Map<String, Object> body){


        String type = (String) body.get("type");

        try {
            if(type.equals("payment")){

                //data
                Map<String, Object> data = (Map<String, Object>) body.get("data");

                String paymentId = (String) data.get("id");

                PaymentClient client = new PaymentClient();
                com.mercadopago.resources.payment.Payment payment = client.get(Long.parseLong(paymentId));

                String collectorId = payment.getCollectorId().toString();
                String paymentTypeId = payment.getPaymentTypeId();
                String status = "approved";
                String externalReference = payment.getExternalReference();
                String paymentType = payment.getPaymentMethodId();
                String processingMode = payment.getProcessingMode();
                String merchantAccountId = payment.getMerchantAccountId();
                String confirmedDatePayment = payment.getDateApproved().toString();


                //Metadata
                Map<String, Object> metadata = payment.getMetadata();
                System.out.println(metadata);

                Double paymentIdDouble = (Double) metadata.get("payment_id");
                Long currentPaymentId = paymentIdDouble.longValue();
            
                Payment currentPayment = paymentRepository.findById(currentPaymentId).orElseThrow(() -> new NotFoundEntityException("Esse pagamento não existe"));
                currentPayment.setCollectorId(collectorId);;
                currentPayment.setPaymentId(paymentTypeId);
                currentPayment.setStatus(status);
                currentPayment.setExternalRefence(externalReference);
                currentPayment.setPaymentType(paymentType);
                currentPayment.setProcessingMode(processingMode);
                currentPayment.setMerchantAccountId(merchantAccountId);
                currentPayment.setConfirmedDatePayment(new Date());

                paymentRepository.save(currentPayment);
                String email = (String) metadata.get("user_email");
                this.updatedLogin(email);


                this.emailUtil.sendPaymentConfirmation(email);
                

            }
        } catch (Exception e) {
            System.out.println(e);
            System.out.println(e.getMessage());
            System.out.println("Caindo em error");
            throw new MercadoPagoException("Não foi possível atualizar o pagamento");
        }
    }

    private Map<String, Object> createMetadata(String companyId, String userEmail, Long planId, Long paymentId) {
        Map<String, Object> metadata = new HashMap<>();

        metadata.put("id", companyId);
        metadata.put("userEmail", userEmail);
        metadata.put("plan", planId);
        metadata.put("paymentId", paymentId);

        return metadata;
    }

    private Payment savePayment(Company company, Plan plan){

        Payment payment = new Payment("unpaid", plan, company);

        return paymentRepository.save(payment);
    }

    private void updatedLogin(String email){
        Login login = loginRepository.findByCompanyEmail(email);
        login.setActive(true);
        loginRepository.save(login);
    }
}
