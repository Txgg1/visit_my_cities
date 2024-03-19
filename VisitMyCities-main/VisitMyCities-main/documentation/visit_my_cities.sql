-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 19 mars 2024 à 09:47
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
  `id` bigint NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `architect`
--

INSERT INTO `architect` (`id`, `firstname`, `name`) VALUES
(52, 'François', 'Spoerry');

-- --------------------------------------------------------

--
-- Structure de la table `architect_seq`
--

DROP TABLE IF EXISTS `architect_seq`;
CREATE TABLE IF NOT EXISTS `architect_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `architect_seq`
--

INSERT INTO `architect_seq` (`next_val`) VALUES
(151);

-- --------------------------------------------------------

--
-- Structure de la table `building`
--

DROP TABLE IF EXISTS `building`;
CREATE TABLE IF NOT EXISTS `building` (
  `id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` text,
  `end_build` int NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_build` int NOT NULL,
  `architect_id` bigint DEFAULT NULL,
  `city_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2vi6dngfu338t7domky7csav1` (`architect_id`),
  KEY `FKka5gco347l90i1iho7q7u22hp` (`city_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `building`
--

INSERT INTO `building` (`id`, `address`, `description`, `end_build`, `latitude`, `longitude`, `name`, `start_build`, `architect_id`, `city_id`) VALUES
(152, 'Avenue Auguste Wicky, 68100 Mulhouse', 'Immeuble-tour Wilson est un immeuble de bureaux et immeuble d\'appartements qui a été achevé(e) en 1972.', 1972, 47.743554, 7.341463, 'Tour Wilson', 0, 52, NULL),
(153, '3 boulevard de l\'Europe 68100 Mulhouse', 'La Tour de l\'Europe est un gratte-ciel en béton armé essentiellement résidentiel qui est situé dans le centre-ville de Mulhouse, en France. Sa forme triangulaire symbolise, entre autres, la région mulhousienne, zone de jonction de trois pays européens : l\'Allemagne, la France et la Suisse.', 1972, 47.749859, 7.341032, 'Tour de l\'Europe', 1969, 52, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `building_seq`
--

DROP TABLE IF EXISTS `building_seq`;
CREATE TABLE IF NOT EXISTS `building_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `building_seq`
--

INSERT INTO `building_seq` (`next_val`) VALUES
(251);

-- --------------------------------------------------------

--
-- Structure de la table `city`
--

DROP TABLE IF EXISTS `city`;
CREATE TABLE IF NOT EXISTS `city` (
  `id` bigint NOT NULL,
  `description` text,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `city`
--

INSERT INTO `city` (`id`, `description`, `latitude`, `longitude`, `name`) VALUES
(1, 'Située dans le Sud de l’Alsace, Mulhouse est la seconde ville de la région par sa taille. Ville d’art et d’histoire, elle offre de beaux monuments et ensembles architecturaux. La cité du Bollwerk, surnom qui lui est donné, bénéficie également de musées de très grande réputation. Les plus connus sont les Cités de l’Automobile et du Train.', 47.7508, 7.3359, 'Mulhouse'),
(2, 'Colmar est la préfecture du Haut-Rhin. Située au nord-est de la France, à proximité de la frontière avec l\'Allemagne. Sa vieille ville est dotée de ruelles pavées, bordées d\'édifices médiévaux à colombages ou du début de l\'époque Renaissance. L\'église gothique Saint-Martin, datant du XIIIe siècle, se trouve sur la place de la Cathédrale, en plein centre. La ville est sur l\'itinéraire de la route des vins d\'Alsace, et les vignobles locaux sont spécialisés dans la production de vins de Riesling et de Gewürztraminer.', 48.0778, 7.358, 'Colmar'),
(3, 'Strasbourg est la capitale de la région Alsace-Champagne-Ardenne-Lorraine (Grand Est) au nord-est de la France. Il s\'agit également du siège officiel du Parlement européen. Située près de la frontière avec l\'Allemagne, la ville arbore une culture et une architecture aux influences allemandes et françaises. La cathédrale gothique Notre-Dame de Strasbourg propose des animations quotidiennes sur son horloge astronomique et une vue panoramique sur le Rhin à mi-hauteur de son clocher de 142 mètres de haut.', 48.5734, 7.7521, 'Strasbourg');

-- --------------------------------------------------------

--
-- Structure de la table `city_seq`
--

DROP TABLE IF EXISTS `city_seq`;
CREATE TABLE IF NOT EXISTS `city_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `city_seq`
--

INSERT INTO `city_seq` (`next_val`) VALUES
(101);

-- --------------------------------------------------------

--
-- Structure de la table `v_user`
--

DROP TABLE IF EXISTS `v_user`;
CREATE TABLE IF NOT EXISTS `v_user` (
  `id` bigint NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_rcbl090owagojvcy8kce0chog` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `v_user`
--

INSERT INTO `v_user` (`id`, `firstname`, `mail`, `name`, `password`) VALUES
(2, NULL, 'stephane.donditz@uha.fr', NULL, NULL),
(52, NULL, 'sitki.saricicek@uha.fr', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `v_user_seq`
--

DROP TABLE IF EXISTS `v_user_seq`;
CREATE TABLE IF NOT EXISTS `v_user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `v_user_seq`
--

INSERT INTO `v_user_seq` (`next_val`) VALUES
(151);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `building`
--
ALTER TABLE `building`
  ADD CONSTRAINT `FK2vi6dngfu338t7domky7csav1` FOREIGN KEY (`architect_id`) REFERENCES `architect` (`id`),
  ADD CONSTRAINT `FKka5gco347l90i1iho7q7u22hp` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
