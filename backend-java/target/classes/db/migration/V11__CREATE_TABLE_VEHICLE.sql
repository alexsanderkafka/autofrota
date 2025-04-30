CREATE TABLE Vehicle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plate VARCHAR(20) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(50) NOT NULL,
    type_fuel VARCHAR(30) NOT NULL,
    km BIGINT NOT NULL,
    category VARCHAR(50) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    image_id INT NOT NULL,
    company_id INT NOT NULL,
    vehiclestatus_id INT NOT NULL,
    FOREIGN KEY (image_id) REFERENCES VehicleImage(id),
    FOREIGN KEY (company_id) REFERENCES Company(id),
    FOREIGN KEY (vehiclestatus_id) REFERENCES VehicleStatus(id)
);
