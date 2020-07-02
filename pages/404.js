import React from 'react';
import NotFound from '../public/404.jpg';
import Link from 'next/link';
const Custom404 = () => {
  return (
    <div style={styles.mainContainer}>
      <Link href="/">
        <h2 style={styles.linkBack}>⬅ Back to Site</h2>
      </Link>
      <h1 style={styles.title}>Page does not Exist</h1>
    </div>
  );
};

export default Custom404;

const styles = {
  mainContainer: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    mixBlendMode: 'overlay',
    backgroundImage: `url(${NotFound})`,
  },
  title: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '2rem',
    background: 'rgba(0, 0, 0, 0.4)',
    padding: '10px 20px',
    borderRadius: '20px',
    color: 'white',
  },
  linkBack: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    background: 'rgba(0,0,0,0.5)',
    padding: '5px 8px',
    borderRadius: '5px',
    cursor: 'pointer',
    color: 'orange',
    fontWeight: 'bold',
  },
};
