import React from 'react'

function Row({id,text,state,onClickState}) {
  return (
    <tr>
        <td>{id}</td>
        <td>{text}</td>
        <td onClick={() =>onClickState(id)}>{state? "Completed":"Active"}</td>
    </tr>
  )
}

export default Row