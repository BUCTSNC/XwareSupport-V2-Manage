import CryptoJS  from "../utils/crypto-js.min.js"

const install = (Vue,vm) =>{
	let register = (username,password)=>{
		return vm.$u.post("/register",{username:username,password:CryptoJS.SHA512(password).toString()})
	}
	let login = (username,password)=>{
		return vm.$u.post("/login",{username:username,password:CryptoJS.SHA512(password).toString()})
	}
	let scanCode = (uuid) =>{
		return vm.$u.put("/scanCode",{uuid})
	}
	let startService = (uuid)=>{
		return vm.$u.put("/startService",{uuid})
	}
	let buildForm = (uuid,username)=>{
		return vm.$u.post("/startService",{uuid:uuid,username:username})
	}
	// let buildForm = (uuid,username)=>{
	// 	return vm.$u.post(`/startService?uuid=${uuid}&username=${username}`)
	// }
	let getMyAppointment = (username)=>{
		return vm.$u.post("/getAppointment",{username})
	}
	vm.$u.api = {
		register,
		login,
		scanCode,
		startService,
		buildForm,
		getMyAppointment,
	}
}
export default {install}