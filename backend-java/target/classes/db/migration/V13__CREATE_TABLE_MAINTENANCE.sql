CREATE TABLE Maintenance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    done BOOLEAN NOT NULL,
    observations TEXT,
    scheduled BOOLEAN NOT NULL,
    vehicle_id INT NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicle(id)
);
