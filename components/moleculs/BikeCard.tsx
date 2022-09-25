import { Bike } from "@types";
import React, { FunctionComponent } from "react";
import Image from "next/image";
import styles from "./bikeCard.module.scss";
import {Text} from "@mantine/core"
interface BikeCardProps {
  bike: Bike;
}

const BikeCard: FunctionComponent<BikeCardProps> = ({ bike }) => {
  return (
    <div className={styles.bikeCard}>
      <div className={styles.imageContainer}>
        <Image
          src={bike.image}
          alt={bike.model}
          layout="responsive"
          width={100}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <Text size="sm" weight="bold">
          {bike.model}
        </Text>
        <Text size="xs">{`${bike.price} $/day`}</Text>
      </div>
    </div>
  );
};

export default BikeCard;
