const socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
let received = document.getElementById('received');


let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

function enterName() {
    myName = document.getElementById("name").value;
   socket.emit("user_connected", myName);

    console.log("You are connected",myName);
    return false;
  }



 socket.on("user_connected", function (username) {
  	console.log(username)
    var html = "";
    html += '<div class="chat_list" data-username="' + username + '" ';
        html += '<div class="chat_people">';
            html += '<div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>';
            html += '<div class="chat_ib">';
                        html += '<ul>';

              html += '<li>' + username + '</li>';
                          html += '</ul>';

            html += '</div>';
        html += '</div>';
    html += '</div>';
    document.getElementById("users").innerHTML += html;
  });

btn.addEventListener('click',function(){
	socket.emit('chat:message',{
		receiver:received.value,
		username:username.value,
		message:message.value
	});

	//console.log(username.value,message.value);
});


    function onUserSelected(username) {
        // save selected user in global variable
        receiver = username;
      }


socket.on('chat:message',function (data){
	output.innerHTML +='<p>'+
		'<strong>'+data.username+'</strong>'+data.message+
		'</p>';
});

