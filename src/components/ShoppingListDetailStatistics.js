import "./ShoppingListDetailStatistics.css";
import React from "react";
import { PieChart, Pie, Label, Legend } from "recharts";

const ShoppingListDetailStatistics=(props)=>{
	if(props.items && Array.isArray(props.items) && props.items.length>0 ){
	 // do nothing
	}else{
		return (<></>);
	}
	let solved=0, unsolved=0;
	for (let j = 0, lem = props.items.length; j < lem; j++) {
		if(parseInt(props.items[j].is_solved)===1){
			solved++;
		}else{
			unsolved++;
		}
	}
	
	const graphData = [
  {
    "name": props.translate.vyresene,
    "value": solved,
    "fill": "#008000"    
  },
  {
    "name": props.translate.nevyresene,
    "value": unsolved,
    "fill": "#8b0000"
  }
];

	return (
		<div>
			<h3>{props.translate.statistiky_polozek}</h3>					
			<PieChart width={270} height={270}>
 			 <Pie data={graphData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} label />  
 			 <Legend verticalAlign="top" height={36}/>	
			</PieChart>
		</div>
		);		
	};
export default ShoppingListDetailStatistics;
	
