insert into "users" ("displayName", "profilePhoto", "email", "dateOfBirth", "password")
values ('Jim Bob', 'example.png', 'anonymous@gmail.com', '1995-09-10', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA');

insert into "runs" ("userId", "title", "description", "date", "duration", "distance", "hasGpx")
values (1, 'Morning Sun Run', 'Easy run with Zain -- great weather!', '2022-11-10', '00:40:30', 4.1, false)
