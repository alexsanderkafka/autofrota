CREATE TABLE ProfileImage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url TEXT NOT NULL
);

CREATE TABLE Plan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    days INT NOT NULL,
    price FLOAT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE Login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NULL,
    password TEXT NULL,
    active BOOLEAN NULL
);

CREATE TABLE Business (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(255) NULL,
    zip_code VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    image_id INT NOT NULL,
    login_id INT NOT NULL,
    FOREIGN KEY (image_id) REFERENCES ProfileImage(id),
    FOREIGN KEY (login_id) REFERENCES Login(id)
);

CREATE TABLE Payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    collector_id VARCHAR(255) NULL,
    payment_id VARCHAR(255) NULL,
    status VARCHAR(255) NOT NULL,
    external_reference VARCHAR(255) NULL,
    payment_type VARCHAR(255) NULL,
    processing_mode VARCHAR(255) NULL,
    merchant_account_id VARCHAR(255) NULL,
    confirmed_date_payment DATE NULL,
    plan_id INT NOT NULL,
    business_id INT NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES Plan(id),
    FOREIGN KEY (business_id) REFERENCES Business(id)
);

INSERT INTO Plan (name, days, price, description) 
VALUES 
('Plano Básico', 30, 49.90, 'Plano de 30 dias com acesso básico a todos os serviços'),
('Plano Premium', 90, 129.90, 'Plano de 90 dias com acesso básico a todos os serviços');


INSERT INTO ProfileImage (url) 
VALUES
("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9cSGzVkaZvJD5722MU5A-JJt_T5JMZzotcw&s");