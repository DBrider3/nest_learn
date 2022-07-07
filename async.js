const { resolve } = require('path');

// Producer
const fetchNumber = new Promise((resolve, reject) => {
	setTimeout(() => resolve(1), 1000);
});

// Consumer
fetchNumber
	.then(num => num * 2)
	.then(num => num * 3)
	.then(num => {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(num - 1), 1000);
		});
	})
	.then(num => console.log(num));

// Producer
const getHen = () =>
	new Promise((resolve, reject) => {
		setTimeout(() => resolve('🐓'), 1000);
	});
const getEgg = hen =>
	new Promise((resolve, reject) => {
		setTimeout(() => resolve(`${hen} => 🥚`), 1000);
		//setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000);
	});


const cook = egg =>
	new Promise((resolve, reject) => {
		setTimeout(() => resolve(`${egg} => 🍳`), 1000);
	});

// Consumer
getHen()
	.then(hen => getEgg(hen))
	.then(egg => cook(egg))
	.then(meal => console.log(meal))

getHen()
	.then(getEgg) // 받아온 value를 바로 parameter에 쓰이는 경우는 생략 가능
	//.catch(error => {
	//	return '🥖';
	//})
	.then(cook)
	.then(console.log)
