// custom jQuery validation
//-----------------------------------------------------------------------------------
var validator = {
    init: function() {
        $('form').each(function() {
            var name = $(this).attr('name');
            if (valitatorRules.hasOwnProperty(name)) {
                var rules = valitatorRules[name];
                $(this).validate({
                    rules: rules,
                    errorElement: 'b',
                    errorClass: 'error',
                    focusInvalid: false,
                    focusCleanup: false,
                    onfocusout: function(element) {
                        var $el = validator.defineElement($(element));
                        $el.valid();
                    },
                    errorPlacement: function(error, element) {
                        validator.setError($(element), error);
                    },
                    highlight: function(element, errorClass, validClass) {
                        var $el = validator.defineElement($(element)),
                            $elWrap = $el.closest('.el-field');
                        if ($el) {
                            $el.removeClass(validClass).addClass(errorClass);
                            $elWrap.removeClass('show-check');
                            if ($el.closest('.ui.dropdown').length) {
                                $el.closest('.ui.dropdown').addClass('error');
                            }
                        }
                    },
                    unhighlight: function(element, errorClass, validClass) {
                        var $el = validator.defineElement($(element)),
                            $elWrap = $el.closest('.el-field');
                        if ($el) {
                            $el.removeClass(errorClass).addClass(validClass);
                            if ($elWrap.hasClass('check-valid')) {
                                $elWrap.addClass('show-check');
                            }
                            $el.closest('el-field').addClass('show-check');
                            if ($el.val() == '') {
                                $el.removeClass('valid');
                            }
                            if ($el.closest('.ui.dropdown').length) {
                                $el.closest('.ui.dropdown').removeClass('error');
                            }
                        }
                    },
                    messages: {
                        'user_email': {
                            required: 'Поле обязательное',
                            email: 'Неправильный формат E-mail'
                        },
                        'user_name': {
                            required: 'Поле обязательное',
                            letters: 'Неправильный формат имени',
                            minlength: 'Не меньше 2 символов'
                        },
                        'user_login': {
                            required: 'Поле обязательное',
                            email: 'Неправильный формат E-mail'
                        },
                        'user_password': {
                            required: 'Поле обязательное',
                            minlength: 'Не менее 6-ти символов'
                        },
                        'user_password_confirm': {
                            required: 'Вы не подтвердили пароль',
                            minlength: 'Не менее 6-ти символов',
                            equalTo: 'Пароли должны совпадать'
                        },
                        'user_phone': {
                            required: 'Поле обязательное',
                            digits: 'Неправильный формат номера'
                        }
                    }
                });
            }
        });
    },
    setError: function($el, message) {
        $el = this.defineElement($el);
        if ($el) this.domWorker.error($el, message);
    },
    defineElement: function($el) {
        return $el;
    },
    domWorker: {
        error: function($el, message) {
            if ($el.attr('type') == 'file') $el.parent().addClass('file-error');
            $el.addClass('error');
            $el.after(message);
        }
    }
};


// rule for form namespace
//-----------------------------------------------------------------------------------
var valitatorRules = {
    'form_one': {
        'user_login': {
            required: true,
            email: true
        },
        'user_name': {
            required: true,
            minlength: 2
        },
        'user_email': {
            required: true,
            email: true
        },
        'user_phone': {
            required: true,
            digits: true
        },
        'user_password': {
            required: true,
            minlength: 6
        },
        'user_password_confirm': {
            required: true,
            minlength: 6,
            equalTo: "#user_password"
        }
    }

};

// custom rules
//-----------------------------------------------------------------------------------
$.validator.addMethod("email", function(value) {
    if (value == '') return true;
    var regexp = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regexp.test(value);
});

$.validator.addMethod("letters", function(value, element) {
    return this.optional(element) || /^[^1-9!@#\$%\^&\*\(\)\[\]:;,.?=+_<>`~\\\/"]+$/i.test(value);
});

$.validator.addMethod("digits", function(value, element) {
    return this.optional(element) || /^(\+?\d+)?\s*(\(\d+\))?[\s-]*([\d-]*)$/i.test(value);
});

$.validator.addMethod("valueNotEquals", function(value, element) {
    if (value == "") return false
    else return true
});

//  validator init
//-----------------------------------------------------------------------------------
validator.init();
