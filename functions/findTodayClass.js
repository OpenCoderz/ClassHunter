const {TIMETABLE,MEET_LINKS}=require("../config/config");


function findTodayclass()
{
		//getting today day
		let today=new Date().getDay();

		//only for testing 
		today=2;
		
		//getting today time table 
		today_periods=TIMETABLE[today];
		//if today period was exit
		if(today_periods)
		{
			//iterate through each class and get the correspond meet link and store it on the today_classlink 
			for(let today_class=0;today_class<today_periods.length;today_class++)
			{
				this.today_classlink.push(MEET_LINKS[today_periods[today_class]])
			}
			console.log(this.today_classlink);
			this.emit("startBrowser");		
		}
		else
		{
			console.log("Hurray! Today you Don't Have Class ");
			this.emit("handleMsg",{msg:"Hurray! Today you Don't Have Class "});
		}
}

module.exports=findTodayclass;

