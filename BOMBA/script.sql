-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 08 2024 г., 14:40
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `anibloom`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Cart`
--

CREATE TABLE `Cart` (
  `id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Category`
--

CREATE TABLE `Category` (
  `id` int NOT NULL,
  `name` varchar(64) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Category`
--

INSERT INTO `Category` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Манга', NULL, NULL),
(2, 'Кружки', NULL, NULL),
(3, 'Дакимакуры', NULL, NULL),
(4, 'Значки', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `Compound`
--

CREATE TABLE `Compound` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Compound`
--

INSERT INTO `Compound` (`order_id`, `product_id`, `quantity`, `total`, `created_at`, `updated_at`) VALUES
(10, 27, 1, '150.00', '2024-03-08', '2024-03-08'),
(10, 3, 10, '13100.00', '2024-03-08', '2024-03-08');

-- --------------------------------------------------------

--
-- Структура таблицы `Order`
--

CREATE TABLE `Order` (
  `id` int NOT NULL,
  `address` varchar(255) NOT NULL,
  `dateOrder` datetime NOT NULL,
  `payment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status_id` int NOT NULL DEFAULT '1',
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Order`
--

INSERT INTO `Order` (`id`, `address`, `dateOrder`, `payment_id`, `user_id`, `status_id`, `created_at`, `updated_at`) VALUES
(10, 'Улица пушкина', '2024-03-08 11:33:15', 2, 1, 1, '2024-03-08', '2024-03-08');

-- --------------------------------------------------------

--
-- Структура таблицы `Payment`
--

CREATE TABLE `Payment` (
  `id` int NOT NULL,
  `name` varchar(32) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Payment`
--

INSERT INTO `Payment` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Credit Card', NULL, NULL),
(2, 'PayPal', NULL, NULL),
(3, 'Cash', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `Product`
--

CREATE TABLE `Product` (
  `id` int NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` text,
  `price` decimal(8,2) NOT NULL,
  `quantity` int NOT NULL,
  `photo` varchar(128) DEFAULT NULL,
  `category_id` int NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Product`
--

INSERT INTO `Product` (`id`, `name`, `description`, `price`, `quantity`, `photo`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Берсерк. Том 1.', 'Одинокий воин, облаченный во все черное и с огромным, в человеческий рост, мечом за спиной, странствует по свету, верша свою месть силам зла. Там, где проходит его путь, неизменно остаются горы трупов, а кровь льется рекой. Народная молва нарекла этого воина Черным Мечником, но прежде его звали Гатсом, и он был обычным наемником, пока одно событие не изменило его жизнь навсегда.\r\n\r\nВ одном из трактиров Гатс случайно спасает жизнь эльфу по имени Пак, и тот, восхищенный мастерством и невероятной силой Черного Мечника, решает отправиться с ним в долгий путь. Он еще не знает, насколько тяжела и полна опасностей жизнь Гатса и как кровожадны и могущественны чудовища, которым тот поклялся отомстить...\r\n\r\nВ книгу вошли 1-й и 2-й тома оригинальной манги, 5 крупных глав: «Черный мечник», \r\n«Клеймо», «Исполнители желаний» (1-3), которые входят в арку «Черный мечник». ', '1174.00', 10, 'uploads/1/1.webp', 1, NULL, '2024-03-08'),
(2, 'Берсерк. Том 2.', 'Во время бесконечных странствий по свету Черный Мечник и навязавшийся к нему в спутники эльф Пак забредают в город, где правит граф-деспот, устроивший охоту на иноверцев и еретиков. И лишь Гатсу известно, что под личиной благочестия скрывается очередной хитрый Апостол, обожающий пытать и убивать ни в чем не повинных людей. Ближе к финалу ожесточенной схватки Гатса с графом бехерит, таинственный предмет, служащий ключом к параллельному измерению, вызывает в тронный зал Десницу Господню, высших существ, издревле управляющих судьбами человечества.\r\n\r\nКто эти пятеро и почему Гатс так неистово рвется отомстить им? Для раскрытия всех тайн нужно вернуться в прошлое к тому моменту, когда молодой и неопытный наемник вступил в Отряд Соколов...', '1245.00', 10, 'uploads/1/2.webp', 1, NULL, '2024-03-08'),
(3, 'Берсерк. Том 3.', 'Проиграв в поединке Гриффиту, харизматичному лидеру Отряда Соколов, Гатс вынужден вступить в ряды его наемников. Впереди их ждет множество ожесточенных кровавых битв, во время которых нелюдимый юноша, старавшийся при всех казаться изгоем, начинает понимать, что он вовсе не одинок и находит себе верных и преданных товарищей.\r\n\r\nЧереда небывалых побед Отряда Соколов обращают на себя внимание правителя королевства Мидленд, погрязшего в столетней войне с империей Тюдоров. Амбициозные устремления Гриффита, еще недавно казавшиеся Гатсу несбыточными, постепенно начинают воплощаться в жизнь. Но молодой воин еще не знает, что на полях сражений могут повстречаться настоящие чудовища, чья сила и мастерство запредельно выше человеческих...', '1310.00', 0, 'uploads/1/3.webp', 1, NULL, '2024-03-08'),
(4, 'Берсерк. Том 4.\r\n', 'Бой за боем, победа за победой — и вот уже армия королевства Мидленд, в состав которой теперь входит и Отряд Соколов во главе с Гриффитом, начинает теснить неприятеля из империи Тюдоров. Но для окончательной победы в войне Мидленду необходимо вернуть крепость Долдрей. За долгие годы осад бесчисленное число солдат сложило головы под стенами цитадели, а сама она стала считаться неприступной. Многие из генералов Мидленда по-прежнему думают, что взятие Долдрея невозможно, и лишь Гриффит уверен, что ему и Отряду Соколов подобное по силам.\r\n\r\nТем временем при дворе королевства появляется все больше знати, кому не по нутру амбициозный и своенравный юноша. Эти люди видят в Гриффите серьезную угрозу и поклялись любыми средствами свести его в могилу...', '1345.00', 10, 'uploads/1/4.webp', 1, NULL, '2024-03-08'),
(5, 'Берсерк. Том 5.', 'C той поры, как Гатс ушел из Отряда Соколов, минул целый год. Все это время нелюдимый воин прожил в глуши, деля кров со стариком-кузнецом и его маленькой дочерью и пытаясь отточить мастерство владения мечом. Но однажды на городском ярмарочном турнире он случайно узнает, что бывшие боевые товарищи впали в немилость короля, а Гриффит брошен в темницу. Мучимый чувством вины, Гатс пытается исправить последствия своего давнего импульсивного решения и спасти человека, которого прежде считал другом. Он еще не знает, что попытка вернуть прошлое привела в движение колесо судьбы, и до предсказанного некогда Зоддом Бессмертным трагического финала остаются считанные дни...', '1245.00', 10, 'uploads/1/5.webp', 1, NULL, '2024-03-08'),
(6, 'Берсерк. Том 6.', 'Под покровом ночи Гатс и Каска, сопровождаемые лучшими воинами Отряда Соколов, проникают в темницу Уиндема, чтобы освободить томящегося там Гриффита. Узнав о случившемся, король Мидленда повелевает отправить в погоню за беглецами рыцарский орден Черных Псов, возглавляемый беспринципным психопатом Уайльдом. В развернувшейся ожесточенной схватке Гатс едва не лишается жизни, чудом сумев уцелеть. Но давшаяся таким тяжким трудом победа, как оказалось, в конечном счете лишена всякого смысла, ведь изможденных и павших духом людей ждет новое испытание, в ходе которого некогда амбициозный лидер Отряда Соколов будет вынужден принять судьбоносное решение и принести в жертву тех, кто прежде с фанатичной преданностью следовал за его мечтой...', '1245.00', 10, 'uploads/1/6.jpg', 1, NULL, '2024-03-08'),
(7, 'Подушка-дакимакура \"Рем и Рам\"\r\n', 'Эй, фанаты аниме \"Re:Zero\"! Готовы окунуться в альтернативный мир вместе с Рем и Рам? Представляем вам нашу супермилую дакимакуру \"Re:Zero. Жизнь с нуля в альтернативном мире - Рем и Рам\"! Эти две близнецы, одно слово - сестры, один взгляд - миллион эмоций. И теперь, с помощью этой дакимакуры, вы можете привнести их чарующую красоту в свою жизнь! Сделанная из качественного материала, наша дакимакура идеально подойдет вам для обнимашек и постоянного компаньонства во время просмотра своих любимых аниме-сериалов. Она мягкая, приятная на ощупь и уютно помещается на вашей кровати или диване. Поцелуйте свои сны с Рем и Рам и позвольте этим кавайным девчонкам украсить вашу комнату и вашу жизнь! Каждая дакимакура поставляется с красочной иллюстрацией, полной деталей, чтобы вы могли наслаждаться их прекрасными лицами и образами каждый день. Так что, не упустите возможность приобрести эту волшебную дакимакуру \"Re:Zero. Жизнь с нуля в альтернативном мире - Рем и Рам\" и ощутите настоящую магию аниме в своей жизни!', '3900.00', 10, 'uploads/3/7.jpg', 3, NULL, '2024-03-08'),
(8, 'Подушка-дакимакура \"Мегумин\"', 'Погрузитесь в мир волшебства вместе с Мегумин из аниме \"Да будет благословенен этот прекрасный мир!\" и нашей удивительной подушкой-дакимакурой! Этот необычный предмет станет прекрасным дополнением к вашей коллекции аниме-атрибутики или уютным спутником для ежедневного сна. Мягкий, удобный и с изображением великолепной Мегумин, эта дакимакура превратит вашу постель в место мечты. Идеальный подарок для поклонников аниме и любителей красивых и практичных вещей! Вместе с Мегумин вы сможете смело отправиться в приключения и познать настоящую магию!', '3650.00', 10, 'uploads/3/8.png', 3, NULL, '2024-03-08'),
(9, 'Подушка-дакимакура \"Маи Сакурадзима\"', 'Подушка-поддержка Дакимакура с персонажем Маи Сакурадзима, девочкой-зайкой из аниме \"Этот глупый свин не понимает мечту девочки-зайки\" - это идеальный спутник вашей романтической фантазии! Используйте эту милую подушку для обнимашек и обнимайте Маи каждую ночь перед сном. Ее мягкий и объемный дизайн позволит вам окунуться в мир мечты и уютно устроиться на диване или в постели. Эта дакимакура сделана из высококачественного материала, который приятен на ощупь и не вызывает аллергических реакций. Чувствуйте себя на вершине блаженства в объятиях Маи Сакурадзимы!', '3650.00', 10, 'uploads/3/9.jpg', 3, NULL, '2024-03-08'),
(10, 'Подушка-дакимакура \"Сатору Годзё\"', 'Расставьте все стороны ваших битв на места с дакимакурой \"Магическая битва - Сатору Годзё\"! Отчаянный и харизматичный Сатору Годзё будет всегда рядом с вами, принося решимость и магическую энергию в вашу жизнь. Устроившись на своей новой мягкой подушке со впечатляющим изображением Сатору, вы готовы сразиться в любой магической битве, получая комфорт и поддержку от этого волшебного товара. Дерзайте, ведь теперь вы являетесь его верным спутником!', '3650.00', 10, 'uploads/3/10.png', 3, NULL, '2024-03-08'),
(11, 'Подушка-дакимакура \"Незуко\"', 'Представь себе самое миленькое и уютное облако, на котором лежит дакимакура под названием \"Клинок, рассекающий демонов - Незуко\". У нас она уже ждет своего счастливого обладателя, который будет наслаждаться мягкостью и улыбками этой прекрасной девушки! Дакимакура, твой новый и самый верный друг для сна, обнимашек и просто приятного времяпровождения. Она выполнена из нежной и приятной на ощупь микрофибры, которая дарит нежность и комфорт на протяжении всего дня. Что тебя еще ждет? Красочное изображение Незуко с ее неподражаемой улыбкой, глаза полные доброты и манящие взгляды. Ты точно не сможешь устоять перед ее очарованием! Подари себе или своим близким настоящую радость и комфорт с дакимакурой \"Клинок, рассекающий демонов - Незуко\" от магазина \"Craft\". Ждем тебя за покупками, чтобы подарить милое счастье каждому!', '3650.00', 10, 'uploads/3/11.png', 3, NULL, '2024-03-08'),
(12, 'Подушка-дакимакура \"Танджиро\"', 'Представьте - спокойный и отважный Танджиро из популярного аниме \"Клинок, рассекающий демонов\" теперь может быть рядом с вами круглосуточно! Эта дакимакура изготовлена из мягкого и приятного на ощупь материала, который расслабит вас и окутает теплом во время сна. И, конечно же, великолепная графика Танджиро в ярких и насыщенных цветах просто притягивает взгляд! Вечером, просто ложитесь в постель, обнимаете своего нового друга и наслаждаетесь его присутствием в своей комнате. Это не просто дакимакура – это верный спутник для всех фанатов \"Клинка, рассекающего демонов\"!', '3650.00', 10, 'uploads/3/12.png', 3, NULL, '2024-03-08'),
(13, 'Кружка \"Леви\"', 'Данная кружка из аниме и манги \"Атака титанов\"', '260.99', 10, 'uploads/2/13.jpeg', 2, NULL, '2024-03-08'),
(14, 'Кружка \"Крылья свободы\"', 'Кружка \"Крылья свободы\", оформление в стиле популярной манги и аниме Attack on Titan. Товар выполнен из керамики в белом цвете, а аниме-рисунок обладает устойчивостью к высоким температурам, благодаря чему вы сможете наслаждаться горячими напитками без опасения его испортить.', '590.00', 10, 'uploads/2/14.jpeg', 2, NULL, '2024-03-08'),
(15, 'Кружка \"Сайтама\"', 'Белая керамическая аниме-кружка со стойким аниме-рисунком.\r\nАниме-изображение не боится воды и высоких температур.', '590.00', 10, 'uploads/2/15.jpeg', 2, NULL, '2024-03-08'),
(16, 'Кружка \"One Piece\"', 'Белая керамическая аниме-кружка со стойким аниме-рисунком.\r\nАниме-изображение не боится воды и высоких температур.', '590.00', 10, 'uploads/2/16.jpg', 2, NULL, '2024-03-08'),
(17, 'Кружка \"K-ON!\" 9', 'Белая керамическая аниме-кружка со стойким аниме-рисунком.\r\nАниме-изображение не боится воды и высоких температур.', '590.00', 10, 'uploads/2/17.jpeg', 2, NULL, '2024-03-08'),
(18, 'Кружка \"Ковбой Бибоп\"', 'Белая керамическая аниме-кружка со стойким аниме-рисунком.\r\nАниме-изображение не боится воды и высоких температур.', '590.00', 10, 'uploads/2/18.jpeg', 2, NULL, '2024-03-08'),
(19, 'Кружка \"Нориаки Какёин\"', 'Белая керамическая аниме-кружка со стойким аниме-рисунком.\r\nАниме-изображение не боится воды и высоких температур.', '590.00', 10, 'uploads/2/19.jpeg', 2, NULL, '2024-03-08'),
(20, 'Большой значок \"Сузуя Джузо\"', NULL, '150.00', 10, 'uploads/4/20.jpeg', 4, NULL, '2024-03-08'),
(21, 'Большой значок \"Атака титанов\"', NULL, '150.00', 10, 'uploads/4/21.jpeg', 4, NULL, '2024-03-08'),
(22, 'Большой значок \"Темный дворецкий. Пентаграмма\"', NULL, '150.00', 10, 'uploads/4/22.jpeg', 4, NULL, '2024-03-08'),
(23, 'Большой значок \"Канеки Кен\"', NULL, '150.00', 10, 'uploads/4/23.jpg', 4, NULL, '2024-03-08'),
(24, 'Большой значок \"Двуличная сестренка Умару\"', NULL, '150.00', 10, 'uploads/4/24.jpeg', 4, NULL, '2024-03-08'),
(25, 'Большой значок \"Autism\"', NULL, '150.00', 10, 'uploads/4/25.jpeg', 4, NULL, '2024-03-08'),
(26, 'Большой значок \"Нориаки Какёин\"', NULL, '150.00', 10, 'uploads/4/26.jpeg', 4, NULL, '2024-03-08'),
(27, 'Большой значок \"Рем\"', NULL, '150.00', 9, 'uploads/4/27.jpg', 4, NULL, '2024-03-08');

-- --------------------------------------------------------

--
-- Структура таблицы `Review`
--

CREATE TABLE `Review` (
  `id` int NOT NULL,
  `rating` int NOT NULL,
  `textReview` text NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Review`
--

INSERT INTO `Review` (`id`, `rating`, `textReview`, `user_id`, `product_id`, `created_at`, `updated_at`) VALUES
(6, 5, 'Отличный товар! Мне очень понравилось.', 1, 27, '2024-03-08', '2024-03-08'),
(7, 3, 'Скупил всё, что у них было. Однако не знаю куда теперь столько девать', 1, 3, '2024-03-08', '2024-03-08');

-- --------------------------------------------------------

--
-- Структура таблицы `Role`
--

CREATE TABLE `Role` (
  `id` int NOT NULL,
  `name` varchar(64) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Role`
--

INSERT INTO `Role` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'User', NULL, NULL),
(2, 'Admin', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `Status`
--

CREATE TABLE `Status` (
  `id` int NOT NULL,
  `name` varchar(32) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Status`
--

INSERT INTO `Status` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'В ожиданнии', NULL, NULL),
(2, 'В процессе', NULL, NULL),
(3, 'Завершен', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE `User` (
  `id` int NOT NULL,
  `name` varchar(64) NOT NULL,
  `surname` varchar(64) NOT NULL,
  `patronymic` varchar(64) DEFAULT NULL,
  `login` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `birth` date NOT NULL,
  `email` varchar(64) NOT NULL,
  `telephone` bigint NOT NULL,
  `api_token` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `role_id` int NOT NULL DEFAULT '1',
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `User`
--

INSERT INTO `User` (`id`, `name`, `surname`, `patronymic`, `login`, `password`, `birth`, `email`, `telephone`, `api_token`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'Иван', 'Иванов', 'Иванович', 'ivan', 'Ivan123@', '1990-01-01', 'ivan@example.com', 1234567890, '1', 1, '2024-02-26', '2024-02-26'),
(2, 'Петр', 'Петров', 'Петрович', 'peter', 'Peter123@', '1992-03-15', 'peter@example.com', 2345678901, NULL, 1, '2024-02-26', '2024-02-26'),
(3, 'Александр', 'Сидоров', 'Александрович', 'alex', 'Alex123@', '1988-07-10', 'alex@example.com', 3456789012, NULL, 1, '2024-02-26', '2024-02-26'),
(4, 'Елена', 'Смирнова', 'Ивановна', 'elena', 'Elena123@', '1995-05-20', 'elena@example.com', 4567890123, NULL, 1, '2024-02-26', '2024-02-26'),
(5, 'Мария', 'Кузнецова', 'Петровна', 'maria', 'Maria123@', '1993-09-08', 'maria@example.com', 5678901234, NULL, 1, '2024-02-26', '2024-02-26'),
(6, 'Анна', 'Новикова', 'Алексеевна', 'anna', 'Anna123@', '1991-11-30', 'anna@example.com', 6789012345, NULL, 1, '2024-02-26', '2024-02-26'),
(7, 'Сергей', 'Морозов', 'Владимирович', 'sergey', 'Sergey123@', '1987-12-05', 'sergey@example.com', 7890123456, NULL, 1, '2024-02-26', '2024-02-26'),
(8, 'savayaqu', 'savayaqu', 'savayaqu', 'savayaqu', 'savayaqu1!', '2001-01-01', 'savayaqu@mail.ru', 88005553535, '666', 2, '2024-02-26', '2024-02-26');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Compound`
--
ALTER TABLE `Compound`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Индексы таблицы `Order`
--
ALTER TABLE `Order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `payment_id` (`payment_id`);

--
-- Индексы таблицы `Payment`
--
ALTER TABLE `Payment`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Индексы таблицы `Review`
--
ALTER TABLE `Review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Status`
--
ALTER TABLE `Status`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `telephone` (`telephone`),
  ADD UNIQUE KEY `login` (`login`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Cart`
--
ALTER TABLE `Cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Order`
--
ALTER TABLE `Order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `Payment`
--
ALTER TABLE `Payment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `Product`
--
ALTER TABLE `Product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `Review`
--
ALTER TABLE `Review`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `Role`
--
ALTER TABLE `Role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `Status`
--
ALTER TABLE `Status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `User`
--
ALTER TABLE `User`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `fk_cart_product_id` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Compound`
--
ALTER TABLE `Compound`
  ADD CONSTRAINT `fk_compound_order_id` FOREIGN KEY (`order_id`) REFERENCES `Order` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_compound_product_id` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Order`
--
ALTER TABLE `Order`
  ADD CONSTRAINT `fk_order_payment_id` FOREIGN KEY (`payment_id`) REFERENCES `Payment` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_status_id` FOREIGN KEY (`status_id`) REFERENCES `Status` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `fk_product_category_id` FOREIGN KEY (`category_id`) REFERENCES `Category` (`id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Review`
--
ALTER TABLE `Review`
  ADD CONSTRAINT `fk_review_product_id` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_review_user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `fk_user_role_id` FOREIGN KEY (`role_id`) REFERENCES `Role` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
