import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    // const [user, setUser] = useState('')

    const handleLogin = () => {
      login();
    };
  
    return (
      <div>
        <h2>Login</h2>
        {/* Login form and logic */}
        {/* <input type="text" name='user' value={user} onChange={(e) => setUser(e.target.value)}/> */}
        <button onClick={handleLogin} className=' bg-gray-400 cursor-pointer'>Login</button>
      </div>
    );
}

export default Login