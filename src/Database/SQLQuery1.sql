
CREATE TABLE EventsTable (
id VARCHAR(100),
title VARCHAR(300),
description VARCHAR(300),
date DATE)


CREATE PROCEDURE  insertEvent(@id VARCHAR(100), @title VARCHAR(300) ,@description VARCHAR(300) ,@date DATE)
AS
BEGIN
INSERT INTO EventsTable (id, title, description , date)
VALUES (@id,@title, @description,@date)
END

EXEC insertEvent 'ahsdjfjasdj' , 'title' , 'Some Description', '2022-11-20'

CREATE PROCEDURE getEvents
AS
BEGIN
SELECT * FROm EventsTable
END

CREATE PROCEDURE getEvent(@id VARCHAR(50))
AS
BEGIN
SELECT * FROm EventsTable WHERE id =@id
END


CREATE PROCEDURE updateEvent(@id VARCHAR(100), @title VARCHAR(300) ,@description VARCHAR(300) ,@date DATE)
AS
BEGIN

UPDATE EventsTable SET id=@id , title=@title , description=@description ,date=@date
WHERE id = @id
END


CREATE PROCEDURE deleteEvent(@id VARCHAR(100))
AS
BEGIN
DELETE FROM EventsTable WHERE id =@id
END
