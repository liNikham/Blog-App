import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Table, TableRow } from "flowbite-react";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { set } from "mongoose";
import { FaCheck, FaTimes } from "react-icons/fa";
function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [userIdToDelete,setUserIdToDelete] = useState(null);
  const handleShowMore = async ()=>{
     const startIndex = users.length;
     
     try{
        const res = await fetch(`/api/user/getUsers?startIndex=${startIndex}`);
        const data = await res.json();
        
        if(res.ok){
          setUsers((prev)=> [...prev,...data.users]
          )
          if(data.users.length < 9){
             setShowMore(false);
          }
        }
     }
     catch(err){
      console.log(err);
     }
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getUsers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if(data.users.length < 9){
             setShowMore(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

//   const handleDeletePost = async ()=>{
//            setShowModal(false);
//            try{
//             const res = await fetch(`/api/post/deletePost/${postIdToDelete}/${currentUser._id}`,{
//               method:'DELETE'
//             });
//             const data = await res.json();
//               if(!res.ok){
//                 console.log(data.message);
//               }
//               else{
//                 setUserPosts((prev)=> prev.filter((post)=> post._id !== postIdToDelete));
//               }
//            }
//            catch(err){
//              console.log(err);
//            }
           

//   }

const handleDeleteUser = async ()=>{

}
  return (
    <div className="table-auto overflow-x-scroll mx-auto p-3 scrollbar-track-slate-100 scrollbar scrollbar-thumb-slate-300  dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            { users.map((user)=>{
                  
               return ( <Table.Body className="divide-y" key={user._id}>
                <Table.Row  className="bg-white dark:border-gray-700 dark:bg-gray-800"> 
                  <Table.Cell >{ new Date(user.createdAt).toLocaleDateString() } </Table.Cell>
                  <Table.Cell>
                      <img src={user.profilePicture} alt={user.username} className="h-16 w-16 rounded-full object-cover bg-gray-500" /> 
                  </Table.Cell>
                  <Table.Cell>
                    {user.username}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin ? (<FaCheck className="text-green-500"/> ):(<FaTimes className="text-red-500"/>)}</Table.Cell>
                  <Table.Cell>
                     <span onClick={
                        ()=>{
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }
                     } className="font-medium text-red-500 hover:underline cursor-pointer">
                       Delete
                     </span>
                  </Table.Cell>
                 
                </Table.Row>
                </Table.Body> )
            })}
          </Table>
          { showMore && 
             <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
              Show More
             </button>
            }
        </>
      ) : (
        <p> No Users Yet </p>
      )}
         <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="medium"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              {" "}
              Are you Sure you want to delete this User ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes I'm Sure !
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No,Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashPosts;
