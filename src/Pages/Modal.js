import React from 'react'

const Modal = ({m,isOpen}) => {

  return (
    
    <div class="modal-content bg-[#fefefe] m-auto p-[20px] border-2 border-[#888] w-[80%] ">
      <span class="close text-[#aaaaaa] float-right text-[28px] font-bold hover:cursor-pointer hover:text-[#000]" >&times;</span>
      <div class="flex gap-3 flex-col">
        <div class="flex justify-between pr-5">
          <h1 class="text-2xl font-bold">{m.Title} <span class="font-normal text-lg">{m.Year}</span></h1>
          <p class="text-2xl font-bold">{m.imdbRating}</p>
        </div>
        <hr/>
        <p>{m.Plot}</p>
        <hr/>
        <div>
          <h1 class="font-semibold text-left">Genre : <span class="font-normal">{m.Genre}</span></h1>
          <h1 class="font-semibold text-left">Writer : <span class="font-normal">{m.Writer}</span></h1>
          <h1 class="font-semibold text-left">Director : <span class="font-normal">{m.Director}</span></h1>
          <h1 class="font-semibold text-left">Actors : <span class="font-normal">{m.Actors}</span></h1>
        </div>
      </div>
    </div>
  )
}

export default Modal