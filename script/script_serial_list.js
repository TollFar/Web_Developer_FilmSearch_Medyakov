let token = "2R1MKR1-9EZ44ZB-PYJM41D-D39FVDX"
let dataMovieList = [];
let index = 0;
$(function () {
    dataMovieList = [];
    for (let i = 0; i < 9; i++) {
        $.ajax({
            url: 'https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=name&notNullFields=rating.kp&notNullFields=poster.url&type=tv-series&rating.kp=8-10',
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function (jqXHR) {
                jqXHR.setRequestHeader("Accept", "application/json");
                jqXHR.setRequestHeader("X-Api-Key", token);
            },
            success: function (data) {
                dataMovieList.push(data)
                if (dataMovieList.length === 9) {
                    index = 0;
                    updateMovieList(index, dataMovieList.filter(selectedFilter))

                }
            }
        });
    }


    $('.search-form-buttom').on("click", function () {
        $.ajax({
            url: 'https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=45&type=tv-series&',
            contentType: "application/json",
            dataType: 'json',
            data: $('input').serialize(),
            beforeSend: function (jqXHR) {
                jqXHR.setRequestHeader("Accept", "application/json");
                jqXHR.setRequestHeader("X-Api-Key", token);
            },
            success: function (data) {
                dataMovieList = data
                index = 0;
                updateMovieList(index, dataMovieList.docs.filter(selectedFilter))
            }
        });
    });
    
    function selectedFilter(movie) {
        let genre = document.querySelector("#genreId")
        let rating = document.querySelector("#ratingId")
        let country = document.querySelector("#countryId")
        let year = document.querySelector("#yearId")
        if ((movie.genres[0] === genre.value) || (genre.value === 'allgenre')) {
            if ((movie.countries[0].name === country.value) || (country.value === 'allcountry')) {
                if ((movie.year == year.value) || (year.value === 'allyear')) {
                    if (rating.value === 'allrating') {
                        return movie;
                    } else {
                        switch (rating.value) {
                            case 'more-9':
                                if (movie.rating.kp.toFixed(1) >= 9) {
                                    return movie;
                                }
                                break;
                            case '8-9':
                                if (movie.rating.kp.toFixed(1) >= 8 && movie.rating.kp.toFixed(1) <= 9) {
                                    return movie;
                                }
                                break;
                            case '7-8':
                                if (movie.rating.kp.toFixed(1) >= 7 && movie.rating.kp.toFixed(1) <= 8) {
                                    return movie;
                                }
                                break;
                            case 'less-7':
                                if (movie.rating.kp.toFixed(1) <= 7) {
                                    return movie;
                                }
                                break;

                            default: break;
                        }
                    }
                }
            }
        }
    }
    
    document.querySelector("#genreId").addEventListener('change', function (e) {
        index = 0
        updateMovieList(index, dataMovieList.filter(selectedFilter))
    })
    document.querySelector("#ratingId").addEventListener('change', function (e) {
        index = 0
        updateMovieList(index, dataMovieList.filter(selectedFilter))

    })
    document.querySelector("#countryId").addEventListener('change', function (e) {
        index = 0
        updateMovieList(index, dataMovieList.filter(selectedFilter))

    })
    document.querySelector("#yearId").addEventListener('change', function (e) {
        index = 0
        updateMovieList(index, dataMovieList.filter(selectedFilter))

    })


    

    var mediaQueryMin = window.matchMedia('(min-width: 361px)')
    function handleTabletChangeMin(e) {
        if (e.matches) {
            index = 0
            updateMovieList(index, dataMovieList.filter(selectedFilter))
        }
    }
    mediaQueryMin.addListener(handleTabletChangeMin)
    handleTabletChangeMin(mediaQueryMin)

    var mediaQueryMax = window.matchMedia('(max-width: 360px)')
    function handleTabletChangeMax(e) {
        if (e.matches) {
            index = 0
            updateMovieList(index, dataMovieList.filter(selectedFilter))
        }
    }
    mediaQueryMax.addListener(handleTabletChangeMax)
    handleTabletChangeMax(mediaQueryMax)

    function updateMovieList(index, dataMovieList) {
        let movieId = 0;
        let notesOnPage = 0;
        let catalog = document.querySelector('#film-catalog');
        let pagination = document.querySelector('#main-films-count-list');
        catalog.innerHTML = ''
        pagination.innerHTML = ''
        let items = [];


        mediaQueryMin = window.matchMedia('(min-width: 361px)')
        if (mediaQueryMin.matches) {
            notesOnPage = 9;
        }
        mediaQueryMax = window.matchMedia('(max-width: 360px)')
        if (mediaQueryMax.matches) {
            notesOnPage = 1;
            buttonRightActiv()
        }
        let countOfItems = Math.ceil(dataMovieList.length / notesOnPage);

        
        dataMovieList.sort(function (a, b) {
            if (a.rating.kp.toFixed(1) > b.rating.kp.toFixed(1)) {
                return 1
            }
            if (a.rating.kp.toFixed(1) < b.rating.kp.toFixed(1)) {
                return -1;
            }
            return 0;
        })
        dataMovieList.reverse()
        for (let i = 1; i <= countOfItems; i++) {
            let li = document.createElement('li');
            li.innerHTML = i;
            pagination.appendChild(li);
            items.push(li);
        }


        let showPage = (function () {
            let active;

            return function (item) {
                if (active) {
                    active.classList.remove('active');
                }
                active = item;

                item.classList.add('active');

                let pageNum = +item.innerHTML;

                let start = (pageNum - 1) * notesOnPage;
                let end = start + notesOnPage;

                let notes = dataMovieList.slice(start, end);

                catalog.innerHTML = '';
                for (let note of notes) {
                    let divPoster = document.createElement('div');
                    divPoster.classList.add('poster')
                    divPoster.addEventListener('click', function () {
                        movieId = note.id;
                        localStorage.setItem("movie_id", movieId);
                        document.location.href = '../../movie/movie.html';
                    })
                    catalog.appendChild(divPoster);
                    createPoster(note, divPoster)
                }
            };
        }());

        showPage(items[index])

        for (let item of items) {
            item.addEventListener('click', function () {
                showPage(this);
            });
        }
    }
    
    function createPoster(note, divPoster) {
        let poster = document.getElementById('posterTemplate').content.cloneNode(true);
        poster.querySelector('.poster-image img').setAttribute('src', note.poster.url);
        poster.querySelector('.poster-title p').innerText = note.name;
        poster.querySelector('.poster-rating p').innerText = note.rating.kp.toFixed(1);
        divPoster.appendChild(poster)
    }
    
    $('.button-left').on("click", function () {
        if (index > 0) {
            buttonRightActiv();
            index--;
            updateMovieList(index, dataMovieList.filter(selectedFilter));
        }
        else {
            buttonLeftNoActiv();
        }
    });
    
    $('.button-right').on("click", function () {
        if (index < dataMovieList.filter(selectedFilter).length - 1) {
            buttonLeftActiv();
            index++;
            updateMovieList(index, dataMovieList.filter(selectedFilter));
        }
        else {
            buttonRightNoActiv();
        }
    });
    function buttonLeftActiv() {
        $('.button-left').prop('disabled', false);
        $('.button-left').addClass("activ");
        if (($('.titleThemeToggle').text() === 'Темная тема')) {
            $("<img src='/assets/left_day_activ.svg'>").replaceAll('.left img');
        }
        else {
            $("<img src='/assets/left_night_activ.svg'>").replaceAll('.left img');
        }
    }
    function buttonLeftNoActiv() {
        $('.button-left').prop('disabled', true);
        $('.button-left').removeClass("activ");
        if (($('.titleThemeToggle').text() === 'Темная тема')) {
            $("<img src='/assets/left_day.svg'>").replaceAll('.left img');
        }
        else {
            $("<img src='/assets/left_night.svg'>").replaceAll('.left img');
        }
    }
    function buttonRightActiv() {
        $('.button-right').prop('disabled', false);
        $('.button-right').addClass("activ");
        if (($('.titleThemeToggle').text() === 'Темная тема')) {
            $("<img src='/assets/right_day_activ.svg'>").replaceAll('.right img');
        }
        else {
            $("<img src='/assets/right_night_activ.svg'>").replaceAll('.right img');
        }
    }
    function buttonRightNoActiv() {
        $('.button-right').prop('disabled', true);
        $('.button-right').removeClass("activ");
        if ($('.titleThemeToggle').text() === 'Темная тема') {
            $("<img src='/assets/right_day.svg'>").replaceAll('.right img');
        }
        else {
            $("<img src='/assets/right_night.svg'>").replaceAll('.right img');
        }
    }
});

