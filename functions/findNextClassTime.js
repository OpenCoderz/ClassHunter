const {CLASS_DURATIONS}=require("../config/config");

function findNextClassTime()
{

	let total_periods=Object.keys(CLASS_DURATIONS).length;
	//returning the next class starting time
	if(this.global_period_no+1<=total_periods)
	{
		return CLASS_DURATIONS[this.global_period_no+1][0];
	}
	else
	{
		return -1;
	}
}

module.exports=findNextClassTime;