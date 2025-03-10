CREATE TABLE login (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL,
    business_id BIGINT,
    CONSTRAINT fk_business
            FOREIGN KEY (business_id) REFERENCES business(id)
);