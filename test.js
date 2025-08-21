// const url = 'https://v6.exchangerate-api.com/v6/9ac66522defe3fbd8f4887df/pair/USD/NGN';
// const options = {
// 	method: 'GET',
// 	// headers: {
// 	// 	'x-rapidapi-key': '35c0da9678msh664c03b04467f8dp143d3cjsn05accf310e94',
// 	// 	'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'.  9ac66522defe3fbd8f4887df
// 	// }
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }



const { Web3 } = require('web3');
// if you are using ESM style imports, use this line instead:
// import { Web3 } from 'web3';

const web3 = new Web3("HTTP://127.0.0.1:7545");

async function fetchBlockNumber() {
    try {
        const currentBlockNumber = await web3.eth.getBlockNumber();
		const account = web3.eth.accounts.create();
		const signature = account.sign('Hello, Web3.js!');
		const act = web3.eth.accounts.privateKeyToAccount('');
        console.log('Current block number:', currentBlockNumber);

		console.log('signature:', signature);
    } catch (error) {
        console.error('Error fetching block number:', error);
    }
}

fetchBlockNumber();


