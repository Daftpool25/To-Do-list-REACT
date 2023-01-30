import React from 'react'

function Filter({showAll,completed,active}) {
  return (
    <div className='filterContainer'>
        <h1>Filter</h1>
        <div>
            <button onClick={showAll}>Show All</button>
            <button onClick={completed}>Completed</button>
            <button onClick={active}>Active</button>
        </div>
    </div>
  )
}

export default Filter