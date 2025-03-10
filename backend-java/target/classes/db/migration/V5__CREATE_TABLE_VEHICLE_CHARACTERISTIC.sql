CREATE TABLE vehicle_characteristic (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_type VARCHAR(100) NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    status BOOLEAN NOT NULL,
    current_km VARCHAR(255) NOT NULL,
    color VARCHAR(100) NOT NULL,
    chassi_number VARCHAR(255) NOT NULL,
    renavam VARCHAR(255) NOT NULL,
    engine_liter FLOAT NOT NULL,
    average_consume FLOAT NOT NULL
);
