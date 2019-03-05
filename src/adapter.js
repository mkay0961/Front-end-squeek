class Adapter{
  constructor(url){
    this.baseURL = url
  }
  getAll(){
    return fetch(this.baseURL)
                .then(res => res.json())
  }
  getIdByUsername(usr){
    // debugger
    return fetch(`${this.baseURL}/userLogin/${usr}`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'}
        }).then(res=>res.json())
  }
  getOne(id){
    return fetch(`${this.baseURL}/${id}`)
            .then(res=>res.json())
  }
  createOne(object){
    return fetch(this.baseURL, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(object)
    }).then(res=>res.json())
  }
}
