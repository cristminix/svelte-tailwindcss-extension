import { QueueState } from "./QueueState"

export class QueueItem {
  state: number = QueueState.INIT
  // loaded=null
  // size=null
  idx: any = null
  // percentage=null
  constructor(idx: number, state: number) {
    this.state = state
    this.idx = idx
  }
  setState(state: number) {
    this.state = state
  }

  // setSize(size){
  //     this.size = size
  // }

  // setLoaded(loaded){
  //     this.loaded = loaded
  //     this.percentage = Math.floor(this.loaded / this.size * 100)

  // }

  // setPercentage(percentage){
  //     this.percentage = percentage
  // }
}
