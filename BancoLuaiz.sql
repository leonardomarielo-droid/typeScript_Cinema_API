DROP DATABASE IF EXISTS Cinema;

CREATE DATABASE Cinema;
USE Cinema;

CREATE TABLE Usuario (
    Usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    Usuario_nome VARCHAR(255),
    Usuario_email VARCHAR(255),
    Usuario_senha VARCHAR(255)
);

CREATE TABLE Filme (
    Filme_id INT AUTO_INCREMENT PRIMARY KEY,
    Filme_titulo VARCHAR(255),
    Filme_duracao INT
);

CREATE TABLE Avaliacoes (
    Avaliacoes_id INT AUTO_INCREMENT PRIMARY KEY,
    Avaliacoes_nota FLOAT,
    Avaliacoes_mensagem VARCHAR(255),
    Avaliacoes_usuario INT,
    Avaliacoes_filme INT,
    
    FOREIGN KEY (Avaliacoes_usuario) 
        REFERENCES Usuario(Usuario_id),
        
    FOREIGN KEY (Avaliacoes_filme) 
        REFERENCES Filme(Filme_id)
);

###wwdwad wadwadwadawdwawdawdwasdaw
# duas biblias pra escrever T~T vida é injusta rgureyagraiurua

INSERT INTO Usuario VALUES
(1, 'Luiz Jardim', 'luiz@gmail.com', '$2b$12$fiQkpR8V0vd5xZbG8SJgBeD4huT.WZJ6kC5BvVP.gBu9g9ys9nBTm'), #--Lulu1508&
(2, 'Leonardo Marques', 'leoEmail@gmail.com', '$2b$12$pbtPJQw.VW7/yKzBkRpgzuXchV75ZZ50noC/YAiSODtJQlzBZ8f1e'), #--Canguru$123
(3, 'Marco Aurelio', 'marcos@gmail.com', '$2b$12$lTNK9Fo1ZXMm2U9qUdtPfO84pQvhgq4kcxpH3NH9mSpz6gwYzJhBC'); #--#Palmit0

INSERT INTO Filme
	(Filme_titulo, Filme_duracao) 
	VALUES ('Vingadores Ultimato', 181),
    ('Interestelar', 169),
    ('Batman O Cavaleiro das Trevas', 152);



INSERT INTO Avaliacoes VALUES
(1, 10, 'Ótimo filme!', 1, 1),
(2, 6, 'Filme interessante.', 2, 2),
(3, 4, 'Esperava mais...', 3, 3),
(4, 10, 'https://www.youtube.com/post/UgkxJNzglr0bkXzqyEDK7qD5LC-e3qU2JLW1', 2, 3);