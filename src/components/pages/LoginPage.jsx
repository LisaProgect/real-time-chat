import React from 'react';

import Register from '../auth';
import { login } from '../../slices/auth.js';

const LoginPage = () => (
    <Register
        initialValues={{ userName: '', password: '' }}
        title="Sign in to your account"
        validator="login"
        submitTitle="Sign Up"
        action={login}
    />
);

export default LoginPage;
