import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; // Import MDB CSS
import styles from './ProductGrid.module.css'; // Import custom CSS
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBRipple } from 'mdb-react-ui-kit';
import { FaHeart } from 'react-icons/fa'; // Import heart icon

const ProductCard = () => {
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const products = [
    {
      id: 1,
      title: 'Product name 1',
      text: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      image: 'https://mdbootstrap.com/img/new/standard/city/041.webp',
      link: 'https://placeholder.com/product1'
    },
    {
      id: 2,
      title: 'Product name 2',
      text: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      image: 'https://mdbootstrap.com/img/new/standard/city/042.webp',
      link: 'https://placeholder.com/product2'
    },
    {
      id: 3,
      title: 'Product name 3',
      text: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      image: 'https://mdbootstrap.com/img/new/standard/city/043.webp',
      link: 'https://placeholder.com/product3'
    },
    {
      id: 4,
      title: 'Product name 4',
      text: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      image: 'https://mdbootstrap.com/img/new/standard/city/044.webp',
      link: 'https://placeholder.com/product4'
    },
  ];

  return (
    <MDBRow className='row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
      {products.map(product => (
        <MDBCol key={product.id}>
          <MDBCard className={`${styles.shadow} ${styles.backing} ${styles.navmargin}`}>
            <div className={styles.heartIcon} onClick={() => toggleLike(product.id)}>
              <FaHeart color={liked[product.id] ? 'red' : 'grey'} />
            </div>
            <a href={product.link}>
              <MDBRipple rippleColor="light" rippleTag="div" className='bg-image hover-overlay'>
                <MDBCardImage
                  src={product.image}
                  alt={product.title}
                  position='top'
                />
                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
              </MDBRipple>
            </a>
            <MDBCardBody>
              <MDBCardTitle className={styles.bold}>{product.title}</MDBCardTitle>
              <MDBCardText>
                {product.text}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      ))}
    </MDBRow>
  );
}

const ProductGrid = () => {
  return (
    <ProductCard />
  );
}

export default ProductGrid;