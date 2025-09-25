const form = document.getElementById('registrationForm');
        const inputs = form.querySelectorAll('input');

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateField(input);
            });
        });
        function validateField(field) {
            const errorElement = document.getElementById(field.name + 'Error');
            let isValid = true;
            let message = '';
            switch(field.name) {
                case 'name':
                    if (field.value.length < 2) {
                        isValid = false;
                        message = 'Имя должно содержать минимум 2 символа';
                    } else if (!/^[a-zA-Zа-яА-Я]+$/.test(field.value)) {
                        isValid = false;
                        message = 'Имя должно содержать только буквы';
                    }
                    break;
                case 'email':
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                        isValid = false;
                        message = 'Введите корректный email';
                    }
                    break;
                case 'password':
                    if (field.value.length < 8) {
                        isValid = false;
                        message = 'Пароль должен содержать минимум 8 символов';
                    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(field.value)) {
                        isValid = false;
                        message = 'Пароль должен содержать хотя бы одну заглавную букву и одну цифру';
                    }
                    break;
                case 'confirmPassword':
                    const password = document.getElementById('password').value;
                    if (field.value !== password) {
                        isValid = false;
                        message = 'Пароли не совпадают';
                    }
                    break;
            }
            // Визуальное отображение ошибок
            if (isValid) {
                field.classList.remove('error');
                errorElement.style.display = 'none';
            } else {
                field.classList.add('error');
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
            return isValid;
        }

        // Валидация при отправке формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                alert('Форма успешно отправлена!');
                form.reset();
            } else {
                alert('Пожалуйста, исправьте ошибки в форме');
            }
        });
