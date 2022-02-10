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
	let submitTicket = (dics)=>{
		return vm.$u.post("/submitTicket",{dics:dics})
	}
	let pdfGeneration = (uuid,username)=>{
		return vm.$u.get(`/pdf?uuid=${uuid}&username=${username}`)
	}
	let downloadPdf = (uuid,username)=>{
		return vm.$u.get(`/download?uuid=${uuid}&username=${username}`)
	}
	let cancelwork = (uuid,username)=>{
		return vm.$u.delete("/cancelwork",{uuid:uuid,username:username})
	}
	let loadTicket = (uuid,username)=>{
		return vm.$u.post("/loadTicket",{uuid:uuid,username:username})
	}
	// let pdfGeneration = (uuid,username)=>{
	// 	return vm.$u.post("/pdf",{uuid:uuid,username:username})
	// }
	vm.$u.api = {
		register,
		login,
		scanCode,
		startService,
		buildForm,
		getMyAppointment,
		submitTicket,
		pdfGeneration,
		downloadPdf,
		cancelwork,
		loadTicket,
	}
}
export default {install}