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

    elevator.riderRequest(mockUser1);

    assert.deepEqual(elevator.currentRiders.length, 1)

    elevator.goToFloor()

    assert.deepEqual(elevator.currentFloor, 8);
    assert.deepEqual(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.lastStop, 8)
  });

  it('should sort the up and down arrays by dropOffFloor from least to greatest', () => {
    const mockUser3 = { name: "Bill", currentFloor: 2, dropOffFloor: 4 };
    const mockUser1 = { name: "Brittany", currentFloor: 3, dropOffFloor: 8 };
    const mockUser2 = { name: "Tim", currentFloor: 4, dropOffFloor: 9 };

    elevator.riderRequest(mockUser3);
    elevator.riderRequest(mockUser1);
    elevator.riderRequest(mockUser2);

    const result = [ { name: 'Bill', currentFloor: 2, dropOffFloor: 4 },
                     { name: 'Brittany', currentFloor: 3, dropOffFloor: 8 },
                     { name: 'Tim', currentFloor: 4, dropOffFloor: 9 } ]

    assert.deepEqual(elevator.currentRiders, result)
  })

  it('should shift out the first person from the up array once they have been dropped off', () => {
    const mockUser3 = { name: "Bill", currentFloor: 2, dropOffFloor: 4 };
    const mockUser1 = { name: "Brittany", currentFloor: 3, dropOffFloor: 8 };
    const mockUser2 = { name: "Tim", currentFloor: 4, dropOffFloor: 9 };

    elevator.riderRequest(mockUser3);
    elevator.riderRequest(mockUser1);
    elevator.riderRequest(mockUser2);

    const before = [ { name: 'Bill', currentFloor: 2, dropOffFloor: 4 },
                     { name: 'Brittany', currentFloor: 3, dropOffFloor: 8 },
                     { name: 'Tim', currentFloor: 4, dropOffFloor: 9 } ]

    assert.deepEqual(elevator.currentRiders, before)

    elevator.goToFloor()

    const after = [ { name: 'Brittany', currentFloor: 3, dropOffFloor: 8 },
                    { name: 'Tim', currentFloor: 4, dropOffFloor: 9 } ]

    assert.deepEqual(elevator.currentRiders, after)
  })

  it('should bring a rider to a floor below their current floor', () => {
    const mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    elevator.riderRequest(mockUser);

    assert.deepEqual(elevator.currentRiders.length, 1)
    assert.deepEqual(elevator.currentFloor, 8)


    elevator.goToFloor()
    assert.deepEqual(elevator.currentFloor, 3);
    assert.deepEqual(elevator.currentRiders.length, 0)
  });

  it('should keep track of all the stops in one direction', () =>{
    const mockUser1 = { name: "Brittany", currentFloor: 3, dropOffFloor: 8 };
    const mockUser2 = { name: "Tim", currentFloor: 4, dropOffFloor: 9 };
    elevator.riderRequest(mockUser1);
    elevator.riderRequest(mockUser2);
    assert.deepEqual(elevator.getStopsOneDirection(), [3, 4, 8, 9]);
  })

  it('should drop off everyone in the up array, que everyone in down array, then drop of the down array', () =>{
    const mockUserUp1 = { name: "Brittany", currentFloor: 3, dropOffFloor: 8 };
    const mockUserUp2 = { name: "Tim", currentFloor: 5, dropOffFloor: 10 };
    const mockUserUp3 = { name: "Tim", currentFloor: 6, dropOffFloor: 13 };

    const mockUserDown1 = { name: "Brittany", currentFloor: 12, dropOffFloor: 8 };
    const mockUserDown2 = { name: "Tim", currentFloor: 10, dropOffFloor: 5 };
    const mockUserDown3 = { name: "Tim", currentFloor: 4, dropOffFloor: 2 };

    elevator.riderRequest(mockUserUp1);
    elevator.riderRequest(mockUserUp2);
    elevator.riderRequest(mockUserUp3);

    elevator.riderRequest(mockUserDown1);
    elevator.riderRequest(mockUserDown2);
    elevator.riderRequest(mockUserDown3);

    // eval(locus)

    assert.deepEqual(elevator.direction, "up");

    elevator.goToFloor()
    elevator.goToFloor()
    elevator.goToFloor()

    assert.deepEqual(elevator.direction, "down");
    assert.deepEqual(elevator.queRiders.down.length, 0);
    assert.deepEqual(elevator.currentRiders.length, 3);

    elevator.goToFloor()
    elevator.goToFloor()
    elevator.goToFloor()

    assert.deepEqual(elevator.currentRiders.length, 0);
    assert.deepEqual(elevator.currentRiders.length, 0);
  })

  it.only('should be able to keep track of how many total floors', () => {
    const mockUser1 = { name: "Brittany", currentFloor: 3, dropOffFloor: 8 };
    const mockUser2 = { name: "Tim", currentFloor: 5, dropOffFloor: 10 };
    const mockUser3 = { name: "Tim", currentFloor: 5, dropOffFloor: 13 };
    elevator.riderRequest(mockUser1);
    elevator.riderRequest(mockUser2);
    elevator.riderRequest(mockUser3);

    // eval(locus)
    elevator.goToFloor()
    elevator.goToFloor()
    elevator.goToFloor()

    assert.deepEqual(elevator.stops, [ 0, 3, 5, 5, 8, 10, 13 ]);

    assert.deepEqual(elevator.floorsTraversed, 13)

  })

  it('should store a collection of requests and a collection of current riders on the elevator.', () => {
    const mockUser1 = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    const mockUser2 = { name: "Tim", currentFloor: 10, dropOffFloor: 5 };
    elevator.riderRequest(mockUser1);
    // eval(locus)
    elevator.riderRequest(mockUser2);
    // eval(locus)
    assert.deepEqual(elevator.currentRiders.length, 1)
    assert.deepEqual(elevator.queRiders.down.length, 1)
  })

  it.skip('should', () => {

  })



});
