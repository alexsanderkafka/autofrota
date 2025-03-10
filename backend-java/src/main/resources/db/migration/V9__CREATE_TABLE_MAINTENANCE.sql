CREATE TABLE maintenance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    latest_maintenance DATE NOT NULL,
    date_next_maintenance DATE NOT NULL,
    date_maintenance DATE,
    observation TEXT NOT NULL,
    status VARCHAR(255) NOT NULL,
    vehicle_identification_id BIGINT,
    FOREIGN KEY (vehicle_identification_id) REFERENCES vehicle_identification(id)
);