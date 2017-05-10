export default class Elevator {
  constructor() {
    this.direction = "up" || this.setDirection()
    this.motionStatus = "idle"
    this.currentFloor = 0
    this.currentRiders= [].sort((a, b) => a.dropOffFloor - b.dropOffFloor)
    this.queRiders = {
      up:[],
      down:[]
    }
    this.lastStop = 0
    this.floorsTraversed = 0
    this.stops = [0]
  }

  reset(){
    this.direction = "up"
    this.motionStatus = 'idle'
    this.currentFloor = 0
    this.currentRiders= [].sort((a, b) => a.dropOffFloor - b.dropOffFloor)
    this.queRiders = {
      up:[],
      down:[]
    }
    this.lastStop = 0
    this.floorsTraversed = 0
    this.stops = [0]
  }

  /**********************/

  riderRequest(user){
    if (this.currentRiders.length) {

        if (this.direction === "up" && user.currentFloor < user.dropOffFloor && this.currentFloor > user.currentFloor){
          // accounts for scenario where user is going up,
              // elevator is going up,
              // but elevator has passed them
          this.queRider(user)
        } else if (this.direction === "up" && user.currentFloor > user.dropOffFloor){
          // accounts for scenario where user is going down,
              // elevator is going up,
          this.queRider(user)
        } else if(this.direction === "down" && user.currentFloor > user.dropOffFloor && this.currentFloor < user.currentFloor){
          // accounts for scenario where user is going down,
              // elevator is going down,
              // but elevator has passed them
          this.queRider(user)
        } else if(this.direction === "down" && user.currentFloor < user.dropOffFloor){
          // accounts for scenario where user is going up,
              // elevator is going down,
          this.queRider(user)
        } else {
          this.addRider(user)
        }

    } else {
      this.addRider(user)
    }
  }

  queRider(user) {
    user.currentFloor < user.dropOffFloor
      ? this.queRiders.up.push(user)
      : this.queRiders.down.push(user)
  }

  addRider(user){
    this.currentRiders.push(user)
    this.setDirection()
    this.currentFloor = user.currentFloor
    this.getLastStop()
  }

  setDirection(){
    if (this.currentFloor === this.lastStop){
      if(this.direction === "up" && this.queRiders.down.length) {
        this.direction = "down"
        this.mapQued()
        }
      if (this.currentFloor === this.lastStop && this.direction === "down" && this.queRiders.up.length) {
        this.direction = "up"
        this.mapQued()
      }
    }
  }

  mapQued(){
    this.currentRiders = [...this.queRiders[this.direction]]
    this.queRiders[this.direction] = []
  }

  /**********************/

  goToFloor(){
    const direction = this.direction
    // this.getFloors()
    this.currentFloor = this.currentRiders[0].dropOffFloor
    this.currentRiders.shift()
    this.setDirection()
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
    return this.currentRiders.reduce((stopsArray, user) => {
      !stopsArray.includes(user.currentFloor) && stopsArray.push(user.currentFloor)
      !stopsArray.includes(user.dropOffFloor) && stopsArray.push(user.dropOffFloor)
      return stopsArray
    },[]).sort((a, b) => a - b)
  }

  getStopsReducer(obj){
    return obj.reduce((stopsArray, user) => {
      !stopsArray.includes(user.currentFloor) && stopsArray.push(user.currentFloor)
      !stopsArray.includes(user.dropOffFloor) && stopsArray.push(user.dropOffFloor)
      return stopsArray
    },[])
  }

}


class Person {
  constructor() {
    this.name = name,
    this.currentFloor = currentFloor,
    this.dropOffFloor = dropOffFloor,
    this.direction = 'up' || 'down'
  }


}
