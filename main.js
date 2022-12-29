

let form=document.querySelector("form");
let input=document.querySelector("form input");
let tasksDiv=document.querySelector(".tasks");


let arr=[];


if(localStorage.tasksTodo != "undefined" && localStorage.tasksTodo != undefined){
  arr=JSON.parse(localStorage.tasksTodo);
}

addTasksToPage(arr);
addDataToCompletedSection()


form.onsubmit=function(e){
  e.preventDefault();
  if(input.value != ""){
    let value=input.value;
    let task=createTask(value)
    addTaskToArray(task,arr);
    addArrayToLocalStorage(arr);
    addTasksToPage(arr);
    addDataToCompletedSection();
    input.value="";

  }
}
//functions

updateTask();
deleteTaks();
//change mood
let mood=document.querySelector(".mood");
mood.onclick=function(){
    changeMood();
    mood.classList.toggle("fa-moon");
    mood.classList.toggle("fa-sun");
    let check=document.querySelectorAll(".check");


       check.forEach((check, i) => {
           if(mood.classList.contains("fa-moon")){
               check.style.border="2px solid black";
           }else{
             check.style.border="2px solid white";
           }
       });

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

document.documentElement.addEventListener("click",function (e) {
    if (e.target.classList.contains("check-task")) {
      let id =e.target.parentNode.parentNode.id;
       let state = e.target.parentNode.parentNode.dataset.completed;

       for(let i=0;i<arr.length;i++){
          if(arr[i].id == id){
             arr[i].completed=true;

             addTasksToPage(arr);
             addDataToCompletedSection();
             addArrayToLocalStorage(arr);
          }
       }
    }
})








//checkIcon
let activeBtn = document.querySelector(".controls .active-page");
let completedBtn = document.querySelector(".completed-page");
let sections = document.querySelectorAll(".section")
activeBtn.addEventListener("click",function () {

     handelLinks(this);
})

completedBtn.addEventListener("click",function(){
    handelLinks(this);
})

function handelLinks(target) {
   sections.forEach((section, i) => {
       section.style.display="none";
     });

     document.querySelector(target.dataset.display).style.display="block";
     document.querySelectorAll(".controls .link").forEach((link, i) => {
         link.style.color="var(--text-color)";

     });

   target.style.color="var(--active-color)";



}


// functions

//function update task
function updateTask(){
  document.documentElement.addEventListener("click",function(e){
     input.focus();
     if(e.target.classList.contains("fa-pen")){
        let id=e.target.parentNode.parentNode.id;
        for(let i=0;i<arr.length;i++){
           if(arr[i].id == id){
              input.value=arr[i].content;
              arr.splice(i,1);
              addArrayToLocalStorage(arr)
              break;
           }
        }
     }
  });

}

//function deleteTaks
function deleteTaks(){
  document.documentElement.addEventListener("click",function(e){
     if(e.target.classList.contains("fa-trash")){
        let id=e.target.parentNode.parentNode.id;

        for(let i=0;i<arr.length;i++){
           if(arr[i].id == id){
              arr.splice(i,1);
              addArrayToLocalStorage(arr);
              addTasksToPage(arr);
           }
        }
     }
  })
}

// function add tasks to page
function addTasksToPage(arr){
   console.log(arr);
  let newTasks = arr.filter(ele => ele.completed == false);
  console.log(newTasks);
  tasksDiv.innerHTML="";
   for(let i=0;i<newTasks.length;i++){
     let divTask=`
     <div class="task" id=${newTasks[i].id} data-completed=${arr[i].completed}>
         <div class="content">
             <div class="check-task">

             </div>
             <p class="text">${newTasks[i].content}</p>
         </div>

         <div class="icons">
            <i class="fa fa-pen"></i>
            <i class="fa fa-trash"></i>

         </div>



     </div>
     `
     //count tasks
     tasksDiv.innerHTML+=divTask;

   }
}
//***************************************
// function add completed tasks

function addDataToCompletedSection() {
   let completedArray = arr.filter(ele => ele.completed == true);
   document.querySelector(".completed-section").innerHTML='';
   for(let i=0;i<completedArray.length;i++){
        document.querySelector(".completed-section").innerHTML+=`
        <div class="task-complete" id=${completedArray[i].id}>
            <div class="content">

                <p class="text">${completedArray[i].content}</p>
            </div>

            <div class="icons">
               <i class="fa fa-undo return "></i>


            </div>



        </div>


          `
   }




}

// return task
document.documentElement.addEventListener("click",function (e) {
       if (e.target.classList.contains("return")) {
           let id =e.target.parentNode.parentNode.id;
           for(let i=0;i<arr.length;i++){
              if (arr[i].id == id) {
                  arr[i].completed=false;
                  addTasksToPage(arr);
                  addDataToCompletedSection();
                  addArrayToLocalStorage(arr);
              }
           }
       }
})

// function change mode
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
