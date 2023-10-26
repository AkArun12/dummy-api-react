import React,{useState, useEffect} from 'react'

const DeleteMethod = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)


    // fetching data

    const fetchData=async ()=>{
        try {
            const response = await fetch(
              `https://jsonplaceholder.typicode.com/posts`
            )

            if(!response.ok){
                throw new Error("Network response was not ok")
            }

            const jsondata=await response.json()

            setData(jsondata);
            setLoading(false);

        } catch (error) {

            console.log("Error fetching data:", error)
            
        }
    }


    useEffect(()=>{

        fetchData();

    },[]);

    // Delete data based on id 

    const handleDelete=(id)=>{

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
            method:"DELETE",
        })
        .then((response)=>{
            if(!response.ok){
                throw new Error("Network response was not ok");
            }

            return response.json()
        })
        .then(()=>{

            // remove deleted item  from array
            setData(data.filter((item)=>item.id !==id))
        }).catch((error)=>{
            console.log(error)
        })
       



    }



  return (
    <div>
      {loading?(<p>Loading...</p>):
      (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
          
                    
                      { data.map((item)=>(
                            <tr key={item.id}>

                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>
                                    <button onClick={()=>handleDelete(item.id)}>Delete</button>
                                </td>

                             </tr>

                        ))
                    }



            </tbody>
        </table>


      )
      
      
      
      
      }

  
    </div>
  );
}

export default DeleteMethod
