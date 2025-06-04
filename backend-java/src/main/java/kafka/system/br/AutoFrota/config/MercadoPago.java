package kafka.system.br.AutoFrota.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mercadopago.MercadoPagoConfig;

import jakarta.annotation.PostConstruct;

@Configuration
public class MercadoPago {

    @Value("${mercadopago.access-token}")
    private String accessToken;
    
    @PostConstruct
    public void init(){
        MercadoPagoConfig.setAccessToken(accessToken);
    }
}
