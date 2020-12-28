const {
	MAX_STUDENT_TO_LEAVE,
	MAX_ATTEMPT_TO_JOIN_CLASS,
	INTERVAL_TIME_TO_LEAVE_CLASS,
	SELECTOR_FOR_GETTING_PEOPLE_FOR_LEAVEING,
	SELECTOR_FOR_LEAVEING_CLASS_BUTTON}=require("../config/config");


async function leaveClass()
{
	try
	{

	   console.log("Checking for class leveing");
	   await this.page.waitForSelector(SELECTOR_FOR_GETTING_PEOPLE_FOR_LEAVEING,{visible:true});	
  	   let is_leaved=await this.page.evaluate((MAX_STUDENT_TO_LEAVE,SELECTOR_FOR_GETTING_PEOPLE_FOR_LEAVEING,SELECTOR_FOR_LEAVEING_CLASS_BUTTON)=>{
  	   														//getting the no of student in class
														   	no_of_student=document.querySelector(SELECTOR_FOR_GETTING_PEOPLE_FOR_LEAVEING).innerText;
														   	if(no_of_student)
														   	{
																no_of_student=parseInt(no_of_student);
																if(no_of_student<=MAX_STUDENT_TO_LEAVE)
																	{
																		let button=document.querySelector(SELECTOR_FOR_LEAVEING_CLASS_BUTTON);
																		if(button)
																		{
																			button.click();
																			return "leaved";
																		}
																		else
																		{
																			return SELECTOR_FOR_LEAVEING_CLASS_BUTTON+" Selector not found for leaving class";
																		}
																	}
																	else
																	{
																		return "stay";
																	}
															}
															else{
																return SELECTOR_FOR_GETTING_PEOPLE_FOR_LEAVEING+" Selector not found for leaving class";
															}
															},MAX_STUDENT_TO_LEAVE,SELECTOR_FOR_GETTING_PEOPLE_FOR_LEAVEING,SELECTOR_FOR_LEAVEING_CLASS_BUTTON
															);

  	   console.log("is",is_leaved);
  	   if(is_leaved==="leaved")
  	   {
  	   		console.log("checking fo")
  	   		this.clearTime();
  	   		this.emit("nextClass");
  	   }
  	   else if(is_leaved==="stay")
  	   {
  	   		this.clearTime();
  	   		console.log("checking setInterval")
  	   		this.timerno.push(setInterval(()=>{this.emit("leaveClass");},INTERVAL_TIME_TO_LEAVE_CLASS));
	 	}
	 	else 
	 	{
	 		this.emit("handleError",{msg:is_leaved});
	 	}
	}
	catch(error)
	{
		console.log("error is \n",error);
		this.emit("handleError",{msg:error.message});
	}
}

module.exports=leaveClass;