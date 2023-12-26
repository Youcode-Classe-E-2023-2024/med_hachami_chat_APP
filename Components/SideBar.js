
function generateSideBar() {
    return `
    
    <div class="menu mt-48 flex-col ">
        <a  class="min-h-16 block py-10 px-12 border-l-4 text-gray-600 hover:bg-gray-300 hover:text-black" href="javascript:return false;">
            <span class="inline-block align-text-bottom mr-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-8 h-8"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </span>
            
        </a>
        <a class="min-h-16 block py-10 px-12 border-l-4 border-gray-800 bg-gray-300 text-black hover:bg-gray-300 hover:text-black" href="javascript:return false;">
            <span class="inline-block align-text-bottom mr-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-8 h-8"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </span>
            
        </a>
        
        <a class="min-h-16 mb-20 block py-10 px-12 border-l-4 text-gray-600 hover:bg-gray-300 hover:text-black" href="javascript:return false;">
            <span class="inline-block align-text-bottom mr-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-8 h-8"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </span>
            
        </a>
        <a class="mt-16 py-10 px-12 ">
            <img src="${imgStore}${profileImg}" class="w-16 h-16 relative left-7 rounded-2xl" alt="" srcset="">  
        </a>
        <a class=" min-h-16 block py-10 px-12 border-l-4 text-gray-600 hover:bg-gray-300 hover:text-black">
            <img src="../assets/logout-icon.png" alt="" srcset="">  
        </a>
    </div>
    

  
    `;
}
// inject the navbar 
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    
    if (sidebar) {
        sidebar.innerHTML = generateSideBar();
    }   
});
const apiUrl = "http://localhost/med_hachami_chat/";
const imgStore = "http://localhost/med_Hachami_chat/public/store/";
const  ws = new WebSocket('ws://localhost:8081');
let ressourceId;
let messageInput = document.getElementById("message");

// open the connection and get the id of the connection
ws.addEventListener('open', (event) => {
    console.log('WebSocket connection opened:', event);

    ws.addEventListener('message', (response) => {
        const data = JSON.parse(response.data);
        ressourceId = data.resourceId;
        
        
    });
});
// enter inside the room
function openRoom(){
    let chat1 = document.querySelector(".chat-area1");
    chat1.classList.add("hidden");
    let chat2 = document.querySelector(".chat-area2");
    chat2.classList.remove("hidden");
    const message = {
        "sentBy":ressourceId,
        "room": "salma_med",
        "type":"join",
    }
    ws.send(JSON.stringify(message));

}
// send message to the room
function sendMessage(){
    let content =messageInput.value; 
    const message = {
        "sentBy":ressourceId,
        "room": "salma_med",
        "type":"msg",
        "content":content,
    }
   ws.send(JSON.stringify(message));
   displayMyMessage(content);
   messageInput.value = '';

}
ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    // console.log(message);
    displayRoomMatesMsg(message);
    
});
// {content: 'heyyy', room: 'salma_med', sentBy: 467, type: 'msg'}
function displayMyMessage(content) {
    const msgSentByMeContainer = document.getElementById("msgContainer");
    const msgDiv = `
        <div class="message me mb-4 flex text-right">
        <div class="flex-1 px-2" id="msgSentByMeContainer">
            <div class="flex-1 px-2">
            <div class="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
                <span>${content}</span>
            </div>
            <div class="pl-4"><small class="text-gray-500">15 April</small></div>
            </div>
        </div>
    </div>
    
    `
    msgSentByMeContainer.innerHTML += msgDiv;
}

function displayRoomMatesMsg(message){
    console.log(message);
    if(message.type === 'msg'){
        const msgSentByMeContainer = document.getElementById("msgContainer");
    const msgDiv = `
        <div class="message mb-4 flex" id="msgSentByRoomMatesContainer">
        <div class="message me mb-4 flex text-left">
            <div class="flex-2">
                <div class="w-12 h-12 relative">
                    <img class="w-12 h-12 rounded-full mx-auto" src="./assets/med hachami.jpg" alt="chat-user" />
                    <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                </div>
            </div>
            <div class="flex-1 px-2" id="msgSentByMeContainer">
                <div class="flex-1 px-2">
                <div class="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
                    <span>${message.content}.</span>
                </div>
                <div class="pl-4"><small class="text-gray-500">15 April</small></div>
                </div>
            </div>
        </div>
    </div>
    
    `
    msgSentByMeContainer.innerHTML += msgDiv;   
    }
    
    
    
}


const profileImg = localStorage.getItem("image");
const id = localStorage.getItem("id");
const fullName = localStorage.getItem("fullName");
const token = localStorage.getItem('token');

function hasToken() {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
}
function isTokenExpired() {
    const token = localStorage.getItem('token');
    const decodedToken = decodeJWT(token);

    return decodedToken && decodedToken.exp && decodedToken.exp * 1000 < Date.now();
}


function redirectToLogin() {
    window.location.href = 'login.html';
}


if (!hasToken() || isTokenExpired()) {
    redirectToLogin();
}

function logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('image');
    window.location.href = '/login.html';
}

function decodeJWT(token) {
    
    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
  
    
    return decodedPayload;
}