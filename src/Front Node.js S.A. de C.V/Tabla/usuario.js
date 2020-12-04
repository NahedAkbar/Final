
window.onload = init;
var headers ={};
var url = "http://localhost:3000";
var empleados;
var nombre;

function init(){
    if(localStorage.getItem("token")){ 
        headers ={
            headers:{
               'Authorization': "bearer " + localStorage.getItem("token") 
            }
        }
        loadUser();

        document.querySelector('#bSearchName').addEventListener('click', loadUserByName);
        document.querySelector('#logOut').addEventListener('click', logOut);
    }
    else{
        window.location.href ="../login.html"
    }
}

function loadUser(){
    
    axios.get(url + "/user/all" , headers).then(function(res){
        
        displayUser(res.data.message);
        empleados = res.data.message;

    }).catch(function(err){
        console.log(err);
    })
}
function loadUserByName(){
    nombre = document.getElementById("searchName").value;
    
    axios.get(url + `/user/${nombre}` , headers).then(function(res){
        
        displayUser(res.data.message);

    }).catch(function(err){
        console.log(err);
    })   
}

function displayUser(user){
    var tbody = document.querySelector("tbody");
    var tbodyVacio = "<tbody> </tbody>";
    
    

    if(user.length > 1){
        for(var i = 0; i < user.length; i++){
            tbody.innerHTML += ` <tr>
                                    <td class="user_id">${user[i].user_id}</td>
                                    <td class="user_name">'${user[i].user_name}'</td>
                                    <td class="user_lastName">'${user[i].user_lastName}'</td>
                                    <td class="user_mail">'${user[i].user_mail}'</td>
                                    <td class="user_phone">'${user[i].user_phone}'</td>
                                    <td class="user_position">'${user[i].user_position}'</td>
                                    <td class="user_dateJoin">'${user[i].user_dateJoin}'</td>
                                    <td class="user_password">'${user[i].user_password}'</td>
                                    <td class="user_accion">
                                    <input type="button" value="Modificar" class = "modificar" onClick='modifyUser(${user[i].user_id})'>
                                        <input type="button" value="Eliminar" class= "eliminar" onClick='deleteUser(${user[i].user_id})'>
                                    </td>
                                </tr>`;
        }
    }
    if(user.length === 1){
        tbody.innerHTML = tbodyVacio;
        tbody.innerHTML += ` <tr>
                                <td class="user_id">${user[0].user_id}</td>
                                <td class="user_name">'${user[0].user_name}'</td>
                                <td class="user_lastName">'${user[0].user_lastName}'</td>
                                <td class="user_mail">'${user[0].user_mail}'</td>
                                <td class="user_position">'${user[0].user_position}'</td>
                                <td class="user_dateJoin">'${user[0].user_dateJoin}'</td>
                                <td class="user_password">'${user[0].user_password}'</td>
                                <td class="user_accion">
                                    <input type="button" value="Modificar" class = "modificar" onClick='modifyUser(${user[0].user_id})'>
                                    <input type="button" value="Eliminar" class= "eliminar" onClick='deleteUser(${user[0].user_id})'>
                                </td>
                            </tr>`;        

    }


    
}


function modifyUser(id){

    localStorage.setItem("identificador" , id);
    window.location.href="../modify.html";

}

function deleteUser(id){
    axios.delete(url + `/user/delete/${id}`,headers).then(function(res){
        console.log(res);
        alert("Usuario eliminado exitosamente")
        window.location.href= "../Tabla/index.html"
    }).catch(function(err){
        console.log(err);
    });
}

function logOut(){
    localStorage.removeItem("token");
    window.location.href="../login.html";
}