insert into "users" ("displayName", "profilePhoto", "email", "dateOfBirth", "password")
values ('Jim Bob', 'example.png', 'anonymous@gmail.com', '1995-09-10', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA');

insert into "runs" ("userId", "title", "description", "date", "duration", "distance", "distanceUnits", "hasGpx")
values (1, 'Morning Sun Run', 'Easy run with Zain -- great weather!', '2022-12-10', '00:40:30', 4.1, 'yards', false);

insert into "runs" ("userId", "title", "description", "date", "duration", "distance", "distanceUnits", "hasGpx")
values (1, 'Morning Sun Run', 'Easy run with Zain -- great weather!', '2022-08-10', '00:40:30', 4.1, 'kilometers', false);

insert into "runs" ("userId", "title", "description", "date", "duration", "distance", "distanceUnits", "hasGpx")
values (1, 'Morning Sun Run', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae quod est labores corrupti at facilis.', '2022-01-10', '00:40:30', 4.1, 'miles', false);

insert into "runs" ("userId", "title", "description", "date", "duration", "distance", "distanceUnits", "hasGpx")
values (1, 'Morning Sun Run', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae quod est labore odit id possimus, placeat cum nemo doloremque doloribus sed a maxime temporibus in quasi dolores corrupti at facilis.', '2022-03-10', '00:40:30', 8.1, 'miles', false);

insert into "runs" ("userId", "title", "description", "date", "duration", "distance", "distanceUnits", "hasGpx")
values (1, 'Morning Sun Run', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae quod est labore odit id possimus, placeat cum nemo doloremque doloribus sed a maxime temporibus in quasi dolores corrupti at facilis.', '2022-03-10', '00:40:30', 8.1, 'miles', false);
