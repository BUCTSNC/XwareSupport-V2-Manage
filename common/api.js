const install = (Vue,vm) =>{
	let login = (jscode) => {
		return vm.$u.post("/login",{jscode:jscode})
	}
	let problemTypeList = ()=>{
		return vm.$u.get("/problemTypes")
	}
	let timeSlotList = ()=>{
		return vm.$u.get("/timeslotList")
	}
	let makeAppointment = (data)=>{
		return vm.$u.post("/Appointment",data)
	}
	let getAppointmentList = ()=>{
		return vm.$u.get("/myAppointmentList")
	}
	let getAppointmentDetail = (uuid)=>{
		return vm.$u.get("/Appointment",{uuid})
	}
	let cancelAppointment = (uuid)=>{
		return vm.$u.delete(`/Appointment?uuid=${uuid}`)
	}
	let modifyAppointment = (data)=>{
		return vm.$u.put(`/Appointment`,data)
	}
	vm.$u.api = {
		login,
		problemTypeList,
		timeSlotList,
		makeAppointment,
		getAppointmentList,
		getAppointmentDetail,
		cancelAppointment,
		modifyAppointment,
	}
}
export default {
	install
}