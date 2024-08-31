const axios = require('axios');

const splunkUrl = 'http://localhost:8088/services/collector'; // Replace with your HEC endpoint
const splunkToken = '744979fe-d272-405a-a529-03a0b7b267fa'; // Replace with your Splunk HEC token

export async function logTestResultToSplunk(testResult) {
    console.log('logTestResultToSplunk', testResult);
    try {
        const response = await axios.post(
            splunkUrl,
            {
                event: testResult, // Include the actual test result in the event
                sourcetype: "_json",
            },
            {
                headers: {
                    Authorization: `Splunk ${splunkToken}`,
                },
            }
        );
        console.log(`Test result logged to Splunk: ${response.status}`);
    } catch (error) {
        console.error('Error sending test result to Splunk:', error);
    }
}

// module.exports = { logTestResultToSplunk };
