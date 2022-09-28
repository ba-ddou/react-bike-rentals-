import { LargeHeading } from "@components/atoms";
import { ProfileBanner } from "@components/moleculs";
import { Header } from "@components/organisms";
import ReservationsTable from "@components/organisms/ReservationsTable";
import { ReservationWithProjections, User } from "@root/@types";
import { cancelReservation } from "@root/services";
import { FunctionComponent } from "react";
import styles from "../../styles/Home.module.css";

interface UserProfileProps {
  reservations: ReservationWithProjections[];
  user: User;
  onCancel?: (id: string) => void;
  onEdit?: () => void;
  onRate?: (id: string, rating: number) => Promise<void>;
}

const UserProfile: FunctionComponent<UserProfileProps> = ({
  reservations,
  user,
  onCancel,
  onEdit,
  onRate,
}) => {
  return (
    <div className={styles.container}>
      <ProfileBanner user={user} onEdit={onEdit} />
      <LargeHeading minWidth={1200}>Reservations History</LargeHeading>
      <ReservationsTable
        reservations={reservations}
        omitColumns={["user"]}
        onCancel={onCancel}
        onRate={onRate}
      />
    </div>
  );
};

export default UserProfile;
