function formatDate(input) {
    // Получаем введенную дату
    let date = new Date(input.value);

    // Преобразуем дату в формат "ГГГГ-ММ-ДД"
    let formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    // Устанавливаем новое значение в поле ввода
    input.value = formattedDate;
}

// Конфигурация приложения
let app = {
    // Раздел с переменными
    data() {
        return {
            page: 'main',
            categories: [],
            products: [],
            user: [],
            cartItems: [],
            categoryProducts: [], // Массив для хранения товаров выбранной категории
            selectedCategory: {}, // Выбранная категория
            totalPrice: {},
            payments: [],
            payment_id: {},
            orders: [],
            product: {},

        }
    },
    // Методы
    methods: {
        linkpage(link) {
            if(link === 'cart')
            {
                this.loadCart();
                this.page = link;
            }
            else if(link === 'profile')
            {
                this.loadOrder();
                this.page = link;
            }
            else if (link === 'product')
            {
                this.page = link;
            }
            else
            {
                this.page = 'main';
            }

        },
        //Просмотр конкретного товара
        getProduct(product_id) {
          fetch(`/api/product/${product_id}`, {
              method: 'GET',
          })
              .then(response => response.json())
              .then(data => {
                  this.product = data.data;
                  this.linkpage('product');
              })
              .catch(error => {
                  console.error('Ошика:', error);
              });
        },
        //Получение первых 3 товаров определенной категории
        getCategoriesAndProducts() {
            fetch('/api/categories', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    this.categories = data.data; // Обращаемся к массиву категорий в объекте data
                    // Для каждой категории получаем первые 3 продукта
                    this.categories.forEach(category => {
                        fetch(`/api/category/${category.id}`, {
                            method: 'GET',
                        })
                            .then(response => response.json())
                            .then(productsData => {
                                // Добавляем только первые 3 продукта категории
                                category.products = productsData.data.slice(0, 3);
                            })
                            .catch(error => {
                                console.error('Error fetching products:', error);
                            });
                    });
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        },
        //Загрузка всех товаров определенной категории
        loadCategoryProducts(categoryId, categoryName) {
            // Выполняем запрос к API для получения товаров определенной категории
            fetch(`/api/category/${categoryId}`)
                .then(response => response.json())
                .then(data => {
                    this.categoryProducts = data.data; // Присваиваем полученные товары переменной categoryProducts
                    this.selectedCategory = categoryName;
                    this.page = 'products';
                })
                .catch(error => {
                    console.error('Error fetching category products:', error);
                });
        },
        // Добавляем метод для отправки формы авторизации
        login() {
            // Получаем данные из формы
            let login = document.getElementById('loginAuth').value;
            let password = document.getElementById('passwordAuth').value;

            // Отправляем запрос на сервер
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login: login, password: password }),
            })
                .then(response => {
                    if (response.ok) {
                        // Получаем токен из ответа
                        return response.json();
                    } else {
                        throw new Error('Ошибка аутентификации');
                    }
                })
                .then(data => {
                    // Устанавливаем токен в куки
                    document.cookie = `api_token=${data.data.user_token}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;

                    // Редирект на главную страницу
                    window.location.href = '/';
                })
                .catch(error => {
                    // Обработка ошибки
                    console.error('Ошибка:', error);
                });
        },
        //Получение куки
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        //Регистрация
        register() {
            // Получаем данные из формы
            let surname = document.getElementById('surname').value;
            let name = document.getElementById('name').value;
            let patronymic = document.getElementById('patronymic').value;
            let login = document.getElementById('login').value;
            let password = document.getElementById('password').value;
            let birth = document.getElementById('birth').value;
            let email = document.getElementById('email').value;
            let telephone = document.getElementById('telephone').value;

            // Отправляем запрос на сервер
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    surname: surname,
                    name: name,
                    patronymic: patronymic,
                    login: login,
                    password: password,
                    birth: birth,
                    email: email,
                    telephone: telephone
                }),
            })
                .then(response => {
                    if (response.ok) {
                        // Редирект на главную страницу
                        window.location.href = '/';
                    } else {
                        // Отображаем сообщение об ошибке на странице
                        response.json().then(data => {
                            document.getElementById('error-message').innerText = data.error;
                        });
                    }
                })
                .catch(error => {
                    console.error('Ошибка сети:', error);
                });
        },
        // Загрузка данных пользователя
        loadUserData() {
            // Получаем значение токена из куки
            const token = this.getCookie('api_token');

            // Если токен найден
            if (token) {
                // Опции запроса
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                };

                // Отправка запроса на сервер
                fetch('/api/profile', options)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Ошибка при загрузке данных пользователя');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Записываем данные пользователя в переменную user
                        this.user = data.data;
                    })
                    .catch(error => {
                        console.error('Ошибка при загрузке данных пользователя:', error);
                    });
            } else {
                console.error('Cookie с токеном отсутствует');
            }
        },
        // Функция для обновления профиля пользователя
        updateProfile() {
            // Получаем данные из полей формы
            const surname = document.getElementById('surnameP').value;
            const name = document.getElementById('nameP').value;
            const patronymic = document.getElementById('patronymicP').value;
            const login = document.getElementById('loginP').value;
            const password = document.getElementById('passwordP').value;
            const birth = document.getElementById('birthP').value;
            const email = document.getElementById('emailP').value;
            const telephone = document.getElementById('telephoneP').value;

            // Создаем объект с обновленными данными пользователя
            const updatedData = {
                surname: surname,
                name: name,
                patronymic: patronymic,
                login: login,
                password: password,
                birth: birth,
                email: email,
                telephone: telephone
            };

            // Опции запроса
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                },
                body: JSON.stringify(updatedData)
            };

            // Отправляем запрос на сервер
            fetch('/api/profile', options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при обновлении профиля');
                    }
                    return response.json();
                })
                .then(data => {
                    // Выводим сообщение об успешном обновлении профиля
                    alert('Профиль успешно обновлен');
                    this.page = 'profile';
                })
                .catch(error => {
                    console.error('Ошибка при обновлении профиля:', error);
                });
        },
        // Функция для добавления товара в корзину
        addToCart(productId) {
            // Опции запроса
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                }
            };

            // Отправляем запрос на сервер
            fetch(`/api/product/${productId}`, options)
                .then(response => {
                    if (!response.ok) {
                    alert("Добавление товара в корзину доступно только авторизированным пользователям");
                    }
                    return response.json();
                })
                .then(data => {
                    // Выводим сообщение об успешном добавлении товара в корзину
                    alert('Товар успешно добавлен в корзину');
                    // Дополнительные действия, если необходимо
                })
                .catch(error => {
                    console.error('Ошибка при добавлении товара в корзину:', error);
                });
        },
        //Загрузка корзины
        loadCart() {
            this.getPayment();
            fetch('/api/cart', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.cartItems = data.cart_items;
                    this.totalPrice = data.total;
                    // Обработка каждого элемента корзины
                    this.cartItems.forEach(cartItem => {
                        fetch(`/api/product/${cartItem.product_id}`)
                            .then(response => response.json())
                            .then(productData => {
                                // Добавляем данные о продукте в объект корзины
                                cartItem.product = productData.data;

                            })
                            .catch(error => {
                                console.error('Error fetching product:', error);
                            });
                    });
                })
                .catch(error => {
                    console.error('Error fetching cart:', error);
                });
        },
        //Обновление количества товаров в корзине
        updateQuantity(item) {
            const productId = item.product_id;
            const newQuantity = item.quantity;

            // Отправляем запрос на сервер для обновления количества товара в корзине
            fetch('/api/cart', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity: newQuantity
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при обновлении количества товара в корзине');
                    }
                    return response.json();
                })
                .then(data => {
                    // Обработка успешного обновления количества товара в корзине
                    console.log('Количество товара в корзине успешно обновлено');
                    this.loadCart();
                })
                .catch(error => {
                    console.error('Ошибка при обновлении количества товара в корзине:', error);
                });
        },
        //Узнаем текущее количество товара и выводим массивом чисел
        availableQuantities(item) {
            // Проверяем, доступен ли объект товара в элементе корзины
            if (item.product) {
                // Получаем количество товара из объекта товара
                const productQuantity = item.product.quantity;
                // Создаем массив чисел от 1 до доступного количества товара
                return Array.from({ length: productQuantity }, (_, index) => index + 1);
            } else {
                return [];
            }
        },
        //Удаление товара в корзине
        deleteCartItem(itemId) {
            // Отправляем запрос на удаление товара из корзины
            fetch(`/api/cart/product/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при удалении товара из корзины');
                    }
                    // Обновляем список товаров в корзине
                    this.loadCart();
                })
                .catch(error => {
                    console.error('Ошибка при удалении товара из корзины:', error);
                });
        },
        //Получение способов оплаты
        getPayment() {
            fetch('/api/payment', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    this.payments = data.data;
                })
        },
        //Получение payment_id
        getPaymentId(payment_id) {
          this.payment_id = payment_id;
        },
        //Оформление заказа
        checkout() {
            // Получаем данные из формы
            let address = document.getElementById('address').value;
            // Отправляем запрос на сервер
            fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: address,
                    payment_id: this.payment_id
                }),
            })
                .then(response => {
                    alert("Заказ принят");
                    this.loadCart();
                })
                .catch(error => {
                    console.error('Ошибка: ', error);
                });
            //Сразу вывод заказа, чтобы не обновлять страницу
            this.loadOrder();
        },
        //Просмотр заказов текущего пользователя
        loadOrder() {
            // Отправляем запрос на сервер
            fetch('/api/orders', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token'),
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.orders = data.data;
                    console.log(data.data);
                })
                .then(response => {
                    this.loadCart();
                })
                .catch(error => {
                    console.error('Ошибка: ', error);
                });
        },
    }

}
let VueApp = Vue.createApp(app).mount('#app');
VueApp.loadUserData();
VueApp.getCategoriesAndProducts();



