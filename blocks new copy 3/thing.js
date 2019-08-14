const BlockTypes = {
scene: 0,
object: 1,
rule: 2,
movement: 3,
drawing: 4,
looks: 5,
variables: 6,
control: 7,
custom: 8
}

const ParameterTypes = {
object : 50,
rule: 52,
default: 42
}

const ObjectTypes = {
monkey:0,text:1,octopus:2,gorilla:3,cupcake:4,bear:5,dino:6,frog:7,greenman:8,mustache:9,spacepod:10,zombieBear:11,ghoulopus:12,bats:13,frankenrilla:14,jodyWitch:15,cauldron:16,pumpkin:17,broom:18,lantern:19,parrotFlying:20,mandrill:21,mosquito:22,missChief:23,venus:24,jeepers:25,banyan:26,stargirl:27,astro:28,chillanna:29,robo:30,raccoon:31,bird:32,HS_END_OF_CHARACTERS:33,square:34,circle:35,hexagon:36,triangle:37,rightTriangle:38,rectangle:39,heart:40,star:41,arch:42,parallelogram:43,squiggle:44,donut:45,tetrisZ:46,tetrisT:47,tetrisL:48,corner:49,flower:50,threeProngedBoomerang:51,squishedBox:52,bead:53,chevron:54,xShape:55,tetrisLine:56,HS_END_OF_SHAPES:57,toucan:58,anteater:59,crocodile:60,sloth:61,iguana:62,hut:63,penguin:64,winterQueen:65,shyYeti:66,deer:67,elf:68,snowGlobe:69,polarbear:70,sleigh:71,mistletoe:72,snowMan:73,snowflake:74,roundedSquareFullSize:100,squareFullSize:101,circleFullSize:102,hexagonFullSize:103,triangleFullSize:104,rightTriangleFullSize:105,rectangleFullSize:106,heartFullSize:107,starFullSize:108,archFullSize:109,parallelogramTallFullSize:110,squiggleFullSize:111,donutFullSize:112,tetrisZFullSize:113,tetrisTFullSize:114,tetrisLFullSize:115,cornerFullSize:116,flowerFullSize:117,fanbladeFullSize:118,squishedBoxFullSize:119,roundedRightTriangleFullSize:120,arrowRoundedFullSize:121,beadFullSize:122,parallelogramWideFullSize:123,chevronFullSize:124,xFullSize:125,tetrisLineFullSize:126,HS_END_OF_FULL_SIZE_SHAPES:127,HS_NUMBER_OF_OBJECTS:128,image:2e3,nil:1e4,edgeOfScreen:3e4
}


function Block(type, inside, parameters, description) {
	this.type = type;
	if (parameters) {
		this.parameters = parameters;
	}
	if (inside) {
		this.inside = inside;
	}
	if (description) {
		this.description = description;
	}
}

function Parameter(type, key, value,parameters) {
	this.type = type;
	this.key = key;
	this.value = value;
	if (parameters) {
		this.parameters = parameters;
	}
}



function determineBlockType(block) {
	const movement = [23,24,27,28,34,39,41,50];
	const drawing = [26,30,31,32,37,38,46];
	const looks = [29,33,36,40,42,43,47,48,49,51,52,54,56,57];
	const variables = [44,45];
	const control = [19,22,35,53,55,122,124,125,120,121];
	if (movement.indexOf(block.type) != -1) {
		return BlockTypes.movement;
	} else if (drawing.indexOf(block.type) != -1) {
		return BlockTypes.drawing;
	} else if (looks.indexOf(block.type) != -1) {
		return BlockTypes.looks;
	} else if (variables.indexOf(block.type) != -1) {
		return BlockTypes.variables;
	} else if (control.indexOf(block.type) != -1) {
		return BlockTypes.control;
	} else {
		return BlockTypes.custom;
	}
}
