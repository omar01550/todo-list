//function create tasks
//functio add task to array
//functio add arr to local sotorage;
//function add tasks to page;

//fucntion ceck tasks
//function deklete tasks
//function update task

//global vars
let form=document.querySelector("form");
let input=document.querySelector("form input");
let tasksDiv=document.querySelector(".tasks");
let arr=[];

if(localStorage.tasksTodo != "undefined" && localStorage.tasksTodo != undefined){
  arr=JSON.parse(localStorage.tasksTodo)
}
addTasksToPage(arr)
form.onsubmit=function(e){
  e.preventDefault();
  if(input.value != ""){
    let value=input.value;
    let task=createTask(value)
    addTaskToArray(task,arr);
    addArrayToLocalStorage(arr);
    addTasksToPage(arr);
    input.value="";

  }
}
//functions
function createTask(value){
   return {
     content:value,
     completed:false,
     id:Math.random()*8100001010
   }
}


function addTaskToArray(task,arr){
   arr.push(task);
}
function addArrayToLocalStorage(arr){
  localStorage.setItem("tasksTodo",JSON.stringify(arr));
}
function addTasksToPage(arr){
  tasksDiv.innerHTML="";
   for(let i=0;i<arr.length;i++){
     let divTask=`
     <div class="task" data-check=${arr[0].completed} id=${arr[i].id} data-completed=${arr[i].completed}>
         <div class="content">
             <div class="check" style=${arr[i].completed == true?"background-image:linear-gradient(60deg,crimson,green);":"background-image:transparent;"}>

             </div>
             <p class="text">${arr[i].content}</p>
         </div>

         <div class="icons">
            <i class="fa fa-pen"></i>
            <i class="fa fa-trash"></i>

         </div>

         <div class="links">
             <span class="tasks-count"></span>
             <div class="controls">
                 <a href="#" class="all">all</a>
                 <a href="#" class="active-page active">active</a>
                 <a href="#" class="completed">completed</a>
             </div>
             <span class="clear-all">clear all</span>
         </div>

     </div>
     `
     //count tasks
     tasksDiv.innerHTML+=divTask;

   }
}
function deleteTaks(){
  document.documentElement.addEventListener("click",function(e){
     if(e.target.classList.contains("fa-trash")){
        let id=e.target.parentNode.parentNode.id;

        for(let i=0;i<arr.length;i++){
           if(arr[i].id == id){
              arr.splice(i,1);
              addArrayToLocalStorage();
              addTasksToPage(arr);
           }
        }
     }
  })
}
function updateTask(){
  document.documentElement.addEventListener("click",function(e){
     input.focus();
     if(e.target.classList.contains("fa-pen")){
        let id=e.target.parentNode.parentNode.id;
        for(let i=0;i<arr.length;i++){
           if(arr[i].id == id){
              input.value=arr[i].content;
              arr.splice(i);
              addArrayToLocalStorage()
              break;
           }
        }
     }
  });

}
updateTask();
deleteTaks();
//change mood
let mood=document.querySelector(".mood");
mood.onclick=function(){
    changeMood();
    mood.classList.toggle("fa-moon");
    mood.classList.toggle("fa-sun");
}
function changeMood(){
   if(mood.classList.contains("fa-sun")){
      document.documentElement.style.setProperty("--seconary-color","#f6f6f6");
      document.documentElement.style.setProperty("--text-color","black");
      document.documentElement.style.setProperty("--task-color","white");
   }else{
     document.documentElement.style.setProperty("--seconary-color","#181824");
     document.documentElement.style.setProperty("--text-color","white");
     document.documentElement.style.setProperty("--task-color","#25273c");
   }
}
//clear all
document.documentElement.addEventListener("click",function(e){
    if(e.target.classList.contains("clear-all")){
       arr.length=0;
       addArrayToLocalStorage(arr);
       addTasksToPage(arr);
    }
})

// onclick on check ;
//get parent;
// get child;
//if parent data completed == true
    //inner left =0 top =0;
    // arr[i].id .completed =true
    //console.log(arr);
//else
   //inner left -110% top -110%
   // arr[i].id .completed =false;
   //console.log(arr);






/*
//check function

document.documentElement.addEventListener("click",function(e){
    if(e.target.classList.contains("check")){
         let id=e.target.parentNode.parentNode.id;
         let parent=document.getElementById(id);
         let checkIcon=document.getElementById(`check+${id}`)
          // add check to array
         checkIcon.style.left="0";
         checkIcon.style.top="0";
         for(let i=0;i<arr.length;i++){
           if(arr[i].id ==id){
              if(parent.dataset.completed){
                arr[i].completed=false;
                addArrayToLocalStorage(arr);
                addTasksToPage(arr);
                console.log(arr[i]);
              }else{
                arr[i].completed=true;
                addArrayToLocalStorage(arr);
                addTasksToPage(arr);
                console.log(arr[i]);
              }
              break;
           }
         }

    }
});

*/

//check

document.documentElement.addEventListener("click",(e)=>{
    if(e.target.classList.contains("check")) {
       let id=e.target.parentNode.parentNode.id;
       for(let i=0;i<arr.length;i++){
          if(arr[i].id ==id){
             if(arr[i].completed == true){
                arr[i].completed=false;
                addTasksToPage(arr);
                addArrayToLocalStorage(arr)
             }else{
               arr[i].completed=true;
               addTasksToPage(arr);
               addArrayToLocalStorage(arr);
             }
          }
       }

    }
})
