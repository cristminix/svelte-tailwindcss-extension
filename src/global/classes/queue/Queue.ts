export class Queue {
  items: any
  static clone(instance: Queue) {
    const keys = Object.keys(instance.items)
    const copyObj = new Queue()
    keys.map((k, i) => {
      const item = instance.items[k]
      copyObj.enqueue(item)
    })
    return copyObj
  }
  constructor() {
    this.items = []
  }
  // enqueue function
  enqueue(element: any) {
    // adding element to the queue
    this.items.push(element)
  }

  // dequeue function
  dequeue() {
    // removing element from the queue
    // returns underflow when called
    // on empty queue
    if (this.isEmpty()) return "underflow"
    return this.items.shift()
  }

  // peek function
  peek() {
    // returns the Front element of
    // the queue without removing it.
    if (this.isEmpty()) return "no_elements_in_queue"
    return this.items[0]
  }
  // isEmpty function
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0
  }
  // printQueue function
  printQueue() {
    let str = ""
    for (var i = 0; i < this.items.length; i++) str += this.items[i] + " "
    return str
  }
}
