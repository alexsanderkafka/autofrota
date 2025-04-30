CREATE TABLE Feature(
    id INT PRIMARY KEY AUTO_INCREMENT,
    suport BOOLEAN NOT NULL,
    dashboard BOOLEAN NOT NULL,
    notify BOOLEAN NOT NULL,
    manage_vehicles BOOLEAN NOT NULL,
    checklist BOOLEAN NOT NULL,
    reports BOOLEAN NOT NULL
);