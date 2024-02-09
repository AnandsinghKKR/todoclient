import React, { useState } from 'react';
import { createTodoApi } from '../../services/api';
import {toast} from "react-toastify";


function AddTodoModal({setRefreshList}) {
    const [todoDesc,setTodoDesc]=useState('');
    const handleTodoSubmit=async()=>{
        console.log(todoDesc);
        if(todoDesc==""){
            toast("TODO IS REQUIRED");
            return ;
        }
// Now the result coming from backend , after sending the data into backend
        const result=await createTodoApi({desc:todoDesc});
        console.log(result);
        if(result.status==200 && result.data.status===200){
            toast("TODO ADDED");
            setRefreshList(new Date());
            setTodoDesc("")
        }
        else{
            toast(result.data.message);
        }
    }
    return (

        <div className='modal mt-5' id='exampleModal'>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">Modal Title</div>
                        <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='close'>
                            <span arial-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <textarea name="" 
                            className='form-control' 
                            placeholder='Write Todo.. '
                            onChange={(e)=>{setTodoDesc(e.target.value)}}
                             rows={3}></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-secondary' onClick={handleTodoSubmit} data-bs-dismiss="modal" >save Todo</button>
                        <button className='btn btn-secondary' data-bs-dismiss="modal" onClick={()=>setTodoDesc('')}>close</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTodoModal
