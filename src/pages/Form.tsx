import '../styles/Form.css'
import InputField from "../components/InputField";
import Button from "../components/Button";

import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
function htmlForm(){
    return(
        <>
        <NavBar />
        <div className="container">

        <SideBar />

        <div className="content">

            <div className="create_employee">
                <h2>Create Employee</h2>
            </div>

            <div className="htmlForm-list">

                <div className="list-1">

                    <div className="single-item">
                        <label htmlFor="Employee Name">Employee Name</label><br />
                        <InputField type = "text" id= "username" name="Employee Name" placeholder="Employee Name" /><br /><br />
                    </div>

                    <div className="single-item">
                        <label htmlFor="Employee ID">Employee ID</label><br />
                        <InputField type="text" id="employee_id" name="employee_id" placeholder="Employee ID" /><br /><br />
                    </div>

                    <div className="single-item">
                        <label htmlFor="Joining Date">Joining Date</label><br />
                        <InputField type="date" id="joining_date" name="joining_date" placeholder="Joining Date" /><br /><br />
                    </div>

                </div>

                <div className="list-2">

                    <div className="single-item">
                        <label htmlFor="Role">Role</label><br />

                        <select id="role" name="role">
                            <option value="">Role</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                            <option value="manager">Manager</option>
                            <option value="tester">Tester</option>
                        </select><br /><br />
                    </div>

                    <div className="single-item">
                        <label htmlFor="Status">Status</label><br />

                        <select id="status" name="status">
                            <option value="">Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select><br /><br />
                    </div>

                    <div className="single-item">
                        <label htmlFor="Experience">Experience</label><br/>
                        <InputField type="text" id="experience" name="experience" placeholder="Experience"/><br /><br />
                    </div>

                </div>

                <div className="isolate-last-row">

                    <div className="isolate-item">
                        <label htmlFor="Address">Address</label><br/>
                        <InputField type="text" id="address" name="address" placeholder="Address"/><br/><br/>
                    </div>

                    <div className="isolate-item">
                        <label htmlFor="Upload to Proof">Upload to Proof</label><br/>
                        <input type="file" id="upload_proof" name="upload_proof"
                            placeholder="Upload to Proof"/><br /><br />
                    </div>

                </div>

                <div className="isolate-last-row">

                    <div className="isolate-item-sub">
                        <InputField type="text" id="City" name="City" placeholder="City"/>
                    </div>

                    <div className="isolate-item-sub">
                        <InputField type="text" id="Country" name="Country" placeholder="Country" style={{margin:" 7px 0 0 -30px"}}/>
                    </div>

                </div>

                <div className="isolate-last-row">

                    <div className="isolate-item-sub">
                        <InputField type="text" id="Postal Code" name="Postal Code"
                            placeholder="Postal Code"/><br/><br/>
                    </div>

                </div>

                <div className="button-space">
                    <Button text="Create" type="submit" />
                    <Button text="Cancel" type="reset" />
                </div>

            </div>

        </div>

    </div>
    </>
    
    )
}

export default htmlForm