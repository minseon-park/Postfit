import { useParams } from "react-router-dom";
import members from "../static/members";



function MemberDisplay() {
  const { id } = useParams();
  const data = members.filter(member => member.id == id);
  //console.log(data[0]);
  return (
    <div className="memberDisplay" key={id}>
      <h2>{data[0].name}</h2>
      <h3>Title: {data[0].position}</h3>
      <h3>Github Link: {data[0].github}</h3>
      <h3>About: {data[0].about}</h3>
    </div>
  );
}
export default MemberDisplay;