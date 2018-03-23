class Genre {

    constructor() {
        this.name = "";
        this.movies = [];
    }


    addMovie(movie) {
        if (movie instanceof Movie) {
            this.movies.push(movie);
            return true;
        }
        return false;
    }
}


class Movie {


    constructor() {
        this.uuid = "";
        this.title = "";
        this.year = "";
        this.genres = null;
        this.related = [];
    }

    addRelatedMovie(movie) {
        if (movie instanceof Movie) {
            this.related.push(movie)
            return true;
        }
        return false;
    }

    setGenre(genre) {
        if (genre instanceof Genre) {
            genre.addMovie(this);
            this.generes = genre;
            return true;
        }
        return false;
    }

}

module.exports = {
    Movie: Movie,
    Genre: Genre
}