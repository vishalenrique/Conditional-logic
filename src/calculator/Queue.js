/**
 * This is a generic Queue class.
 * We will be using this for calculating field changes.
 */

class Queue {
  constructor() {
    this.queue = []
  }

  push(item) {
    this.queue.push(item)
  }

  pop() {
    return this.queue.shift()
  }

  peek() {
    return this.queue[0]
  }

  clear() {
    this.queue = []
  }

  hasKeys() {
    return this.queue.length > 0
  }
}

export default Queue
