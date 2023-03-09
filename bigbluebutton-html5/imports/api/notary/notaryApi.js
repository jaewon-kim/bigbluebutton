import axios from "axios";

export const makePdf = (_param) => {
    console.log(_param);
    axios.post('https://d2a4ac33-d9e9-4d84-9aee-d5bca64063a0.mock.pstmn.io/makePdf',_param)
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
}