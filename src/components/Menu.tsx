import '../styles/Form.css'
import people from '../assets/People.png'
function Menu(){
    return(
        <div className="menu">
                <div className="icon-circle">
                    <img src={people} alt="contact-icon" width="20px"/>
                </div>
                <span>Employee List</span>
            </div>
    );
}

export default Menu