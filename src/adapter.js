class Adapter{
  constructor(url){
    this.baseURL = url
  }
  getAll(){
    return fetch(this.baseURL)
                .then(res => res.json())
  }


}
