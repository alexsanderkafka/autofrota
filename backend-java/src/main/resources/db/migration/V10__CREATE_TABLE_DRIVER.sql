CREATE TABLE Driver (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    company_id INT NOT NULL,
    image_id INT NOT NULL,
    login_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Company(id),
    FOREIGN KEY (image_id) REFERENCES ProfileImage(id),
    FOREIGN KEY (login_id) REFERENCES Login(id)
);
