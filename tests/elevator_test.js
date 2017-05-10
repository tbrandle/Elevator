require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

require('locus');


const assert = require('chai').assert;
const Elevator = require('../elevator').default;

describe('Elevator', function() {
  let elevator = new Elevator();

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    const mockUser1 = { name: "Brittany", currentFloor: 3, dropOffFloor: 8 };

    elevator.addRider(mockUser1);

    assert.deepEqual(elevator.currentRiders.up.length, 1)

    elevator.goToFloor()

    assert.deepEqual(elevator.currentFloor, 8);
    assert.deepEqual(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.lastStop, 8)
  });

  it('should sort the up and down arrays by dropOffFloor from least to greatest', () => {
    const mockUser1 = { name: "Brittany", currentFloor: 3, dropOffFloor: 8 };
    const mockUser2 = { name: "Tim", currentFloor: 4, dropOffFloor: 9 };
    const mockUser3 = { name: "Bill", currentFloor: 2, dropOffFloor: 4 };

    elevator.addRider(mockUser1);
    elevator.addRider(mockUser2);
    elevator.addRider(mockUser3);

    const result = [ { name: 'Bill', currentFloor: 2, dropOffFloor: 4 },
                     { name: 'Brittany', currentFloor: 3, dropOffFloor: 8 },
                     { name: 'Tim', currentFloor: 4, dropOffFloor: 9 } ]

    assert.deepEqual(elevator.currentRiders.up, result)
  })

  it('should shift out the first person from the up array once they have been dropped off', () => {
    const mockUser1 = { name: "Brittany", currentFloor: 3, dropOffFloor: 8 };
    const mockUser2 = { name: "Tim", currentFloor: 4, dropOffFloor: 9 };
    const mockUser3 = { name: "Bill", currentFloor: 2, dropOffFloor: 4 };

    elevator.addRider(mockUser1);
    elevator.addRider(mockUser2);
    elevator.addRider(mockUser3);

    const before = [ { name: 'Bill', currentFloor: 2, dropOffFloor: 4 },
                     { name: 'Brittany', currentFloor: 3, dropOffFloor: 8 },
                     { name: 'Tim', currentFloor: 4, dropOffFloor: 9 } ]

    assert.deepEqual(elevator.currentRiders.up, before)

    elevator.goToFloor()

    const after = [ { name: 'Brittany', currentFloor: 3, dropOffFloor: 8 },
                    { name: 'Tim', currentFloor: 4, dropOffFloor: 9 } ]

    assert.deepEqual(elevator.currentRiders.up, after)
  })

  it('should bring a rider to a floor below their current floor', () => {
    const mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    elevator.addRider(mockUser);

    assert.deepEqual(elevator.currentRiders.down.length, 1)
    assert.deepEqual(elevator.currentFloor, 8)

    // eval(locus)

    elevator.goToFloor()
    assert.deepEqual(elevator.currentFloor, 3);
    assert.deepEqual(elevator.currentRiders.down.length, 0)
  });

  it('should keep track of all the stops in one direction', () =>{
    const mockUser1 = { name: "Brittany", currentFloor: 3, dropOffFloor: 8 };
    const mockUser2 = { name: "Tim", currentFloor: 4, dropOffFloor: 9 };
    elevator.addRider(mockUser1);
    elevator.addRider(mockUser2);
    assert.deepEqual(elevator.getStops(), [3, 4, 8, 9]);
  })

  it('should drop off everyone in the up array, then drop of the down array', () =>{
    const mockUserUp1 = { name: "Brittany", currentFloor: 3, dropOffFloor: 8 };
    const mockUserUp2 = { name: "Tim", currentFloor: 5, dropOffFloor: 10 };
    const mockUserUp3 = { name: "Tim", currentFloor: 6, dropOffFloor: 13 };

    const mockUserDown1 = { name: "Brittany", currentFloor: 12, dropOffFloor: 8 };
    const mockUserDown2 = { name: "Tim", currentFloor: 10, dropOffFloor: 5 };
    const mockUserDown3 = { name: "Tim", currentFloor: 4, dropOffFloor: 2 };

    elevator.addRider(mockUserUp1);
    elevator.addRider(mockUserUp2);
    elevator.addRider(mockUserUp3);

    elevator.addRider(mockUserDown1);
    elevator.addRider(mockUserDown2);
    elevator.addRider(mockUserDown3);

    assert.deepEqual(elevator.direction, "up");

    elevator.goToFloor()
    elevator.goToFloor()
    elevator.goToFloor()

    assert.deepEqual(elevator.direction, "down");
    assert.deepEqual(elevator.currentRiders.up.length, 0);
    assert.deepEqual(elevator.currentRiders.down.length, 3);

    elevator.goToFloor()
    elevator.goToFloor()
    elevator.goToFloor()

    assert.deepEqual(elevator.currentRiders.up.length, 0);
    assert.deepEqual(elevator.currentRiders.down.length, 0);
  })



  it.skip('should be able to keep track of how many total floors', () => {
    const mockUser1 = { name: "Brittany", currentFloor: 3, dropOffFloor: 8 };
    const mockUser2 = { name: "Tim", currentFloor: 5, dropOffFloor: 10 };
    const mockUser3 = { name: "Tim", currentFloor: 5, dropOffFloor: 13 };
    elevator.addRider(mockUser1);
    elevator.addRider(mockUser2);
    elevator.addRider(mockUser3);
    assert.deepEqual(elevator.getStops(), [3, 5, 8, 10, 13]);

    // eval(locus)
    elevator.goToFloor()
    elevator.goToFloor()
    elevator.goToFloor()


    assert.deepEqual(elevator.floorsTraversed, 13)

  })

  it.skip('should store a collection of requests and a collection of current riders on the elevator.', () => {
    const mockUser1 = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    const mockUser2 = { name: "Tim", currentFloor: 10, dropOffFloor: 5 };
    elevator.goToFloor(mockUser1);
    elevator.goToFloor(mockUser2);

    assert.deepEqual(elevator.currentRiders.length, 2)
  })

  it.skip('should', () => {

  })



});
