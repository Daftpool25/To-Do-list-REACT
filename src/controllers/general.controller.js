import {toast} from "react-hot-toast"

export const getData = async(location) =>{
    return await fetch(`http://localhost:2000/${location}`).then(
        response => response.json()
    ).then(json => json)
    .catch(error => toast.error(error))
}

export const postData = async (location,bodyContent) =>{
    console.log(JSON.stringify(bodyContent))
    await fetch(`http://localhost:2000/${location}`,{
        method:"POST",
        body:JSON.stringify(bodyContent),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(
        response => response.json()
    ).then(json => console.log(json))
    .catch(error => toast.error(error))
}

export const editData = (location,bodyContent) =>{
    fetch(`http://localhost:2000/${location}`,{
        method:"PUT",
        body:JSON.stringify(bodyContent),
        headers: {"Content-type": "application/json; charset=UTF-8"}

    }).then(
        response => response.json()
    ).then(json => console.log(json))
    .catch(error => toast.error(error))
}

export const deleteData = async (location) =>{
    await fetch(`http://localhost:2000/${location}`,{
        method:"DELETE"
    }).then(
        response => console.log(response)
    )
    .catch(error => toast.error(error))
}