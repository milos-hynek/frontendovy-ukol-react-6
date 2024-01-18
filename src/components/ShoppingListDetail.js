import "./ShoppingListDetail.css";
import ShoppingListEdit from "./ShoppingListEdit.js";
import ShoppingListItem from "./ShoppingListItem.js";
import ShoppingListAddItem from "./ShoppingListAddItem.js";
import ShoppingListMember from "./ShoppingListMember.js";
import ShoppingListAddMember from "./ShoppingListAddMember.js";
import ShoppingListDetailStatistics from "./ShoppingListDetailStatistics.js";
import {useState} from "react"

let filterItems=2; // all of them defaul	

const ShoppingListDetail=(props)=>{
	//helping array for users:
	let usersById=[];
	props.users.forEach((user)=>( 	
		usersById[user.uid]=user
		));
			
	//component rendering updates:
	const [update,setUpdate]=useState(0);
	const refresh=()=>setUpdate(update+1);
	
	//Shopping list helper
	const [shoppingList,setShoppingList]=useState(props.shoppingList);
	
	//helping array for members:
	let membersById=[];
	shoppingList.shopping_list_members.forEach((member)=>( 	
		membersById[member.id_user]=member.id_user
		));
	
	//Save shopping list
	let callbackSaveShoppingList=(data)=>{
		shoppingList.name=data.name;
		shoppingList.description=data.description;
		shoppingList.is_archived=data.is_archived;
		const updatedShoppingList=shoppingList;
		setShoppingList(updatedShoppingList);			
		refresh();		
		}
		
	//change some item status from shopping list
	let callbackChangeStatusItem=(id)=>{	
		let completeSolved=1;
		shoppingList.shopping_list_items.forEach((item,index)=>{ 				
			if(item.sliid===id){
					if(item.is_solved===1){
						shoppingList.shopping_list_items[index].is_solved=0;
					}else{
						shoppingList.shopping_list_items[index].is_solved=1;
					}					
				}	
			if(shoppingList.shopping_list_items[index].is_solved===0){
				completeSolved=0;
				}			
			});
		shoppingList.is_solved=completeSolved;
		const updatedShoppingList=shoppingList;
		setShoppingList(updatedShoppingList);		
		refresh();		
		}	
			
	//Delete some item from shopping list
	let callbackDeleteItem=(id)=>{					
		let completeSolved=1;
		shoppingList.shopping_list_items.forEach((item,index)=>{ 				
				if(item.sliid===id){
					shoppingList.shopping_list_items.splice(index,1);				
					alert(props.translate.polozka_odstranena_z_ns);	
				}else{
					if(shoppingList.shopping_list_items[index].is_solved===0){
						completeSolved=0;
						}	
				}
			});
		shoppingList.is_solved=completeSolved;
		const updatedShoppingList=shoppingList;
		setShoppingList(updatedShoppingList);		
		refresh();		
		}	
	
	//Add some item into shopping list
	let callbackAddItem=(data)=>{	
		let item_id=(Math.floor(Math.random()*10000000)*10);
		let newItem={sliid:item_id,id_shopping_list:shoppingList.slid,name:data.name,value:data.value,is_solved:0};
		shoppingList.shopping_list_items.push(newItem);		
		shoppingList.is_solved=0;
		alert(props.translate.polozka_pridana_do_ns);	
		const updatedShoppingList=shoppingList;
		setShoppingList(updatedShoppingList);		
		refresh();		
		}	
	
	//Delete some member from shopping list
	let callbackDeleteMember=(slmid)=>{					
		shoppingList.shopping_list_members.forEach((member,index)=>{ 	
			if(member.slmid===slmid){
				shoppingList.shopping_list_members.splice(index,1);				
				alert(props.translate.clen_odstranen_z_ns);	
				}								
			});				
		const updatedShoppingList=shoppingList;
		setShoppingList(updatedShoppingList);	
		refresh();		
		}
		
	//Add new member into shopping list
	let callbackAddMember=(user_id)=>{		
		let member_id=(Math.floor(Math.random()*10000000)*10);
		let newMember={slmid:member_id,id_shopping_list:shoppingList.slid,id_user:user_id};
		shoppingList.shopping_list_members.push(newMember);
		alert(props.translate.clen_pridan_do_ns);	
		const updatedShoppingList=shoppingList;
		setShoppingList(updatedShoppingList);			
		refresh();		
		}		
		
	let doGoBack=(event)=>{
		let data={Route:'list',RouteId:0};		
		props.callbackChangeRoute(data);  
		}	
	
	if(parseInt(props.currentUser)===parseInt(shoppingList.id_owner)||parseInt(props.currentUser)===membersById[parseInt(props.currentUser)]){}else{ // only owner and member can see shopping list		
		return (
			<div className="shoppingListDetail">
				<div className="align-right pad-top-8"><button onClick={doGoBack} title={props.translate.zpet_na_vypis_ns} >{props.translate.zpet_na_vypis_ns}</button></div>
				<h2>{props.translate.nemate_opravneni_videt_ns_a} "{shoppingList.name}" {props.translate.nemate_opravneni_videt_ns_b}</h2>
			</div>
			);
		}
	
	let archived="";
	if(shoppingList.is_archived===1){
		archived=props.translate.archiv_3;
		}
	
	let solved="";
	if(shoppingList.is_solved===1){
		solved=props.translate.dokonceno;
		}
		
	let doFilterUnsolved=(event)=>{filterItems=0;refresh();}
	let doFilterSolved=(event)=>{filterItems=1;refresh();}
	let doFilterAll=(event)=>{filterItems=2;refresh();}
		
	let filterUnsolved=<button onClick={doFilterUnsolved} title={props.translate.vypsat_pouze_nevyresene_p} >{props.translate.nevyresene}</button>;
	let filterSolved=<button onClick={doFilterSolved} title={props.translate.vypsat_pouze_vyresene_p} >{props.translate.vyresene}</button>;
	let filterAll=<button onClick={doFilterAll} title={props.translate.vypsat_vse_p} >{props.translate.vse}</button>;
	
	if(filterItems===0){filterUnsolved=<button onClick={doFilterUnsolved} title={props.translate.vypsat_pouze_nevyresene_p} className="activeFilter">{props.translate.nevyresene}</button>;}
	if(filterItems===1){filterSolved=<button onClick={doFilterSolved} title={props.translate.vypsat_pouze_vyresene_p} className="activeFilter">{props.translate.vyresene}</button>;}
	if(filterItems===2){filterAll=<button onClick={doFilterAll} title={props.translate.vypsat_vse_p} className="activeFilter">{props.translate.vse}</button>;}
	
	return(
		<div className="shoppingListDetail">
			<div className="align-right pad-top-8"><button onClick={doGoBack} title={props.translate.zpet_na_vypis_ns} >{props.translate.zpet_na_vypis_ns}</button></div>
			<h2>{shoppingList.name} {solved} {archived}</h2>			
			<p>{shoppingList.description}</p>
			<ShoppingListEdit shoppingList={shoppingList} currentUser={props.currentUser} owner={shoppingList.id_owner} callbackSaveShoppingList={callbackSaveShoppingList} translate={props.translate} />	
			<div className="row pad-top-8 middle-md middle-sm middle-xs">
				<div className="col-xs-12 col-sm-6 col-md-6"><h3 className="gap-left-0">{props.translate.polozky}</h3></div>
				<div className="col-xs-12 col-sm-6 col-md-6 align-right"> {filterUnsolved} {filterSolved} {filterAll} </div>
			</div>
			<div className="row">
				{shoppingList.shopping_list_items.map((item:{...})=>(
					<ShoppingListItem key={item.sliid} item={item} currentUser={props.currentUser} owner={shoppingList.id_owner} filter={filterItems} callbackDelItem={callbackDeleteItem} callbackChangeStatusItem={callbackChangeStatusItem} translate={props.translate} />
					))}
				<ShoppingListAddItem currentUser={props.currentUser} owner={shoppingList.id_owner} callbackAddItem={callbackAddItem} translate={props.translate} />							
			</div>
			<h3>{props.translate.clenove}</h3>
			<div className="row">
				<div className="shoppingListOwner col-xs-12 col-sm-6 col-md-3">
					<div className="shoppingListOwnerInner">
						<b>{usersById[shoppingList.id_owner].degree} {usersById[shoppingList.id_owner].name}	{usersById[shoppingList.id_owner].surname}</b>
					</div>
				</div>
				{shoppingList.shopping_list_members.map((member:{...})=>(
					<ShoppingListMember key={member.slmid} member={member} users={usersById} currentUser={props.currentUser} owner={shoppingList.id_owner} callbackDelMember={callbackDeleteMember} translate={props.translate} />
					))}
				<ShoppingListAddMember members={membersById} users={usersById} currentUser={props.currentUser} owner={shoppingList.id_owner} callbackAddMember={callbackAddMember} translate={props.translate} />	
			</div>		
			<ShoppingListDetailStatistics items={shoppingList.shopping_list_items} translate={props.translate} />	
		</div>
		);	
	};
export default ShoppingListDetail;
	
