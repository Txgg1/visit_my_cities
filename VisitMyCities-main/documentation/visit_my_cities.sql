-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 25 mars 2024 à 09:30
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `visit_my_cities`
--

-- --------------------------------------------------------

--
-- Structure de la table `architect`
--

DROP TABLE IF EXISTS `architect`;
CREATE TABLE IF NOT EXISTS `architect` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `architect`
--

INSERT INTO `architect` (`id`, `firstname`, `name`) VALUES
(1, 'François', 'Spoerry'),
(2, 'Maurice', 'Baumeister'),
(3, 'Jean-Baptiste', 'Schacre'),
(4, 'Valentin', 'Fries'),
(5, 'Rodo', 'Tisnado'),
(6, 'Jean-François', 'Bonne'),
(7, 'Alain', 'Bretagnolle'),
(8, 'René-Henri', 'Arnaud'),
(9, 'Laurent-Marc', 'Fischer'),
(10, 'Gaston', 'Valente'),
(11, 'Martin', 'Robain'),
(12, 'Jean', 'Hültz'),
(13, 'Ulrich', 'D’Ensingen'),
(14, 'Claus', 'De Lore'),
(15, 'Michel', 'Parler'),
(16, 'Maître Conrad', NULL),
(17, 'Johann', 'Gerlach'),
(18, 'Johannes', 'Erwin'),
(19, 'Erwin', 'De Steinbach'),
(20, 'Gaetano', 'Pesce'),
(21, 'Joseph', 'Müller');

-- --------------------------------------------------------

--
-- Structure de la table `building`
--

DROP TABLE IF EXISTS `building`;
CREATE TABLE IF NOT EXISTS `building` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `description` text,
  `end_build` int NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_build` int NOT NULL,
  `city_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKka5gco347l90i1iho7q7u22hp` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `building`
--

INSERT INTO `building` (`id`, `address`, `description`, `end_build`, `latitude`, `longitude`, `name`, `start_build`, `city_id`) VALUES
(1, '3 Boulevard de l\'Europe, 68100 Mulhouse', 'La Tour de l\'Europe est un gratte-ciel en béton armé essentiellement résidentiel qui est situé dans le centre-ville de Mulhouse, en France. Sa forme triangulaire symbolise, entre autres, la région mulhousienne, zone de jonction de trois pays européens : l\'Allemagne, la France et la Suisse.', 1972, 47.749929, 7.340429, 'Tour de l\'Europe', 1969, 1),
(2, 'Avenue Auguste Wicky, 68100 Mulhouse', 'L\'immeuble-tour Wilson est un immeuble de bureaux et d\'appartements qui a été achevé en 1972.', 1972, 47.743554, 7.341463, 'Tour Wilson', 0, 1),
(3, '7 Rue Pierre et Marie Curie, 68200 Mulhouse', 'En 1911, la ville décide de la construction d\'un établissement de bains. Maurice Baumeister est chargé du projet. Après une interruption de chantier au cours de la Première guerre mondiale, l\'établissement est inauguré en 1925. Il comprend deux bassins de natation, des cabines avec baignoires et des bains romains au premier étage. Réalisés en 1925, les vitraux de Joseph Ehrismann garnissent les baies du hall et celles des bains romains. L\'édifice a conservé son réseau d\'adduction d\'eau et sa chaudière à vapeur.', 1925, 47.7507, 7.33528, 'Bains Municipaux', 1911, 1),
(4, '11 Place de la réunion, 68100 Mulhouse', 'Construite en 1560 par Valentin Fries, c’est la famille Mieg, propriétaire des lieux de 1675 à 1840, qui lui laisse son nom. Elle doit son aspect actuel à Mathieu Mieg qui, en 1799, orne la façade de peintures murales de sa composition évoquant le héros suisse Arnold de Winkelried.', 1799, 47.7466, 7.33865, 'Maison Mieg', 1560, 1),
(5, '12 Place de la réunion, 68100 Mulhouse', 'Ce temple fut construit entre 1858 et 1868 sur l’emplacement d’une église datant du XIIème siècle. Ses plans sont dus à J.B. Schacre, dans un style néo-gothique alors très en vogue. Il abrite toujours les magnifiques vitraux qui se trouvaient dans cette ancienne église. Ces derniers sont parmi les plus beaux du Rhin.', 1868, 47.747, 7.33873, 'Temple Saint-Etienne', 1858, 1),
(6, '1 Place du Château, 67000 Strasbourg', 'Fondée en 1015 sur les vestiges d’une précédente cathédrale, elle est élevée à partir de 1220 par la ville impériale libre de Strasbourg, riche république marchande et financière, dans le style gothique 3, et est pratiquement achevée en 1365. Elle a la particularité d’avoir vu l’espace entre ses deux tours comblé en 1388 et se reconnaît à son clocher unique, surmonté d’une flèche qui lui a été ajoutée en 1439. Entre 1647 et 1874, pendant plus de deux siècles, elle fut le plus haut édifice du monde avec ses cent quarante-deux mètres de hauteur. Elle demeure la deuxième cathédrale la plus élevée de France après Rouen et la cinquième du monde.', 1439, 48.3454, 7.4502, 'Cathédrale Notre-Dame de Strasbourg', 1176, 3),
(7, 'Avenue du Pont de l\'Europe, 67000 Strasbourg', 'Le pont de l\'Europe de Strasbourg - Kehl est un pont routier frontalier entre l\'Allemagne et la France au-dessus du Rhin. Il s\'agit d\'un pont routier à quatre voies qui permet, de part et d\'autre des voies routières, le passage des piétons et des cyclistes. Il s\'agit du seul pont routier reliant Strasbourg à Kehl et il était jusqu\'à l\'ouverture de la passerelle des Deux Rives en 2004, également le seul passage pour franchir le Rhin pour les piétons et les cyclistes. Le pont actuel date de 1960 et son nom est le symbole de la réconciliation franco-allemande au lendemain de la Seconde Guerre mondiale. Environ 130 000 véhicules par jour transitent par ce pont. Il s’agit du point de passage transfrontalier le plus fréquenté entre la France et l’Allemagne.', 1960, 48.3425, 7.4806, 'Le Pont de l\'Europe', 1959, 3),
(10, '1, avenue du Président Robert Schuman CS 91024. F-67070 Strasbourg cedex', 'Conçu comme une cité, le projet a vocation à représenter et rassembler toutes les activités du parlement dans un même lieu. Il regroupe un hémicycle de 750 places, 1133 bureaux pour les parlementaires, 18 salles de commissions de 50 à 350 places, un centre d’études et des services de restauration. Le bâtiment se décompose en trois grandes figures imbriquées : l’arc, le dôme et la tour. Ces trois éléments-signaux, dont le volume général s’affirme à l’échelle urbaine immédiate, déploiement structurellement les quatre fonctions majeures du programme : les activités privées des parlementaires, les parties publiques, les espaces dévolus à la presse et les services de restauration. Ces quatre parcours aux accès indépendants et aux fonctions précisément définies s’imbriquent et se croisent sans cesse dans un système de fluidité maximale. Le Parlement Européen est un repère, identifiable, directement ou par la transmission de l’image, à l’échelle de la ville, de l’Europe et du monde. La forme circulaire classique de la tour centrale intègre une cour en forme d’ellipse baroque : du cercle de Galilée à l’ellipse de Képler, le passage du symbole de la centralisation à celui de la pluralité des centres, du pouvoir centralisé à la multipolarité de la démocratie européenne est ainsi largement assumé. Suivant la courbe de l’Ill, la façade vitrée révèle le volume de l’hémicycle à travers la forme du dôme, faisant de la transparence une expression à la fois architecturale et politique. Au-delà de ses fonctions premières, le parlement incarne une symbolique forte, attirant un grand nombre d’européens venus admirer la mise en scène d’une architecture totale au service de la ville, de la politique et de l’Europe toute entière.', 1999, 48.594765, 7.768136, 'Parlement Européen', 1993, 3);

-- --------------------------------------------------------

--
-- Structure de la table `building_architect`
--

DROP TABLE IF EXISTS `building_architect`;
CREATE TABLE IF NOT EXISTS `building_architect` (
  `building_id` bigint NOT NULL,
  `architect_id` bigint NOT NULL,
  KEY `FKmu5k1drn0t0g9qndbn7ihffkh` (`architect_id`),
  KEY `FKlr9e2ijdhdl5sss9f4fn13ian` (`building_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `building_architect`
--

INSERT INTO `building_architect` (`building_id`, `architect_id`) VALUES
(2, 1),
(4, 4),
(5, 3),
(6, 12),
(6, 13),
(6, 14),
(6, 15),
(6, 16),
(6, 17),
(6, 18),
(6, 19),
(7, 20),
(1, 1),
(10, 5),
(10, 6),
(10, 7),
(10, 8),
(10, 9),
(10, 10),
(10, 11),
(3, 2),
(3, 10);

-- --------------------------------------------------------

--
-- Structure de la table `city`
--

DROP TABLE IF EXISTS `city`;
CREATE TABLE IF NOT EXISTS `city` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `city`
--

INSERT INTO `city` (`id`, `description`, `latitude`, `longitude`, `name`) VALUES
(1, 'Située dans le Sud de l’Alsace, Mulhouse est la seconde ville de la région par sa taille. Ville d’art et d’histoire, elle offre de beaux monuments et ensembles architecturaux. La cité du Bollwerk, surnom qui lui est donné, bénéficie également de musées de très grande réputation. Les plus connus sont les Cités de l’Automobile et du Train.', 47.7508, 7.3359, 'Mulhouse'),
(2, 'Colmar est la préfecture du Haut-Rhin. Située au nord-est de la France, à proximité de la frontière avec l\'Allemagne. Sa vieille ville est dotée de ruelles pavées, bordées d\'édifices médiévaux à colombages ou du début de l\'époque Renaissance. L\'église gothique Saint-Martin, datant du XIIIe siècle, se trouve sur la place de la Cathédrale, en plein centre. La ville est sur l\'itinéraire de la route des vins d\'Alsace, et les vignobles locaux sont spécialisés dans la production de vins de Riesling et de Gewürztraminer.', 48.0778, 7.358, 'Colmar'),
(3, 'Strasbourg est la capitale de la région Alsace-Champagne-Ardenne-Lorraine (Grand Est) au nord-est de la France. Il s\'agit également du siège officiel du Parlement européen. Située près de la frontière avec l\'Allemagne, la ville arbore une culture et une architecture aux influences allemandes et françaises. La cathédrale gothique Notre-Dame de Strasbourg propose des animations quotidiennes sur son horloge astronomique et une vue panoramique sur le Rhin à mi-hauteur de son clocher de 142 mètres de haut.', 48.5734, 7.7521, 'Strasbourg');

-- --------------------------------------------------------

--
-- Structure de la table `photo`
--

DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `url` text,
  `building_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl7qmdllb86l5fkbdchkecj8sd` (`building_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `photo`
--

INSERT INTO `photo` (`id`, `url`, `building_id`) VALUES
(2, 'https://upload.wikimedia.org/wikipedia/commons/5/52/Tour_de_l%27Europe_%28Mulhouse%29_%281%29.jpg', 1),
(3, 'https://www.tourdeleurope.alsace/images/r21_FD-3-nuit-1338x980-31ceed6c58.jpg?auto=compress&cs=tinysrgb&h=650&w=940', 1),
(4, 'https://www.tourdeleurope.alsace/images/vue-15756ff431.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 1),
(5, 'https://files.structurae.net/files/photos/5256/2023-07-04/dsc02668.jpeg', 2),
(6, 'https://www.m2a.fr/wp-content/uploads/2020/05/piscine-pierre-et-marie-curie-mulhouse-aquagym.jpg', 3),
(7, 'https://lh3.googleusercontent.com/p/AF1QipNHQ_txmi0uQjUbLMb1wPjcsJ7kOETx8xOOcihW=s1360-w1360-h1020', 3),
(8, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ancienne_maison_Mieg.jpg/1280px-Ancienne_maison_Mieg.jpg', 4),
(9, 'https://upload.wikimedia.org/wikipedia/commons/0/07/Mulhouse-Ancien_temple_protestant_d%C3%A9truit.jpg', 5),
(10, 'https://upload.wikimedia.org/wikipedia/commons/4/48/Mulhouse_-_%C3%A9glise_St_Etienne.jpg', 5),
(11, 'https://woody.cloudly.space/app/uploads/mulhouse-tourisme/2023/02/thumbs/temple-22062018-25-1920x1272.jpg', 5),
(12, 'https://lh3.googleusercontent.com/p/AF1QipNV-uKQKyXgTGkPevQIOp6R5kX0S4S5fpYFyaTn=s1360-w1360-h1020', 6),
(13, 'https://lh3.googleusercontent.com/p/AF1QipNO8ivIgHWmj0jYf647E8LHfDxUNlYM2dnfROz2=s1360-w1360-h1020', 6),
(14, 'https://lh3.googleusercontent.com/p/AF1QipMLP46CLWQpZ-8FPw3oIbs-dPuD4epkIx1MEq5W=s1360-w1360-h1020', 6),
(15, 'https://lh3.googleusercontent.com/p/AF1QipP88fEj8Y_2I_bcUgE-Cik7gQ9go_uUbv9uNUiw=s1360-w1360-h1020', 6),
(16, 'https://lh3.googleusercontent.com/p/AF1QipNHVc5WIUOVGbccryRHBQbWUgVrY84aefNAI_BE=s1360-w1360-h1020', 6),
(17, 'https://lh3.googleusercontent.com/p/AF1QipOsZ_Mar872PX02RHHkLauIzyYT01QlZaadzvbc=s1360-w1360-h1020', 6),
(18, 'https://lh3.googleusercontent.com/p/AF1QipOF0JIbiCFIiaXk2_xVBDSptx9PCUz8C__K2bX6=s1360-w1360-h1020', 6),
(19, 'https://lh3.googleusercontent.com/p/AF1QipOGXI3BTSzzwNRCkuZPtebavRnFxbkQhF5JLeWJ=s1360-w1360-h1020', 6),
(20, 'https://lh3.googleusercontent.com/p/AF1QipOMevI3pZhIaix86pKeIf7WmoX4e-A-e4eVsNmS=s1360-w1360-h1020', 6),
(21, 'https://upload.wikimedia.org/wikipedia/commons/7/76/Bundesarchiv_Bild_121-0476%2C_Gesprengte_Rheinbr%C3%BCcke_bei_Kehl.jpg', 7),
(22, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Europabr%C3%BCcke_kehl_2.JPG/1280px-Europabr%C3%BCcke_kehl_2.JPG', 7),
(23, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/PontEuropeStrasbourg.JPG/1280px-PontEuropeStrasbourg.JPG', 7),
(24, 'https://lh3.googleusercontent.com/p/AF1QipM-8653zGMdQ_8u3e-z8b9PGv1he79nnMUy9nBo=s1360-w1360-h1020', 10),
(25, 'https://lh3.googleusercontent.com/p/AF1QipPzuhNFT0a35Afyttsmw-ra2PHy5hlxuLR8Fg6t=s1360-w1360-h1020', 10),
(26, 'https://lh3.googleusercontent.com/p/AF1QipPcUOFnPgNKjPEc6HPDHc35sTGcNZb1PB3bsV_U=s1360-w1360-h1020', 10),
(27, 'https://lh3.googleusercontent.com/p/AF1QipOI4N44wewWwb-Jh-yKZlDka8rTXCtOXqBQ2evb=s1360-w1360-h1020', 10),
(28, 'https://lh3.googleusercontent.com/p/AF1QipM87oFzE8ELYhD-YdnEAtXssZzzLqkgtDmLnJA3=s1360-w1360-h1020', 10);

-- --------------------------------------------------------

--
-- Structure de la table `user_building`
--

DROP TABLE IF EXISTS `user_building`;
CREATE TABLE IF NOT EXISTS `user_building` (
  `user_id` bigint NOT NULL,
  `building_id` bigint NOT NULL,
  KEY `FKart3efh9go94mdl61oew30b7d` (`building_id`),
  KEY `FKsqeol95b4p07skovjqp9rg7sq` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user_building`
--

INSERT INTO `user_building` (`user_id`, `building_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `v_user`
--

DROP TABLE IF EXISTS `v_user`;
CREATE TABLE IF NOT EXISTS `v_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('VISITEUR','EXPERT') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_rcbl090owagojvcy8kce0chog` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `v_user`
--

INSERT INTO `v_user` (`id`, `firstname`, `mail`, `name`, `password`, `role`) VALUES
(1, 'Stéphane', 'stephane.donditz@uha.fr', NULL, NULL, 'EXPERT'),
(2, NULL, 'sitki.saricicek@uha.fr', NULL, NULL, 'VISITEUR');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `building`
--
ALTER TABLE `building`
  ADD CONSTRAINT `FKka5gco347l90i1iho7q7u22hp` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`);

--
-- Contraintes pour la table `building_architect`
--
ALTER TABLE `building_architect`
  ADD CONSTRAINT `FKlr9e2ijdhdl5sss9f4fn13ian` FOREIGN KEY (`building_id`) REFERENCES `building` (`id`),
  ADD CONSTRAINT `FKmu5k1drn0t0g9qndbn7ihffkh` FOREIGN KEY (`architect_id`) REFERENCES `architect` (`id`);

--
-- Contraintes pour la table `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `FKl7qmdllb86l5fkbdchkecj8sd` FOREIGN KEY (`building_id`) REFERENCES `building` (`id`);

--
-- Contraintes pour la table `user_building`
--
ALTER TABLE `user_building`
  ADD CONSTRAINT `FKart3efh9go94mdl61oew30b7d` FOREIGN KEY (`building_id`) REFERENCES `building` (`id`),
  ADD CONSTRAINT `FKsqeol95b4p07skovjqp9rg7sq` FOREIGN KEY (`user_id`) REFERENCES `v_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
