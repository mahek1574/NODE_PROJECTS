import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Home = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(heroRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    tl.fromTo(textRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.5'
    );
    tl.fromTo(buttonRef.current,
      { scale: 0 },
      { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' },
      '-=0.3'
    );
  }, []);

  return (
    <div className="home-page" ref={heroRef}>
      <section className="hero">
        <div className="hero-content">
          <h1 ref={textRef}>Welcome to <span>MovieHub</span></h1>
          <p>Discover, Track, and Manage your favorite movies all in one place.</p>
          <div ref={buttonRef}>
            <Link to="/movies" className="hero-cta">Start Browsing</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🔍 Discover</h3>
          <p>Search through our vast library of movies across all genres.</p>
        </div>
        <div className="feature-card">
          <h3>💖 Wishlist</h3>
          <p>Save movies you want to watch later with a single click.</p>
        </div>
        <div className="feature-card">
          <h3>🕒 History</h3>
          <p>Keep track of everything you've watched recently.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
