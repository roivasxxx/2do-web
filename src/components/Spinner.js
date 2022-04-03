import Spinner from "react-bootstrap/Spinner"
export default function Spin({ text }) {
  return (
    <div
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
        fontSize: "2.5rem",
      }}
    >
      {text}
      <Spinner animation="border" size="lg" style={{ width: "5rem", height: "5rem", marginTop: 10 }} />
    </div>
  )
}
