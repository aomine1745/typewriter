class Typewriter {
	constructor(object){
		this.countText = 0;
		this.texts = object.text;
		[this.id, this.text] = [object.id, this.texts[this.countText]];
		this.count = this.text.length;
		this.max = this.count;
		this.countTextTotal = this.texts.length - 1;
	}

	getId(id){
		return document.getElementById(id);
	}

	init(){
		this.output = this.getId(this.id);
		this.requestOne = setInterval(() => this.loopOne(--this.count), 60);
	}

	loopOne(count){
		let nowLeter = (-count + (this.max - 1)) % this.max;
		this.output.innerHTML += this.text[nowLeter];
		if (count <= 0) {
			clearInterval(this.requestOne);
			this.count = this.text.length;
			setTimeout(()=>{
				this.requestTwo = setInterval(() => this.loopTwo(--this.count), 60);
			}, (((this.max - 1) * 60)  + 60) + 2000);
		}
	}

	loopTwo(count){
		let newText = this.text.substr(0, count);
		this.output.innerHTML = newText;
		if (count <= 0) {
			clearInterval(this.requestTwo);
			if (this.countText < this.countTextTotal) {
				this.text = this.texts[++this.countText]
			}else {
				this.countText = 0;
				this.text = this.texts[this.countText]
			}
			this.count = this.text.length;
			this.max = this.count;
			this.requestOne = setInterval(() => this.loopOne(--this.count), 60);
		}
	}
}