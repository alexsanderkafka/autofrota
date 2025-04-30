CREATE TABLE VehicleDriver (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    driver_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    FOREIGN KEY (driver_id) REFERENCES Driver(id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicle(id)
);
