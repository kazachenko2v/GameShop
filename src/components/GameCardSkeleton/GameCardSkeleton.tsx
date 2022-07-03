import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./GameCardSkeleton.module.css";

const GameCardSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <Skeleton className={styles.img} />
      </div>
      <div>
        <Skeleton count={3} className={styles.row} />
      </div>
    </div>
  );
};

export default GameCardSkeleton;
