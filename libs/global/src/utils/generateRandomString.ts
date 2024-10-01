export default (num: number) => {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < num; i += 1) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
};
