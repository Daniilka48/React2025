import { Link } from 'react-router-dom';
// import '../cssComponents/About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>About This App</h1>
      <p>Author: Your Name</p>
      <p>
        RS School React Course: <br />
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          https://rs.school/react/
        </a>
      </p>
      <Link to="/">Back to Search</Link>
    </div>
  );
};

export default About;
