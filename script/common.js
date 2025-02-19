$(function () {
    /*theme toggle*/
    $('.themeToggle').on('click', function () {
        if ($('.titleThemeToggle').text() === 'Темная тема') {
            $('.titleThemeToggle').text('Светлая тема')
            $('header').css("background-color", "black").css("color", "white")
            $('main').css("background-color", "#1D1D1D").css("color", "white")
            $('.main-search-parameters').css("background-color", "black").css("color", "white")
            $("<img src='/assets/topic_night.svg'>").replaceAll('.themeToggle img')
            if ($('button.button-left').attr('class').includes('activ')) {
                $("<img src='/assets/left_night_activ.svg'>").replaceAll('.left img')
            }
            else {
                $("<img src='/assets/left_night.svg'>").replaceAll('.left img')
            }
            if (($('button.button-right').attr('class').includes('activ'))) {
                $("<img src='/assets/right_night_activ.svg'>").replaceAll('.right img')
            }
            else {
                $("<img src='/assets/right_night.svg'>").replaceAll('.right img')
            }
            $('.button-right').css("background-color", "black")
            $('.button-left').css("background-color", "black")
            $('#menu-container').css("background-color", "black").css("color","white")
            $('.themeToggle').css("background-color", "black")
            $('input#menu-hamburger~label').css("background-color", "black").css("color","white")
        }
        else {
            $('.titleThemeToggle').text('Темная тема')
            $('header').css("background-color", "white").css("color", "black")
            $('main').css("background-color", "white").css("color", "black")
            $('.main-search-parameters').css("background-color", "white").css("color", "black")
            $("<img src='/assets/topic_day.svg'>").replaceAll('.themeToggle img')
            if (($('button.button-left').attr('class').includes('activ'))) {
                $("<img src='/assets/left_day_activ.svg'>").replaceAll('.left img')
            }
            else {
                $("<img src='/assets/left_day.svg'>").replaceAll('.left img')
            }
            if (($('button.button-right').attr('class').includes('activ'))) {
                $("<img src='/assets/right_day_activ.svg'>").replaceAll('.right img')
            }
            else {
                $("<img src='/assets/right_day.svg'>").replaceAll('.right img')
            }
            $('.button-right').css("background-color", "white")
            $('.button-left').css("background-color", "white")
            $('#menu-container').css("background-color", "white").css("color","black")
            $('.themeToggle').css("background-color", "white")
            $('input#menu-hamburger~label').css("background-color", "white").css("color","black")
        }
    });
    /*button search hover*/
    $('.search-form-buttom').hover(
        function () {
            $(this).css("background-color", "#504C4C")
        },
        function () {
            $(this).css("background-color", "#020202")
        }
    );
});