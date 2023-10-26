import React, { useState, useEffect } from "react";

const UpdateMethod = () => {
  const [postData, setPostData] = useState({
    id: 1,
    title: "",
    body: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPostData({
      ...postData,
      [name]: value,
    });
  };

  // Loads the initial data when the componet is mounted
  useEffect(() => {
    const postId = postData.id;
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPostData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postData.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postData.id}`;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }


    // Sennd the put (update) request 
     fetch(apiUrl, requestOptions)
       .then((response) => {
         return response.json();
       })
       .then((data) => {
        setMessage("Post updated successfully");
         
         console.log(data);
       })
       .catch((error) => {
         console.log(error);
        setMessage("Error updating the post");

       })
       .finally(()=>{
        setLoading(false)

       })


  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="updatemethod-class">
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Body:</label>
            <textarea
              name="body"
              value={postData.body}
              onChange={handleChange}
              rows="4"
              cols="40"
            />
          </div>
          <button type="submit">Update Post</button>
        </div>
      </form>
    </>
  );
};

export default UpdateMethod;
