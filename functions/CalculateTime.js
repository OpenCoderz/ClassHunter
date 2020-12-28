
//starting time for the next class  need peroid no to calc the time 
function CalculateTime(start_time) {
	// connvert all to milli sec and sub them 
	let current_time=new Date().getTime();
	let today_date=new Date().toLocaleString().split(" ");
	
	//split time in in to [ 'hr', 'min', 'sec' ]
	let today_time=today_date[1].split(":");
	
	//parsing today hr and min 
	let today_hr=parseInt(today_time[0]);
	let today_min=parseInt(today_time[1]);
	
	//spliting hr and minute 
	start_time=start_time.split(":");

	//converting time to millisec 
	start_time=(start_time[0]*3600000)+(start_time[1]*60000);
	end_time=(today_hr*3600000)+(today_min*60000);

	//subtracting two millisec to get balance time
	let millisec_towait=Math.abs(end_time-start_time);

}

module.exports=CalculateTime;