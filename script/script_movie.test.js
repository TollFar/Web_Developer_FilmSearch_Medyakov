const DataFilm =require ('./script_movie');
test('Получение даты релиза фильма в нужном формате', () => {
    expect (DataFilm("2001-12-14T00:00:00.000Z")).toBe("14 декабря 2001") });