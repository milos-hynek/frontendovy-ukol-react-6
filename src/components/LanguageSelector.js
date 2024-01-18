import "./LanguageSelector.css";

const LanguageSelector=(props)=>{
	if(props.langs===undefined){
		return(<></>);
		}
	if(props.currentLang===undefined){
		return(<></>);
		}			
	let changeLang=(event)=>{    				
	  props.callbackChangeLanguage(event.target.value);     		  
    event.preventDefault();
    }												
	return(
		<div className="LanguageSelector">
			<b>{props.translate.jazyk}:</b><br />
			<select name="currentLanguage" className="w-100 align-center" onChange={changeLang} value={props.currentLang} >
				{props.langs.map((lang:{...})=>
					(<option value={lang.id} key={lang.id} >{lang.name}</option>)
					)}			
			</select>								
		</div>
		);			
	};
export default LanguageSelector;
	
