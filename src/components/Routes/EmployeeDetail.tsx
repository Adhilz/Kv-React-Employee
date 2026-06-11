import { useParams } from "react-router";

function EmployeeDetail()
{
    const {id} =useParams();
    return(
        <h2>User Id:{id}</h2>
    )
}
export default EmployeeDetail