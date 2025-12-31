CREATE DATABASE IF NOT EXISTS moneylag_app;
USE moneylag_app;

CREATE TABLE entries (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  amount DOUBLE NOT NULL,
  description VARCHAR(255) NOT NULL,
  date DATE NOT NULL  
);

CREATE USER IF NOT EXISTS 'moneylag'@'%' IDENTIFIED BY 'moneylagApp@1';
GRANT ALL ON moneylag_app.* TO 'moneylag'@'%';
FLUSH PRIVILEGES;