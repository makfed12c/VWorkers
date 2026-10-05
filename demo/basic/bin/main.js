(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var Game = function() { };
Game.__name__ = ["Game"];
Game.main = function() {
	var mini = minicanvas.MiniCanvas.create(Game.width,Game.height).display("basic example");
	var world = new edge.World();
	var _g = 0;
	while(_g < 300) {
		var i = _g++;
		world.engine.create([new Position(Math.random() * Game.width,Math.random() * Game.height),new Velocity(Math.random() * 2 - 1,Math.random() * 2 - 1)]);
	}
	var _g1 = 0;
	while(_g1 < 20) {
		var i1 = _g1++;
		world.engine.create([new Position(Math.random() * Game.width,Math.random() * Game.height)]);
	}
	world.physics.add(new UpdateMovement());
	world.render.add(new RenderBackground(mini));
	world.render.add(new RenderDots(mini));
	world.start();
};
var edge = {};
edge.IComponent = function() { };
edge.IComponent.__name__ = ["edge","IComponent"];
var Position = function(x,y) {
	this.x = x;
	this.y = y;
};
Position.__name__ = ["Position"];
Position.__interfaces__ = [edge.IComponent];
Position.prototype = {
	x: null
	,y: null
	,__class__: Position
};
var Velocity = function(vx,vy) {
	this.vx = vx;
	this.vy = vy;
};
Velocity.__name__ = ["Velocity"];
Velocity.__interfaces__ = [edge.IComponent];
Velocity.prototype = {
	vx: null
	,vy: null
	,__class__: Velocity
};
edge.ISystem = function() { };
edge.ISystem.__name__ = ["edge","ISystem"];
edge.ISystem.prototype = {
	componentRequirements: null
	,entityRequirements: null
	,__class__: edge.ISystem
};
var RenderDots = function(mini) {
	this.entityRequirements = null;
	this.componentRequirements = [Position];
	this.mini = mini;
};
RenderDots.__name__ = ["RenderDots"];
RenderDots.__interfaces__ = [edge.ISystem];
RenderDots.prototype = {
	mini: null
	,update: function(pos) {
		this.mini.dot(pos.x,pos.y,2,255);
	}
	,componentRequirements: null
	,entityRequirements: null
	,__class__: RenderDots
};
var RenderBackground = function(mini) {
	this.entityRequirements = null;
	this.componentRequirements = [];
	this.mini = mini;
};
RenderBackground.__name__ = ["RenderBackground"];
RenderBackground.__interfaces__ = [edge.ISystem];
RenderBackground.prototype = {
	mini: null
	,update: function() {
		this.mini.clear();
	}
	,componentRequirements: null
	,entityRequirements: null
	,__class__: RenderBackground
};
var UpdateMovement = function() {
	this.entityRequirements = null;
	this.componentRequirements = [Position,Velocity];
};
UpdateMovement.__name__ = ["UpdateMovement"];
UpdateMovement.__interfaces__ = [edge.ISystem];
UpdateMovement.prototype = {
	update: function(pos,vel) {
		var dx = pos.x + vel.vx;
		var dy = pos.y + vel.vy;
		if(dx <= 0 && vel.vx < 0 || dx >= Game.width && vel.vx > 0) vel.vx = -vel.vx; else pos.x = dx;
		if(dy <= 0 && vel.vy < 0 || dy >= Game.height && vel.vy > 0) vel.vy = -vel.vy; else pos.y = dy;
	}
	,componentRequirements: null
	,entityRequirements: null
	,__class__: UpdateMovement
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return js.Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
edge.Engine = function() {
	this.emptyArgs = [];
	this.mapInfo = new haxe.ds.ObjectMap();
	this.mapEntities = new haxe.ds.ObjectMap();
	this.listPhases = [];
};
edge.Engine.__name__ = ["edge","Engine"];
edge.Engine.prototype = {
	mapInfo: null
	,mapEntities: null
	,listPhases: null
	,create: function(components) {
		var entity = new edge.Entity(this,components);
		this.mapEntities.set(entity,true);
		this.matchSystems(entity);
		this.matchEntities(entity);
		return entity;
	}
	,createPhase: function() {
		var phase = new edge.Phase(this);
		this.listPhases.push(phase);
		return phase;
	}
	,addSystem: function(phase,system) {
		if(this.mapInfo.h.__keys__[system.__id__] != null) throw "System \"" + Std.string(system) + "\" already exists in Engine";
		var info = new edge.SystemInfo(system,phase);
		this.mapInfo.set(system,info);
		if(info.hasComponents) {
			var $it0 = this.mapEntities.keys();
			while( $it0.hasNext() ) {
				var entity = $it0.next();
				this.matchSystem(entity,system);
			}
		}
		if(info.collections.iterator().hasNext()) {
			var $it1 = this.mapEntities.keys();
			while( $it1.hasNext() ) {
				var entity1 = $it1.next();
				this.matchEntity(entity1,system);
			}
		}
	}
	,removeSystem: function(system) {
		this.mapInfo.remove(system);
	}
	,emptyArgs: null
	,updateSystem: function(system,t) {
		var info = this.mapInfo.h[system.__id__];
		if(info == null) return;
		if(info.hasEngine) system.engine = this;
		if(info.hasDelta) system.timeDelta = t;
		if(info.hasComponents) {
			if(info.hasBefore) Reflect.callMethod(system,info.update,this.emptyArgs);
			var $it0 = info.components.keys();
			while( $it0.hasNext() ) {
				var entity = $it0.next();
				var components = info.components.h[entity.__id__];
				if(info.hasEntity) system.entity = entity;
				Reflect.callMethod(system,info.update,components);
			}
		} else Reflect.callMethod(system,info.update,this.emptyArgs);
	}
	,matchSystems: function(entity) {
		var $it0 = this.mapInfo.keys();
		while( $it0.hasNext() ) {
			var system = $it0.next();
			this.matchSystem(entity,system);
		}
	}
	,matchEntities: function(entity) {
		var $it0 = this.mapInfo.keys();
		while( $it0.hasNext() ) {
			var system = $it0.next();
			this.matchEntity(entity,system);
		}
	}
	,matchSystem: function(entity,system) {
		var info = this.mapInfo.h[system.__id__];
		info.components.remove(entity);
		if(info.hasComponents) {
			var components = this.matchRequirements(entity,system.componentRequirements);
			if(null != components) info.components.set(entity,components);
		}
	}
	,matchEntity: function(entity,system) {
		var info = this.mapInfo.h[system.__id__];
		if(!info.collections.iterator().hasNext()) return;
		var $it0 = info.collections.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			var collection = info.collections.get(name);
			collection.view.remove(entity);
			var componentRequirements = collection.classes;
			var components = this.matchRequirements(entity,componentRequirements);
			var o;
			if(null != components) {
				o = { };
				var _g1 = 0;
				var _g = components.length;
				while(_g1 < _g) {
					var i = _g1++;
					o[collection.fields[i]] = components[i];
				}
				o.entity = entity;
				collection.view.add(entity,o);
			}
		}
	}
	,matchRequirements: function(entity,requirements) {
		var comps = [];
		var _g = 0;
		while(_g < requirements.length) {
			var req = requirements[_g];
			++_g;
			var $it0 = entity.map.iterator();
			while( $it0.hasNext() ) {
				var component = $it0.next();
				if(Type.getClass(component) == req) {
					comps.push(component);
					break;
				}
			}
		}
		if(comps.length == requirements.length) return comps; else return null;
	}
	,__class__: edge.Engine
};
edge.Entity = function(engine,components) {
	this.engine = engine;
	this.map = new haxe.ds.StringMap();
	if(null != components) this.addMany(components);
};
edge.Entity.__name__ = ["edge","Entity"];
edge.Entity.prototype = {
	map: null
	,engine: null
	,addMany: function(components) {
		var _g = this;
		if(null == this.engine) return;
		components.map(function(_) {
			_g._add(_);
			return;
		});
		this.engine.matchSystems(this);
	}
	,remove: function(component) {
		this._remove(component);
		this.engine.matchSystems(this);
	}
	,_add: function(component) {
		var type = Type.getClassName(Type.getClass(component));
		if(this.map.exists(type)) this.remove(this.map.get(type));
		this.map.set(type,component);
	}
	,_remove: function(component) {
		var type = Type.getClassName(Type.getClass(component));
		this._removeTypeName(type);
	}
	,_removeTypeName: function(type) {
		this.map.remove(type);
	}
	,__class__: edge.Entity
};
edge.Phase = function(engine) {
	this.engine = engine;
	this.mapSystem = new haxe.ds.ObjectMap();
	this.mapType = new haxe.ds.StringMap();
};
edge.Phase.__name__ = ["edge","Phase"];
edge.Phase.prototype = {
	first: null
	,last: null
	,mapSystem: null
	,mapType: null
	,engine: null
	,add: function(system) {
		this.remove(system);
		var node = this.createNode(system);
		if(null == this.first) {
			this.first = node;
			this.last = node;
		} else {
			node.prev = this.last;
			this.last.next = node;
			this.last = node;
		}
	}
	,remove: function(system) {
		var node = this.mapSystem.h[system.__id__];
		var key = this.key(system);
		this.mapType.remove(key);
		if(null == node) return;
		if(null != this.engine) this.engine.removeSystem(system);
		this.mapSystem.remove(system);
		if(node == this.first && node == this.last) this.first = this.last = null; else if(node == this.first) {
			this.first = node.next;
			node.next.prev = null;
		} else if(node == this.last) {
			this.first = node.prev;
			node.prev.next = null;
		} else {
			node.prev.next = node.next;
			node.next.prev = node.prev;
		}
	}
	,systems: function() {
		return new edge.NodeSystemIterator(this.first);
	}
	,update: function(t) {
		if(null == this.engine) return;
		var $it0 = this.systems();
		while( $it0.hasNext() ) {
			var system = $it0.next();
			this.engine.updateSystem(system,t);
		}
	}
	,createNode: function(system) {
		var node = new edge.NodeSystem(system);
		this.mapSystem.set(system,node);
		var key = this.key(system);
		this.mapType.set(key,system);
		if(null != this.engine) this.engine.addSystem(this,system);
		return node;
	}
	,key: function(system) {
		return Type.getClassName(Type.getClass(system));
	}
	,__class__: edge.Phase
};
edge.NodeSystem = function(system) {
	this.system = system;
};
edge.NodeSystem.__name__ = ["edge","NodeSystem"];
edge.NodeSystem.prototype = {
	system: null
	,next: null
	,prev: null
	,__class__: edge.NodeSystem
};
edge.NodeSystemIterator = function(node) {
	this.node = node;
};
edge.NodeSystemIterator.__name__ = ["edge","NodeSystemIterator"];
edge.NodeSystemIterator.prototype = {
	node: null
	,hasNext: function() {
		return null != this.node;
	}
	,next: function() {
		var system = this.node.system;
		this.node = this.node.next;
		return system;
	}
	,__class__: edge.NodeSystemIterator
};
edge.SystemInfo = function(system,phase) {
	this.system = system;
	this.hasComponents = null != system.componentRequirements && system.componentRequirements.length > 0;
	this.hasDelta = edge.SystemInfo.hasField(system,"timeDelta");
	this.hasEngine = edge.SystemInfo.hasField(system,"engine");
	this.hasEntity = edge.SystemInfo.hasField(system,"entity");
	this.hasBefore = edge.SystemInfo.hasField(system,"before");
	this.update = Reflect.field(system,"update");
	this.phase = phase;
	this.before = null;
	this.components = new haxe.ds.ObjectMap();
	this.collections = new haxe.ds.StringMap();
	if(null != system.entityRequirements) {
		var view = new edge.View();
		var value = { classes : system.entityRequirements.map(function(_) {
			return _.cls;
		}), fields : system.entityRequirements.map(function(_1) {
			return _1.name;
		}), view : view};
		this.collections.set("entities",value);
		system.entities = view;
	}
	if(this.hasBefore) this.before = Reflect.field(system,"before");
};
edge.SystemInfo.__name__ = ["edge","SystemInfo"];
edge.SystemInfo.hasField = function(o,field) {
	return thx.core.Arrays.contains(Type.getInstanceFields(Type.getClass(o)),field);
};
edge.SystemInfo.prototype = {
	hasComponents: null
	,hasDelta: null
	,hasEngine: null
	,hasEntity: null
	,hasBefore: null
	,phase: null
	,before: null
	,update: null
	,components: null
	,system: null
	,collections: null
	,__class__: edge.SystemInfo
};
edge.View = function() {
	this.map = new haxe.ds.ObjectMap();
	this.count = 0;
};
edge.View.__name__ = ["edge","View"];
edge.View.prototype = {
	count: null
	,map: null
	,add: function(entity,data) {
		if(this.map.h.__keys__[entity.__id__] != null) return;
		this.map.set(entity,data);
		this.count++;
	}
	,remove: function(entity) {
		if(!(this.map.h.__keys__[entity.__id__] != null)) return;
		this.map.remove(entity);
		this.count--;
	}
	,__class__: edge.View
};
edge.World = function(delta,schedule) {
	if(delta == null) delta = 16;
	this.engine = new edge.Engine();
	this.frame = this.engine.createPhase();
	this.physics = this.engine.createPhase();
	this.render = this.engine.createPhase();
	this.remainder = 0;
	this.running = false;
	this.delta = delta;
	if(null != schedule) this.schedule = schedule; else this.schedule = thx.core.Timer.frame;
};
edge.World.__name__ = ["edge","World"];
edge.World.prototype = {
	frame: null
	,physics: null
	,render: null
	,engine: null
	,delta: null
	,running: null
	,schedule: null
	,cancel: null
	,remainder: null
	,start: function() {
		if(this.running) return;
		this.running = true;
		this.cancel = this.schedule($bind(this,this.run));
	}
	,run: function(t) {
		this.frame.update(t);
		var dt = t + this.remainder;
		while(dt > this.delta) {
			dt -= this.delta;
			this.physics.update(this.delta);
		}
		this.remainder = dt;
		this.render.update(t);
	}
	,__class__: edge.World
};
var haxe = {};
haxe.IMap = function() { };
haxe.IMap.__name__ = ["haxe","IMap"];
haxe.ds = {};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [haxe.IMap];
haxe.ds.ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds._StringMap = {};
haxe.ds._StringMap.StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe.ds._StringMap.StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe.ds._StringMap.StringMapIterator.prototype = {
	map: null
	,keys: null
	,index: null
	,count: null
	,hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe.ds._StringMap.StringMapIterator
};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [haxe.IMap];
haxe.ds.StringMap.prototype = {
	h: null
	,rh: null
	,set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe.ds._StringMap.StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe.ds.StringMap
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js.Boot.__nativeClassName(o);
		if(name != null) return js.Boot.__resolveNativeClass(name);
		return null;
	}
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js.Boot.__string_rec(o[i1],s); else str2 += js.Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__nativeClassName = function(o) {
	var name = js.Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js.Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var minicanvas = {};
minicanvas.MiniCanvas = function(width,height,scaleMode) {
	this.scaleMode = scaleMode;
	this.width = width;
	this.height = height;
	this.processScale();
	this.startTime = performance.now();
	this.events = new haxe.ds.StringMap();
	this.init();
};
minicanvas.MiniCanvas.__name__ = ["minicanvas","MiniCanvas"];
minicanvas.MiniCanvas.envIsNode = function() {
	return typeof module !== 'undefined' && module.exports;
};
minicanvas.MiniCanvas.create = function(width,height,scaleMode) {
	if(minicanvas.MiniCanvas.envIsNode()) return new minicanvas.NodeCanvas(width,height,scaleMode); else return new minicanvas.BrowserCanvas(width,height,scaleMode);
};
minicanvas.MiniCanvas.prototype = {
	isNode: null
	,isBrowser: null
	,width: null
	,height: null
	,scaleMode: null
	,canvas: null
	,ctx: null
	,startTime: null
	,deltaTime: null
	,events: null
	,display: function(name) {
		this.deltaTime = performance.now() - this.startTime;
		if(!minicanvas.MiniCanvas.displayGenerationTime) console.log("generated \"" + name + "\" in " + thx.core.Floats.roundTo(this.deltaTime,2) + "ms");
		this.nativeDisplay(name);
		return this;
	}
	,clear: function() {
		this.ctx.clearRect(0,0,this.width,this.height);
		return this;
	}
	,dot: function(x,y,radius,color) {
		if(radius == null) radius = 3.0;
		this.ctx.beginPath();
		this.ctx.fillStyle = thx.color._RGBA.RGBA_Impl_.toString((function($this) {
			var $r;
			var t;
			{
				var _0 = color;
				if(null == _0) t = null; else t = _0;
			}
			$r = t != null?t:thx.color._RGBA.RGBA_Impl_.fromString("rgba(204,51,0,1)");
			return $r;
		}(this)));
		this.ctx.arc(x,y,radius,0,Math.PI * 2,true);
		this.ctx.fill();
		return this;
	}
	,getDevicePixelRatio: function() {
		throw "abstract method getDevicePixelRatio()";
	}
	,getBackingStoreRatio: function() {
		throw "abstract method getBackingStoreRatio()";
	}
	,init: function() {
		throw "abstract method init()";
		return;
	}
	,nativeDisplay: function(name) {
		throw "abstract method nativeDisplay()";
		return;
	}
	,processScale: function() {
		var _g = this.scaleMode;
		switch(_g[1]) {
		case 1:
			var ratio = this.getDevicePixelRatio() / this.getBackingStoreRatio();
			if(ratio != 1) this.scaleMode = minicanvas.ScaleMode.Scaled(ratio); else this.scaleMode = minicanvas.ScaleMode.NoScale;
			break;
		default:
		}
	}
	,_keyUp: null
	,_keyDown: null
	,__class__: minicanvas.MiniCanvas
};
minicanvas.ScaleMode = { __ename__ : true, __constructs__ : ["NoScale","Auto","Scaled"] };
minicanvas.ScaleMode.NoScale = ["NoScale",0];
minicanvas.ScaleMode.NoScale.__enum__ = minicanvas.ScaleMode;
minicanvas.ScaleMode.Auto = ["Auto",1];
minicanvas.ScaleMode.Auto.__enum__ = minicanvas.ScaleMode;
minicanvas.ScaleMode.Scaled = function(v) { var $x = ["Scaled",2,v]; $x.__enum__ = minicanvas.ScaleMode; return $x; };
minicanvas.BrowserCanvas = function(width,height,scaleMode) {
	this.isNode = false;
	this.isBrowser = true;
	if(null == scaleMode) scaleMode = minicanvas.BrowserCanvas.defaultScaleMode;
	minicanvas.MiniCanvas.call(this,width,height,scaleMode);
};
minicanvas.BrowserCanvas.__name__ = ["minicanvas","BrowserCanvas"];
minicanvas.BrowserCanvas.devicePixelRatio = function() {
	return window.devicePixelRatio || 1;
};
minicanvas.BrowserCanvas.backingStoreRatio = function() {
	if(minicanvas.BrowserCanvas._backingStoreRatio == 0) {
		var canvas;
		var _this = window.document;
		canvas = _this.createElement("canvas");
		var context = canvas.getContext("2d");
		minicanvas.BrowserCanvas._backingStoreRatio = (function(c) {
        return c.webkitBackingStorePixelRatio ||
          c.mozBackingStorePixelRatio ||
          c.msBackingStorePixelRatio ||
          c.oBackingStorePixelRatio ||
          c.backingStorePixelRatio || 1;
        })(context);
	}
	return minicanvas.BrowserCanvas._backingStoreRatio;
};
minicanvas.BrowserCanvas.__super__ = minicanvas.MiniCanvas;
minicanvas.BrowserCanvas.prototype = $extend(minicanvas.MiniCanvas.prototype,{
	append: function(name) {
		var figure = window.document.createElement("figure");
		var caption = window.document.createElement("figcaption");
		figure.className = "minicanvas";
		figure.appendChild(this.canvas);
		caption.innerHTML = thx.core.Strings.humanize(name) + (minicanvas.MiniCanvas.displayGenerationTime?" <span class=\"info\">(" + thx.core.Floats.roundTo(this.deltaTime,2) + "ms)</span>":"");
		figure.appendChild(caption);
		minicanvas.BrowserCanvas.parentNode.appendChild(figure);
		if(null != this._keyUp || null != this._keyDown) this.canvas.focus();
	}
	,init: function() {
		var _this = window.document;
		this.canvas = _this.createElement("canvas");
		{
			var _g = this.scaleMode;
			switch(_g[1]) {
			case 2:
				var v = _g[2];
				this.canvas.width = Math.round(this.width * v);
				this.canvas.height = Math.round(this.height * v);
				this.canvas.style.width = "" + this.width + "px";
				this.canvas.style.height = "" + this.height + "px";
				this.ctx = this.canvas.getContext("2d");
				this.ctx.scale(v,v);
				break;
			default:
				this.canvas.width = this.width;
				this.canvas.height = this.height;
				this.ctx = this.canvas.getContext("2d");
			}
		}
	}
	,getDevicePixelRatio: function() {
		return minicanvas.BrowserCanvas.devicePixelRatio();
	}
	,getBackingStoreRatio: function() {
		return minicanvas.BrowserCanvas.backingStoreRatio();
	}
	,nativeDisplay: function(name) {
		this.append(name);
	}
	,__class__: minicanvas.BrowserCanvas
});
minicanvas.NodeCanvas = function(width,height,scaleMode) {
	this.hasFrames = false;
	this.isNode = true;
	this.isBrowser = false;
	if(null == scaleMode) scaleMode = minicanvas.NodeCanvas.defaultScaleMode;
	minicanvas.MiniCanvas.call(this,width,height,scaleMode);
};
minicanvas.NodeCanvas.__name__ = ["minicanvas","NodeCanvas"];
minicanvas.NodeCanvas.create = function(width,height,scaleMode) {
	return new minicanvas.MiniCanvas(width,height,scaleMode);
};
minicanvas.NodeCanvas.__super__ = minicanvas.MiniCanvas;
minicanvas.NodeCanvas.prototype = $extend(minicanvas.MiniCanvas.prototype,{
	save: function(name) {
		var encoder = this.ensureEncoder();
		encoder.addFrame(this.ctx);
		encoder.save(name,function(file) {
			console.log("saved " + file);
		});
	}
	,hasFrames: null
	,init: function() {
		var Canvas = require("canvas");
		{
			var _g = this.scaleMode;
			switch(_g[1]) {
			case 2:
				var v = _g[2];
				this.canvas = new Canvas(this.width * v,this.height * v);
				this.ctx = this.canvas.getContext("2d");
				this.ctx.scale(v,v);
				break;
			default:
				this.canvas = new Canvas(this.width,this.height);
				this.ctx = this.canvas.getContext("2d");
			}
		}
	}
	,getDevicePixelRatio: function() {
		return 1.0;
	}
	,getBackingStoreRatio: function() {
		return 1.0;
	}
	,nativeDisplay: function(name) {
		this.save(name);
	}
	,encoder: null
	,ensureEncoder: function() {
		if(null != this.encoder) return this.encoder;
		if(this.hasFrames) return this.encoder = new minicanvas.node.GifEncoder(this.width,this.height); else return this.encoder = new minicanvas.node.PNGEncoder(this.canvas);
	}
	,__class__: minicanvas.NodeCanvas
});
minicanvas.node = {};
minicanvas.node.IEncoder = function() { };
minicanvas.node.IEncoder.__name__ = ["minicanvas","node","IEncoder"];
minicanvas.node.IEncoder.prototype = {
	addFrame: null
	,save: null
	,__class__: minicanvas.node.IEncoder
};
minicanvas.node.GifEncoder = function(width,height) {
	this.frames = 0;
	this.encoder = (function(w, h, self) {
      var GIFEncoder = require('gifencoder'),
          encoder = new GIFEncoder(w, h);
      self.stream = encoder.createReadStream();
      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(50);
      encoder.setQuality(10);
      return encoder;
    })(width,height,this);
};
minicanvas.node.GifEncoder.__name__ = ["minicanvas","node","GifEncoder"];
minicanvas.node.GifEncoder.__interfaces__ = [minicanvas.node.IEncoder];
minicanvas.node.GifEncoder.prototype = {
	encoder: null
	,stream: null
	,frames: null
	,addFrame: function(ctx) {
		this.encoder.addFrame(ctx);
		this.frames++;
	}
	,save: function(name,callback) {
		this.stream.pipe(require("fs").createWriteStream("" + minicanvas.NodeCanvas.imagePath + "/" + name + ".gif"));
		callback("" + name + ".gif (frames " + this.frames + ")");
	}
	,__class__: minicanvas.node.GifEncoder
};
minicanvas.node.PNGEncoder = function(canvas) {
	this.canvas = canvas;
};
minicanvas.node.PNGEncoder.__name__ = ["minicanvas","node","PNGEncoder"];
minicanvas.node.PNGEncoder.__interfaces__ = [minicanvas.node.IEncoder];
minicanvas.node.PNGEncoder.prototype = {
	canvas: null
	,addFrame: function(ctx) {
	}
	,save: function(name,callback) {
		var fs = require("fs");
		var out = fs.createWriteStream("" + minicanvas.NodeCanvas.imagePath + "/" + name + ".png");
		var stream = this.canvas.pngStream();
		stream.on("data",function(chunk) {
			out.write(chunk);
		});
		stream.on("end",function(_) {
			callback("" + name + ".png");
		});
	}
	,__class__: minicanvas.node.PNGEncoder
};
var thx = {};
thx.color = {};
thx.color._RGB = {};
thx.color._RGB.RGB_Impl_ = {};
thx.color._RGB.RGB_Impl_.__name__ = ["thx","color","_RGB","RGB_Impl_"];
thx.color._RGB.RGB_Impl_.create = function(red,green,blue) {
	return (red & 255) << 16 | (green & 255) << 8 | blue & 255;
};
thx.color._RGB.RGB_Impl_.fromInts = function(arr) {
	thx.core.ArrayInts.resize(arr,3);
	return thx.color._RGB.RGB_Impl_.create(arr[0],arr[1],arr[2]);
};
thx.color._RGB.RGB_Impl_.withAlpha = function(this1,alpha) {
	return thx.color._RGBA.RGBA_Impl_.fromInts([thx.color._RGB.RGB_Impl_.get_red(this1),thx.color._RGB.RGB_Impl_.get_green(this1),thx.color._RGB.RGB_Impl_.get_blue(this1),alpha]);
};
thx.color._RGB.RGB_Impl_.toRGBA = function(this1) {
	return thx.color._RGB.RGB_Impl_.withAlpha(this1,255);
};
thx.color._RGB.RGB_Impl_.get_red = function(this1) {
	return this1 >> 16 & 255;
};
thx.color._RGB.RGB_Impl_.get_green = function(this1) {
	return this1 >> 8 & 255;
};
thx.color._RGB.RGB_Impl_.get_blue = function(this1) {
	return this1 & 255;
};
thx.color._RGBA = {};
thx.color._RGBA.RGBA_Impl_ = {};
thx.color._RGBA.RGBA_Impl_.__name__ = ["thx","color","_RGBA","RGBA_Impl_"];
thx.color._RGBA.RGBA_Impl_.create = function(red,green,blue,alpha) {
	return (red & 255) << 24 | (green & 255) << 16 | (blue & 255) << 8 | alpha & 255;
};
thx.color._RGBA.RGBA_Impl_.fromInts = function(arr) {
	thx.core.ArrayInts.resize(arr,4);
	return thx.color._RGBA.RGBA_Impl_.create(arr[0],arr[1],arr[2],arr[3]);
};
thx.color._RGBA.RGBA_Impl_.fromString = function(color) {
	var info = thx.color.parse.ColorParser.parseHex(color);
	if(null == info) info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			return thx.color._RGB.RGB_Impl_.toRGBA(thx.color._RGB.RGB_Impl_.fromInts(thx.color.parse.ColorParser.getInt8Channels(info.channels,3)));
		case "rgba":
			return thx.color._RGBA.RGBA_Impl_.create(thx.color.parse.ColorParser.getInt8Channel(info.channels[0]),thx.color.parse.ColorParser.getInt8Channel(info.channels[1]),thx.color.parse.ColorParser.getInt8Channel(info.channels[2]),Math.round(thx.color.parse.ColorParser.getFloatChannel(info.channels[3]) * 255));
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._RGBA.RGBA_Impl_.toString = function(this1) {
	return "rgba(" + (this1 >> 24 & 255) + "," + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) / 255 + ")";
};
thx.color.parse = {};
thx.color.parse.ColorParser = function() {
	this.pattern_color = new EReg("^\\s*([^(]+)\\s*\\(([^)]*)\\)\\s*$","i");
	this.pattern_channel = new EReg("^\\s*(\\d*.\\d+|\\d+)(%|deg|rad)?\\s*$","i");
};
thx.color.parse.ColorParser.__name__ = ["thx","color","parse","ColorParser"];
thx.color.parse.ColorParser.parseColor = function(s) {
	return thx.color.parse.ColorParser.parser.processColor(s);
};
thx.color.parse.ColorParser.parseHex = function(s) {
	return thx.color.parse.ColorParser.parser.processHex(s);
};
thx.color.parse.ColorParser.getInt8Channels = function(channels,length) {
	if(length != channels.length) throw "invalid number of channels, expected " + length + " but it is " + channels.length;
	return channels.map(thx.color.parse.ColorParser.getInt8Channel);
};
thx.color.parse.ColorParser.getFloatChannel = function(channel,useInt8) {
	if(useInt8 == null) useInt8 = true;
	switch(channel[1]) {
	case 5:
		var v = channel[2];
		if(v) return 1; else return 0;
		break;
	case 1:
		var v1 = channel[2];
		return v1;
	case 4:
		var v2 = channel[2];
		return v2;
	case 2:
		var v3 = channel[2];
		return v3;
	case 3:
		var v4 = channel[2];
		if(useInt8) return v4 / 255; else {
			var v5 = channel[2];
			return v5;
		}
		break;
	case 0:
		var v6 = channel[2];
		return v6 / 100;
	}
};
thx.color.parse.ColorParser.getInt8Channel = function(channel) {
	switch(channel[1]) {
	case 5:
		var v = channel[2];
		if(v) return 1; else return 0;
		break;
	case 3:
		var v1 = channel[2];
		return v1;
	case 0:
		var v2 = channel[2];
		return Math.round(255 * v2 / 100);
	default:
		throw "unable to extract a valid int8 value";
	}
};
thx.color.parse.ColorParser.prototype = {
	pattern_color: null
	,pattern_channel: null
	,processHex: function(s) {
		if(!thx.color.parse.ColorParser.isPureHex.match(s)) {
			if(HxOverrides.substr(s,0,1) == "#") {
				if(s.length == 4) s = s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3); else if(s.length == 5) s = s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3) + s.charAt(4) + s.charAt(4); else s = HxOverrides.substr(s,1,null);
			} else if(HxOverrides.substr(s,0,2) == "0x") s = HxOverrides.substr(s,2,null); else return null;
		}
		var channels = [];
		while(s.length > 0) {
			channels.push(thx.color.parse.ChannelInfo.CIInt8(Std.parseInt("0x" + HxOverrides.substr(s,0,2))));
			s = HxOverrides.substr(s,2,null);
		}
		if(channels.length == 4) return new thx.color.parse.ColorInfo("rgba",channels.slice(1).concat([channels[0]])); else return new thx.color.parse.ColorInfo("rgb",channels);
	}
	,processColor: function(s) {
		if(!this.pattern_color.match(s)) return null;
		var name = this.pattern_color.matched(1);
		if(null == name) return null;
		name = name.toLowerCase();
		var m2 = this.pattern_color.matched(2);
		var s_channels;
		if(null == m2) s_channels = []; else s_channels = m2.split(",");
		var channels = [];
		var channel;
		var _g = 0;
		while(_g < s_channels.length) {
			var s_channel = s_channels[_g];
			++_g;
			channel = this.processChannel(s_channel);
			if(null == channel) return null;
			channels.push(channel);
		}
		return new thx.color.parse.ColorInfo(name,channels);
	}
	,processChannel: function(s) {
		if(!this.pattern_channel.match(s)) return null;
		var value = this.pattern_channel.matched(1);
		var unit = this.pattern_channel.matched(2);
		if(unit == null) unit = "";
		try {
			switch(unit) {
			case "%":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIPercent(thx.core.Floats.parse(value)); else return null;
				break;
			case "deg":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIDegree(thx.core.Floats.parse(value)); else return null;
				break;
			case "DEG":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIDegree(thx.core.Floats.parse(value)); else return null;
				break;
			case "rad":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIDegree(thx.core.Floats.parse(value) * 180 / Math.PI); else return null;
				break;
			case "RAD":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIDegree(thx.core.Floats.parse(value) * 180 / Math.PI); else return null;
				break;
			case "":
				if(thx.core.Ints.canParse(value)) {
					var i = thx.core.Ints.parse(value);
					if(i == 0) return thx.color.parse.ChannelInfo.CIBool(false); else if(i == 1) return thx.color.parse.ChannelInfo.CIBool(true); else if(i < 256) return thx.color.parse.ChannelInfo.CIInt8(i); else return thx.color.parse.ChannelInfo.CIInt(i);
				} else if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIFloat(thx.core.Floats.parse(value)); else return null;
				break;
			default:
				return null;
			}
		} catch( e ) {
			return null;
		}
	}
	,__class__: thx.color.parse.ColorParser
};
thx.color.parse.ColorInfo = function(name,channels) {
	this.name = name;
	this.channels = channels;
};
thx.color.parse.ColorInfo.__name__ = ["thx","color","parse","ColorInfo"];
thx.color.parse.ColorInfo.prototype = {
	name: null
	,channels: null
	,__class__: thx.color.parse.ColorInfo
};
thx.color.parse.ChannelInfo = { __ename__ : true, __constructs__ : ["CIPercent","CIFloat","CIDegree","CIInt8","CIInt","CIBool"] };
thx.color.parse.ChannelInfo.CIPercent = function(value) { var $x = ["CIPercent",0,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIFloat = function(value) { var $x = ["CIFloat",1,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIDegree = function(value) { var $x = ["CIDegree",2,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIInt8 = function(value) { var $x = ["CIInt8",3,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIInt = function(value) { var $x = ["CIInt",4,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIBool = function(value) { var $x = ["CIBool",5,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.core = {};
thx.core.Arrays = function() { };
thx.core.Arrays.__name__ = ["thx","core","Arrays"];
thx.core.Arrays.contains = function(array,element,eq) {
	if(null == eq) return HxOverrides.indexOf(array,element,0) >= 0; else {
		var _g1 = 0;
		var _g = array.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(eq(array[i],element)) return true;
		}
		return false;
	}
};
thx.core.ArrayInts = function() { };
thx.core.ArrayInts.__name__ = ["thx","core","ArrayInts"];
thx.core.ArrayInts.resize = function(array,length,fill) {
	if(fill == null) fill = 0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx.core.Floats = function() { };
thx.core.Floats.__name__ = ["thx","core","Floats"];
thx.core.Floats.canParse = function(s) {
	return thx.core.Floats.pattern_parse.match(s);
};
thx.core.Floats.parse = function(s) {
	if(s.substring(0,1) == "+") s = s.substring(1);
	return parseFloat(s);
};
thx.core.Floats.roundTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.round(f * p) / p;
};
thx.core.Functions = function() { };
thx.core.Functions.__name__ = ["thx","core","Functions"];
thx.core.Functions.noop = function() {
};
thx.core.Ints = function() { };
thx.core.Ints.__name__ = ["thx","core","Ints"];
thx.core.Ints.canParse = function(s) {
	return thx.core.Ints.pattern_parse.match(s);
};
thx.core.Ints.parse = function(s,base) {
	var v = parseInt(s,base);
	if(isNaN(v)) return null; else return v;
};
thx.core.Strings = function() { };
thx.core.Strings.__name__ = ["thx","core","Strings"];
thx.core.Strings.humanize = function(s) {
	return StringTools.replace(thx.core.Strings.underscore(s),"_"," ");
};
thx.core.Strings.underscore = function(s) {
	s = new EReg("::","g").replace(s,"/");
	s = new EReg("([A-Z]+)([A-Z][a-z])","g").replace(s,"$1_$2");
	s = new EReg("([a-z\\d])([A-Z])","g").replace(s,"$1_$2");
	s = new EReg("-","g").replace(s,"_");
	return s.toLowerCase();
};
thx.core.Timer = function() { };
thx.core.Timer.__name__ = ["thx","core","Timer"];
thx.core.Timer.frame = function(callback) {
	var cancelled = false;
	var f = thx.core.Functions.noop;
	var current = performance.now();
	var next;
	f = function() {
		if(cancelled) return;
		next = performance.now();
		callback(next - current);
		current = next;
		requestAnimationFrame(f);
	};
	requestAnimationFrame(f);
	return function() {
		cancelled = true;
	};
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
var __map_reserved = {}

      // Production steps of ECMA-262, Edition 5, 15.4.4.21
      // Reference: http://es5.github.io/#x15.4.4.21
      if (!Array.prototype.reduce) {
        Array.prototype.reduce = function(callback /*, initialValue*/) {
          'use strict';
          if (this == null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
          }
          if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
          }
          var t = Object(this), len = t.length >>> 0, k = 0, value;
          if (arguments.length == 2) {
            value = arguments[1];
          } else {
            while (k < len && ! k in t) {
              k++;
            }
            if (k >= len) {
              throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
          }
          for (; k < len; k++) {
            if (k in t) {
              value = callback(value, t[k], k, t);
            }
          }
          return value;
        };
      }
    ;
var scope = ("undefined" !== typeof window && window) || ("undefined" !== typeof global && global) || this;
if(!scope.setImmediate) scope.setImmediate = function(callback) {
	scope.setTimeout(callback,0);
};
var lastTime = 0;
var vendors = ["webkit","moz"];
var x = 0;
while(x < vendors.length && !scope.requestAnimationFrame) {
	scope.requestAnimationFrame = scope[vendors[x] + "RequestAnimationFrame"];
	scope.cancelAnimationFrame = scope[vendors[x] + "CancelAnimationFrame"] || scope[vendors[x] + "CancelRequestAnimationFrame"];
	x++;
}
if(!scope.requestAnimationFrame) scope.requestAnimationFrame = function(callback1) {
	var currTime = new Date().getTime();
	var timeToCall = Math.max(0,16 - (currTime - lastTime));
	var id = scope.setTimeout(function() {
		callback1(currTime + timeToCall);
	},timeToCall);
	lastTime = currTime + timeToCall;
	return id;
};
if(!scope.cancelAnimationFrame) scope.cancelAnimationFrame = function(id1) {
	scope.clearTimeout(id1);
};
if(typeof(scope.performance) == "undefined") scope.performance = { };
if(typeof(scope.performance.now) == "undefined") {
	var nowOffset = new Date().getTime();
	if(scope.performance.timing && scope.performance.timing.navigationStart) nowOffset = scope.performance.timing.navigationStart;
	var now = function() {
		return new Date() - nowOffset;
	};
	scope.performance.now = now;
}
Game.width = 200;
Game.height = 200;
haxe.ds.ObjectMap.count = 0;
js.Boot.__toStr = {}.toString;
minicanvas.MiniCanvas.displayGenerationTime = false;
minicanvas.BrowserCanvas._backingStoreRatio = 0;
minicanvas.BrowserCanvas.defaultScaleMode = minicanvas.ScaleMode.Auto;
minicanvas.BrowserCanvas.parentNode = typeof document != 'undefined' && document.body;
minicanvas.NodeCanvas.defaultScaleMode = minicanvas.ScaleMode.NoScale;
minicanvas.NodeCanvas.imagePath = "images";
thx.color.parse.ColorParser.parser = new thx.color.parse.ColorParser();
thx.color.parse.ColorParser.isPureHex = new EReg("^([0-9a-f]{2}){3,4}$","i");
thx.core.Floats.pattern_parse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
thx.core.Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
Game.main();
})(typeof console != "undefined" ? console : {log:function(){}});
