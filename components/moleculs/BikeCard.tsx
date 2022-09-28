import { Bike } from "@types";
import React, { FunctionComponent } from "react";
import Image from "next/image";
import styles from "./bikeCard.module.scss";
import { Text } from "@mantine/core";
import { RatingPreview } from "@components/atoms";
interface BikeCardProps {
  bike: Bike;
  onClick: () => void;
}

const BikeCard: FunctionComponent<BikeCardProps> = ({ bike, onClick }) => {
  return (
    <div
      className={styles.bikeCard}
      onClick={onClick}
      style={{
        cursor: "pointer",
      }}
    >
      <div className={styles.imageContainer}>
        {/* <Image
          src={bike.image}
          alt={bike.model}
          layout="responsive"
          width={100}
          height={100}
        /> */}
        <img
          src={bike.image}
          alt={bike.model}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className={styles.info}>
        <Text size="sm" weight="bold">
          {bike.model}
        </Text>
        <Text size="xs">{`${bike.price} $/day`}</Text>
        <RatingPreview rating={bike.rating} ratingCount={bike.ratingCount} />
      </div>
    </div>
  );
};

export default BikeCard;
