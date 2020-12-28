const {MAX_STUDENT_FOR_JOIN,MAX_ATTEMPT_TO_JOIN_CLASS,INTERVAL_TIME_TO_JOIN_CLASS}=require("../config/config");


async function checkNoOfStudent()
{		
	try
	{
		this.attempt+=1;
		console.log(this.attempt);
		//
		if(this.attempt>MAX_ATTEMPT_TO_JOIN_CLASS)
		{
			this.emit("handleMsg",{msg:"Hurray! Now No One In The Class You Reached The Limit"});
			this.emit("nextClass");
		}
		else
		{
			  	
			  	console.log("Checking no of student in class to join");
			  	//class name llhEMd iWO5td
			  	await this.page.addStyleTag({content:".llhEMd{display:none}"})
			    
			    //add timeout error to debug
			  	
			  	await this.page.waitForSelector(".U04fid",{visible:true});
				no_of_student=await this.page.evaluate(()=>
												  {		     
													 return document.querySelector(".U04fid").childElementCount;
												  });
				no_of_student=parseInt(no_of_student);

				console.log("No of student is "+no_of_student);
				
				if(no_of_student==MAX_STUDENT_FOR_JOIN)
				{
					console.log("opened")
					//if there is student in the class open the class by clicking open button
					await this.page.click('.NPEfkd');
					//wait for selector 
					await this.page.waitForSelector(".wnPUne",{visible:true});			
					this.clearTime();
					this.emit("leaveClass");
				}
				else
				{
					//if there is not enought student call the function again 
					console.log("not opened")
					this.clearTime();
					//setting the interval to call the function repeatly
					this.timerno.push(setInterval(()=>{this.emit("checkNoOfStudent");},INTERVAL_TIME_TO_JOIN_CLASS));
				}
		}
	}
	catch(error)
	{
		this.emit("handleError",{msg:error.message});
	}

}


module.exports=checkNoOfStudent;