import "./ShoppingListAddMember.css";
import {useState} from "react"

let toggleFormAddMember="col-xs-12 col-sm-12 col-md-12 hide-add-member";	

const ShoppingListAddMember=(props)=>{
	//component rendering updates:
	const [update,setUpdate]=useState(0);
	const refresh=()=>setUpdate(update+1);		
		
	if(props.users===undefined){
		return(<></>);
		}
	if(props.members===undefined){
		return(<></>);
		}		
			
	if(parseInt(props.currentUser)===parseInt(props.owner)){ // only shopping list owner can use this component			
					
		let addMember=(event)=>{       
			let new_mail=event.target.new_member_mail.value;
			let user_id=0;
			props.users.forEach((user)=>{ 	
				if(user.email==new_mail){
					user_id=user.uid;
					}			
				});
			if(user_id===0){
				alert(props.translate.chyba_clena_a);
			}else{
				if(user_id==props.owner){
					alert(props.translate.chyba_clena_b);
				}else if(props.members[user_id]!==undefined){
					alert(props.translate.chyba_clena_c);
				}else{			
					event.target.new_member_mail.value="";
					props.callbackAddMember(user_id);  	
					toggleFormAddMember="col-xs-12 col-sm-12 col-md-12 hide-add-member";				
				}		   			
			}	  
			event.preventDefault();
			}				
			
		let toggleNewMemberForm=(event)=>{ 
			if(toggleFormAddMember==="col-xs-12 col-sm-12 col-md-12 hide-add-member"){
				toggleFormAddMember="col-xs-12 col-sm-12 col-md-12 show-add-member";				
			}else{
				toggleFormAddMember="col-xs-12 col-sm-12 col-md-12 hide-add-member";				
			}
			refresh();	
			event.preventDefault();
			}			
					
		return(
			<>
				<div className="shoppingListMember col-xs-12 col-sm-6 col-md-3 ">
					<div className="shoppingListMemberAddInner">
						<button onClick={toggleNewMemberForm}><span>&#10133;</span> {props.translate.pridat_clena}</button>					
					</div>
				</div>
				<div className={toggleFormAddMember}>
					<form className="shopingListAddMemberForm" onSubmit={addMember} >
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-12 "><h3>{props.translate.pridani_noveho_clena}</h3></div>
							
							<div className="col-xs-12 col-sm-4 col-md-4 align-center"><b>{props.translate.email_noveho_clena}:</b></div>				
							<div className="col-xs-12 col-sm-8 col-md-4 "><input type="email" name="new_member_mail" className="w-100" required /></div>							
							<div className="col-xs-12 col-sm-12 col-md-4 align-center"><button type="submit">{props.translate.dokoncit_pridani}</button></div>
						</div>
					</form>
				</div>
			</>
			);
		}	
	return(<></>); 	
	};
export default ShoppingListAddMember;
	
