CREATE TABLE Company (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cnpj VARCHAR(30),
    cpf VARCHAR(30),
    phone VARCHAR (50) NOT NULL,
    zip_code VARCHAR(30) NOT NULL,
    address VARCHAR(255) NOT NULL,
    image_id INT NOT NULL,
    login_id INT NOT NULL,
    FOREIGN KEY (image_id) REFERENCES ProfileImage(id),
    FOREIGN KEY (login_id) REFERENCES Login(id)
);