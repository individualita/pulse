$(document).ready(function(){
    $('.carousel__inner').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1100,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.svg"></button>',
        responsive: [
            {
                breakpoint: 720,
                settings: {
                    arrows: false,
                    dots: true,
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
    

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide ('.catalog-item__back');

    //modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn ('slow');
    });

    //close
    $('.modal__close').on('click', function (){
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    //buy
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn ('slow');
        });
    });

    //validation
    function valideForms(form){
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста введите свою почту",
                    email: "Неправильно указан адрес почты",
                }
            }
        });
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //ajax
    $('form').submit(function(e) {
        e.preventDefault();

        if(!(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //scroll and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop () > 700) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut('slow');
        }
    });
    //smooth scroll
    $("a[href=#up]").click (function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    new WOW().init();
    
    //burger 
    const burgerButton = document.querySelector('.header__btn');
    const navMenu = document.querySelector('.header__contacts');

    burgerButton.addEventListener('click', function() {
        burgerButton.classList.toggle('active');
        navMenu.classList.toggle('header__contacts_active')
    });

 });