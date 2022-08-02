import * as Yup from 'yup';

const validatorSchemas = {
    login: (t) =>
        Yup.object().shape({
            userName: Yup.string().required(t('required')),
            password: Yup.string().required(t('required')),
        }),
    singUp: (t) =>
        Yup.object({
            userName: Yup.string()
                .min(2, t('short'))
                .max(20, t('long'))
                .required(t('required')),
            password: Yup.string().min(2, t('short')).required(t('required')),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], t('notSame'))
                .required(t('required')),
        }),
    channel: (t) =>
        Yup.object().shape({
            channelName: Yup.string().required(t('required')),
        }),
};

export default (t, validator) => validatorSchemas[validator](t);
