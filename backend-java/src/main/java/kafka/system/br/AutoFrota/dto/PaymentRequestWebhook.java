package kafka.system.br.AutoFrota.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PaymentRequestWebhook(
    String action,

    @JsonProperty("api_version")
    String apiVersion,

    String data,

    @JsonProperty("date_created")
    String dateCreated,

    String id,

    @JsonProperty("live_mode")
    boolean liveMode,

    String type,

    @JsonProperty("user_id")
    long userId
) {
    
}
