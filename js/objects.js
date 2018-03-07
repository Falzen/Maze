// http://shrines.rpgclassics.com/snes/som/items.shtml

/**
 * Implémentée par Item, Weapons, Armor
 */

 var Object_Template = function(name, description, buyingPrice, sellingPrice) {
 	this.name = name;
 	this.description = description;
 	this.buyingPrice = buyingPrice;
 	this.sellingPrice = sellingPrice;
 }


/**
 * Modèle pour les items 
 * @param {string} name
 * @param {string} description
 * @param {integer} buyingPrice
 * @param {integer} sellingPrice
 * @param function() action 
 */
 var Item = function(name, description, buyingPrice, sellingPrice, action) {
 	Object_Template.call(this, name, description, buyingPrice, sellingPrice);
 	this.action = action;
 }

 var obj_bonbon = {
 	'name' : "bonbon",
 	'description' : 'Un bonbon.',
 	'buyingPrice' : 25,
 	'sellingPrice' : 8,
 	'action' : function() {
 		return 'item action works';
 	}
 }

/* 
alimenter cette Map avec les nouveaux objets,
exemple avec bonbon :
ALL_ITEMS_OBJ.set(obj_bonbon.name, obj_bonbon);
*/
var ALL_ITEMS_OBJ = new Map();
ALL_ITEMS_OBJ.set(obj_bonbon.name, obj_bonbon);


/**
* Item Factory
* @param {string} itemName
* @return {Item} || {string} : message d'erreur
* prend les infos dans la Map ALL_ITEMS_OBJ avec le nom reçu
*/
function createItem(itemName) {
	itemName = itemName.toLowerCase();
	if (ALL_ITEMS_OBJ.get(itemName) == undefined) {
		return 'No item by that name : "' + itemName + '" in ALL_ITEMS_OBJ.';
	}

	return new Item(
		ALL_ITEMS_OBJ.get(itemName).name,
		ALL_ITEMS_OBJ.get(itemName).description,
		ALL_ITEMS_OBJ.get(itemName).buyingPrice,
		ALL_ITEMS_OBJ.get(itemName).sellingPrice,
		ALL_ITEMS_OBJ.get(itemName).action
		);
}