CREATE database online_mayhem;

use online_mayhem;

CREATE TABLE users(
	id INT auto_increment primary key,
	username varchar(255) unique,
	email varchar(255) unique,
    password varchar(255)
);

CREATE TABLE user_info(
	user_id INT,
    user_winnings INT,
    user_points INT default 1000,
    constraint userID foreign key(user_id) references users(id) on delete cascade
);