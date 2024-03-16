import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import './signin.css';

const Signin = () =>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const response = await fetch('/Signin',{
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    username:username,
                    password:password
                })
            })

            if(response.ok){
                console.log("Registration Succesfull")
            }
            else{
                console.log("Not succesfull....");
            }
        } catch(err){
            console.log("registration unsucces fulll....");
        }
    }
    return(
    <div className='container'>
        <form action='http://localhost:3001/Signin' method='post'>
            <h2 className='head'>Login </h2>
            <table className='resultTable'>
                <tr>
                    <th><label>Username: </label></th>
                    <td><input type="text" name="username" value={username} className='customSelect' onChange={(e)=>{setUsername(e.target.value)}} /></td>
                </tr>
                <tr>
                    <th><label>Password </label></th>
                    <td><input type="text" name="password" value={password} className='customSelect' onChange={(e)=>{setPassword(e.target.value)}} /></td>
                </tr>
                <tr>
                   <td> <button type="submit" name="submit" value="Login" className='btn'>Signin</button></td>
                </tr>
                <tr>
                   <td> Don't have an account? <Link to="/register">Register Here</Link></td>
                </tr>
            </table>
        </form>
        <p>
            
        </p>
    </div>);
};
export default Signin;