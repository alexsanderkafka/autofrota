CREATE TABLE Service (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    maintenance_id INT NOT NULL,
    FOREIGN KEY (maintenance_id) REFERENCES Maintenance(id)
);
