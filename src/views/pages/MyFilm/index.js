/* eslint-disable */

import { getFilmsFilterApi } from "apis/filmApi";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import FilmListingsByGenre from "views/components/FilmListingsByGenre";
import Navbar from "views/components/Navbar";

const MyFilm = () => {
    const [filmBuyer, setFilmBuyer] = useState([]);
    const [categories, setCategories] = useState([]);

    const idListMyFilm = localStorage.getItem('film_buyer');
    const listIdMyFilm = [...new Set(idListMyFilm.split(','))]

    useEffect(() => {
        (async function () {
          try {
            const responseAll = await getFilmsFilterApi('');
            setFilmBuyer(responseAll.data.filter(item => listIdMyFilm.includes(item._id)));
            
            let genres = [];
            responseAll.data.forEach(item => {
                item.genre.forEach(genre => {
                    if (!genres.includes(genre)) {
                        genres.push(genre);
                    }
                });
            });
            setCategories(genres)
          } catch (error) {
            console.log(error);
          }
        })();
    // eslint-disable-next-line
    }, []);

    console.log(categories, 'rrrr')

    return (
        <div>
            <Helmet>
                <title>Vflix - Phim của tôi</title>
            </Helmet>
            <Navbar
                style={{ color: '#fff', width: '100%', height: 64 }}
                onBack={() => router.back()}
            />
            <div>
                <h2
                    style={{
                        color: 'white',
                        fontSize: '40px',
                        fontWeight: 600,
                        paddingLeft: '4%',
                        paddingTop: '65px'
                    }}
                >Danh sách phim đã mua</h2>
                {categories.map((item, index) => {
                    return (
                    <FilmListingsByGenre
                        filmsFilter={filmBuyer.filter((film) => {
                        if (item === 'all') {
                            return true;
                        }
                        return film.genre.indexOf(item) !== -1;
                        })}
                        genre={item}
                        key={index}
                    />
                    );
                })}
            </div>
        </div>
    )
}

export default MyFilm;