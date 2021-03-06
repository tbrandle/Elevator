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
    const userGoingUp = user.currentFloor < user.dropOffFloor
    const userGoingDown = user.currentFloor > user.dropOffFloor
    const elevatorGoingUp = this.direction === "up"
    const elevatorGoingDown = this.direction === "down"
    if (this.currentRiders.length) {

        if (elevatorGoingUp && userGoingUp && this.currentFloor > user.currentFloor){
          this.queRider(user)
        } else if (elevatorGoingUp && userGoingDown){
          this.queRider(user)
        } else if(elevatorGoingDown && userGoingDown && this.currentFloor < user.currentFloor){
          this.queRider(user)
        } else if(elevatorGoingDown && userGoingUp){
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
    this.getAllStops(user.currentFloor)
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
    this.queRiders[this.direction].map(user => this.addRider(user))
    this.queRiders[this.direction] = []
  }

  /**********************/

  goToFloor(){
    this.getAllStops(this.currentRiders[0].dropOffFloor)
    console.log("dropOff: ",  this.currentRiders[0].dropOffFloor);
    this.currentFloor = this.currentRiders[0].dropOffFloor
    this.currentRiders.shift()
    this.setDirection()
  }

  getFloors(){
    this.floorsTraversed = this.stops.reduce((sum, stop) => {
      sum += Math.abs(sum - stop)
      return sum
    },0)
  }

  /**********************/

  getLastStop(){
    this.direction === "up"
      ? this.lastStop = Math.max(...this.getStopsOneDirection())
      : this.lastStop = Math.min(...this.getStopsOneDirection())
  }

  getStopsOneDirection(){
    return this.currentRiders.reduce((stopsArray, user) => {
      !stopsArray.includes(user.currentFloor) && stopsArray.push(user.currentFloor)
      !stopsArray.includes(user.dropOffFloor) && stopsArray.push(user.dropOffFloor)
      return stopsArray
    },[]).sort((a, b) => a - b)
  }

  getAllStops(stop){
    this.stops.push(stop)
    this.getFloors()
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
