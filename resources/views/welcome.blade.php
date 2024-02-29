<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<form method="POST" action="/api/login">
    @csrf
    <input type="login" name="login" placeholder="login">
    <input type="password" name="password" placeholder="Пароль">
    <button type="submit">Войти</button>
</form>
<a href="http://anibloom/api/login">Авторизироваться</a>
<a href="http://anibloom/api/categories">Просмотр категорий</a>
</body>
</html>
