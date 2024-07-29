import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import App from "../App";
import Login from "../views/loginPage/Login";
import LoginSide from "../views/loginPage/LoginSide";
import Form from "../views/loginPage/Form";
import Home from "../views/homePage/Home";
import Edit from "../views/editPage/Edit";
import NavBar from "../views/Bars/NavBar";
import ShiftsList from "../views/dashboards/adminHelpers/ShiftsList";
import DoctorDashboard from "../views/dashboards/DoctorDashboard";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/PaletteTree">
                <PaletteTree/>
            </ComponentPreview>
            <ComponentPreview path="/Login">
                <Login/>
            </ComponentPreview>
            <ComponentPreview path="/LoginSide">
                <LoginSide/>
            </ComponentPreview>
            <ComponentPreview path="/Form">
                <Form/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/Home">
                <Home/>
            </ComponentPreview>
            <ComponentPreview path="/Edit">
                <Edit/>
            </ComponentPreview>
            <ComponentPreview path="/NavBar">
                <NavBar/>
            </ComponentPreview>
            <ComponentPreview path="/ShiftsList">
                <ShiftsList/>
            </ComponentPreview>
            <ComponentPreview path="/DoctorDashboard">
                <DoctorDashboard/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews