/*Créer un table mot de passe*/
create table mdp(
    id VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100)
)

/*Remplir les données de la table à partir de tusers*/
insert into mdp(id,password) 
(select id,password from tusers);

/*Table Entrées*/
create table entree (
    id_ent INT(100) AUTO_INCREMENT PRIMARY KEY,
    nom_ent VARCHAR(100),
    date_ent VARCHAR(100),
    heure_ent VARCHAR(100),
    id VARCHAR(100)
)
/*Table Sorties*/
create table sortie (
      id_sortie INT(100) AUTO_INCREMENT PRIMARY KEY,
    id_ent INT(100) ,
    code_ent VARCHAR(100),
     id VARCHAR(100),
    nom_sort VARCHAR(100),
    date_sort VARCHAR(100),
    heure_sort VARCHAR(100),
    recepteur VARCHAR(100),

    moyen_transport VARCHAR(100),
    voiture_id VARCHAR(100),
   responsable_nom VARCHAR(100),
   heure_sort_sec VARCHAR(100),
   date_sort_sec VARCHAR(100),

   moyen_transport2 VARCHAR(100),
    voiture_id2 VARCHAR(100),
   responsable_nom2 VARCHAR(100),
   heure_sort_sec2 VARCHAR(100),
   date_sort_sec2 VARCHAR(100),


    securite1 VARCHAR(100),
    securite2 VARCHAR(100),
    etat_sortie VARCHAR(100)
)

/*Table voiture*/
create table voiture (
    id_voit INT(100) AUTO_INCREMENT PRIMARY KEY,
    immatriculation VARCHAR(100),
    id VARCHAR(100)
)

insert into voiture (immatriculation,id) values
("2040-TAB",1),
("2968-TAE",5),
("SV-22-BIE",6);


/*Tables entrées de matériels presonnels*/
CREATE TABLE entreePersonnel(
    id_ent_pers INT (100) AUTO_INCREMENT PRIMARY KEY,
    id varchar(100),
    nom_mat VARCHAR(100),
    nom_responsable VARCHAR(100),
    departement VARCHAR(100),
    date_ent VARCHAR(100)
)

CREATE TABLE sortiePersonnel(
    id_sort_pers INT (100) AUTO_INCREMENT PRIMARY KEY,
   id_ent_pers INT (100) ,
    id varchar(100),
    nom_mat VARCHAR(100),
    nom_responsable VARCHAR(100),
    departement VARCHAR(100),
    date_sort VARCHAR(100)
)
/*Table pour token*/
CREATE TABLE tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT ,
    token VARCHAR(255) 
);
/*Table admin*/
create table admin(
    id INT(10) AUTO_INCREMENT PRIMARY key,
    numero VARCHAR(255),
    mot_de_passe VARCHAR(255)
)

insert into admin (numero,mot_de_passe) values (0,0)

/*Tables notification*/
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isREad BOOLEAN
);


/*Transférer les données de la table entrées vers la table sortie*/
insert into sortie(nom_sort,nbr_sort,heure_sort,id) 
select nom_ent,nbr_ent,heure_ent,id from entree where id_ent=2;

/*Historiques*/
select * from entree limit 4;

/*Inner join entre entrée et client*/
select * from entree inner join client on client.id=entree.id;

update sortie set heure_sort=2 and id=41 where id_ent=12;

/*Table sécurité*/
create table securite (
    id_securite VARCHAR(100),
    mot_de_passe VARCHAR(100)
)
insert into securite VALUES
("securite1","MellisSecurite1"),
("securite2","MellisSecurite2");

/*Table finale sortie*/
SELECT * from sortie inner join entree on sortie.id_ent=entree.id_ent 
inner join tusers on tusers.id=sortie.id

select * from entree inner join sortie on entree.id_ent=sortie.id_ent inner join tusers on tusers.id=entree.id;


/*Chart*/

/*Obtenir la date 6 jours après la première date*/
SELECT COUNT(id_ent) as somme
FROM entree
WHERE id = 1
  AND date_ent BETWEEN '2023-11-13' AND DATE_ADD('2023-11-13', INTERVAL 6 DAY);

/*Obtenir le nombre d'entrée par jour*/
SELECT date_ent, COUNT(id_ent)  as somme
    FROM entree
    WHERE id = ?
      AND date_ent BETWEEN '2023-11-13' AND DATE_ADD('2023-11-13', INTERVAL 6 DAY)
    GROUP BY date_ent

/*Obtenir la date par jour*/
SELECT date_ent
FROM entree
WHERE id = 1
  AND date_ent BETWEEN '2023-11-13' AND DATE_ADD('2023-11-13', INTERVAL 6 DAY)
GROUP BY date_ent;

/*Obtenir le nombre d'entrée par jour*/
SELECT COUNT(id_ent)
FROM entree
WHERE id = 1
  AND date_ent BETWEEN '2023-11-13' AND DATE_ADD('2023-11-13', INTERVAL 6 DAY)
GROUP BY date_ent;


insert into entree (id_ent, nom_ent,date_ent,heure_ent,id) values (281,"Souris","2023-12-12",CURTIME(),1);


insert into sortie (id_sortie, nom_sort,date_sort,heure_sort,id) values (9,"Clavier","2023-12-11",CURTIME(),1);


/*Percentage*/
Select count(id_ent) as total from entree ;

Select count(id_ent) as total_âr_id from entree where id=1;