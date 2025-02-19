let dataMovie;
let dataJSON;
let token = "2R1MKR1-9EZ44ZB-PYJM41D-D39FVDX"

$(function () {
    var movie_id = localStorage.getItem("movie_id");

    if (movie_id !== null) {
        console.log(movie_id)
        localStorage.removeItem("movie_id");
        localStorage.clear();
    }

    $.ajax({
        url: 'https://api.kinopoisk.dev/v1.4/movie/' + movie_id,
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function (jqXHR) {
            jqXHR.setRequestHeader("Accept", "application/json");
            jqXHR.setRequestHeader("X-Api-Key", token);
        },
        success: function (data) {
            dataMovie = data
            dataPageLoad()
        }
    });

    
    $('.search-form-buttom').on("click", function () {
        $.ajax({
            url: 'https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=45&',
            contentType: "application/json",
            dataType: 'json',
            data: $('input').serialize(),
            beforeSend: function (jqXHR) {
                jqXHR.setRequestHeader("Accept", "application/json");
                jqXHR.setRequestHeader("X-Api-Key", token);
            },
            success: function (data) {
                dataJSON = data
                localStorage.clear()
                localStorage.setItem("dataSearch", JSON.stringify(dataJSON.docs));
                document.location.href = '../../movie_list/movie_list.html';
            }

        });

    });
    
    function dataPageLoad() {
        $('.movie-title h1').text(dataMovie.name);
        $("<img src='" + dataMovie.poster.url + "'>").replaceAll('.poster-image img');
        $('.poster-rating p').text(dataMovie.rating.kp.toFixed(1));
        if (dataMovie.rating.kp.toFixed(1) < 8.5) {
            $('.poster-rating').css("background-color", "#FFAF37")
        } else {
            $('.poster-rating').css("background-color", "#3BB33B")
        }
        var genre = '';
        for (var i = 0; i < dataMovie.genres.length; i++) {
            genre += dataMovie.genres[i].name + " ";
        }
        $('.genre-info').text(genre);
        $('.country-info').text(dataMovie.countries[0].name);
        var actor = '';
        var length = 0;
        if (dataMovie.persons.length > 5) {
            length = 5
        } else {
            length = dataMovie.persons.length
        }
        for (var i = 0; i < length; i++) {
            if (dataMovie.persons[i].profession === "актеры") {
                if (dataMovie.persons[i].name === null) {
                } else {
                    actor += dataMovie.persons[i].name + " ";
                }
            }
        }
        if (actor !== '') {
            $('.actor-info').text(actor);
        }
        else {
            $('.actor-info').text('---');
        }
        var director = '';
        for (var i = 0; i < dataMovie.persons.length; i++) {
            if (dataMovie.persons[i].profession === "режиссеры") {
                if (dataMovie.persons[i].name === null) {
                } else {
                    director += dataMovie.persons[i].name + " ";
                }
            }
        }
        if (director !== '') {
            $('.directors-info').text(director);
        } else {
            $('.directors-info').text('---')
        }
        if (dataMovie.premiere.world === null) {
            $('.release-info').text('---');
        } else {
            $('.release-info').text(DataFilm(dataMovie.premiere.world));
        }
        if (dataMovie.ageRating === null) {
            $('.age-info').text('---')
        } else {
            $('.age-info').text(dataMovie.ageRating.toString(10) + "+")
        }
        if (dataMovie.videos === undefined) {
            $("<p>Ссылки на трейлер не найдена</p>").replaceAll('iframe');
        } else {
            $("<iframe src=" + dataMovie.videos.trailers[0].url + "></iframe>").replaceAll('iframe');
        }
        if (dataMovie.stills === undefined) {
            $('.stills-film').css("display", "none");
        }
        if (dataMovie.reviews === undefined) {
            $('.reviews-film').css("display", "none")
        }
    }

});

function DataFilm(data) {
    var millisecund = Date.parse(data);
    var date = new Date(millisecund)
    var dateString = '';
    dateString += date.getDate() + " ";
    var month = '';
    switch (date.getMonth()) {
        case 0:
            month = 'января '
            break;
        case 1:
            month = 'февраля '
            break;
        case 2:
            month = 'марта '
            break;
        case 3:
            month = 'апреля '
            break;
        case 4:
            month = 'мая '
            break;
        case 5:
            month = 'июня '
            break;
        case 6:
            month = 'июля '
            break;
        case 7:
            month = 'августа '
            break;
        case 8:
            month = 'сентября '
            break;
        case 9:
            month = 'октября '
            break;
        case 10:
            month = 'ноября '
            break;
        case 11:
            month = 'декабря '
            break;
        default: break;
    }
    return dateString += month + date.getFullYear();
}

module.exports = DataFilm;