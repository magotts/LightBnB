INSERT INTO users (name, email, password)
VALUES ('Anna', 'anna@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ben', 'ben@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Carmen', 'carmen@rocketmai;.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Casa Villa', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 100, 6, 4, 8, 'Canada', '12 Malvern St.', 'Scarborough', 'ON', 'M1B 3X4', true),
(2, 'The Mansion', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 200, 10, 15, 15, 'Canada', '30 Carlisle Dr.', 'Scarborough', 'ON', 'M3D W2E', true),
(3, 'Palacio de Canada', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 500, 20, 30, 30, 'Canada', '50 Carlisle Dr.', 'Scarborough', 'ON', 'M4R W1Y', true);

INSERT INTO reservations (start_date, end_date, property_id,guest_id)
VALUES ('2021-09-11', '2021-09-26', 1, 1),
('2021-02-05', '2021-02-10', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 1, 4, 'message'),
(2, 1, 2, 3, 'message'),
(3, 1, 3, 2, 'message');