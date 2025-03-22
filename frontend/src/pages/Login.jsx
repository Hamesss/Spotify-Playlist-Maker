import Form from "../components/Form.jsx"
import Header from "../components/Header.jsx"
function Login(){
    return <>
        <Header />
        <Form route="api/token/" method="login" ></Form>
    </>
}
export default Login