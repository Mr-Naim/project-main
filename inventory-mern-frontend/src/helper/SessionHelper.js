class SessionHelper{
    setToken(token){
        localStorage.setItem("token",token)
    }
    getToken(){
        return localStorage.getItem("token")
    }
    setUserDetails(UserDetails){
        localStorage.setItem("UserDetails",JSON.stringify(UserDetails))
    }

    getUserDetails() {
  const userDetails = localStorage.getItem("UserDetails");
  try {
    return JSON.parse(userDetails);
  } catch (error) {
    console.error("Error parsing user details:", error);
    return null; // or return an empty object, depending on your requirements
  }
}

    setEmail(Email){
        localStorage.setItem("Email",Email)
    }
    getEmail(){
        return localStorage.getItem("Email")
    }
    setOTP(OTP){
        localStorage.setItem("OTP",OTP)
    }
    getOTP(){
        return localStorage.getItem("OTP")
    }
    removeSessions=()=>{
        localStorage.clear();
        window.location.href="/login"
    }
}
export const {setEmail,getEmail,setOTP,getOTP,setToken,getToken,setUserDetails,getUserDetails,removeSessions}=new SessionHelper();