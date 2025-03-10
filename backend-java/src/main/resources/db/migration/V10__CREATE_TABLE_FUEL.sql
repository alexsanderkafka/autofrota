CREATE TABLE fuel (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    latest_fuel DATE NOT NULL,
    litter FLOAT NOT NULL,
    price FLOAT NOT NULL,
    km VARCHAR(255) NOT NULL,
    fuel_type VARCHAR(100) NOT NULL,
    vehicle_identification_id BIGINT,
    FOREIGN KEY (vehicle_identification_id) REFERENCES vehicle_identification(id)
);
