import axios from "axios";

export const makePdf = (_param) => {
	console.log(_param);
	axios.post('https://d2a4ac33-d9e9-4d84-9aee-d5bca64063a0.mock.pstmn.io/makePdf',_param)
	.then((res)=>{
		console.log(res);
	})
	.catch((err)=>{
		console.log(err);
	});
}

export const checkPassword = (_param) =>{
	console.log(_param);
	axios.post('https://notary-dev.connexo.co.kr:8085/bbb/meeting/checkPassword',_param)
	.then((res)=>{
		console.log(res);
	})
	.catch((err)=>{
		console.log(err);
	});
}

export const encodePassword = (_password) =>{
	console.log(_password);
	axios.get('https://notary-dev.connexo.co.kr:8085/encodePassword?pwd=' + _password)
	.then( (res)=>{
		console.log(res);
	})
	.catch((err)=>{
		console.log(err);
	})
}

export const listUserSignature = async (_email)=>{
	console.log(_email);
	const res = axios.get('https://notary-dev.connexo.co.kr:8085/api/listUserSign/' + _email, 
		{
			auth:{username:'admin',password:'YWRtaW4xMQ=='},
		}
		)
	return res;
}

export const getUserIdCard = async (_email)=>{
	console.log(_email);
	const res = axios.get('https://notary-dev.connexo.co.kr:8085/api/userIDCard/' + _email, 
		{
			auth:{username:'admin',password:'YWRtaW4xMQ=='},
			responseType:"blob" 
		}
		)
	return res;
}