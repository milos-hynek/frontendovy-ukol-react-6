import "./ShoppingListsStatistics.css";
import React from "react";
import { PieChart, Pie, Label, Legend } from "recharts";

const ShoppingListsStatistics=(props)=>{
	if(props.items && Array.isArray(props.items) && props.items.length>0 ){
	 // do nothing
	}else{
		return (<></>);
	}
	let archived=0, solved=0, unsolved=0;
	let archived_items=0, solved_items=0, unsolved_items=0; 
	for (let j = 0, lem = props.items.length; j < lem; j++) {
		if(parseInt(props.currentUser)===parseInt(props.items[j].id_owner)){ // is list owner?
				// do nothing
			}else{
				let exist=0;
				for(let i=0;i<props.items[j].shopping_list_members.length;i++){
					if(parseInt(props.currentUser)===parseInt(props.items[j].shopping_list_members[i].id_user)){ // is list member?
						exist=1;
						}
					}
				if(exist==0){
					continue; // skip shopping list without current user
					}						
			}	
		if(parseInt(props.items[j].is_archived)===1){
			archived++;
			archived_items+=props.items[j].shopping_list_items.length;
		}else if(parseInt(props.items[j].is_solved)===1){
			solved++;
			solved_items+=props.items[j].shopping_list_items.length;
		}else{
			unsolved++;
			unsolved_items+=props.items[j].shopping_list_items.length;
		}
	}
	
	let showGraph=archived+solved+unsolved;
	if(showGraph<1){
		return (<></>);
	}
	
	
	const graphData = [
		{
		  "name": props.translate.archiv_4+" - "+archived+" "+props.translate.zkratka_seznamy+" / "+archived_items+" "+props.translate.zkratka_polozky,
		  "value": archived,
		  "fill": "#555"    
		},
		{
		  "name": props.translate.vyresene+" - "+solved+" "+props.translate.zkratka_seznamy+" / "+solved_items+" "+props.translate.zkratka_polozky,
		  "value": solved,
		  "fill": "#008000"    
		},
		{
		  "name": props.translate.nevyresene+" - "+unsolved+" "+props.translate.zkratka_seznamy+" / "+unsolved_items+" "+props.translate.zkratka_polozky,
		  "value": unsolved,
		  "fill": "#8b0000"
		}
	];

	return (
		<div>
			<h2 className="pad-x-8" >{props.translate.statistiky_polozek}</h2>					
			* {props.translate.vysvetlivka_seznamy}, {props.translate.vysvetlivka_polozky}<br /><br />
			<PieChart width={300} height={300}>
 			 <Pie data={graphData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} label />  
 			 <Legend verticalAlign="top" height={36}/>	
			</PieChart>
			
		</div>
		);		
	};
export default ShoppingListsStatistics;
	
