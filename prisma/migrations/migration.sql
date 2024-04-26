CREATE TABLE gebruiker (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gebruikersnaam VARCHAR(50) NOT NULL,
    wachtwoord VARCHAR(255) NOT NULL,
    rol VARCHAR(20),
    salt VARCHAR(20),
    volwassenen INT,
    kinderen INT,
    dieren INT,
    dierengewend BOOLEAN,
    typewoning VARCHAR(50),
    tuin BOOLEAN,
    toestemming BOOLEAN,
    verblijf VARCHAR(50),
    opvangverblijf VARCHAR(50),
    alleenthuis VARCHAR(50),
    ervaringmetdier BOOLEAN,
    verwachtingen VARCHAR(360)
);

CREATE TABLE dier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naam VARCHAR(50),
    soort VARCHAR(20),
    ras VARCHAR(50),
    geslacht VARCHAR(50),
    geboortedatum VARCHAR(50),
    opmerkingen VARCHAR(380),
    datuminasiel VARCHAR(50),
    jongekinderen BOOLEAN,
    ouderekinderen BOOLEAN,
    anderekatten BOOLEAN,
    anderehonden BOOLEAN,
    tuinnodig BOOLEAN,
    sociaal VARCHAR(50)
);

CREATE TABLE adoptieform (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gebruikerid INT,
    FOREIGN KEY (gebruikerid) REFERENCES gebruiker(id),
    aantalmenseningezien INT,
    kinderen INT,
    andereDieren BOOLEAN,
    heeftTuin BOOLEAN,
    isHuurder BOOLEAN,
    tijdDierAlleenThuis varchar(50),
    heeftReedsErvaring BOOLEAN,
    verwachtingen TEXT,
    voorkeuren TEXT
);

