import Table from "./Table";
import { useState } from "react";
import {login} from "../redux/counterSlice"
import {getUser,saveUser} from "../redux/userDetails"
// import {useDispatch} from "react-redux"
const BasicInfo = () => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    genders: "", 
    isVerified: false,
    list: getUser()||[]
  };

  const gendersOptions = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" }
  ];

  const [userData, setUserData] = useState(initialState);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
    const [viewingUser, setViewingUser] = useState(null);

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  // const dispatch=useDispatch();
  const handleSubmit=()=>{
    const {name,email,phone,genders,isVerified}=userData
    const user={
      id:Date.now(),
      name,
      email,
      phone,
      genders,
      isVerified,
    };
    setUserData((prev)=>{
      const updatedList=editId?
      prev.list.map((item)=>
        item.id===editId?user:item
    )
        :[...prev.list,user];
        saveUser(updatedList)
      return{
      ...prev,
      list:updatedList,
      name:"",
      email:"",
      phone:"",
      genders:"",
      isVerified:false
      }
    })
    setEditId(null)
    // dispatch(login(user))
  }

  const handleEdit = (user) => {
    setUserData((prev) => ({
      ...prev,
      name: user.name,
      email: user.email,
      phone: user.phone,
      genders: user.genders, 
      isVerified: user.isVerified
    }));
    setEditId(user.id);
  };
 const handleView = (user) => {
    setViewingUser(user);
  };
  const handleDelete =(id)=>{
    setUserData((prev)=>{
      const updatedList=prev.list.filter((user)=>user.id!=id)
      saveUser(updatedList);
      return{
        ...prev,
        list:updatedList
      };
    });
  };
const filteredUsers = userData.list.filter((user) => {
  return(
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.phone.includes(search)
  )
})
  return (
    <>
      <div>
        <h1>User Information</h1>
         <input
      type="text"
      placeholder="Search name, email or phone..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
    />
        <div>
          <label>Enter Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        </div>
        <br />
        <div>
          <label>Enter Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} />
        </div>
        <br />
        <div>
          <label>Enter phone:</label>
          <input type="number" name="phone" value={userData.phone} onChange={handleChange} />
        </div>
        <br />
        <div>
          <p>Select gender</p>
          {gendersOptions.map((gender, index) => (
            <label key={index}>
         
              <input
                type="radio"
                name="genders"
                value={gender.value}
                checked={userData.genders===gender.value }
                onChange={handleChange}
              />
              {gender.name}
            </label>
          ))}
        </div>
        <br />
        <div>
          <label>Verified:</label>
          <input
            type="checkbox"
            name="isVerified"
            checked={userData.isVerified}
            onChange={handleChange}
          />
        </div>
        <br />
        <button onClick={handleSubmit}>{editId ? "updateUser" : "AddUser"}</button>
      </div>
      <br />
      <Table users={filteredUsers}   onView={handleView}
  onEdit={handleEdit} onDelete={handleDelete} />
  {viewingUser && (
  <div>
    <h2>User Details</h2>

    <p>
      <strong>Name:</strong> {viewingUser.name}
    </p>

    <p>
      <strong>Email:</strong> {viewingUser.email}
    </p>

    <p>
      <strong>Phone:</strong> {viewingUser.phone}
    </p>

    <p>
      <strong>Gender:</strong> {viewingUser.genders}
    </p>

    <p>
      <strong>Verified:</strong>{" "}
      {viewingUser.isVerified ? "Yes" : "No"}
    </p>

    <button onClick={() => setViewingUser(null)}>
      Close
    </button>
  </div>
)}
    </>
  );
};

export default BasicInfo;
