export default function SimpleLoginPage() {
  return (
    <div style={{ padding: "20px", backgroundColor: "lightgreen" }}>
      <h1>Simple Login</h1>
      <p>This is a basic HTML page with no React components.</p>
      <form>
        <input type="email" placeholder="Email" style={{ display: "block", margin: "10px 0" }} />
        <input type="password" placeholder="Password" style={{ display: "block", margin: "10px 0" }} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
