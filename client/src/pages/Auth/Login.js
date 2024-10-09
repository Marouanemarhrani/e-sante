import React, { useState } from 'react';
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Form submission function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/users/login`, {
                email,
                password,
            });
            console.log('Login response:', res);  // Debug response

            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log('Login error:', error);
            toast.error('Une erreur est survenue, veuillez réessayer');
        }
    };

    return (
        <div className='bodylogin'>
            <Layout title="Connexion">
                <div className='login'>
                    <h1 className='h1'>Connexion à votre compte</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="divemail mb-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="fclas form-control"
                                id="InputEmail1"
                                placeholder='Adresse e-mail'
                                required
                            />
                        </div>
                        <div className="divpass mb-3">
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="fclas form-control"
                                    id="exampleInputPassword1"
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
                        <button type="submit" className="btncls btn btn-primary">
                            Connexion
                        </button>
                        <div className='divbtn mb-3'>
                            <button
                                type="button"
                                className="frgtclass btn btn-link"
                                onClick={() => { navigate('/forgot-password'); }}>
                                Mot de passe oublié ?
                            </button>
                        </div>
                        <div className='divreg'>
                            <Link to="/register" className='registercls'>
                                Vous n'avez pas de compte ? Inscrivez-vous !
                            </Link>
                        </div>
                    </form>
                </div>
            </Layout>
        </div>
    );
};

export default Login;
