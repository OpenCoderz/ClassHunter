
var findPresentClass=require("./findPresentClass");

async function openClass()
{
	try
	{
		let period_no=findPresentClass();
		console.log("period_no",period_no);

		this.global_period_no=period_no;
		//only for testing period_no
		if(!1)
		{
			this.emit("handleMsg",{msg:"Hurray! Now  you Don't Have Class Take A Break"});
			this.emit("nextClass");
		}
	else
	 	{
				//to correct index acess
				period_no-=1;
				console.log("class opened",this.today_classlink[period_no]);
				//time out zero when we gave poor network
				await this.page.goto(this.today_classlink[period_no],{waitUntil:'networkidle0',timeout:0});			
			 	console.log("this.page loaded");
			 	//before open the class make sure there is enough student in the class
			 	this.emit("checkNoOfStudent");
		}
	}
	catch(error)
	{
		console.log("error is \n",error);
		
		this.emit("handleError",{msg:error.message});
		
	}
}

module.exports=openClass;