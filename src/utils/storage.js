import { json } from "react-router-dom";

export const storage={

    get(key){
        const value= localStorage.getItem(key);

        if(value){
            return JSON.parse(value)
        }
    },
    setItem(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    },
    delete(key){
        localStorage.removeItem(key)
    },
    clear(){
        localStorage.clear()
    }

}

