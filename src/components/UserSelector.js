import "./UserSelector.css";

const UserSelector=(props)=>{
	if(props.users===undefined){
		return(<></>);
		}
	if(props.currentUser===undefined){
		return(<></>);
		}			
	let changeUser=(event)=>{    				
	  props.callbackChangeUser(event.target.value);     		  
    event.preventDefault();
    }												
	return(
		<div className="UserSelector">
			<b>{props.translate.prihlaseny_uzivatel}:</b><br />
			<select name="loggedUser" className="w-100 align-center" onChange={changeUser} value={props.currentUser} >
				{props.users.map((user:{...})=>
					(<option value={user.uid} key={user.uid} >{user.degree} {user.name} {user.surname}</option>)
					)}			
			</select>								
		</div>
		);			
	};
export default UserSelector;
	
