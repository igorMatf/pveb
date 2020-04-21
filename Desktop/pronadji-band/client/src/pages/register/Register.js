import React, { useState, useEffect } from 'react'

import validator from 'validator';
import Button from '../../components/Button/Button';
import FormErrors from '../../components/FormErrors/FormErrors';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

function Register() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if(!name){
            _errors.push('Name is required');
        }
        if(!validator.isEmail(email)){
            _errors.push('Email is required or invalid')
        }
        if(!password) {
            _errors.push('Password is required')
        }
        if(!passwordAgain) {
            _errors.push('Password again is required')
        }

        if(password !== passwordAgain) {
            _errors.push("Password must match")
        }
        if(_errors.length) {
            return setErrors(_errors);
        }


        const data = {
            name,
            email,
            password
        };

        try {
            await axios.post('/api/user/register', data);
            history.push('/auth/login');
        } catch (e) {
            setErrors([e.response.data.message])
        }
        
    };
    return (
        <div className="page">
            <h1 className="page__title">Register</h1>
            <form onSubmit={onSubmit} className="form">
               {!!errors.length && <FormErrors errors={errors} />}
                <div className="form__group">
                    <label className="form_label">Name</label>
                    <input type="text" className="form__input" value={name} onChange={e => setName(e.target.value)}/>
                </div>

                <div className="form__group">
                    <label className="form_label">Email</label>
                    <input type="text" className="form__input" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className="form__group">
                    <label className="form_label">Password</label>
                    <input type="password" className="form__input" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>

                <div className="form__group">
                    <label className="form_label">Repeat password</label>
                    <input type="password" className="form__input" value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)}/>
                </div>

                <Button type="submit">Register</Button>
            </form>
        </div>
    )
}

export default Register
