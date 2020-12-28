

const {TIMETABLE,CLASS_DURATIONS,MEET_LINKS}=require("./config/config");

let findTodayClass=require("./functions/findTodayClass");

let startBrowser=require("./functions/startBrowser");

let siginGoogle=require("./functions/siginGoogle");

let openClass=require("./functions/openClass");

let checkNoOfStudent=require("./functions/checkNoOfStudent");

let leaveClass=require("./functions/leaveClass");

let findNextClassTime=require("./functions/findNextClassTime");

let CalculateTime=require("./functions/CalculateTime");

let EventEmitter=require("events");
 																
// 	findpersentclass
// 		|
// 		|
// 	startBrowser
// 		|
// 		|
// find the method to login
// 		|
// 		|
//   ___|_________________
// 	|					|
// 	|					|
// 	1.using cookie		2.siginGoogle
// 	|					|
// 	|					|
// 	_____________________
// 			|
// 			|
// 			|
// 		openClass
// 			|
// 		checkNoOfStudent
// 			|
// 		leaveClass
// 			|
// 		calculateTIme
// 			|
// 		findNextClassTIme
// 			|
// 		restart;
//  																
class ClassHunter extends EventEmitter
{
	constructor()
	{
		super();
		this.timerno=[];
		this.today_classlink=[];
		this.global_period_no=0;
		this.page=undefined;
		this.res=undefined;
		this.attempt=0;
		//function
		this.findTodayClass=findTodayClass;
		this.startBrowser=startBrowser;
		this.siginGoogle=siginGoogle;
		this.openClass=openClass;
		this.checkNoOfStudent=checkNoOfStudent;
		this.leaveClass=leaveClass;
		this.findNextClassTime=findNextClassTime;		

	}

	async Startup()
	{
		this.findTodayClass();

	}

	handleMsg(args)
	{
		console.log(args.msg);
	}
	
	nextClass()
	{
		console.log("nextClass")
		let start_time=this.findNextClassTime();
		console.log(start_time);
		if(start_time)
		{
			let millisec_towait=CalculateTime(start_time);
			this.timerno.push(setTimeout(()=>{this.emit("openClass")},millisec_towait))	
		}
		else
		{
			this.emit("closeBrowser");
		}
	}
	
	handleError(args)
	{
		console.log(args.msg);
		this.emit("closeBrowser");
	}
	
	clearTime()
 	{
	 	console.log("clearTime",this.timerno);
	 	for(let i=0;i<this.timerno.length;i++)
	 	{
	 		clearInterval(this.timerno[i]);
	 	}
	 	//re intiaize the array
	 	this.timerno=[]
 	}

 	async closeBrowser()
 	{
 		console.log("Class is over Bye");
 		await this.browser.close();
 		process.exit(1);
 	}
}

var app=new ClassHunter();

app.on("Startup",app.Startup);

app.on("startBrowser",app.startBrowser);

app.on("siginGoogle",app.siginGoogle);

app.on("openClass",app.openClass);

app.on("checkNoOfStudent",app.checkNoOfStudent);

app.on("leaveClass",app.leaveClass);

app.on("nextClass",app.nextClass)

app.on("handleMsg",app.handleMsg);

app.on("handleError",app.handleError);

app.on("closeBrowser",app.closeBrowser);

//program is starting here
app.emit("Startup");

