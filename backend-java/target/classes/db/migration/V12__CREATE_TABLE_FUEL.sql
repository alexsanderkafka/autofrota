CREATE TABLE Fuel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    liters FLOAT NOT NULL,
    total_value FLOAT NOT NULL,
    km INTEGER NOT NULL,
    date DATE NOT NULL,
    type VARCHAR(50) NOT NULL,
    vehicle_id INT NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicle(id)
);
