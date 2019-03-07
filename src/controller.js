class Controller{
  constructor(){
    this.userAdapter = new Adapter("http://localhost:3000/users")
    this.itemAdapter = new Adapter("http://localhost:3000/items")
  }
  // getters
  getUserBtn(){
    return document.getElementById('users-btn')
  }
  getItemBtn(){
    return document.getElementById('items-btn')
  }
  getProBtn(){
    return document.getElementById('profile-btn')
  }
  getLogOutBtn(){
    return document.getElementById('logOut-btn')
  }
  getAllUsers(){
    let promise = this.userAdapter.getAll()
    promise.then((userArray)=>{this.handleArray(userArray)})
  }
  getAllItems(){
    let promise = this.itemAdapter.getAll()
    promise.then((itemArray)=>{this.handleItems(itemArray)})
  }
  getBody(){
    return document.getElementById('whole-body')
  }

  // login and logout stuff
  checkLogin(){
    if(localStorage.getItem('name') === null){
      console.log("not logged in");
      this.loginPage()}
    else if (localStorage.getItem('name') !== null){
      console.log("logged in");
      this.renderProfile()}
  }
  loginPage(){
    this.getBody().innerText = ""
    this.getBody().innerHTML =
      `<form id="login-form">
          <input id="userName" type="text" placeholder="Enter Username" value=""/>
          <input id="login_btn" type="submit" value="Login" class="btn btn-outline-dark"/>
          <input id="register_btn" type="submit"value="Register" class="btn btn-outline-success"/>
        </form>`
    document.getElementById('register_btn').addEventListener('click', this.registerPage.bind(this))
    document.getElementById('login_btn').addEventListener('click',this.store.bind(this))
  }

  // local storage stuff
  store(e){
    e.preventDefault()
    let username = document.getElementById('userName')
    if(username.value !== ""){
    let promise = this.userAdapter.getIdByUsername(username.value)
    promise.then((json)=>{
      if (json.status == 500){
        this.checkLogin()}
      else{
        localStorage.setItem('id', json*7)
        document.getElementById('login-form').style.display = "none"
        this.toggleBtn(false)
        this.getUserBtn().addEventListener('click', this.getAllUsers.bind(this))
        this.getItemBtn().addEventListener('click', this.getAllItems.bind(this))
        this.getProBtn().addEventListener('click', this.renderProfile.bind(this))
        this.getLogOutBtn().addEventListener('click', this.logout.bind(this))
        this.renderProfile()}})
    }
  }
  logout(){
    localStorage.clear()
    this.checkLogin()
    this.toggleBtn(true)
  }
  toggleBtn(input){
    this.getUserBtn().disabled = input
    this.getItemBtn().disabled = input
    this.getProBtn().disabled = input
    this.getLogOutBtn().disabled = input
  }

  // register stuff
  registerPage(){
    this.getBody().innerText = ""
    this.getBody().innerHTML =
      `<form id="register-form">
        <input id="first" type="text" placeholder="First Name" value=""/>
        <input id="last" type="text" placeholder="Last Name" value=""/>
        <input id="rgstr_btn" type="submit" value="Create Account" class="btn btn-outline-success"/>
      </form>`
    document.getElementById('register-form').addEventListener('submit',(e)=>{ this.newAccount(e)})
  }
  newAccount(e){
    e.preventDefault()
    let first = document.getElementById('first').value
    let last = document.getElementById('last').value
    let promise = this.userAdapter.createOne({first: first, last: last})
    this.loginPage()
  }

  // render user stuff
  renderProfile(){
    this.getBody().innerText = ""
    let id = (parseInt(localStorage.getItem('id'))/7)
    let promise = this.userAdapter.getOne(id)
    promise.then((user)=> {this.specificUser(user)})
  }
  handleArray(array){
    this.getBody().innerText = ""
    array.forEach(this.renderUser.bind(this))
  }
  createUserDiv(){
    let div = document.createElement("div")
    div.className = "users-container"
    return div
  }
  renderUser(user){
    let h1 = document.createElement("h2")
    let divCard = document.createElement("div")
    divCard.addEventListener('click',()=>{this.specificUser(user)})
    divCard.className = "user-card"
    let divCardFrame = document.createElement("div")
    divCardFrame.className = "user-card-frame"
    h1.innerText = `${user.first}  ${user.last}`.replace(/\b\w/g, l => l.toUpperCase())
    divCardFrame.appendChild(h1)
    let image = document.createElement('img')
    image.src = `https://static01.nyt.com/images/2011/11/13/magazine/13duck/13duck-jumbo.jpg`
    image.className = "user-image"
    divCardFrame.appendChild(image)
    let h3 = document.createElement("p")
    h3.innerText = `${user.items.length} item(s)`
    divCardFrame.appendChild(h3)
    divCard.appendChild(divCardFrame)
    let div = this.createUserDiv()
    div.appendChild(divCard)
    this.getBody().appendChild(div)
  }
  specificUser(user){
    this.getBody().innerText = ""
    let h1 = document.createElement("h1")
    let div = this.createUserDiv()
    div.appendChild(h1)
    h1.innerText = user.first + " " + user.last
    if (user.id === (localStorage.id/7)) {
      let button = document.createElement('button')
      button.className = "btn btn-outline-dark"
      button.addEventListener('click',()=>{this.itemForm(user.id)})
      button.innerText = "Add Item"
      div.appendChild(button)
    }
    let current = this.createCurrentBox(user)
    // div.appendChild(h1)
    div.appendChild(current)
    this.getBody().appendChild(div)
  }
  createCurrentBox(user){
    let box = document.createElement("div")
    let current = document.createElement("h3")
    current.className = "center-text"
    current.innerText = "Current Items"
    let notcurrent = document.createElement("h3")
    notcurrent.className = "center-text"
    notcurrent.innerText = "Past Items"
    let ulc = document.createElement("div")
    let ulnc = document.createElement("div")
    current.appendChild(ulc)
    notcurrent.appendChild(ulnc)
    box.appendChild(current)
    box.appendChild(notcurrent)


    user.items.forEach((item)=>{
      console.log(user);
      // debugger
      if(item.current === "true"){
        let divCard = document.createElement("div")
        divCard.className = "user-card"
        let divCardFrame = document.createElement("div")
        divCardFrame.className = "user-card-frame"
        let name = document.createElement("p")
        name.innerText = `${item.name.replace(/\b\w/g, l => l.toUpperCase())}`
        let price = document.createElement("p")
        price.innerText = `$${item.price.toFixed(2)}`
        let image = document.createElement('img')
        image.src = "https://cdn5.vectorstock.com/i/1000x1000/18/34/shampoo-and-soap-flat-icon-on-white-background-vector-13621834.jpg"
        image.className = "item-image"
        divCardFrame.appendChild(name)
        divCardFrame.appendChild(image)
        divCardFrame.appendChild(price)
        divCard.appendChild(divCardFrame)
      if (user.id === (localStorage.id/7)) {

        let current = document.createElement("input")
        current.setAttribute("type", "checkbox")
        let currentLabel = document.createElement("label")
        currentLabel.innerText = "Current?"
        current.checked = JSON.parse(item.current)
        current.addEventListener('change', ()=>this.fetchCheck(item.item_id,user.id,item.current).bind(this))
        divCardFrame.appendChild(currentLabel)
        divCardFrame.appendChild(current)
        let linebreak = document.createElement("br");
        divCardFrame.appendChild(linebreak);
        let button = document.createElement("button")
        // button.id = `del-item-${item.item_id}`
        button.addEventListener('click', ()=>{
          this.deleteItem(user.id, item.item_id).bind(this)
        })
        button.className = "btn btn-outline-danger text-center"
        button.innerText = "Delete Item"
        divCardFrame.appendChild(button)

      }
        ulc.appendChild(divCardFrame)
        console.log("true",item)}
      else {
        let divCard = document.createElement("div")
        divCard.className = "user-card"
        let divCardFrame = document.createElement("div")
        divCardFrame.className = "user-card-frame"
        let name = document.createElement("p")
        name.innerText = `${item.name.replace(/\b\w/g, l => l.toUpperCase())}`
        let price = document.createElement("p")
        price.innerText = `$${item.price.toFixed(2)}`
        let image = document.createElement('img')
        image.src = "https://cdn5.vectorstock.com/i/1000x1000/18/34/shampoo-and-soap-flat-icon-on-white-background-vector-13621834.jpg"
        image.className = "item-image"
        divCardFrame.appendChild(name)
        divCardFrame.appendChild(image)
        divCardFrame.appendChild(price)
        divCardFrame.appendChild(divCard)

      if (user.id === (localStorage.id/7)) {

        let button = document.createElement("button")
        button.addEventListener('click', ()=>{
          this.deleteItem(user.id, item.item_id).bind(this)
        })
        button.className = "btn btn-outline-danger"
        button.innerText = "Delete Item"
        let current = document.createElement("input")
        current.setAttribute("type", "checkbox")
        let currentLabel = document.createElement("label")
        currentLabel.innerText = "Current?"
        current.checked = JSON.parse(item.current)
        current.addEventListener('change', ()=>this.fetchCheck(item.item_id,user.id,item.current).bind(this))
        divCardFrame.appendChild(currentLabel)
        divCardFrame.appendChild(current)
        let linebreak = document.createElement("br");
        divCardFrame.appendChild(linebreak);
        divCardFrame.appendChild(button)
      }
      ulnc.className ="not_current-container"
      ulc.className ="current-container"
      ulnc.appendChild(divCardFrame)
      }

      })
    return box
  }

  //render item stuff
  handleItems(array){
    this.getBody().innerText = ""
    array.forEach(this.renderItems.bind(this))
  }
  renderItems(item){
    let name = document.createElement("h1")
    let price = document.createElement("h1")
    let divCard = document.createElement("div")
    divCard.addEventListener('click',()=>{this.specificItem(item)})
    divCard.className = "user-card"
    let divCardFrame = document.createElement("div")
    divCardFrame.className = "user-card-frame"
    name.innerText = item.name.replace(/\b\w/g, l => l.toUpperCase()) //capitalizes name
    price.innerText = "$"+item.price.toFixed(2) //rounds to second decimal
    let image = document.createElement('img')
    image.src = "https://cdn5.vectorstock.com/i/1000x1000/18/34/shampoo-and-soap-flat-icon-on-white-background-vector-13621834.jpg"
    image.className = "item-image"
    divCardFrame.appendChild(name)
    divCardFrame.appendChild(image)
    divCardFrame.appendChild(price)
    let h3 = document.createElement("p")
    h3.innerText = `${item.user.length} review(s)`
    divCardFrame.appendChild(h3)
    divCard.appendChild(divCardFrame)
    let div = this.createUserDiv()
    if (!item.user.length) {
      divCard.style.display = "none"}
    div.appendChild(divCard)
    this.getBody().appendChild(div)
  }
  specificItem(item){
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
  }
  itemForm(user_id){
    this.getBody().innerText = ""
    this.getBody().innerHTML =
      `<form id="item-form">
        <input id="name" type="text" placeholder="Item Name" value=""/>
        <input id="price" type="text" placeholder="Item Price" value=""/>
        <textarea id="review" placeholder="Review" type="text"></textarea>
        <input id="add_item_btn" type="submit" value="Add Review" class="btn btn-outline-success"/>
      </form>`
    document.getElementById('item-form').addEventListener('submit',(e)=>{ this.newItem(e, user_id)})
  }
  newItem(e, user_id){
    e.preventDefault()
    let name = document.getElementById('name').value
    let price = document.getElementById('price').value
    let review = document.getElementById('review').value
    let data = this.itemAdapter.createOne({name: name, price: price, review: review, user_id: user_id})
    data.then(()=>this.renderProfile())
  }

  deleteItem(userId, itemId){
    let promise = this.userAdapter.deleteItem(userId, itemId)
    promise.then(()=>{this.renderProfile()})
  }

  fetchCheck(item_id, user_id, current){
      let new_current = !JSON.parse(current)
      let promise = this.userAdapter.editCurrent(item_id,user_id,new_current)
      promise.then(()=>this.renderProfile())
  }


}
