CREATE TABLE users (
    firstname VARCHAR(45),
    lastname VARCHAR(45),
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    mobile VARCHAR(15),
    flightname VARCHAR(100),
    from_location VARCHAR(100),
    to_location VARCHAR(100),
    traveldate VARCHAR(20),
    returndate VARCHAR(20),
    numtickets VARCHAR(10),
    cost VARCHAR(20),
    triptype VARCHAR(20)
);
