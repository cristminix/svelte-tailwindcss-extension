import "../global/css/tailwind.css"
import "../app.css"
import App from "./Content.svelte"
const index = document.createElement("div")
index.id = "extension-root"

const body = document.querySelector("body")
if (body) {
  body.prepend(index)
}

const app = new App({
  target: index!,
})

export default app
