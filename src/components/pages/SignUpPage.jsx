import React from 'react';

import Register from '../auth';
import { signUp } from '../../slices/auth.js';

const SignUpPage = () => (
    <Register
        initialValues={{ userName: '', password: '', confirmPassword: '' }}
        title="Create your account"
        validator="singUp"
        submitTitle="Sign Up"
        action={signUp}
    />
);

export default SignUpPage;
