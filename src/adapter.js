class Adapter{
  constructor(url){
    this.baseURL = url
  }
  getAllUsers(){
    return fetch(this.baseURL)
                .then(res => res.json())
  }



}
