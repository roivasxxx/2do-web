import React from "react"
const blockies = require("myetherwallet-blockies")

export default function Blockie() {
  return (
    <div>
      <img src={blockies.toDataUrl("0xdB0ff31fd2D23b7c730B53D955033001480D1C08")} />
    </div>
  )
}
