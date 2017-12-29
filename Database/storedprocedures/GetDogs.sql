DROP PROCEDURE IF EXISTS GetDogs;
DELIMITER //
CREATE PROCEDURE GetDogs()
BEGIN

SELECT c1.dogID, c1.name, c1.favorites, breed1, breed2
FROM (
  (SELECT dogID, name, favorites, breed AS breed1
   FROM Dogs
   INNER JOIN
   Breeds
   ON Breeds.breedID = Dogs.breedID)
  AS c1
  INNER JOIN
  (SELECT name, breed as breed2
   FROM Dogs
   INNER JOIN
   Breeds
   ON Breeds.breedID = Dogs.secondaryBreedID)
  AS c2
  ON
  c1.name = c2.name
)
UNION
SELECT dogID, name, favorites, breed AS breed1, NULL AS breed2
FROM (
  (SELECT *
   FROM Dogs
   WHERE secondaryBreedID IS NULL)
  AS d1
  INNER JOIN
  Breeds
  ON
  Breeds.breedID = d1.breedID
)
ORDER BY dogID;

END //
DELIMITER ;
