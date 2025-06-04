CREATE TABLE Payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    collector_id VARCHAR(255),
    payment_id VARCHAR(255),
    status VARCHAR(255) NOT NULL,
    external_reference VARCHAR(255),
    payment_type VARCHAR(255),
    processing_mode VARCHAR(255),
    merchant_account_id VARCHAR(255),
    confirmed_date_payment DATE,
    plan_id INT NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Company(id),
    FOREIGN KEY (plan_id) REFERENCES Plan(id)
);
