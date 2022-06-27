import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { removeGame } from "../../redux/slices/favoriteSlice";
import { removeItemLocalStorage } from "../../utils/localStorage";

import Close from "../../assets/images/close.svg";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteGames = useSelector((state) => state.favorite.games);

  const removeButton = (id) => {
    removeItemLocalStorage("favorites", id);
    dispatch(removeGame(id));
  };

  return (
    <>
      {favoriteGames.length ? (
        <>
          {favoriteGames.map((item) => (
            <div key={item.id} className={styles.items__contaier}>
              <Link to={`/${item.id}`}>
                <div className={styles.title__container}>
                  <img
                    className={styles.image}
                    src={item.background_image}
                    alt={item.name}
                  />
                  <h2 className={styles.title}>{item.name} </h2>
                </div>
              </Link>
              <div className={styles.bottons__container}>
                <button className={styles.price}>$49.99</button>
                <button
                  className={styles.remove__button}
                  onClick={() => removeButton(item.id)}
                >
                  <img src={Close} alt="Remove" />
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h1 className={styles.title_empty}>
          You don't have any favorite games yet.
          <a onClick={() => navigate(-1)}> Go back</a>
        </h1>
      )}
    </>
  );
};

export default Favorites;
