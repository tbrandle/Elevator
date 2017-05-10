export default class Elevator {
  constructor() {
    this.direction = "up" || this.setDirection()
    this.motionStatus = "idle"
    this.currentFloor = 0
    this.currentRiders= {
      up:[],
      down:[]
    }
    this.request = {
      up:[],
      down:[]
    }
    this.lastStop = 0
    this.floorsTraversed = 0
  }

  reset(){
    this.direction = "up"
    this.motionStatus = 'idle'
    this.currentFloor = 0
    this.currentRiders= {
      up:[],
      down:[]
    }
    this.lastStop = 0
    this.floorsTraversed = 0
  }

  /**********************/

  addRider(user){
    user.currentFloor < user.dropOffFloor
      ? this.currentRiders.up.push(user)
      : this.currentRiders.down.push(user)

    this.setDirection()

    this.currentFloor = user.currentFloor
    this.sortRiders()
    this.getLastStop()
  }

  sortRiders(){
    const direction = this.direction
    this.currentRiders.up.sort((a, b) =>{
      return a.dropOffFloor - b.dropOffFloor
    })
    this.currentRiders.down.sort((a, b) =>{
      return b.dropOffFloor - a.dropOffFloor
    })
  }

  setDirection(){
    if (this.currentFloor === this.lastStop) {
      if (!this.currentRiders.up.length && this.currentRiders.down.length) {
        this.direction = "down"
      }
      if (!this.currentRiders.down.length && this.currentRiders.up.length) {
        this.direction = "up"
      }
    }
  }

  /**********************/

  goToFloor(){
    const direction = this.direction
    // this.getFloors()
    this.currentFloor = this.currentRiders[direction][0].dropOffFloor
    this.currentRiders[direction].shift()

  }

  getFloors(){
    // this.floorsTraversed = this.currentFloor
    const stops = this.getStops()
    const max = Math.max(...stops)
    const min = Math.min(...stops)

    // console.log("stops", stops);
    console.log("max - min: ", max - min);

    this.floorsTraversed = Math.abs(min - max)
    console.log("floorsTraversed: ", this.floorsTraversed);

    // return max - min + this.currentFloor;
  }

  /**********************/

  getLastStop(){
    this.direction === "up"
      ? this.lastStop = Math.max(...this.getStops())
      : this.lastStop = Math.min(...this.getStops())
  }

  getStops(){
    const { up, down } = this.currentRiders
    return this.direction === "up"
      ? this.getStopsReducer(up).sort((a, b) => {
        return a-b
      })
      : this.getStopsReducer(down).sort((a, b) => {
        return a-b
      })
  }

  getStopsReducer(obj){
    return obj.reduce((stopsArray, user) => {
      !stopsArray.includes(user.currentFloor) && stopsArray.push(user.currentFloor)
      !stopsArray.includes(user.dropOffFloor) && stopsArray.push(user.dropOffFloor)
      return stopsArray
    },[])
  }

}


// riderRequest(user){
//
// if (this.direction === "up" && this.currentFloor > user.currentFloor || this.direction === "down" && this.currentFloor < user.currentFloor){
//     this.queRider(user)
//   } else if(this.direction === "down")
//   this.addRider(user)
// }
//
// queRider(user) {
//   user.currentFloor < user.dropOffFloor
//     ? this.queRiders.up.push(user)
//     : this.queRiders.down.push(user)
// }
//
// addRider(user){
//   user.currentFloor < user.dropOffFloor
//     ? this.currentRiders.up.push(user)
//     : this.currentRiders.down.push(user)
//
//   this.setDirection()
//
//   this.currentFloor = user.currentFloor
//   this.sortRiders()
//   this.getLastStop()
// }


class Person {
  constructor() {
    this.name = name,
    this.currentFloor = currentFloor,
    this.dropOffFloor = dropOffFloor,
    this.direction = 'up' || 'down'
  }


}
