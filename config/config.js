let fs=require("fs");

const MAIL_ID="Enter your mail";

const PASSWORD="Enter your  password";


const TIMETABLE={	
					"1":["CN","AANT","TOC","MPMC"],
				   	"2":["OOAD","GIS","CN","MPMC"],
				   	"3":["GIS","MPMC","AANT","TOC"],
				   	"4":["CN","AANT","OOAD","TOC"],
				   	"5":["OOAD","AANT","MPMC","TOC"],
				   	"6":["AANT","GIS","TOC","GIS"]			   
				};	


const CLASS_DURATIONS={
						 "1":["9:30","10:15","AM"],
					  	 "2":["10:20","11:15","AM"],
					   	 "3":["11:20","12:15","AM"],
					   	 "4":["12:20","1:00","PM"],	
				   	 };	

const MEET_LINKS={
					"AANT":"https://meet.google.com/lookup/gdddh64gz3?authuser=0&hs=179",
					"MPMC":"https://meet.google.com/lookup/gsehj6rgad?authuser=0&hs=179",
					"OOAD":"https://meet.google.com/lookup/e4meioxs5t?authuser=0&hs=179",
					"TOC":"https://meet.google.com/lookup/bf2rydga2p?authuser=0&hs=179",
					"GIS":"https://meet.google.com/lookup/ceduzx2wds?authuser=0&hs=179",
					"CN":"https://meet.google.com/lookup/d7u4srd5rs?authuser=0&hs=179"
				};


//ONLY FOR TESTING
const MAX_STUDENT_FOR_JOIN=0;

const MAX_STUDENT_TO_LEAVE=1;

const MAX_ATTEMPT_TO_JOIN_CLASS=5;

const INTERVAL_TIME_TO_JOIN_CLASS=(1)*60000; //(in minutes)

const INTERVAL_TIME_TO_LEAVE_CLASS=(1)*60000; //(in minutes)

const SELECTOR_FOR_HIDE_POPUP=".llhEMd";

const SELECTOR_FOR_GETTING_PEOPLE_FOR_JOINING=".U04fid";

const SELECTOR_FOR_GETTING_PEOPLE_FOR_LEAVEING=".rua5Nb";

const SELECTOR_FOR_JOINING_CLASS_BUTTON=".NPEfkd";

const SELECTOR_FOR_LEAVEING_CLASS_BUTTON=".U26fgb";



function createCookieJson()
{
		// if file not exit write a empty json on it 
		if(!fs.existsSync(__dirname+"/../cookie/cookies.json"))
		{
			 fs.writeFileSync(__dirname+"/../cookie/cookies.json",JSON.stringify({}));
		}
}
createCookieJson();

module.exports={
					MAIL_ID,
					PASSWORD, 
					TIMETABLE, 
					CLASS_DURATIONS,
					MEET_LINKS,MAX_STUDENT_FOR_JOIN,
					MAX_STUDENT_TO_LEAVE,
					MAX_ATTEMPT_TO_JOIN_CLASS,
					INTERVAL_TIME_TO_JOIN_CLASS,
					INTERVAL_TIME_TO_LEAVE_CLASS,
					SELECTOR_FOR_HIDE_POPUP,
					SELECTOR_FOR_GETTING_PEOPLE_FOR_JOINING,
					SELECTOR_FOR_GETTING_PEOPLE_FOR_LEAVEING,
					SELECTOR_FOR_JOINING_CLASS_BUTTON,
					SELECTOR_FOR_LEAVEING_CLASS_BUTTON
				};