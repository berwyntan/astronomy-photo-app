import { useState } from "react"
import heartEmpty from "../icons/heart-empty.svg"
import heartSolid from "../icons/heart-solid.svg"
import close from "../icons/caret-down.svg"

export default function CardGridSelection({ 
    item, handleLike, like, unloadGridSingleView}) {
    
    return (
        <div className="z-50 fixed top-1 w-screen h-screen bg-slate-800/75">
            <h3 className="text-lg">{item?.title}</h3>
            <button className="btn btn-square btn-ghost invert" 
                    onClick={unloadGridSingleView}>
                <img className="h-5" src={close} />
            </button>
            <img 
                src={item?.url} 
                className="max-w-sm block"
                />
            {like ? 
            <button className="btn btn-square btn-ghost invert" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartSolid} />
            </button> :
            <button className="btn btn-square btn-ghost invert" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartEmpty} />
            </button> 
            }
            
            <p className="max-w-sm">{item?.explanation}</p>
            <p className="mb-8">{item?.date}</p>
        </div>
        
    )
    
}