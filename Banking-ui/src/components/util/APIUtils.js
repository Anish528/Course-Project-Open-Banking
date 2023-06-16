import { API_BASE_URL, ACCESS_TOKEN} from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllUsers(){
    return request({
        url: API_BASE_URL + "/user/all",
        method: 'GET'
    });
}

export function activateUser(activateUserRequest){
    return request({
        url: API_BASE_URL + "/user/activate",
        method: 'PUT',
        body: JSON.stringify(activateUserRequest)
    });
}

export function generateAccountNumber(userrequest){
    return request({
        url: API_BASE_URL + "/user/generate-account-num",
        method: 'PUT',
        body: JSON.stringify(userrequest)
    });
}

export function getUserDetails(id){
    return request({
        url: API_BASE_URL + "/user/details/"+id,
        method: 'GET'
    });
}

export function testUser(id){
    return request({
        url: API_BASE_URL + "/user/test",
        method: 'PUT'
    });
}
export function getWalletDetails(id){
    return request({
        url: API_BASE_URL + "/wallet/getdetails/"+id,
        method: 'GET'
    });
}

export function addMoney(addMoneyreq){
    return request({
        url: API_BASE_URL + "/wallet/addmoney",
        method: 'PUT',
        body: JSON.stringify(addMoneyreq)
    });
}

export function sendMoney(sendMoneyReq){
    return request({
        url: API_BASE_URL + "/wallet/sendmoney",
        method: 'PUT',
        body: JSON.stringify(sendMoneyReq)
    });
}


export function getTransactionDetails(id){
    return request({
        url: API_BASE_URL + "/wallet/transactions/"+id,
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/oauth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/oauth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/oauth/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/oauth/user/me",
        method: 'GET'
    });
}
