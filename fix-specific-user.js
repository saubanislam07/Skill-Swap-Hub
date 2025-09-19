const axios = require('axios');

async function testLoginWithUser() {
    try {
        console.log('Testing login with the user from database...');

        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'sauban@gmail.com',
            password: '67678989'
        });

        console.log('✅ Login successful!');
        console.log('User:', response.data.user.name);
        console.log('Token received:', response.data.token ? 'Yes' : 'No');

    } catch (error) {
        console.log('❌ Login failed!');
        if (error.response) {
            console.log('Error status:', error.response.status);
            console.log('Error message:', error.response.data.message);

            if (error.response.data.message === 'Invalid credentials') {
                console.log('\n💡 The password hash might be corrupted.');
                console.log('Try creating a new account or contact support.');
            }
        } else {
            console.log('Network error:', error.message);
        }
    }
}

testLoginWithUser();