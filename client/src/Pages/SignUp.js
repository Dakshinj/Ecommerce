import React, {useState} from 'react';
import NavBar from "../Components/NavBar"
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        password: '',
        msg: '',
        flag: false
    });
    const [isBlank, setIsBlank] = useState(false);
    const { username, email, password, msg, flag } = profile;

    const backendCall = userProfile => {
        return fetch("/server/signup", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userProfile)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
    };

    const inputHandler = value => event => {
        setProfile({ ...profile, flag: false, [value]: event.target.value });
    };

    const clickHandler = (event) =>{
        event.preventDefault();
        if(profile.username.length === 0 || profile.password.length === 0 || profile.email.length === 0){
            setIsBlank(true);
            setProfile({ ...profile, msg: '' });
        }else{
            setIsBlank(false);
            setProfile({ ...profile, flag: false });
            backendCall({username, email, password}).then(data => {
                //console.log(data)
                if (data.error) {
                    setProfile({ ...profile, msg: data.error, flag: true });
                } else {
                    setProfile({
                        ...profile,
                        username: '',
                        email: '',
                        password: '',
                        msg: '',
                        flag: true
                    });
                }
            });
        }
    };

    const noContentAlert = () => (
        <div className="alert alert-danger" style={{ display: (isBlank)? '' : 'none' }}>
            All fields should be filled.
        </div>
    )

    const errorAlert = () => (
        <div className="alert alert-danger" style={{ display: (msg!=='')? '' : 'none' }}>
            {msg}
        </div>
    );

    const successAlert = () => {
        return (<div className="alert alert-success" style={{ display: (flag & msg==='') ? '' : 'none' }}>
            Account created. Please <Link to={"/signin"}>sign in.</Link>
        </div>);
    };

    const form = () => (
        <div className="jumbotron col-md-8 offset-md-2">
            <h1 className="display-10 text-center">Sign Up!</h1>
            <hr></hr>
            <div className="container col-md-8 offset-md-2">
            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        onChange={inputHandler('username')}
                        className="form-control"
                        type="text"
                        placeholder="username"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={username}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        onChange={inputHandler('email')}
                        className="form-control"
                        type="email"
                        placeholder="email"
                        pattern=".{1,}"
                        required title="Field is blank"
                        value={email}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        onChange={inputHandler('password')}
                        className="form-control"
                        type="password"
                        placeholder="password"
                        pattern=".{8,}"
                        required title="Minimum 8 character"
                        value={password}
                    />
                </div>
                <div className="form-group">
                    <button onClick={clickHandler} className="btn btn-primary btn-lg btn-block">Sign Up</button>
                </div>
            </form>
            </div>
        </div>
    );

    return (
        <div>
            <NavBar />
            <div className="container" style={{paddingTop:"10%"}}>
                {noContentAlert()}
                {errorAlert()}
                {successAlert()}
                {form()}
            </div>
        </div>
    )
}

export default SignUp;