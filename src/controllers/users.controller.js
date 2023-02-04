//TODO jwt, passsword managment, routes gestion,class filter, toasts
import {toast} from "react-hot-toast"

export function loginUser (element){
    return fetch("http://localhost:2000/users",{
        method:"POST",
        body:JSON.stringify(element),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }
    ).then(response => response.json()
    ).then(item => {
        if(item.message){
            toast.error(item.message);
            return
        }
        return item;
    }).
    catch(error => toast.error(error.message))
}

export function registerUser (element){
    return fetch("http://localhost:2000/users/register",{
        method:"POST",
        body:JSON.stringify(element),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(response => response.json()
    ).then(item => {
        if(item.message){
            toast.error(item.message)
            return;
        }
       return item;
    }).
    catch(error => alert(error.message))
}