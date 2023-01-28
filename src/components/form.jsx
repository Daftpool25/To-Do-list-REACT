import React, { useRef } from 'react'

function Form({submit}) {

  //Formulario normal que envia el texto en la referencia

    const ref=useRef();

  return (
    <form className='formAddToDo' onSubmit={(e)=> {
        e.preventDefault();
        submit(ref.current.value)
    }}>
        <input ref={ref} type="text" placeholder='Add new ToDo'/>
        <button type='submit'>Add</button>
    </form>
  )
}

export default Form