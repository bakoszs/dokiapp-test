export const Config = {
    getImdbTitleUrl: imdbId => `https://www.imdb.com/title/${imdbId}`,
    getWikiPageUrl: (title) => `https://en.wikipedia.org/wiki/${title}`,
    graphQlEndpoint: "https://tmdb.sandbox.zoosh.ie/dev/graphql",
    tmdbApiKey: "10e42c32b3ac154e616accec8e1ff91c",
    tmdbApiUrl: "https://api.themoviedb.org/3",
    wikiApiUrl: "https://en.wikipedia.org/w/api.php",
};

export default Config;