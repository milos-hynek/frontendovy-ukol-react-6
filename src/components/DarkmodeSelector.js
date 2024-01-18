import "./DarkmodeSelector.css";

const DarkmodeSelector=(props)=>{
	if(props.modes===undefined){
		return(<></>);
		}
	if(props.currentMode===undefined){
		return(<></>);
		}			
	let changeMode=(event)=>{    				
	  props.callbackChangeMode(event.target.value);     		  
    event.preventDefault();
    }			
  	if(props.current_language==='cs'){  									
			return(
				<div className="DarkmodeSelector">
					<b>{props.translate.vzhled}:</b><br />
					<select name="mode" className="w-100 align-center" onChange={changeMode} value={props.currentMode} >
						{props.modes.map((mode:{...})=>
							(<option value={mode.id} key={mode.id} >{mode.name}</option>)
							)}			
					</select>								
				</div>
				);	
		}else{
			return(
				<div className="DarkmodeSelector">
					<b>{props.translate.vzhled}:</b><br />
					<select name="mode" className="w-100 align-center" onChange={changeMode} value={props.currentMode} >
						{props.modes.map((mode:{...})=>
							(<option value={mode.id} key={mode.id} >{mode.name_en}</option>)
							)}			
					</select>								
				</div>
				);	
		}		
	};
export default DarkmodeSelector;
	
