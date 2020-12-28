const {
	SELECTOR_FOR_HIDE_POPUP,
	MAX_STUDENT_FOR_JOIN,
	MAX_ATTEMPT_TO_JOIN_CLASS,
	INTERVAL_TIME_TO_JOIN_CLASS,
	SELECTOR_FOR_JOINING_CLASS_BUTTON,
	SELECTOR_FOR_GETTING_PEOPLE_FOR_JOINING}=require("../config/config");

console.log(SELECTOR_FOR_GETTING_PEOPLE_FOR_JOINING,SELECTOR_FOR_JOINING_CLASS_BUTTON)

async function checkNoOfStudent()
{		
	try
	{
		this.attempt+=1;
		console.log(this.attempt);
		//checking the attempt
		if(this.attempt>MAX_ATTEMPT_TO_JOIN_CLASS)
		{
			this.emit("handleMsg",{msg:"Hurray! Now No One In The Class You Reached The Limit"});
			this.emit("nextClass");
		}
		else
		{
			  	
			  	console.log("Checking no of student in class to join");
			  	//class name llhEMd iWO5td
			  	await this.page.addStyleTag({content:SELECTOR_FOR_HIDE_POPUP+"{display:none}"})
			    
			    //add timeout error to debug
			  	
			  	await this.page.waitForSelector(SELECTOR_FOR_GETTING_PEOPLE_FOR_JOINING,{visible:true});
				
				no_of_student=await this.page.evaluate((SELECTOR_FOR_JOINING_CLASS_BUTTON,SELECTOR_FOR_GETTING_PEOPLE_FOR_JOINING)=>
												  {		     
													 let element= document.querySelector(SELECTOR_FOR_GETTING_PEOPLE_FOR_JOINING);
													 console.log(element)
													 if(element)
													 {
													 	return element.childElementCount;
													 }
													 else
													 {
													 	return SELECTOR_FOR_GETTING_PEOPLE_FOR_JOINING+" selector not found";
													 }
												  },SELECTOR_FOR_JOINING_CLASS_BUTTON,SELECTOR_FOR_GETTING_PEOPLE_FOR_JOINING);

				console.log("No of student is "+no_of_student);
				
				if(no_of_student>=MAX_STUDENT_FOR_JOIN)
				{
					console.log("opened")
					//if there is student in the class open the class by clicking open button
					await this.page.click(SELECTOR_FOR_JOINING_CLASS_BUTTON);
					this.clearTime();
					this.emit("leaveClass");
				}
				else if(no_of_student<MAX_STUDENT_FOR_JOIN)
				{
					//if there is not enought student call the function again 
					console.log("not opened")
					this.clearTime();
					//setting the interval to call the function repeatly
					this.timerno.push(setInterval(()=>{this.emit("checkNoOfStudent");},INTERVAL_TIME_TO_JOIN_CLASS));
				}
				//if selector is not found mean
				else
				{
					this.emit("handleError",{msg:no_of_student});
				}
		}
	}
	catch(error)
	{
		this.emit("handleError",{msg:error.message});
	}

}


module.exports=checkNoOfStudent;