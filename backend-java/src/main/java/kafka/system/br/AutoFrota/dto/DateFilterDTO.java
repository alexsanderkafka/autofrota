package kafka.system.br.AutoFrota.dto;

import java.util.Date;

public record DateFilterDTO(
    Date startDate,
    Date endDate
) {
    public DateFilterDTO() {
        this(
            null,
            null
        );
    }

    public DateFilterDTO(Date startDate, Date endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
