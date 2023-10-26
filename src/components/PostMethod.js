import React, { useState } from "react";

const PostMethod = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = "https://jsonplaceholder.typicode.com/posts";

    // create the request object

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    //   send the POST request

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log("Response data:", data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="postmethod-class">
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <br></br>
          <div>
            <label>Body:</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows="4"
              cols="40"
            />
          </div>
          <br></br>

          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default PostMethod;
