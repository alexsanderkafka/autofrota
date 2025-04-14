CREATE TABLE Plan(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    days INTEGER NOT NULL,
    price FLOAT NOT NULL,
    amount_vehicles INT NOT NULL,
    feature_id INT NOT NULL,
    FOREIGN KEY (feature_id) REFERENCES Feature(id)
);
