import { Link, animateScroll as scroll } from 'react-scroll';
import styles from './componentStyle.css'
import plate from '../assets/plate.svg'

const LandingPage = () => {
    return (
        <div id="container" className="landing-container">
            <div className="background-image"></div>
            <div id="plate-container">
            <h2 style={{ fontSize: '40px', marginBottom: '20px', marginTop: '40px'}}>From plate <br></br>to planet</h2>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                Discover recipes with lower carbon impacts and cook for a greener future.
            </p>
            </div>
            <Link
                activeClass="active"
                to="content"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
            >
                <button>Find me a recipe</button>
            </Link>
        </div>
    );
};

export default LandingPage;