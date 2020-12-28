const {MAX_STUDENT_TO_LEAVE,MAX_ATTEMPT_TO_JOIN_CLASS,INTERVAL_TIME_TO_LEAVE_CLASS}=require("../config/config");


async function leaveClass()
{
	try
	{

	   console.log("Checking for class leveing");
  	   let is_leaved=await this.page.evaluate((MAX_STUDENT_TO_LEAVE)=>{
  	   														//getting the no of student in class
														   	no_of_student=document.querySelector(".wnPUne").innerText;
															no_of_student=parseInt(no_of_student);
															if(no_of_student<=MAX_STUDENT_TO_LEAVE)
															{
																document.querySelector(".U26fgb").click();
																return 1;
															}
															else
															{
																return 0;
															}}
															);

  	   console.log("is",is_leaved);
  	   if(is_leaved)
  	   {
  	   		console.log("checking fo")
  	   		this.clearTime();
  	   		this.emit("nextClass");
  	   }
  	   else
  	   {
  	   		this.clearTime();
  	   		console.log("checking setInterval")
  	   		this.timerno.push(setInterval(()=>{this.emit("leaveClass");},INTERVAL_TIME_TO_LEAVE_CLASS));
		}
	}
	catch(error)
	{
		console.log("error is \n",error);
		this.emit("handleError",{msg:error.message});
	}
}

module.exports=leaveClass;