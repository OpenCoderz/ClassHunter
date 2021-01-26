const {CLASS_DURATIONS}=require("../config/config");

function findPresentClass()
{
	//getting today time in 12 hr format  and split date in to [ 'date', 'hr:min:sec', 'AM/PM' ]
	let today_date=new Date().toLocaleString().split(" ");
	//split time in in to [ 'hr', 'min', 'sec' ]
	let today_time=today_date[1].split(":");
	console.log(today_time);
	//ONLY FOR TESTING
	today_time=["11","30","5"]
	console.log(CLASS_DURATIONS);
	//parsing today hr and min 
	let today_hr=parseInt(today_time[0]);
	let today_min=parseInt(today_time[1]);
	//getting time zone 
	let today_zone=today_date[2];
	//ONLY FOR TESTING
	today_zone="AM";
	//iterating class duration and finding the present class
	for(let period_no in CLASS_DURATIONS)
	{
		//getting start class time in 12 hr format  and split time in to [ 'hr', 'min', 'sec' ]
		let start_time=CLASS_DURATIONS[period_no][0].split(":");
		//parsing class time hr and min 
		let start_hr=parseInt(start_time[0]);
		let start_min=parseInt(start_time[1]);

		//getting end class time in 12 hr format  and split time in to [ 'hr', 'min', 'sec' ]
		let end_time=CLASS_DURATIONS[period_no][1].split(":");
		//parsing class time hr and min
		let end_hr=parseInt(end_time[0]);
		let end_min=parseInt(end_time[1]);
		//getting time zone 
		let start_zone=CLASS_DURATIONS[period_no][2];
		//checking if the present exist between class durations if it so call the joinclass function to join the class
		if(today_hr==start_hr && today_zone===start_zone)
		{

			if(today_min>=start_min)
			{
				 
				 return parseInt(period_no);					
			}

		}
		else if(today_hr==end_hr && today_zone===start_zone)
		{
			if(today_min<end_min)
			{			
				 return parseInt(period_no);					
			}
		}
	}
	return -1;
}


module.exports=findPresentClass;	