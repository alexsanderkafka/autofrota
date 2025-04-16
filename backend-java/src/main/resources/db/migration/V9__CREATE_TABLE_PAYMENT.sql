CREATE TABLE Payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    collectorId VARCHAR(255),
    paymentId VARCHAR(255),
    status VARCHAR(255) NOT NULL,
    externalRefence VARCHAR(255),
    paymentType VARCHAR(255),
    processingMode VARCHAR(255),
    merchantAccountId VARCHAR(255),
    confirmedDatePayment DATE,
    plan_id INT NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Company(id),
    FOREIGN KEY (plan_id) REFERENCES Plan(id)
);
