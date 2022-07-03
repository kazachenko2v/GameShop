import React from "react";
import { useDispatch } from "react-redux";
import { setPlatformsId } from "../../redux/filter/slice";
import { TPlatformsId } from "../../redux/filter/types";

import PlatformsItem from "./PlatformsItem";
import { ALL_PLATFORMS } from "../../constants";

import styles from "./PlatformsList.module.css";
import cn from "classnames";

type PopupClick = MouseEvent & {
  path: Node[];
};

type PaginationProps = {
  platformsId: TPlatformsId;
};

const PlatsormsList: React.FC<PaginationProps> = ({ platformsId }) => {
  const dispatch = useDispatch();
  const dropDownRef = React.useRef<HTMLDivElement>(null);
  const selectedPlatformsRef = React.useRef<TPlatformsId | null>(null);
  const startPlatformsRef = React.useRef<TPlatformsId | null>(null);
  selectedPlatformsRef.current = [...platformsId];
  startPlatformsRef.current = [...platformsId];
  const [isActive, setIsActive] = React.useState(false);

  const togglePlatforms = (id: number) => {
    if (
      selectedPlatformsRef.current?.includes(id) &&
      selectedPlatformsRef.current?.length !== 1
    ) {
      selectedPlatformsRef.current = selectedPlatformsRef.current.filter(
        (item) => item !== id
      );
    } else if (!selectedPlatformsRef.current?.includes(id)) {
      selectedPlatformsRef.current?.push(id);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (
        dropDownRef.current &&
        !_event.composedPath().includes(dropDownRef.current)
      ) {
        const sortedSelectedPlatformsRef = selectedPlatformsRef.current?.sort(
          (a, b) => a - b
        );

        // compare starting and modified platforms arrays to make a new request or not
        const toUpdate = !(
          JSON.stringify(startPlatformsRef.current) ===
          JSON.stringify(sortedSelectedPlatformsRef)
        );

        if (toUpdate) {
          if (sortedSelectedPlatformsRef) {
            dispatch(setPlatformsId(sortedSelectedPlatformsRef));
          }
          localStorage.setItem(
            "platformsId",
            JSON.stringify(sortedSelectedPlatformsRef)
          );
        }
        setIsActive(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
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
        {ALL_PLATFORMS.map((item) => (
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
