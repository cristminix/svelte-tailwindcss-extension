import { waitForElm } from "@/global/fn/waitForElm"
let draggable: HTMLElement
let isDragging = false
let offsetX: number = 0
let offsetY: number = 0

function onMouseMove(event: MouseEvent) {
  if (isDragging) {
    const target = event.target as HTMLElement
    // const rect = target.getBoundingClientRect()

    // offsetX = event.clientX - rect.x
    // offsetY = event.clientY - rect.y

    draggable.style.left = `${event.clientX - offsetX}px`
    draggable.style.top = `${event.clientY - offsetY}px`
  }
}

function onMouseUp() {
  if (isDragging) {
    isDragging = false
    draggable.style.cursor = "grab"
    document.removeEventListener("mousemove", onMouseMove)
    document.removeEventListener("mouseup", onMouseUp)
  }
}

function onMouseDown(event: MouseEvent) {
  isDragging = true
  offsetX = event.clientX - draggable.offsetLeft
  offsetY = event.clientY - draggable.offsetTop
  draggable.style.cursor = "grabbing"
  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("mouseup", onMouseUp)
  event.preventDefault() // Prevent default to avoid text selection
}
export function initDraggable() {
  waitForElm("#content-script-app").then((elem) => {
    draggable = elem as HTMLElement
    draggable.style.width = "450px"
    draggable.removeEventListener("mousedown", onMouseDown)
    draggable.addEventListener("mousedown", onMouseDown)
  })
}
