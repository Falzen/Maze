
//http://shrines.rpgclassics.com/snes/som/enemiesf.shtml

var Character_Template = function(name, level, maxHealth, health, attack, defense) {
	this.name = name;
	this.level = level;
	this.maxHealth = maxHealth;
	this.health = health;
	this.attack = attack;
	this.defense = defense;
}

var Player = function(name, level, maxHealth, health, attack, defense, weaponName, armorName) {
	character_Template.call(this, name, level, maxHealth, health, attack, defense);
	this.currentXP = currentXP;
	this.weaponName = weaponName;
	this.armorName = armorName;
	this.nextLevelsList = [];
}


var Enemy = function(name, level, maxHealth, health, attack, defense, givenXP, possibleDrops, spawnRate) {
	character_Template.call(this, name, level, maxHealth, health, attack, defense);
	this.givenXP = givenXP;
	this.possibleDrops = possibleDrops;
	this.spawnRate = spawnRate;
}

var Object_Template = function(name, buyingPrice, sellingPrice) {
	this.name = name;
	this.buyingPrice = buyingPrice;
	this.sellingPrice = sellingPrice;
}

var Item = function(name, buyingPrice, sellingPrice, action) {
	Object_Template.call(this, name, buyingPrice, sellingPrice);
	this.action = action;

}




var ALL_ITEMS = [];

var obj_bonbon = {
	'name' : "bonbon",
	'buyingPrice' : 25,
	'sellingPrice' : 8,
	'action' : function() {
		return 'bonbon action working';
	}
}
ALL_ITEMS.push(obj_bonbon);



var itemTest = new Item(
	ALL_ITEMS[0].name,
	ALL_ITEMS[0].buyingPrice,
	ALL_ITEMS[0].sellingPrice,
	ALL_ITEMS[0].action
	);

console.log('itemTest.name : ', itemTest.name);
console.log('itemTest.action : ', itemTest.action());