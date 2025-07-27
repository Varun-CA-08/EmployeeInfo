import React from "react";
import { useState,useEffect } from "react";

const TodoForm=({onSubmit,editData,setEditData})=>{
    const [title,setTitle]=useState('')

    useEffect(()=>{
        if(editData)
        {
            setTitle(editData.title);
        }
    },[editData]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (!title.trim()) return;

        const newTodo={
            title:title.trim(),
            completed:false,
        }
        if(editData)
        {
            onSubmit({...editData,title});
            setEditData(null);
        }else{
            onSubmit(newTodo);
            setTitle("");
        }
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e)=>{
                setTitle(e.target.value);
            }}></input>
            <button type="submit">
                {editData ? (<span style={{border:'1px solid blue',padding:'10px',margin:'10px'}}>Update</span>) : (<span style={{border:'1px solid darkcyan',padding:'10px',margin:'10px'}}>Add</span>)}
            </button>

        </form>
        </>
    )
}

export default TodoForm;