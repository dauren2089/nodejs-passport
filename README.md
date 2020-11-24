# NODE JS и Passport
### Установка зависимостей

> Установка express:

```sh
$ npm install --save express
```

> Установка path:

```sh
$ npm install --save path
```

> Установка handlebars:

```sh
$ npm install --save express-handlebars
```

> Установка mongoose:

```sh
$ npm install --save mongoose
```

### Инициализация модулей

> Инициализация handlebars в app.js:
```js
const express = require('express');

const app = express();
// Установка механизма представления handlebars
const handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
```

Создадим шаблон для нашего сайта. Создайте файл  views/layouts/main.handlebars:
```html
<!doctype html>
<html>
<head>
 <title>Home page</title>
</head>
<body>
 {{{body}}}
</body>
</html>
```
Теперь создадим страницы представления для нашей домашней страницы, views/
home.handlebars:
```html
<h1>Добро пожаловать Home page!</h1>
```
и так далее для каждой страницы.

Теперь, когда мы установили представления, необходимо заменить старые 
маршруты новыми, использующими эти представления:
```js
app.get('/', function(req, res) {
 res.render('home');
});

app.get('/about', function(req, res) {
 res.render('about');
});

// Обобщенный обработчик 404 (промежуточное ПО)
app.use(function(req, res, next){
 res.status(404);
 res.render('404');
});

### Подключение к MongoDB
Добавляем импорты в app.js
```js
const mongoose = require('mongoose');
const url = 'mongodb+srv://user:password@cluster0.tw5x2.mongodb.net/db-name'
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
```
При этом необходимо будет добавить user,password,db-name для подключения к mongodb.

Создаем модель для пользователей в user.js
```js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
 authId: String,
 name: String,
 email: String,
 role: String,
 created: Date,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```
