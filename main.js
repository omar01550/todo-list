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
let tasksDiv=document.querySelector(".tasks")


let arr=[];

addTasksToPage(arr)
form.onsubmit=function(e){
  e.preventDefault();

  if(input.value != ""){
    let value=input.value;
    let task=createTask(value)
    addTaskToArray(task,arr);
    addArrayToLocalStorage(arr);
    addTasksToPage(arr)
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
     <div class="task" data-check=${arr[0].completed} id=${arr[i].id}>
         <div class="content">
             <div class="ckeck">
                  <div class="check-icon"></div>
             </div>
             <p class="text">${arr[i].content}</p>
         </div>

         <div class="icons">
            <i class="fa fa-pen"></i>
            <i class="fa fa-trash"></i>

         </div>
     </div>
     `
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
  })
}

updateTask();

deleteTaks();


//change mood

let mood=document.querySelector(".mood");

mood.onclick=function(){
    mood.classList.toggle("fa-moon");
    mood.classList.toggle("fa-sun");
    changeMood();
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
