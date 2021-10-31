import CryptoJS  from "../utils/crypto-js.min.js"

const install = (Vue,vm) =>{
	let login = (username,password)=>{
		return vm.$u.post("/login",{username:username,password:CryptoJS.SHA512(password).toString()})
	}
	let scanCode = (uuid) =>{
		return vm.$u.put("/scanCode",{uuid})
	}
	vm.$u.api = {
		login,
		scanCode,
	}
}
export default {
	install
}