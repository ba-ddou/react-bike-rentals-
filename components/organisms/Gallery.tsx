import { useBikes } from 'hooks';
import React, { FunctionComponent } from 'react'
import BikesGrid from './BikesGrid';
import FiltersSidebar from './FiltersSidebar';
import styles from './gallery.module.scss';
import Header from './Header';

interface GalleryProps {
    
}
 
const Gallery: FunctionComponent<GalleryProps> = () => {
    const { bikes } = useBikes();
    return (
      <div className={styles.gallery}>
        <FiltersSidebar />
        <div>
          <Header />
          <BikesGrid bikes={bikes} />
        </div>
      </div>
    );
}
 
export default Gallery;