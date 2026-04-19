const BASE_URL="https://upskilling-egypt.com:3006"
const BASE_AUTH = `${BASE_URL}/api/v1/Users`;
export const AUTH_URLS={
    login: `${BASE_AUTH}/login`, 
    forgetpass: `${BASE_AUTH}/Reset/Request`, 
    resetpass: `${BASE_AUTH}/Reset`, 
    changepass: `${BASE_AUTH}/ChangePassword`, 
    register: `${BASE_AUTH}/Register`, 
    verifyAccount: `${BASE_AUTH}/ChangePassword`, 
}