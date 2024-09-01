import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Table, TableRow } from "flowbite-react";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { set } from "mongoose";
function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [postIdToDelete,setPostIdToDelete] = useState(null);
  const handleShowMore = async ()=>{
     const startIndex = userPosts.length;
     
     try{
        const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`);
        const data = await res.json();
        
        if(res.ok){
          setUserPosts((prev)=> [...prev,...data.posts]
          )
          if(data.posts.length < 9){
             setShowMore(false);
          }
        }
     }
     catch(err){
      console.log(err);
     }
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if(data.posts.length < 9){
             setShowMore(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleDeletePost = async ()=>{
           setShowModal(false);
           try{
            const res = await fetch(`/api/post/deletePost/${postIdToDelete}/${currentUser._id}`,{
              method:'DELETE'
            });
            const data = await res.json();
              if(!res.ok){
                console.log(data.message);
              }
              else{
                setUserPosts((prev)=> prev.filter((post)=> post._id !== postIdToDelete));
              }
           }
           catch(err){
             console.log(err);
           }
           

  }
  return (
    <div className="table-auto overflow-x-scroll mx-auto p-3 scrollbar-track-slate-100 scrollbar scrollbar-thumb-slate-300  dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            { userPosts.map((post)=>{
                  
               return ( <Table.Body className="divide-y">
                <Table.Row  className="bg-white dark:border-gray-700 dark:bg-gray-800"> 
                  <Table.Cell >{ new Date(post.updatedAt).toLocaleDateString() } </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title} className="h-16 w-16 object-cover bg-gray-500" /> 
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`} className="font-medium text-gray-900 dark:text-white">
                    {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                     <span onClick={
                        ()=>{
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }
                     } className="font-medium text-red-500 hover:underline cursor-pointer">
                       Delete
                     </span>
                  </Table.Cell>
                  <Table.Cell className="text-teal-500 cursor-pointer">
                    <Link to = {`/update-post/${post._id}`}>
                      <span>
                       Edit
                     </span> 
                    </Link>
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
        <p> No Posts Yet </p>
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
              Are you Sure you want to delete this Post ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
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
