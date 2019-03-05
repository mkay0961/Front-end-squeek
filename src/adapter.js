class Adapter{
  constructor(url){
    this.baseURL = url
  }
  getAll(){
    return fetch(this.baseURL)
                .then(res => res.json())
  }
  getIdByUsername(usr){
    return fetch(`${this.baseURL}/userLogin/${usr}`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'}
        }).then(res=>res.json())  
  }


}
