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
    user_winnings INT default 0,
    user_points INT default 1000,
    constraint userID foreign key(user_id) references users(id) on delete cascade
);


DELIMITER $$
create procedure createUser(
	IN _username varchar(255),
    IN _email varchar(255),
    IN _password varchar(255)
)

begin
	declare userId INT;
    
    insert into users(username, email, password) values(_username, _email, _password);
    select id into userId from users where username =_username ;
    insert into user_info(user_id) value(userId);
END$$

DELIMITER ;

select * from users;
select * from user_info