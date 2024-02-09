import React, { useEffect, useState } from 'react'
import Header from './partials/Header.jsx'
import Todo from './partials/Todo.jsx'
import AddTodoModal from './partials/AddTodoModal.jsx'
import { getTodoListApi, getToken } from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import {ToastContainer,toast} from "react-toastify";


function Home() {
  const navigation =useNavigate();
  const [list,setList]=useState([]);
  const [refreshList,setRefreshList]=useState()
  const [searchText,setSearchText]=useState('');
  const [filteredList,setFilteredList]=useState([]);

  // protection for user that is not logged in
  useEffect(()=>{
    if(!getToken()){
      navigation("/login");
    }
    fetchTodoList();
  },[refreshList])

  useEffect(()=>{
    if(searchText===''){
      setFilteredList(list);
    }else{
      const filterlist=list.filter(todo=>todo.desc.toLowerCase().includes(searchText.toLowerCase().trim()));
      setFilteredList(filterlist);
    }
  },[list,searchText])

  async function fetchTodoList(){
    const result=await  getTodoListApi();
    console.log(result.data.data.todos)
    if(result.status===200 && result.data.status===200){
      setList(result.data.data.todos.reverse());
    }
  }

  return (
    <div>
      <Header searchText={searchText} setSearchText={setSearchText}/>
      <ToastContainer/>
      <div className='container'>
        <div className='row justify-contenty-md-center  mt-4 '>
          {
            filteredList.map((todo,index)=><Todo todo={todo} key={todo._id} setRefreshList={setRefreshList}/>)
          }
       {
        filteredList.length===0 &&  <div className="notFoundTodos">
          No Todos Found
        </div>
       }

        </div>
      </div>
      <div className='' style={{position:"fixed" , right:50 ,bottom:50,zIndex:1030}}>
        <button type='button' data-bs-toggle="modal" 
        data-bs-target="#exampleModal" className='btn btn-outline-light'> 
            Add
         </button>
      </div>
    <AddTodoModal setRefreshList={setRefreshList}/>
    </div>
  )
}

export default Home
