import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlatformsId } from "../../redux/slices/filterSlice";

import PlatformsItem from "./PlatformsItem";

import styles from "./PlatformsList.module.css";
import cn from "classnames";

const PlatsormsList = () => {
  const dispatch = useDispatch();
  let platformsId = useSelector((state) => state.filter.platformsId);

  const allPlatforms = [
    { id: 1, name: "PC" },
    { id: 2, name: "PlayStation" },
    { id: 3, name: "Xbox" },
    { id: 4, name: "iOS" },
    { id: 8, name: "Android" },
  ];

  const dropDownRef = React.useRef(null);
  const selectedPlatformsRef = React.useRef(null);
  const startPlatformsRef = React.useRef(null);
  selectedPlatformsRef.current = [...platformsId];
  startPlatformsRef.current = [...platformsId];
  const [isActive, setIsActive] = React.useState(false);

  const togglePlatforms = (id) => {
    if (
      selectedPlatformsRef.current.includes(id) &&
      selectedPlatformsRef.current.length !== 1
    ) {
      selectedPlatformsRef.current = selectedPlatformsRef.current.filter(
        (item) => item !== id
      );
    } else if (!selectedPlatformsRef.current.includes(id)) {
      selectedPlatformsRef.current.push(id);
    }
  };

  React.useEffect(() => {
    const handleClick = (e) => {
      if (!e.path.includes(dropDownRef.current)) {
        const sortedPlatforms = selectedPlatformsRef.current.sort(
          (a, b) => a - b
        );

        // compare starting and modified platforms arrays to make a new request or not
        const diff = function (a1, a2) {
          return a1
            .filter((i) => !a2.includes(i))
            .concat(a2.filter((i) => !a1.includes(i)));
        };

        const toUpdate = diff(
          startPlatformsRef.current,
          sortedPlatforms
        ).length;

        if (toUpdate) {
          dispatch(setPlatformsId(sortedPlatforms));
          localStorage.setItem("platformsId", sortedPlatforms);
        }
        setIsActive(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={dropDownRef}>
      <button
        className={cn(styles.dropdown_button, {
          [styles.dropdown_button__not_acive]: !isActive,
          [styles.dropdown_button__active]: isActive,
        })}
        onClick={() => setIsActive(!isActive)}
      >
        Platforms
      </button>
      <div
        className={cn({
          [styles.dropdown_menu]: !isActive,
          [styles.dropdown_menu__acive]: isActive,
        })}
      >
        {allPlatforms.map((item) => (
          <PlatformsItem
            key={item.id}
            item={item}
            isActiveMenu={isActive}
            togglePlatforms={togglePlatforms}
            platformsId={platformsId}
          />
        ))}
      </div>
    </div>
  );
};

export default PlatsormsList;
