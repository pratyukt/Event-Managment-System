import React, { useState, useEffect } from 'react';
import "./Signup.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Cookies from 'js-cookie';

const MySwal = withReactContent(Swal);

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [organizer, setOrganizer] = useState(false);
    const token = Cookies.get('token');

    const handleSignup = () => {
        if (!name || !email || !password) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill out all fields.',
            });
            return;
        }
        axios.post('http://localhost:3000/users/signup', {
            name,
            email,
            password,
            organizer,
        })
        .then((response) => {
            MySwal.fire({
                icon: 'success',
                title: 'Signup Successful',
                confirmButtonText: 'Proceed to Sign In',
            }).then(() => {
                window.location.href = '/signin';
            });
        })
        .catch((error) => {
            MySwal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: error.response?.data?.message || 'An error occurred.',
            });
        });
    };

    useEffect(() => {
        if (token) {
            window.location.href = '/';
        }
    }, [token]);

    return (
        <div className="signupcontainer">
            <div className="leftbox">
                <h1>Welcome back</h1>
                <p>To keep connected with us provide us with your information</p>
                <Link to={"../signin"}>
                    <button type="button" className="signupbtn">Sign in</button>
                </Link>
            </div>
            <div className="rightbox">
                <h3>Event <span>Hive</span></h3>
                <h1>Sign Up to Event Hive</h1>
                <div className="signupinfo">
                    <form>
                        <div className="upname">
                            <label htmlFor="upname">YOUR NAME</label>
                            <input 
                                type="text" 
                                placeholder="Enter your name" 
                                id="upname" 
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                        <div className="upemail">
                            <label htmlFor="upemail">YOUR EMAIL</label>
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                id="upemail" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="uppassword">
                            <label htmlFor="uppassword">PASSWORD</label>
                            <input 
                                type="password" 
                                placeholder="Enter your password" 
                                id="uppassword" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div id="check">
                            <input 
                                type="checkbox" 
                                name="organizer" 
                                id="organizer" 
                                checked={organizer} 
                                onChange={(e) => setOrganizer(e.target.checked)} 
                            />
                            <label htmlFor="organizer">I am an Organizer</label>
                        </div>
                    </form>
                </div>
                <div className="googleupbtn">
                    <button className="simpsignup" onClick={handleSignup}>Sign Up</button>
                    <p>or</p>
                    <button className="googlebtn">
                        <img src="\src\assets\signup\Logo (3).svg" alt="" /> Sign up with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
