import { useBikes } from 'hooks';
import React, { FunctionComponent } from 'react'
import BikesGrid from './BikesGrid';
import Sidebar from './Sidebar';
import styles from './gallery.module.scss';
import Header from './Header';

interface GalleryProps {
    
}
 
const Gallery: FunctionComponent<GalleryProps> = () => {
    const { bikes } = useBikes();
    return (
      <div className={styles.gallery}>
        <Sidebar />
        <div>
          <Header />
          <BikesGrid bikes={bikes} />
        </div>
      </div>
    );
}
 
export default Gallery;