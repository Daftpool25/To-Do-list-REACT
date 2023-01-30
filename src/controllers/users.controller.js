//TODO jwt, passsword managment, routes gestion,class filter, toasts

export function loginUser (element){
    return fetch("http://localhost:2000/users",{
        method:"POST",
        body:JSON.stringify(element),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }
    ).then(response => {
        if(response.status!==200){
            alert(response.statusText)
            return;
        }else{
           return response.json()
        }
    }
    ).then(item => item).
    catch(error => alert(error.message))
}

export function registerUser (element){
    return fetch("http://localhost:2000/users/register",{
        method:"POST",
        body:JSON.stringify(element),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(
        response => response.json()
    ).then(item => item).
    catch(error => alert(error))
}