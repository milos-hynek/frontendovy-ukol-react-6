import ShoppingListDetail from "./components/ShoppingListDetail.js";
import Route from "./components/Route.js";
import UserSelector from "./components/UserSelector.js";
import DarkmodeSelector from "./components/DarkmodeSelector.js";
import LanguageSelector from "./components/LanguageSelector.js";
import {useState} from "react"

//start-data definitions
//defined here for possible modification in app
let current_user=3;	 
let current_route='list'; // list / detai;
let current_route_id='0';
let darkmode=0;
let darkmodeCss="lightMode";	
let current_language="cs";
const LANGUAGES=[
	{id:"cs",name:"Česky"},
	{id:"en",name:"English"}
	];
const TRANSLATES=[
		{
			id:"cs",
			list:{
				domaci_ukol:"Domácí úkol",
				nakupni_seznamy:"Nákupní seznamy",
				frontendove_systemy:"Frontendové systémy",
				prehled_dat_uzivatelu_v_systemu:"Přehled dat uživatelů v systému",
				za_ucelem_testovani:"(za účelem testování)",
				prihlaseny_uzivatel:"Přihlášený uživatel",
				vzhled:"Vzhled",
				jazyk:"Jazyk",
				nevyresene:"Nevyřešené",
				vyresene:"Vyřešené",
				vse:"Vše",
				vyresene_i_nevyresene:"Vyřešené i nevyřešené",
				archiv:"Archiv",
				archiv_2:"archiv",
				archiv_3:"(archivováno)",
				archiv_4:"Archivované",
				dokonceno:" - dokončeno",
				vypsat_pouze_nevyresene_ns:"Vypsat pouze nevyřešené nákupní seznamy",
				vypsat_pouze_vyresene_ns:"Vypsat pouze vyřešené nákupní seznamy",
				vypsat_vyresene_nevyresene_ns:"Vypsat vyřešené i nevyřešené nákupní seznamy",
				vypsat_pouze_archivni_ns:"Vypsat nákupní seznamy v archivu",				
				vypsat_pouze_nevyresene_p:"Vypsat pouze nevyřešené položky",
				vypsat_pouze_vyresene_p:"Vypsat pouze vyřešené položky",				
				vypsat_vse_p:"Vypsat všechny položky",								
				nakupni_seznam_uspesne_odstranen:"Nákupní seznam úspěšně odstraněn.",
				pridat_nakupni_seznam:"Přidat nákupní seznam",
				pridani_noveho_nakupniho_seznamu:"Přidání nového nákupního seznamu",
				nazev:"Název",
				popis:"Popis",
				dokoncit_pridani_prejit_do_editace_ns:"Dokončit přidání a přejít do editace nákupního seznamu",
				musite_vyplnit_nazev:"Musíte vyplnit název.",
				nazev_je_prilis_dlouhy:"Název je příliš dlouhý.",
				popis_je_prilis_dlouhy:"Popis je příliš dlouhý.",
				mnozstvi_je_prilis_dlouhy:"Množství je příliš dlouhé.",
				zobrazit_nakupni_seznam:"Zobrazit nákupní seznam",
				nedostatek_prav_odstranit_ns:"Nemáte dostatečná práva pro odstranění tohoto nákupního seznamu",
				odstranit_ns:"Odstranit nákupní seznam",
				opravdu_odstranit_ns:"Opravdu si přejete odebrat tento nákupní seznam?",
				zpet_na_vypis_ns:"Zpět na výpis nákupních seznamů",
				polozky:"Položky",
				clenove:"Členové",
				nemate_opravneni_videt_ns_a:"Nemáte oprávnění vidět nákupní seznam",
				nemate_opravneni_videt_ns_b:"- nejste ani členem a ani vlastníkem nákupního seznamu.",
				polozka_odstranena_z_ns:"Položka úspěšně odstraněna z nákupního seznamu.",
				polozka_pridana_do_ns:"Položka úspěšně přidána do nákupního seznamu.",
				clen_odstranen_z_ns:"Člen úspěšně odstraněn z nákupního seznamu.",
				clen_pridan_do_ns:"Člen úspěšně přidán do nákupního seznamu.",
				ulozit:"Uložit",
				archivovat_ano:"Ano, nákupní seznam je archivován",
				archivovat_ne:"Ne, nákupní seznam není archivován",
				upravit_ns:"Upravit nákupní seznam",
				upraveni_ns:"Upravení nákupního seznamu",
				neplatna_data_archivace:"Neplatná data archivace.",
				ns_upraven:"Nákupní seznam úspěšně upraven.",
				odebrat_clena:"Odebrat člena",
				opravdu_odebrat_clena:"Opravdu si přejete odebrat tohoto člena?",
				odebrat_polozku:"Odebrat položku",
				opravdu_odebrat_polozku:"Opravdu si přejete odebrat tuto položku?",
				splnit_polozku:"Splnit položku",
				nesplnit_polozku:"Nesplnit položku",
				opravdu_zmenit_stav_p:"Opravdu si přejete změnit stav položky?",
				pridat_polozku:"Přidat položku",
				pridani_nove_polozky:"Přidání nové položky",
				mnozstvi:"Množství",
				dokoncit_pridani:"Dokončit přidání",
				pridat_clena:"Přidat člena",
				pridani_noveho_clena:"Přidání nového člena",
				email_noveho_clena:"E-mail nového člena",
				chyba_clena_a:"Zadaný uživatel v systému neexistuje.",
				chyba_clena_b:"Zadaný uživatel v nákupním seznamu již figuruje jako vlastník.",
				chyba_clena_c:"Zadaný uživatel v nákupním seznamu již figuruje jako člen.",
				statistiky_polozek:"Statistiky položek",
				zkratka_seznamy:"sz.",
				zkratka_polozky:"pl.",
				vysvetlivka_seznamy:"sz. = počet nákupních seznamů",
				vysvetlivka_polozky:"pl. = počet položek v nákupních seznamech",
			}
		},
		{
			id:"en",
			list:{
				domaci_ukol:"Homework",
				nakupni_seznamy:"Shopping lists",
				frontendove_systemy:"Frontend systems",
				prehled_dat_uzivatelu_v_systemu:"Overview of user data in the system",
				za_ucelem_testovani:"(for testing purposes)",
				prihlaseny_uzivatel:"Logged user",
				vzhled:"Appearance",
				jazyk:"Language",
				nevyresene:"Unsolved",
				vyresene:"Solved",
				vse:"All",
				vyresene_i_nevyresene:"Solved or unsolved",
				archiv:"Archive",
				archiv_2:"archive",
				archiv_3:"(archived)",
				archiv_4:"Archived",
				dokonceno:" - done",
				vypsat_pouze_nevyresene_ns:"List only unsolved shopping lists",
				vypsat_pouze_vyresene_ns:"List only solved shopping lists",
				vypsat_vyresene_nevyresene_ns:"List solved or unsolved shopping lists",
				vypsat_pouze_archivni_ns:"List shopping lists in the archive",
				vypsat_pouze_nevyresene_p:"List only unsolved items",
				vypsat_pouze_vyresene_p:"List only solved items",				
				vypsat_vse_p:"List all items",	
				nakupni_seznam_uspesne_odstranen:"Shopping list successfully deleted.",
				pridat_nakupni_seznam:"Add shopping list",
				pridani_noveho_nakupniho_seznamu:"Adding a new shopping list",
				nazev:"Name",
				popis:"Description",
				dokoncit_pridani_prejit_do_editace_ns:"Complete the addition and go to edit the shopping list",
				musite_vyplnit_nazev:"You must fill in the name.",
				nazev_je_prilis_dlouhy:"The name is too long.",
				popis_je_prilis_dlouhy:"The description is too long.",
				mnozstvi_je_prilis_dlouhy:"The amount is too long.",
				zobrazit_nakupni_seznam:"View shopping list",
				nedostatek_prav_odstranit_ns:"You do not have sufficient rights to delete this shopping list",
				odstranit_ns:"Delete shopping list",
				opravdu_odstranit_ns:"Are you sure you wish to remove this shopping list?",
				zpet_na_vypis_ns:"Back to the list of shopping lists",
				polozky:"Items",
				clenove:"Members",
				nemate_opravneni_videt_ns_a:"You do not have permission to see shopping list",
				nemate_opravneni_videt_ns_b:"- you are neither a member nor owner of the shopping list.",
				polozka_odstranena_z_ns:"Item successfully removed from shopping list.",
				polozka_pridana_do_ns:"Item successfully added to shopping list.",
				clen_odstranen_z_ns:"Member successfully removed from shopping list.",
				clen_pridan_do_ns:"Member successfully added to shopping list.",
				ulozit:"Save",
				archivovat_ano:"Yes, the shopping list is archived",
				archivovat_ne:"No, the shopping list is not archived",
				upravit_ns:"Edit shopping list",
				upraveni_ns:"Editing of shopping list",
				neplatna_data_archivace:"Invalid archive data.",
				ns_upraven:"Shopping list saved successfuly.",
				odebrat_clena:"Delete member",
				opravdu_odebrat_clena:"Do you realy want to delete this member?",
				odebrat_polozku:"Delete item",
				opravdu_odebrat_polozku:"Do you realy want to delete this item?",
				splnit_polozku:"Solve item",
				nesplnit_polozku:"Unsolve item",
				opravdu_zmenit_stav_p:"Do you realy want to change item status?",
				pridat_polozku:"Add item",
				pridani_nove_polozky:"Add new item",
				mnozstvi:"Amount",
				dokoncit_pridani:"Add",
				pridat_clena:"Add member",
				pridani_noveho_clena:"Add new member",
				email_noveho_clena:"E-mail of member",
				chyba_clena_a:"The entered user does not exist in the system.",
				chyba_clena_b:"The entered user already appears as the owner in the shopping list.",
				chyba_clena_c:"The entered user is already a member in the shopping list.",
				statistiky_polozek:"Items statistics",
				zkratka_seznamy:"sl.",
				zkratka_polozky:"it.",
				vysvetlivka_seznamy:"sl. = number of shopping lists",
				vysvetlivka_polozky:"it. = number of items in shopping lists",
			}
		}
	];	
let translate=TRANSLATES[0].list; // default cs
const COLOR_MODES=[
	{id:0,name:"Světlý mód", name_en:"Lightmode"},
	{id:1,name:"Tmavý mód", name_en:"Darkmode"}
	];
const INITIAL_USERS=[
	{uid:2,email:"jan@novak.xx",name:"Jan",surname:"Novák",degree:"Bc."},
	{uid:3,email:"jiri.prochazka@email.xx",name:"Jiří",surname:"Procházka",degree:""},
	{uid:5,email:"jaroslava.svoboda@email.xx",name:"Jaroslava",surname:"Svobodová",degree:"Ing."},
	{uid:1,email:"kubanovotny@email.xx",name:"Jakub",surname:"Novotný",degree:""},
	{uid:10,email:"hanicka@kucerova.xx",name:"Hana",surname:"Kučerová",degree:"DiS."},
	{uid:11,email:"klarka@kucerova.xx",name:"Klára",surname:"Kučerová",degree:""}
	];
const INITIAL_SHOPPING_LISTS=[
		{
			slid:7,
			id_owner:3,
			name:"Odpolední nákup",	
			description:"Vše prosím nakoupit v místní večerce, děkuji.",
			is_archived:0,
			is_solved:0,
			shopping_list_items:[
				{sliid:14,id_shopping_list:7,name:"Rohlíky",value:"10 ks",is_solved:0},
				{sliid:27,id_shopping_list:7,name:"Chléb",value:"1 ks",is_solved:0},
				{sliid:32,id_shopping_list:7,name:"Mléko",value:"3 x 1l",is_solved:0},
				{sliid:16,id_shopping_list:7,name:"Jogurt malina",value:"4 ks",is_solved:1},
				{sliid:1,id_shopping_list:7,name:"Jogurt jahoda",value:"4 ks",is_solved:1},
				{sliid:41,id_shopping_list:7,name:"Jogurt vanilka",value:"4 ks",is_solved:1},
				{sliid:33,id_shopping_list:7,name:"Máslo",value:"1 ks",is_solved:0},
				{sliid:52,id_shopping_list:7,name:"Mandarinky v síťce",value:"1 Kg",is_solved:1},
				],
			shopping_list_members:[
				{slmid:59,id_shopping_list:7,id_user:2},
				{slmid:62,id_shopping_list:7,id_user:10},
				]
		},
		{
			slid:5,
			id_owner:1,
			name:"Večerní nákup",	
			description:"Vše prosím nakoupit v KAUFLANDU.",
			is_archived:0,
			is_solved:1,
			shopping_list_items:[
				{sliid:101,id_shopping_list:5,name:"Rohlíky",value:"10 ks",is_solved:1},
				{sliid:102,id_shopping_list:5,name:"Chléb",value:"1 ks",is_solved:1},
				{sliid:103,id_shopping_list:5,name:"Mléko",value:"3 x 1l",is_solved:1},
				{sliid:107,id_shopping_list:5,name:"Jogurt bílý",value:"4 ks",is_solved:1},				
				],
			shopping_list_members:[
				{slmid:25,id_shopping_list:5,id_user:5},
				{slmid:74,id_shopping_list:5,id_user:1},
				{slmid:88,id_shopping_list:7,id_user:3}
				]
		},
		{
			slid:9,
			id_owner:5,
			name:"Nákup",	
			description:"",
			is_archived:1,
			is_solved:1,
			shopping_list_items:[
				{sliid:966,id_shopping_list:9,name:"Cukr",value:"1 kg",is_solved:1},
				{sliid:587,id_shopping_list:9,name:"Sůl",value:"1 kg",is_solved:1},								
				],
			shopping_list_members:[
				{slmid:56,id_shopping_list:9,id_user:3},				
				]
		},
		{
			slid:11,
			id_owner:5,
			name:"Malý nákup",	
			description:"",
			is_archived:1,
			is_solved:0,
			shopping_list_items:[
				{sliid:1010,id_shopping_list:11,name:"Cukr",value:"1 kg",is_solved:1},
				{sliid:1011,id_shopping_list:11,name:"Ponožky",value:"1 kg",is_solved:0},								
				],
			shopping_list_members:[
				{slmid:566,id_shopping_list:11,id_user:2},				
				]
		},		
		{
			slid:12,
			id_owner:5,
			name:"Tesco",	
			description:"",
			is_archived:1,
			is_solved:1,
			shopping_list_items:[
				{sliid:1025,id_shopping_list:12,name:"Krkovička",value:"1,5 kg",is_solved:1},
				{sliid:1026,id_shopping_list:12,name:"Párky",value:"1 kg",is_solved:1},								
				],
			shopping_list_members:[
				{slmid:601,id_shopping_list:12,id_user:2},				
				]
		},
		{
			slid:13,
			id_owner:5,
			name:"Kaufland",	
			description:"",
			is_archived:0,
			is_solved:0,
			shopping_list_items:[
				{sliid:1042,id_shopping_list:13,name:"Donutky",value:"4 ks",is_solved:1},
				{sliid:1043,id_shopping_list:13,name:"Mléko",value:"1 bal.",is_solved:0},								
				{sliid:1044,id_shopping_list:13,name:"Sýr cihla nakrájet",value:"20 až 30 dkg",is_solved:0},								
				],
			shopping_list_members:[
				{slmid:608,id_shopping_list:13,id_user:3},				
				]
		},
		{
			slid:14,
			id_owner:3,
			name:"Lídl",	
			description:"",
			is_archived:0,
			is_solved:0,
			shopping_list_items:[
				{sliid:1045,id_shopping_list:14,name:"Gyros",value:"2 ks",is_solved:0},
				{sliid:1046,id_shopping_list:14,name:"Šunka dětská 100g",value:"6 ks",is_solved:0},								
				{sliid:1047,id_shopping_list:14,name:"Pribiňáček",value:"4 ks",is_solved:0},								
				],
			shopping_list_members:[
				{slmid:609,id_shopping_list:14,id_user:5},
				{slmid:610,id_shopping_list:14,id_user:2},								
				]
		}				
	];	

const App=()=>{	
	//component rendering updates:
	const [updateMain,setUpdateMain]=useState(0);
	const refreshMain=()=>{setUpdateMain(updateMain+1);}
	
	//Change logged user
	let callbackChangeUser=(uid)=>{					
		current_user=uid;				
		refreshMain();		
		}
	
	//Change Darkmode
	let callbackChangeMode=(id)=>{					
		darkmode=id;		
		if(parseInt(id)===0){
			darkmodeCss="lightMode";
		}else{
			darkmodeCss="darkMode";			
		}				
		refreshMain();		
		}
	//Change Language
	let callbackChangeLanguage=(id)=>{					
		current_language=id;	
		if(id==='cs'){
			translate=TRANSLATES[0].list; // cs
			}		
		if(id==='en'){
			translate=TRANSLATES[1].list; // en
			}			
		refreshMain();		
		}
	
	
	
	return(
		<div className={darkmodeCss} id="in-result" >			
			<div className="row ">		
				<div className="col-xs-12 col-sm-12 col-md-6">
					<h1>{translate.domaci_ukol} 6 - {translate.nakupni_seznamy} <br /><small>({translate.frontendove_systemy} / Miloš Hynek)</small></h1>	
				</div>	
				<div className="col-xs-12 col-sm-4 col-md-2 align-center">
					<UserSelector users={INITIAL_USERS} currentUser={current_user} callbackChangeUser={callbackChangeUser} translate={translate} />					
				</div>	
				<div className="col-xs-12 col-sm-4 col-md-2 align-center">					
					<DarkmodeSelector modes={COLOR_MODES} currentMode={darkmode} callbackChangeMode={callbackChangeMode} translate={translate} current_language={current_language} />
				</div>				
				<div className="col-xs-12 col-sm-4 col-md-2 align-center">					
					<LanguageSelector langs={LANGUAGES} currentLang={current_language} callbackChangeLanguage={callbackChangeLanguage} translate={translate} />						
				</div>				
			</div>
			<br />			
			<Route shoppingLists={INITIAL_SHOPPING_LISTS} users={INITIAL_USERS} currentUser={current_user} currentRoute={current_route} currentRouteId={current_route_id} translate={translate} />								
			<br /><br />
			<h2>{translate.prehled_dat_uzivatelu_v_systemu} <small>{translate.za_ucelem_testovani}</small></h2>
			{INITIAL_USERS.map((user:{...})=>
				(<div key={user.uid}>#{user.uid} - {user.degree} {user.name} {user.surname} - {user.email}</div>)
			)}				
		</div>
		);
	};
export default App;
	
