const axios = require('axios');

async function trigger() {
  try {
    const response = await axios.post('http://localhost:3000/auth/forgot-password', {
      email: 'danielacopana@gmail.com'
    });
    console.log('Success:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
    } else {
      console.log('Error message:', error.message);
      console.log('Full error:', error);
    }
  }
}

trigger();
