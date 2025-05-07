CREATE TABLE Maintenance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    done BOOLEAN NOT NULL,
    observation TEXT NOT NULL,
    scheduled BOOLEAN NOT NULL,
    total_value FLOAT,
    vehicle_id INT NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicle(id)
);
