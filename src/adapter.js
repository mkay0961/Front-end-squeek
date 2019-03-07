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

  deleteItem(userId, itemId){
    return fetch(`${this.baseURL}/${userId}/items/${itemId}`,{
        method: "DELETE"
    })
              .then(res => res.json())
  }

  editCurrent(item_id, user_id, current){
      return fetch(`${this.baseURL}/${user_id}/items/${item_id}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({current: current})
      }).then(res=>res.json())
  }

  editItem(item_id, data){
    return fetch(`${this.baseURL}/${item_id}`, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res=>res.json())

  }
}
