CREATE TABLE vehicle_identification (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plate VARCHAR(30) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year VARCHAR(100) NOT NULL,
    image_perfil VARCHAR(255) NOT NULL,
    vehicle_code VARCHAR(100),
    vehicle_characteristic_id BIGINT,
    external_image_id BIGINT,
    internal_image_id BIGINT,
    business_id BIGINT,
    FOREIGN KEY (vehicle_characteristic_id) REFERENCES vehicle_characteristic(id),
    FOREIGN KEY (external_image_id) REFERENCES external_image(id),
    FOREIGN KEY (internal_image_id) REFERENCES internal_image(id),
    FOREIGN KEY (business_id) REFERENCES business(id)
);
