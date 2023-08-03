import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const VerifyEmail = () => {
    const router = useRouter();
    const { token } = router.query;
    const [message, setMessage] = useState(
        'Your email succeseffully verified!'
    );

    useEffect(() => {
        if (token) {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/verify-email/${token}`;

            console.log(url);
            axios
                .post(url)
                .then((response) => {
                    setMessage(response.data.message);
                })
                .catch((error) => {
                    setMessage('Error verifying email.');
                    console.error(error);
                });
            // .finally(() => {
            //     setTimeout(() => {
            //         router.push('/signin');
            //     }, 1500);
            // });
        }
    }, [token, router]);

    const containerStyle = {
        overflow: 'hidden',
        transform: 'scale(1.02)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        background: '#141123',
    };

    const headingStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
        fontStyle: 'Poppins, sans-serif',
        color: '#fff',
    };

    const messageStyle = {
        fontSize: '24px',
        textAlign: 'center',
        fontStyle: 'Poppins, sans-serif',
        color: 'lightgreen',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Verification Email:</h1>
            <p style={messageStyle}>{message}</p>
        </div>
    );
};

export default VerifyEmail;
