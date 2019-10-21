-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 21 2019 г., 12:27
-- Версия сервера: 5.6.37
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `calltracking`
--

-- --------------------------------------------------------

--
-- Структура таблицы `ct`
--

CREATE TABLE `ct` (
  `id` int(11) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `refer` varchar(200) NOT NULL,
  `utm` varchar(200) NOT NULL,
  `host` varchar(200) NOT NULL,
  `ga` varchar(200) NOT NULL,
  `login` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ct`
--

INSERT INTO `ct` (`id`, `phone`, `refer`, `utm`, `host`, `ga`, `login`) VALUES
(5, '78000000001', '', 'http://site-with-ct-code.ru/?utm_medium=cpc', 'http://site-with-ct-code.ru', 'UA-12345678-1', ''),
(6, '78000000002', 'http://refer.ru/', 'http://site-with-ct-code.ru/', 'http://site-with-ct-code.ru', 'UA-12345678-1', ''),
(7, '78000000003', 'http://refer.ru/', 'http://site-with-ct-code.ru/', 'http://site-with-ct-code.ru', 'UA-12345678-1', ''),
(22, '78000000004', 'http://refer.ru/', 'http://site-with-ct-code.ru/', 'http://site-with-ct-code.ru', 'UA-12345678-1', ''),
(31, '78000000005', '', 'http://site-with-ct-code.ru/', 'http://site-with-ct-code.ru', 'UA-12345678-1', '');

-- --------------------------------------------------------

--
-- Структура таблицы `numbers`
--

CREATE TABLE `numbers` (
  `id` int(11) NOT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `ct_user` varchar(200) DEFAULT NULL,
  `refer` varchar(200) DEFAULT NULL,
  `gid` varchar(200) DEFAULT NULL,
  `page` varchar(200) DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `ct`
--
ALTER TABLE `ct`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `numbers`
--
ALTER TABLE `numbers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `ct`
--
ALTER TABLE `ct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT для таблицы `numbers`
--
ALTER TABLE `numbers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
