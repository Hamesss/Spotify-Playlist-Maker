import Form from "../components/Form.jsx"
import Header from "../components/Header.jsx"
function Register(){
    return <>
    <Header />
    <Form route="api/user/register/" method="register" />
    </>
    
}
export default Register