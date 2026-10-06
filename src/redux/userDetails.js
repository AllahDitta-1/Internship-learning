export const getUser=()=>{
    return JSON.parse(localStorage.getItem("users")) || null
};
export const saveUser=(users)=>{
    return localStorage.setItem("users",JSON.stringify(users)
);
};