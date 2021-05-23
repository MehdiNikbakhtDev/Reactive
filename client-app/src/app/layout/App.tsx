import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Header,List, ListItem}from 'semantic-ui-react'
function App() {
const [activities, setActivities]= useState([]);
useEffect(() => {
axios.get('http://localhost:5000/api/activities').then(response=>{
console.log(response);
setActivities(response.data);
})
},[]);

  return (
    <div className="App">
     <Header as='h2' icon='users' content='Reactivities'/>
       <List>
       {activities.map((activity:any)=>(
          <List.Item key={activity.id}>
              {activity.title}
          </List.Item>
        ))}


       </List>
       
    </div>
  );
}

export default App;
