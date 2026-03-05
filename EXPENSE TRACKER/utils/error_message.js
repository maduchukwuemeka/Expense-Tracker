export {error}



function error(e){
    let msg = e.setCustomValidity("Please Enter Valid  tesxt")
    e.reportValidity()

    setTimeout(()=>{
e.setCustomValidity('')
e.reportValidity()
    },2000)
}