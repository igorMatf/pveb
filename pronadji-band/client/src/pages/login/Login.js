import React, { useState, useEffect, useContext } from 'react'

import validator from 'validator';
import Button from '../../components/Button/Button';
import FormErrors from '../../components/FormErrors/FormErrors';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import AppContext from '../../contexts/AppContext';

function Login() {
    const history = useHistory();
    const {setUser} =  useContext(AppContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if(!email){
            _errors.push('Email is required')
        }
        if(!password) {
            _errors.push('Password is required')
        }

        if(_errors.length) {
            return setErrors(_errors);
        }


        try {
            const data = {
                email,
                password
            };

            const response = await axios.post('/api/user/login', data);
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token)
            history.push('/');
        } catch (e) {
            setErrors([e.response.data.message]);
        }
        
    };
    return (
        <div className="page">
            <h1 className="page__title">Login</h1>
            <form onSubmit={onSubmit} className="form">
               {!!errors.length && <FormErrors errors={errors} />}

                <div className="form__group">
                    <label className="form_label">Email</label>
                    <input type="text" className="form__input" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className="form__group">
                    <label className="form_label">Password</label>
                    <input type="password" className="form__input" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>

                <Button type="submit">Login</Button>
            </form>
        </div>
    )
}

export default Login
