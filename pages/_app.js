import "../styles/globals.css";
import "../styles/box.css";
import "../styles/nav.css";
import GenreProvider from "../provider/GenreProvider";
import SeriesProvider from "../provider/SeriesProvider";
import TitleMovieProvider from "../provider/TitileMovieProvider";
import TitleSerieProvider from "../provider/TitleSerieProvider";

function MyApp({ Component, pageProps }) {
  return (
    <TitleMovieProvider>
      <TitleSerieProvider>
        <GenreProvider>
          <SeriesProvider>
            <Component {...pageProps} />
          </SeriesProvider>
        </GenreProvider>
      </TitleSerieProvider>
    </TitleMovieProvider>
  );
}

export default MyApp;
