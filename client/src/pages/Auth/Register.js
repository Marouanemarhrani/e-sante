import React, { useState } from 'react';
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./Register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");  // New state for phone
    const [address, setAddress] = useState(""); // New state for address
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Form submission function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/users/register-senior`, {
                username,
                email,
                password,
                phone,     // Send phone to backend
                address,   // Send address to backend
            });

            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log('Error:', error);
            toast.error('Une erreur est survenue lors de l\'inscription');
        }
    };

    return (
        <div className='regbody'>
            <Layout title="Inscription">
                <div className='register'>
                    <form onSubmit={handleSubmit}>
                        <h1 className='reg-title'>Créez votre compte</h1>
                        <div className="regdiv mb-3">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="reginput form-control"
                                placeholder="Nom d'utilisateur"
                                required
                            />
                        </div>
                        <div className="regdiv2 mb-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="reginput form-control"
                                placeholder='Adresse e-mail'
                                required
                            />
                        </div>
                        <div className="regdiv3 mb-3">
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="reginput form-control"
                                    placeholder='Mot de passe'
                                    required
                                />
                                {password && (
                                    <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="regdiv4 mb-3">
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}  // Phone input
                                className="reginput form-control"
                                placeholder='Numéro de téléphone'
                                required
                            />
                        </div>
                        <div className="regdiv5 mb-3">
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}  // Address input
                                className="reginput form-control"
                                placeholder='Adresse'
                                required
                            />
                        </div>
                        <button type="submit" className="regbtn btn">
                            Inscription
                        </button>
                        <div className='logindiv'>
                            <Link to="/login" className='Logincls'>
                                Vous avez déjà un compte ? Connectez-vous.
                            </Link>
                        </div>
                    </form>
                </div>
            </Layout>
        </div>
    );
};

export default Register;
