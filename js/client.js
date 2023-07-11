const socket=io("http://localhost:9000");
const audio=new Audio("./ting.mp3");

const form =document.getElementById("send-container")
const messageInp=document.getElementById("messageInp")
const messageContainer=document.querySelector(".container")
const sendMessage=document.getElementById("btn")



const name1=prompt("Enter your name to Join")
socket.emit('new-user-joined ',name1)

const append1=(message,position)=>{
    const messageElement=document.createElement("div")
    messageElement.innerText=message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }

}
socket.on('user-joined',(name)=>{
    append1(`${name} joined the Chat`,'center')
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const value=messageInp.value;
    append1(`You : ${value}`,'right')
    messageInp.value="";
    socket.emit('send',value)
    

})
socket.on("recive",(data)=>{
    append1(`${data.name}:${data.message}`,'left')
})

socket.on("left",(name)=>{
    append1(`${name} left the chat`,'center')
})