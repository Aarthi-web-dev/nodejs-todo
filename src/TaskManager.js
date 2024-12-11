import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth,db } from "./firebase";
import {onAuthStateChanged} from "firebase/auth";
import {collection,doc,setDoc,getDoc,updateDoc,} from"firebase/firestore";

// import DeleteIcon from "@mui/icons-material/Delete";
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
const TaskManager = () => {
  const [activeButton, setActiveButton] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true); // Manage theme state
  const [currentUser,setCurrentUser]=useState(null);

   // Get Firestore collection for tasks
   const tasksRef = (userId) => doc(collection(db, "tasks"), userId);

   // Fetch tasks from Firestore when user logs in
   useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, async (user) => {
       if (user) {
         setCurrentUser(user);
         const taskDoc = await getDoc(tasksRef(user.uid));
         if (taskDoc.exists()) {
           setTasks(taskDoc.data().tasks || []);
         } else {
           setTasks([]); // No tasks for new user
         }
       } else {
         setCurrentUser(null);
         setTasks([]); // Reset tasks on logout
       }
     });
     return unsubscribe;
   }, []);
 
   // Save tasks to Firestore
   const saveTasks = async (updatedTasks) => {
     if (currentUser) {
       await setDoc(tasksRef(currentUser.uid), { tasks: updatedTasks });
     }
   };

  const completedTasksCount = tasks.filter((task) => task.selected).length;

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTask = async () => {
    if (inputValue.trim()) {
            const updatedTasks = [...tasks, { text: inputValue, selected: false }];
      setTasks(updatedTasks);
      setInputValue("");
      await saveTasks(updatedTasks);

    }
  };

  const toggleTaskSelection = async (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, selected: !task.selected } : task
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);//save tasksin firestore
  };

  const deleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks); // Save tasks to Firestore
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeButton === "all") return true;
    if (activeButton === "completed") return task.selected;
    if (activeButton === "active") return !task.selected;
    return true;
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const backgroundImage = isDarkMode
    ? 'url("https://todolist333.vercel.app/img/day1.jpeg")'
    : 'url("https://todolist333.vercel.app/img/night1.jpeg")';
  const overlayColor = isDarkMode ? "rgba(139,92,246,0.5)" : "rgba(139,92,246,0.5)";

  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: `
          linear-gradient(to bottom,
          ${overlayColor} 42%,
          ${isDarkMode ? "white" : "black"} 40%),
          ${backgroundImage}`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        color: isDarkMode ? "black" : "white" ,
        padding: "20px",
      }}
    >
       
      {/* Total Task Counter and Theme Toggle */}
      <div style={{ marginBottom: "20px", fontWeight: "bold", fontSize: "18px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              color: "white",
              fontSize: "40px",
              padding: "20px",
              marginLeft: "360px",
              textAlign:"center"
            }}
          >
            TODAY  TASKS...
          </span>
          <span
            onClick={toggleTheme}
            style={{
              marginLeft: "180px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: isDarkMode ? "white" : "white",
              fontSize: "26px",
            }}
          >
            {isDarkMode ? "☾" : "☼"}
          </span>
          <span>
            {/* signout button */}
       <div style={{ textAlign: "Right", marginTop: "10px", marginLeft: "310px" }}>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "purple",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>
    </div>
          </span>
        </div>
      </div>
      
      {/* First box  */}
      <div style={{ position: "relative", marginBottom: "10px", marginLeft:"0px", }}>
        <input
          type="text"
          placeholder="Create a new task"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && addTask()} // Add task on Enter key
          style={{
            // width: "50%",
            height:"35px",
            padding: "8px",
            paddingRight: "30px",
            paddingLeft: "30px",
            borderRadius:"5px",
            fontSize: "16px",
            backgroundColor: isDarkMode ? "#F1F1EC" : "black",
            color: isDarkMode ? "black" : "white",
            border: `1px solid ${isDarkMode ? "white" : "black"}`,
          }}
        />
        {inputValue && (
          <span
            onClick={() => setInputValue("")} // Clear input
            style={{
              position: "absolute",
              left: "480px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              // alignItems: "center",
              justifyContent: "center",
              width: inputValue ? "20px" : "10px",
              height: inputValue ? "20px" : "10px",
              borderRadius: "50%",
              backgroundColor: "red",
              cursor: "pointer",
              fontSize: inputValue ? "14px" : "10px",
              color: "#fff",
            }}
          >
            &#10005;
          </span>
        )}
      </div>

      {/* Second box  */}
      <div
        style={{
          backgroundColor: isDarkMode ? "white" : "black",
          marginTop: "30px",
          padding: "20px",
          marginLeft:"390px",
          width:"37%",
          boxShadow:'5px 5px 10px #555 ',
        //   height:"100px",

          
        }}
      >
        {tasks.length > 0 && (
          <div
            style={{
              marginBottom: "10px",
              fontWeight: "bold",
              color: isDarkMode ? "black" : "white",
            }}
          >
            Total Tasks: {tasks.length}, Completed: {completedTasksCount}
          </div>
        )}
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <button
            onClick={() => handleButtonClick("all")}
            style={{
              backgroundColor: activeButton === "all" ? "rgb(139,92,246)" : isDarkMode ? "white" : "white",
              color: activeButton === "all" ? "white" : "rgb(139,92,246)",
              padding: "8px 16px",
              border: "2px solid rgb(139,92,246)",
              fontWeight:'bold',
              marginRight: "25px",
              cursor: "pointer",
              borderRadius:"4px",
            }}
          >
            All
          </button>
          <button
            onClick={() => handleButtonClick("active")}
            style={{
              backgroundColor: activeButton === "active" ? "rgb(139,92,246)" : isDarkMode ? "white" : "white",
              color: activeButton === "active" ? "white" : "rgb(139,92,246)",
              padding: "8px 16px",
              border: "2px solid rgb(139,92,246)",
              fontWeight:'bold',
              marginRight: "25px",
              cursor: "pointer",
              borderRadius:"4px",

            }}
          >
            Active
          </button>
          <button
            onClick={() => handleButtonClick("completed")}
            style={{
              backgroundColor: activeButton === "completed" ? "rgb(139,92,246)" : isDarkMode ? "white" : "white",
              color: activeButton === "completed" ? "white" : "rgb(139,92,246)",
              padding: "8px 16px",
              border: "2px solid rgb(139,92,246)",
              fontWeight:'bold',
              cursor: "pointer",
              borderRadius:"4px",

            }}
          >
            Completed
          </button>
        </div>

        {/* Task List */}
        <div>
          {filteredTasks.map((task, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                marginBottom: "5px",
                borderBottom: `1px solid ${isDarkMode ? "black" : "white"}`,
                borderRadius: "4px",
              }}
            >
              <span
                onClick={() => toggleTaskSelection(index)}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: `1px solid ${isDarkMode ? "black" : "black"}`,
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backgroundColor: task.selected ? "purple" : isDarkMode ? "white" : "white",
                }}
              >
                {task.selected ? "✓" : ""}
              </span>
              <span style={{ flex: 1 }}> {task.text}</span>
              <button
                onClick={() => deleteTask(index)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                 &#10005; 

              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;