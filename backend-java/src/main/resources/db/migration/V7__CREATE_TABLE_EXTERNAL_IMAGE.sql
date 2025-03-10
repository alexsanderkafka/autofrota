CREATE TABLE external_image (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    left_image VARCHAR(255) NOT NULL,
    rear_image VARCHAR(255) NOT NULL,
    right_image VARCHAR(255) NOT NULL,
    front_image VARCHAR(255) NOT NULL
);
