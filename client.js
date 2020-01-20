const { json } = require('micro')
const axios = require('axios')
const CircuitBreaker = require('opossum')

function asyncFunctionThatCouldFail () {
  return new Promise((resolve, reject) => {
    return axios.get('http://localhost:3000')
      .then(res => resolve(res))
      .catch((e) => reject(e));
  })
}

const options = {
  timeout: 1000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 10000 // After 30 seconds, try again.
};
const breaker = new CircuitBreaker(asyncFunctionThatCouldFail, options);


module.exports = async (req, _) => {
  try {
    console.log("Call 127.0.0.1:3000");
    const res = await breaker.fire()
    console.log(`Called 127.0.0.1:3000 ${res.status} ${res.statusText}`);
    return res.data
  } catch (e) {
    console.error(e)
    return 'mocked hello'
  }
}