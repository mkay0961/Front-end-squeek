class Controller{
  constructor(){
    this.userAdapter = new Adapter("http://localhost:3000/users")
    this.itemAdapter = new Adapter("http://localhost:3000/items")
  }

  start(){
    console.log("starting");
    let promise = this.userAdapter.getAll()
    // promise.then((userAray)=>{this.handleArray(userAray)})
    promise.then((userAray)=>{this.specficUser(userAray[0])})
    this.getUserBtn().addEventListener('click', this.getAllUsers.bind(this))
    this.getItemBtn().addEventListener('click', this.getAllItems.bind(this))
  }

  getUserBtn(){
    return document.getElementById('users-btn')
  }
  getItemBtn(){
    return document.getElementById('items-btn')
  }

  getAllUsers(){
    let promise = this.userAdapter.getAll()
    // promise.then((userAray)=>{this.handleArray(userAray)})
    promise.then((userAray)=>{this.handleArray(userAray)})
  }

  getAllItems(){
    let promise = this.itemAdapter.getAll()
    // promise.then((userAray)=>{this.handleArray(userAray)})
    promise.then((itemArray)=>{this.handleItems(itemArray)})
  }
  checkLogin(){
    //if logged in
    //call call specficUser(user)

    if(localStorage.getItem('name') === null){
      console.log("not logged in");
      this.loginPage()
      // debugger
    }else if (localStorage.getItem('name') !== null){
      console.log("logged in");
      // debugger
    }
    //else if not call loginpage()

  }
  //
  loginPage(){
    //have button to register registerPage()

    this.getBody().innerText = ""
    this.getBody().innerHTML = `<form id="login-form">
            <input id="userName" type="text" placeholder="Enter Username" value=""/>
            <input id="login_btn" type="submit" value="Login"/>
            <input id="register_btn" type="submit"value="Register"/>

       </form>`

       // document.getElementById('register_btn').addEventListener('click', this.registerPage.bind(this))
       document.getElementById('login_btn').addEventListener('click',this.store.bind(this))
  }

  store(){
    
    let username = document.getElementById('userName')
    let promise = this.userAdapter.getIdByUsername(username)
    promise.then(id=>console.log(id))


  }

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

  handleItems(array){
    this.getBody().innerText = ""
    array.forEach(this.renderItems.bind(this))
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

  renderItems(item){
    let name = document.createElement("h1")
    let price = document.createElement("h1")
    let divCard = document.createElement("div")
    divCard.addEventListener('click',()=>{this.specficItem(item)})
    divCard.className = "user-card"
    let divCardFrame = document.createElement("div")
    divCardFrame.className = "user-card-frame"
    name.innerText = item.name.replace(/\b\w/g, l => l.toUpperCase()) //capitalizes name
    price.innerText = "$"+item.price.toFixed(2) //rounds to second decimal
    divCardFrame.appendChild(name)
    divCardFrame.appendChild(price)
    divCard.appendChild(divCardFrame)
    let div = this.createUserDiv()
    if (!item.user.length) {
      divCard.style.display = "none"
    }
    div.appendChild(divCard)
    this.getBody().appendChild(div)
  }

  specficItem(item){
    this.getBody().innerText = ""
    let name = document.createElement("h1")
    name.innerText = item.name.replace(/\b\w/g, l => l.toUpperCase())
    let price = document.createElement("h1")
    price.innerText = "$"+item.price.toFixed(2)

    let div = this.createUserDiv()
    div.appendChild(name)
    div.appendChild(price)
    if (item.user.length) {
      let ul = document.createElement('ul')
      item.user.forEach((user)=>{
        let li = document.createElement('li')
        li.innerHTML = `${user.review + " - " + user.first + " " + user.last}`
        ul.appendChild(li)
      })
    div.appendChild(ul)
    }
    this.getBody().appendChild(div)
    console.log("hi");
  }

  specficUser(user){
    this.getBody().innerText = ""
    let h1 = document.createElement("h1")
    h1.innerText = user.first + " " + user.last
    let div = this.createUserDiv()
    let current = this.createCurrentBox(user)
    div.appendChild(h1)
    div.appendChild(current)
    this.getBody().appendChild(div)
    console.log("hi");
  }

  createCurrentBox(user){

    let box = document.createElement("div")
    let current = document.createElement("h5")

    current.innerText = "Current"
    let notcurrent = document.createElement("h5")
    notcurrent.innerText = "Not Current"
    let ulc = document.createElement("ul")
    let ulnc = document.createElement("ul")
    current.appendChild(ulc)
    notcurrent.appendChild(ulnc)


    box.appendChild(current)
    box.appendChild(notcurrent)
    user.items.forEach((item)=>{
      if(item.current === "true"){
        let li = document.createElement("li")
        li.innerText = `${item.name}`
        ulc.appendChild(li)
        console.log("true",item)
      }else {
        let li = document.createElement("li")
        li.innerText = `${item.name}`
        ulnc.appendChild(li)
        console.log("false",item)
      }
      })



    return box
  }


  // <div class="user-card">
  //   <div class="user-card-frame">
  //     hi
  //   </div>
  // </div>




}
