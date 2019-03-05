class Controller{
  constructor(){
    this.userAdapter = new Adapter("http://localhost:3000/users")
  }

  start(){
    console.log("starting");
    let promise = this.userAdapter.getAllUsers()
    // promise.then((userAray)=>{this.handleArray(userAray)})
    promise.then((userAray)=>{this.specficUser(userAray[0])})
    

  }
  // checkLogin(){
  //   //if logged in
  //   //call call specficUser(user)
  //   let userName = document.getElementById('userName');
  //   let userPw = document.getElementById('userPw');
  //
  //   if((localStorage.getItem('name') !== userName.value)&& (localStorage.getItem('pw')!==userPw.value)){
  //     console.log("not logged in");
  //     this.loginPage()
  //     debugger
  //   }else if ((localStorage.getItem('name') === userName.value)&& (localStorage.getItem('pw')===userPw.value)){
  //     console.log("logged in");
  //     debugger
  //   }
  //   //else if not call loginpage()
  //
  // }
  //
  // loginPage(){
  //   //have button to register registerPage()
  //
  //   this.getBody().innerText = ""
  //   this.getBody().innerHTML = `<form id="login-form">
  //           <input id="userName" type="text" placeholder="Enter Username" value=""/>
  //           <input id="userPw" type="password" placeholder="Enter Password" value=""/>
  //           <input id="login_btn" type="submit" value="Login"/>
  //           <input id="register_btn" type="submit"value="Register"/>
  //
  //      </form>`
  //
  //      document.getElementById('register_btn').addEventListener('click', this.registerPage.bind(this))
  //      document.getElementById('login_btn').addEventListener('click',this.checkLogin.bind(this))
  // }
  //
  //
  //
  // registerPage(){
  //   this.getBody().innerText = ""
  //   this.getBody().innerHTML = `<form id="register-form">
  //           <input id="name" type="text" placeholder="Name" value=""/>
  //           <input id="pw" type="password" placeholder="Password" value=""/>
  //           <input id="rgstr_btn" type="submit" value="Create Account"/>
  //       </form>`
  //
  //   document.getElementById('register-form').addEventListener('submit',(e)=>{ this.newAccount(e)})
  //
  // }
  //
  // newAccount(e){
  //   e.preventDefault()
  //   let name = document.getElementById('name');
  //   let pw = document.getElementById('pw');
  //
  //   localStorage.setItem('name', name.value);
  //   localStorage.setItem('pw', pw.value);
  //
  //   this.loginPage()
  //   debugger
  // }
  handleArray(array){
    this.getBody().innerText = ""
    array.forEach(this.renderUser.bind(this))
  }

  createUserDiv(){
    let div = document.createElement("div")
    div.className = "users-container"
    return div
  }
  getBody(){
    return document.getElementById('whole-body')
  }

  renderUser(user){
    let h1 = document.createElement("h1")
    let divCard = document.createElement("div")
    divCard.addEventListener('click',()=>{this.specficUser(user)})
    divCard.className = "user-card"
    let divCardFrame = document.createElement("div")
    divCardFrame.className = "user-card-frame"
    h1.innerText = user.first + " " + user.last
    divCardFrame.appendChild(h1)
    divCard.appendChild(divCardFrame)
    let div = this.createUserDiv()
    div.appendChild(divCard)
    this.getBody().appendChild(div)
  }

  specficUser(user){
    this.getBody().innerText = ""
    let h1 = document.createElement("h1")
    h1.innerText = user.first + " " + user.last

    let div = this.createUserDiv()
    div.appendChild(h1)
    this.getBody().appendChild(div)

    console.log("hi");
  }

  // <div class="user-card">
  //   <div class="user-card-frame">
  //     hi
  //   </div>
  // </div>




}
