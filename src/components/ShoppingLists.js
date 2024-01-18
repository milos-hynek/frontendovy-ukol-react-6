import "./ShoppingLists.css";
import ShoppingListUnit from "./ShoppingListUnit.js";
import AddShoppingList from "./AddShoppingList.js";
import ShoppingListsStatistics from "./ShoppingListsStatistics.js";
import {useState} from "react"

let filterItems=2; // all of them default	

const ShoppingLists=(props)=>{
	
	//helping array for users:
	let usersById=[];
	props.users.forEach((user)=>( 	
		usersById[user.uid]=user
		));
	
	const [shoppingLists,setShoppingLists]=useState(props.shoppingLists);
			
	//component rendering updates:
	const [update,setUpdate]=useState(0);
	const refresh=()=>setUpdate(update+1);
	
	//Delete shopping list
	let callbackDeleteShoppingList=(slid)=>{					
		shoppingLists.forEach((sl,index)=>{ 	
			if(sl.slid===slid){
				shoppingLists.splice(index,1);				
				alert( props.translate.nakupni_seznam_uspesne_odstranen );	
				}								
			});				
		const updatedShoppingLists=shoppingLists;
		setShoppingLists(updatedShoppingLists);	
		refresh();		
		}	
	
	//Add shopping list
	let callbackAddShoppingList=(data)=>{
		let slid=(Math.floor(Math.random()*10000000)*10);
		let newShoppingList={
			slid:slid,
			id_owner:props.currentUser,
			name:data.name,
			description:data.description,
			is_archived:0,
			is_solved:0,
			shopping_list_items:[],
			shopping_list_members:[]
			};
		shoppingLists.push(newShoppingList);
		const updatedShoppingLists=shoppingLists;
		setShoppingLists(updatedShoppingLists);			
		props.callbackChangeRoute({Route:'detail',RouteId:slid});
		refresh();		
		}
		
	let doFilterUnsolved=(event)=>{filterItems=0;refresh();}
	let doFilterSolved=(event)=>{filterItems=1;refresh();}
	let doFilterAll=(event)=>{filterItems=2;refresh();}
	let doFilterArchived=(event)=>{filterItems=3;refresh();}
		
	let filterUnsolved=<button onClick={doFilterUnsolved} title={props.translate.vypsat_pouze_nevyresene_ns} >{props.translate.nevyresene}</button>;
	let filterSolved=<button onClick={doFilterSolved} title={props.translate.vypsat_pouze_vyresene_ns} >{props.translate.vyresene}</button>;
	let filterAll=<button onClick={doFilterAll} title={props.translate.vypsat_vyresene_nevyresene_ns} >{props.translate.vyresene_i_nevyresene}</button>;
	let filterArchived=<button onClick={doFilterArchived} title={props.translate.vypsat_pouze_archivni_ns} >{props.translate.archiv}</button>;
	
	if(filterItems===0){filterUnsolved=<button onClick={doFilterUnsolved} title={props.translate.vypsat_pouze_nevyresene_ns} className="activeFilter">{props.translate.nevyresene}</button>;}
	if(filterItems===1){filterSolved=<button onClick={doFilterSolved} title={props.translate.vypsat_pouze_vyresene_ns} className="activeFilter">{props.translate.vyresene}</button>;}
	if(filterItems===2){filterAll=<button onClick={doFilterAll} title={props.translate.vypsat_vyresene_nevyresene_ns} className="activeFilter">{props.translate.vyresene_i_nevyresene}</button>;}
	if(filterItems===3){filterArchived=<button onClick={doFilterArchived} title={props.translate.vypsat_pouze_archivni_ns} className="activeFilter">{props.translate.archiv}</button>;}

	return (
		<div className="shoppingLists">
			<div className="pad-top-8"><AddShoppingList currentUser={props.currentUser} callbackAddShoppingList={callbackAddShoppingList} translate={props.translate} /></div>
			<div className="row middle-md middle-sm middle-xs">
				<div className="col-xs-12 col-sm-4 col-md-6"><h2>{props.translate.nakupni_seznamy}</h2></div>
				<div className="col-xs-12 col-sm-8 col-md-6 center-xs end-sm end-md">
				 {filterArchived}	{filterUnsolved} {filterSolved} {filterAll} 
				</div>
			</div>
			<div className="row">
				{shoppingLists.map((item:{...})=>(
					<ShoppingListUnit key={item.slid} item={item} shoppingLists={shoppingLists} currentUser={props.currentUser} filterItems={filterItems} callbackChangeRoute={props.callbackChangeRoute} callbackDeleteShoppingList={callbackDeleteShoppingList} translate={props.translate} />
					))}			
			</div>
			<ShoppingListsStatistics items={shoppingLists} currentUser={props.currentUser} translate={props.translate} />	
		</div>
		);	
	};
export default ShoppingLists;
	
