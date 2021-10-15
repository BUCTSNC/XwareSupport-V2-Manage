import CryptoJS  from "../utils/crypto-js.min.js"

const install = (Vue,vm) =>{
	let login = (username,password)=>{
		return vm.$u.post("/login",{username:username,password:CryptoJS.SHA512(password).toString()})
	}
	vm.$u.api = {
		login
	}
}
export default {install}