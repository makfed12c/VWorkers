(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var edge = {};
edge.core = {};
edge.core.ISystemProcess = function() { };
edge.core.ISystemProcess.__name__ = ["edge","core","ISystemProcess"];
edge.core.ISystemProcess.prototype = {
	update: null
	,addEntity: null
	,removeEntity: null
	,__class__: edge.core.ISystemProcess
};
var BeforeSystem_SystemProcess = function(system) {
	this.system = system;
	this.updateItems = new edge.View();
};
BeforeSystem_SystemProcess.__name__ = ["BeforeSystem_SystemProcess"];
BeforeSystem_SystemProcess.__interfaces__ = [edge.core.ISystemProcess];
BeforeSystem_SystemProcess.prototype = {
	removeEntity: function(entity) {
		this.updateItems.tryRemove(entity);
	}
	,addEntity: function(entity) {
		this.updateMatchRequirements(entity);
	}
	,system: null
	,updateItems: null
	,update: function(engine,delta) {
		if(this.updateItems.count > 0) this.system.before();
		var data;
		var $it0 = this.updateItems.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			data = item.data;
			this.system.update(data.a);
		}
	}
	,updateMatchRequirements: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		var count = 1;
		var o = { a : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js.Boot.__instanceof(component,A)) {
				o.a = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.updateItems.tryAdd(entity,o);
	}
	,__class__: BeforeSystem_SystemProcess
};
var Components1System_SystemProcess = function(system) {
	this.system = system;
	this.updateItems = new edge.View();
};
Components1System_SystemProcess.__name__ = ["Components1System_SystemProcess"];
Components1System_SystemProcess.__interfaces__ = [edge.core.ISystemProcess];
Components1System_SystemProcess.prototype = {
	removeEntity: function(entity) {
		this.updateItems.tryRemove(entity);
	}
	,addEntity: function(entity) {
		this.updateMatchRequirements(entity);
	}
	,system: null
	,updateItems: null
	,update: function(engine,delta) {
		this.system.engine = engine;
		var data;
		var $it0 = this.updateItems.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			this.system.entity = item.entity;
			data = item.data;
			this.system.update(data.b);
		}
	}
	,updateMatchRequirements: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		var count = 1;
		var o = { b : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js.Boot.__instanceof(component,B)) {
				o.b = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.updateItems.tryAdd(entity,o);
	}
	,__class__: Components1System_SystemProcess
};
var Components2System_SystemProcess = function(system) {
	this.system = system;
	this.updateItems = new edge.View();
};
Components2System_SystemProcess.__name__ = ["Components2System_SystemProcess"];
Components2System_SystemProcess.__interfaces__ = [edge.core.ISystemProcess];
Components2System_SystemProcess.prototype = {
	removeEntity: function(entity) {
		this.updateItems.tryRemove(entity);
	}
	,addEntity: function(entity) {
		this.updateMatchRequirements(entity);
	}
	,system: null
	,updateItems: null
	,update: function(engine,delta) {
		var data;
		var $it0 = this.updateItems.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			data = item.data;
			this.system.update(data.b,data.a);
		}
	}
	,updateMatchRequirements: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		var count = 2;
		var o = { b : null, a : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js.Boot.__instanceof(component,B)) {
				o.b = component;
				if(--count == 0) break; else continue;
			}
			if(js.Boot.__instanceof(component,A)) {
				o.a = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.updateItems.tryAdd(entity,o);
	}
	,__class__: Components2System_SystemProcess
};
var ComponentsEntitiesSystem_SystemProcess = function(system) {
	this.system = system;
	this.updateItems = new edge.View();
	system.entities = new edge.View();
};
ComponentsEntitiesSystem_SystemProcess.__name__ = ["ComponentsEntitiesSystem_SystemProcess"];
ComponentsEntitiesSystem_SystemProcess.__interfaces__ = [edge.core.ISystemProcess];
ComponentsEntitiesSystem_SystemProcess.prototype = {
	removeEntity: function(entity) {
		this.updateItems.tryRemove(entity);
		this.system.entities.tryRemove(entity);
	}
	,addEntity: function(entity) {
		this.entitiesMatchRequirements(entity);
		this.updateMatchRequirements(entity);
	}
	,system: null
	,updateItems: null
	,update: function(engine,delta) {
		var data;
		var $it0 = this.updateItems.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			data = item.data;
			this.system.update(data.b);
		}
	}
	,entitiesMatchRequirements: function(entity) {
		var removed = this.system.entities.tryRemove(entity);
		var count = 1;
		var o = { a : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js.Boot.__instanceof(component,A)) {
				o.a = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.system.entities.tryAdd(entity,o);
	}
	,updateMatchRequirements: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		var count = 1;
		var o = { b : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js.Boot.__instanceof(component,B)) {
				o.b = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.updateItems.tryAdd(entity,o);
	}
	,__class__: ComponentsEntitiesSystem_SystemProcess
};
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
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) this.r.s = s;
			return b;
		} else {
			var b1 = this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b1;
		}
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf = new StringBuf();
		do {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				buf.add(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf.add(HxOverrides.substr(s,offset,p.pos - offset));
			buf.add(f(this));
			if(p.len == 0) {
				buf.add(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
		} while(this.r.global);
		if(!this.r.global && offset > 0 && offset < s.length) buf.add(HxOverrides.substr(s,offset,null));
		return buf.b;
	}
	,__class__: EReg
};
var HasAandBSystem_SystemProcess = function(system) {
	this.system = system;
	system.viewA = new edge.View();
	system.viewB = new edge.View();
};
HasAandBSystem_SystemProcess.__name__ = ["HasAandBSystem_SystemProcess"];
HasAandBSystem_SystemProcess.__interfaces__ = [edge.core.ISystemProcess];
HasAandBSystem_SystemProcess.prototype = {
	removeEntity: function(entity) {
		this.system.viewA.tryRemove(entity);
		this.system.viewB.tryRemove(entity);
	}
	,addEntity: function(entity) {
		this.viewAMatchRequirements(entity);
		this.viewBMatchRequirements(entity);
	}
	,system: null
	,update: function(engine,delta) {
		this.system.update();
	}
	,viewAMatchRequirements: function(entity) {
		var removed = this.system.viewA.tryRemove(entity);
		var count = 1;
		var o = { a : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js.Boot.__instanceof(component,A)) {
				o.a = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.system.viewA.tryAdd(entity,o);
	}
	,viewBMatchRequirements: function(entity) {
		var removed = this.system.viewB.tryRemove(entity);
		var count = 1;
		var o = { b : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js.Boot.__instanceof(component,B)) {
				o.b = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.system.viewB.tryAdd(entity,o);
	}
	,__class__: HasAandBSystem_SystemProcess
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
var Lambda = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = [];
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return new _List.ListIterator(this.h);
	}
	,__class__: List
};
var _List = {};
_List.ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_List.ListIterator.__name__ = ["_List","ListIterator"];
_List.ListIterator.prototype = {
	head: null
	,val: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _List.ListIterator
};
Math.__name__ = ["Math"];
var NoComponentsSystem_SystemProcess = function(system) {
	this.system = system;
};
NoComponentsSystem_SystemProcess.__name__ = ["NoComponentsSystem_SystemProcess"];
NoComponentsSystem_SystemProcess.__interfaces__ = [edge.core.ISystemProcess];
NoComponentsSystem_SystemProcess.prototype = {
	removeEntity: function(entity) {
	}
	,addEntity: function(entity) {
	}
	,system: null
	,update: function(engine,delta) {
		this.system.update();
	}
	,__class__: NoComponentsSystem_SystemProcess
};
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
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var TestAll = function() {
};
TestAll.__name__ = ["TestAll"];
TestAll.main = function() {
	var runner = new utest.Runner();
	runner.addCase(new TestAll());
	utest.ui.Report.create(runner);
	runner.run();
};
TestAll.prototype = {
	testUpdateRemoved: function() {
		var engine = new edge.Engine();
		var phase = engine.createPhase();
		var system = new UpdateRemovedSystem();
		phase.add(system);
		utest.Assert.same([],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 15, className : "TestAll", methodName : "testUpdateRemoved"});
		engine.create([new B()]);
		utest.Assert.same([],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 17, className : "TestAll", methodName : "testUpdateRemoved"});
		var e = engine.create([new A()]);
		utest.Assert.same([],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 19, className : "TestAll", methodName : "testUpdateRemoved"});
		phase.update(0);
		utest.Assert.same([2],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 21, className : "TestAll", methodName : "testUpdateRemoved"});
		e.removeType(A);
		utest.Assert.same([2,1],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 23, className : "TestAll", methodName : "testUpdateRemoved"});
		e.add(new A());
		e.removeType(A);
		utest.Assert.same([2,1,1],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 26, className : "TestAll", methodName : "testUpdateRemoved"});
	}
	,testUpdateAdded: function() {
		var engine = new edge.Engine();
		var phase = engine.createPhase();
		var system = new UpdateAddedSystem();
		phase.add(system);
		utest.Assert.same([],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 34, className : "TestAll", methodName : "testUpdateAdded"});
		engine.create([new B()]);
		utest.Assert.same([],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 36, className : "TestAll", methodName : "testUpdateAdded"});
		var e = engine.create([new A()]);
		utest.Assert.same([1],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 38, className : "TestAll", methodName : "testUpdateAdded"});
		phase.update(0);
		utest.Assert.same([1,2],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 40, className : "TestAll", methodName : "testUpdateAdded"});
		e.removeType(A);
		utest.Assert.same([1,2],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 42, className : "TestAll", methodName : "testUpdateAdded"});
		e.add(new A());
		utest.Assert.same([1,2,1],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 44, className : "TestAll", methodName : "testUpdateAdded"});
	}
	,testBefore: function() {
		var engine = new edge.Engine();
		var phase = engine.createPhase();
		var system = new BeforeSystem();
		phase.add(system);
		phase.update(0);
		utest.Assert.same([],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 53, className : "TestAll", methodName : "testBefore"});
		engine.create([new A()]);
		phase.update(0);
		utest.Assert.same([1,2],system.results,null,null,{ fileName : "TestAll.hx", lineNumber : 56, className : "TestAll", methodName : "testBefore"});
	}
	,testMultipleViews: function() {
		var engine = new edge.Engine();
		var phase = engine.createPhase();
		var system = new HasAandBSystem();
		utest.Assert.equals(0,system.viewA.count,null,{ fileName : "TestAll.hx", lineNumber : 64, className : "TestAll", methodName : "testMultipleViews"});
		utest.Assert.equals(0,system.viewB.count,null,{ fileName : "TestAll.hx", lineNumber : 65, className : "TestAll", methodName : "testMultipleViews"});
		phase.add(system);
		utest.Assert.equals(0,system.viewA.count,null,{ fileName : "TestAll.hx", lineNumber : 67, className : "TestAll", methodName : "testMultipleViews"});
		utest.Assert.equals(0,system.viewB.count,null,{ fileName : "TestAll.hx", lineNumber : 68, className : "TestAll", methodName : "testMultipleViews"});
		var e = engine.create([new A()]);
		utest.Assert.equals(1,system.viewA.count,null,{ fileName : "TestAll.hx", lineNumber : 71, className : "TestAll", methodName : "testMultipleViews"});
		utest.Assert.equals(0,system.viewB.count,null,{ fileName : "TestAll.hx", lineNumber : 72, className : "TestAll", methodName : "testMultipleViews"});
		e.add(new B());
		utest.Assert.equals(1,system.viewA.count,null,{ fileName : "TestAll.hx", lineNumber : 75, className : "TestAll", methodName : "testMultipleViews"});
		utest.Assert.equals(1,system.viewB.count,null,{ fileName : "TestAll.hx", lineNumber : 76, className : "TestAll", methodName : "testMultipleViews"});
		engine.create([new B()]);
		utest.Assert.equals(1,system.viewA.count,null,{ fileName : "TestAll.hx", lineNumber : 79, className : "TestAll", methodName : "testMultipleViews"});
		utest.Assert.equals(2,system.viewB.count,null,{ fileName : "TestAll.hx", lineNumber : 80, className : "TestAll", methodName : "testMultipleViews"});
	}
	,testPhaseNodes: function() {
		var phase = new edge.Phase(null);
		var it = phase.systems();
		utest.Assert.isFalse(it.hasNext(),null,{ fileName : "TestAll.hx", lineNumber : 86, className : "TestAll", methodName : "testPhaseNodes"});
		phase.add(new Components2System());
		it = phase.systems();
		utest.Assert.isTrue(it.hasNext(),null,{ fileName : "TestAll.hx", lineNumber : 89, className : "TestAll", methodName : "testPhaseNodes"});
		utest.Assert.notNull(it.next(),null,{ fileName : "TestAll.hx", lineNumber : 90, className : "TestAll", methodName : "testPhaseNodes"});
		utest.Assert.isFalse(it.hasNext(),null,{ fileName : "TestAll.hx", lineNumber : 91, className : "TestAll", methodName : "testPhaseNodes"});
		phase.add(new Components1System());
		it = phase.systems();
		utest.Assert.isTrue(it.hasNext(),null,{ fileName : "TestAll.hx", lineNumber : 94, className : "TestAll", methodName : "testPhaseNodes"});
		utest.Assert["is"](it.next(),Components2System,null,{ fileName : "TestAll.hx", lineNumber : 95, className : "TestAll", methodName : "testPhaseNodes"});
		utest.Assert["is"](it.next(),Components1System,null,{ fileName : "TestAll.hx", lineNumber : 96, className : "TestAll", methodName : "testPhaseNodes"});
		utest.Assert.isFalse(it.hasNext(),null,{ fileName : "TestAll.hx", lineNumber : 97, className : "TestAll", methodName : "testPhaseNodes"});
		phase.removeType(Components2System);
		it = phase.systems();
		utest.Assert.isTrue(it.hasNext(),null,{ fileName : "TestAll.hx", lineNumber : 100, className : "TestAll", methodName : "testPhaseNodes"});
		utest.Assert["is"](it.next(),Components1System,null,{ fileName : "TestAll.hx", lineNumber : 101, className : "TestAll", methodName : "testPhaseNodes"});
		utest.Assert.isFalse(it.hasNext(),null,{ fileName : "TestAll.hx", lineNumber : 102, className : "TestAll", methodName : "testPhaseNodes"});
	}
	,testEngineComponents2System: function() {
		var engine = new edge.Engine();
		var phase = engine.createPhase();
		var system = new Components2System();
		phase.add(system);
		utest.Assert.equals(0,system.count,null,{ fileName : "TestAll.hx", lineNumber : 110, className : "TestAll", methodName : "testEngineComponents2System"});
		phase.update(0);
		utest.Assert.equals(0,system.count,null,{ fileName : "TestAll.hx", lineNumber : 112, className : "TestAll", methodName : "testEngineComponents2System"});
		var entity = engine.create([new A(),new B()]);
		utest.Assert.equals(engine,entity.engine,null,{ fileName : "TestAll.hx", lineNumber : 114, className : "TestAll", methodName : "testEngineComponents2System"});
		phase.update(0);
		utest.Assert.equals(1,system.count,null,{ fileName : "TestAll.hx", lineNumber : 116, className : "TestAll", methodName : "testEngineComponents2System"});
		entity.destroy();
		utest.Assert.isNull(entity.engine,null,{ fileName : "TestAll.hx", lineNumber : 118, className : "TestAll", methodName : "testEngineComponents2System"});
		phase.update(0);
		utest.Assert.equals(1,system.count,null,{ fileName : "TestAll.hx", lineNumber : 120, className : "TestAll", methodName : "testEngineComponents2System"});
		entity = engine.create([new A(),new B()]);
		phase.update(0);
		utest.Assert.equals(2,system.count,null,{ fileName : "TestAll.hx", lineNumber : 123, className : "TestAll", methodName : "testEngineComponents2System"});
		entity.removeType(A);
		phase.update(0);
		utest.Assert.equals(2,system.count,null,{ fileName : "TestAll.hx", lineNumber : 126, className : "TestAll", methodName : "testEngineComponents2System"});
	}
	,testEngineComponents1System: function() {
		var engine = new edge.Engine();
		var phase = engine.createPhase();
		var system = new Components1System();
		phase.add(system);
		utest.Assert.equals(0,system.count,null,{ fileName : "TestAll.hx", lineNumber : 134, className : "TestAll", methodName : "testEngineComponents1System"});
		phase.update(0);
		utest.Assert.equals(0,system.count,null,{ fileName : "TestAll.hx", lineNumber : 136, className : "TestAll", methodName : "testEngineComponents1System"});
		var entity = engine.create([new B()]);
		phase.update(0);
		utest.Assert.equals(1,system.count,null,{ fileName : "TestAll.hx", lineNumber : 139, className : "TestAll", methodName : "testEngineComponents1System"});
		entity.destroy();
		phase.update(0);
		utest.Assert.equals(1,system.count,null,{ fileName : "TestAll.hx", lineNumber : 142, className : "TestAll", methodName : "testEngineComponents1System"});
		entity = engine.create([new B()]);
		phase.update(0);
		utest.Assert.equals(2,system.count,null,{ fileName : "TestAll.hx", lineNumber : 145, className : "TestAll", methodName : "testEngineComponents1System"});
		entity.removeType(B);
		phase.update(0);
		utest.Assert.equals(2,system.count,null,{ fileName : "TestAll.hx", lineNumber : 148, className : "TestAll", methodName : "testEngineComponents1System"});
	}
	,testEngineComponents1MissingSystem: function() {
		var engine = new edge.Engine();
		var phase = engine.createPhase();
		var system = new Components1System();
		phase.add(system);
		utest.Assert.equals(0,system.count,null,{ fileName : "TestAll.hx", lineNumber : 156, className : "TestAll", methodName : "testEngineComponents1MissingSystem"});
		phase.update(0);
		utest.Assert.equals(0,system.count,null,{ fileName : "TestAll.hx", lineNumber : 158, className : "TestAll", methodName : "testEngineComponents1MissingSystem"});
		var entity = engine.create([new A()]);
		phase.update(0);
		utest.Assert.equals(0,system.count,null,{ fileName : "TestAll.hx", lineNumber : 161, className : "TestAll", methodName : "testEngineComponents1MissingSystem"});
		entity.destroy();
		phase.update(0);
		utest.Assert.equals(0,system.count,null,{ fileName : "TestAll.hx", lineNumber : 164, className : "TestAll", methodName : "testEngineComponents1MissingSystem"});
	}
	,testEngineNoComponentSystem: function() {
		var engine = new edge.Engine();
		var phase = engine.createPhase();
		var system = new NoComponentsSystem();
		phase.add(system);
		utest.Assert.equals(0,system.count,null,{ fileName : "TestAll.hx", lineNumber : 172, className : "TestAll", methodName : "testEngineNoComponentSystem"});
		phase.update(0);
		utest.Assert.equals(1,system.count,null,{ fileName : "TestAll.hx", lineNumber : 174, className : "TestAll", methodName : "testEngineNoComponentSystem"});
		phase.update(0);
		utest.Assert.equals(2,system.count,null,{ fileName : "TestAll.hx", lineNumber : 176, className : "TestAll", methodName : "testEngineNoComponentSystem"});
		phase.remove(system);
		phase.update(0);
		utest.Assert.equals(2,system.count,null,{ fileName : "TestAll.hx", lineNumber : 179, className : "TestAll", methodName : "testEngineNoComponentSystem"});
	}
	,testEngineSystemCounting: function() {
		var engine = new edge.Engine();
		var phase = engine.createPhase();
		var s1 = new NoComponentsSystem();
		var s2 = new Components2System();
		this.assertNumberOfEntities(engine,0,{ fileName : "TestAll.hx", lineNumber : 187, className : "TestAll", methodName : "testEngineSystemCounting"});
		this.assertNumberOfSystems(engine,0,{ fileName : "TestAll.hx", lineNumber : 188, className : "TestAll", methodName : "testEngineSystemCounting"});
		phase.add(s1);
		this.assertNumberOfSystems(engine,1,{ fileName : "TestAll.hx", lineNumber : 190, className : "TestAll", methodName : "testEngineSystemCounting"});
		phase.add(s2);
		this.assertNumberOfSystems(engine,2,{ fileName : "TestAll.hx", lineNumber : 192, className : "TestAll", methodName : "testEngineSystemCounting"});
		phase.remove(s1);
		this.assertNumberOfSystems(engine,1,{ fileName : "TestAll.hx", lineNumber : 194, className : "TestAll", methodName : "testEngineSystemCounting"});
		phase.remove(s1);
		this.assertNumberOfSystems(engine,1,{ fileName : "TestAll.hx", lineNumber : 196, className : "TestAll", methodName : "testEngineSystemCounting"});
		phase.remove(s2);
		this.assertNumberOfSystems(engine,0,{ fileName : "TestAll.hx", lineNumber : 198, className : "TestAll", methodName : "testEngineSystemCounting"});
	}
	,testEngineEntity: function() {
		var engine = new edge.Engine();
		this.assertNumberOfEntities(engine,0,{ fileName : "TestAll.hx", lineNumber : 203, className : "TestAll", methodName : "testEngineEntity"});
		this.assertNumberOfSystems(engine,0,{ fileName : "TestAll.hx", lineNumber : 204, className : "TestAll", methodName : "testEngineEntity"});
		var e1 = engine.create();
		this.assertNumberOfEntities(engine,1,{ fileName : "TestAll.hx", lineNumber : 206, className : "TestAll", methodName : "testEngineEntity"});
		this.assertNumberOfSystems(engine,0,{ fileName : "TestAll.hx", lineNumber : 207, className : "TestAll", methodName : "testEngineEntity"});
		var e2 = engine.create();
		this.assertNumberOfEntities(engine,2,{ fileName : "TestAll.hx", lineNumber : 209, className : "TestAll", methodName : "testEngineEntity"});
		e1.destroy();
		this.assertNumberOfEntities(engine,1,{ fileName : "TestAll.hx", lineNumber : 211, className : "TestAll", methodName : "testEngineEntity"});
		e1.destroy();
		this.assertNumberOfEntities(engine,1,{ fileName : "TestAll.hx", lineNumber : 213, className : "TestAll", methodName : "testEngineEntity"});
		e2.destroy();
		this.assertNumberOfEntities(engine,0,{ fileName : "TestAll.hx", lineNumber : 215, className : "TestAll", methodName : "testEngineEntity"});
	}
	,testEntity: function() {
		var engine = new edge.Engine();
		var entity = engine.create();
		entity.add(new A());
		this.assertNumberOfComponents(entity,1,{ fileName : "TestAll.hx", lineNumber : 222, className : "TestAll", methodName : "testEntity"});
		entity.add(new B());
		this.assertNumberOfComponents(entity,2,{ fileName : "TestAll.hx", lineNumber : 224, className : "TestAll", methodName : "testEntity"});
		var a = new A();
		entity.add(a);
		this.assertNumberOfComponents(entity,2,{ fileName : "TestAll.hx", lineNumber : 227, className : "TestAll", methodName : "testEntity"});
		entity.remove(a);
		this.assertNumberOfComponents(entity,1,{ fileName : "TestAll.hx", lineNumber : 229, className : "TestAll", methodName : "testEntity"});
		entity.removeType(B);
		this.assertNumberOfComponents(entity,0,{ fileName : "TestAll.hx", lineNumber : 231, className : "TestAll", methodName : "testEntity"});
	}
	,assertNumberOfComponents: function(entity,qt,pos) {
		utest.Assert.equals(qt,thx.core.Iterators.toArray(entity.map.iterator()).length,null,pos);
	}
	,assertNumberOfEntities: function(engine,qt,pos) {
		utest.Assert.equals(qt,thx.core.Iterators.toArray(engine.entities()).length,null,pos);
	}
	,assertNumberOfSystems: function(engine,qt,pos) {
		var count = 0;
		engine.eachSystem(function(_) {
			count++;
		});
		utest.Assert.equals(qt,count,null,pos);
	}
	,__class__: TestAll
};
edge.ISystem = function() { };
edge.ISystem.__name__ = ["edge","ISystem"];
edge.ISystem.prototype = {
	__process__: null
	,__class__: edge.ISystem
};
var NoComponentsSystem = function() {
	this.componentRequirements = [];
	this.count = 0;
	this.__process__ = new NoComponentsSystem_SystemProcess(this);
};
NoComponentsSystem.__name__ = ["NoComponentsSystem"];
NoComponentsSystem.__interfaces__ = [edge.ISystem];
NoComponentsSystem.prototype = {
	count: null
	,update: function() {
		this.count++;
	}
	,componentRequirements: null
	,toString: function() {
		return "NoComponentsSystem";
	}
	,__process__: null
	,__class__: NoComponentsSystem
};
var Components2System = function() {
	this.componentRequirements = [B,A];
	this.count = 0;
	this.__process__ = new Components2System_SystemProcess(this);
};
Components2System.__name__ = ["Components2System"];
Components2System.__interfaces__ = [edge.ISystem];
Components2System.prototype = {
	count: null
	,update: function(b,a) {
		utest.Assert["is"](b,B,null,{ fileName : "TestAll.hx", lineNumber : 268, className : "Components2System", methodName : "update"});
		utest.Assert["is"](a,A,null,{ fileName : "TestAll.hx", lineNumber : 269, className : "Components2System", methodName : "update"});
		this.count++;
	}
	,componentRequirements: null
	,toString: function() {
		return "Components2System";
	}
	,__process__: null
	,__class__: Components2System
};
var Components1System = function() {
	this.componentRequirements = [B];
	this.count = 0;
	this.__process__ = new Components1System_SystemProcess(this);
};
Components1System.__name__ = ["Components1System"];
Components1System.__interfaces__ = [edge.ISystem];
Components1System.prototype = {
	count: null
	,entity: null
	,engine: null
	,update: function(b) {
		utest.Assert["is"](b,B,null,{ fileName : "TestAll.hx", lineNumber : 279, className : "Components1System", methodName : "update"});
		this.count++;
	}
	,componentRequirements: null
	,toString: function() {
		return "Components1System";
	}
	,__process__: null
	,__class__: Components1System
};
var ComponentsEntitiesSystem = function() {
	this.componentRequirements = [B];
	this.count = 0;
	this.__process__ = new ComponentsEntitiesSystem_SystemProcess(this);
};
ComponentsEntitiesSystem.__name__ = ["ComponentsEntitiesSystem"];
ComponentsEntitiesSystem.__interfaces__ = [edge.ISystem];
ComponentsEntitiesSystem.prototype = {
	count: null
	,entities: null
	,update: function(b) {
		utest.Assert["is"](b,B,null,{ fileName : "TestAll.hx", lineNumber : 288, className : "ComponentsEntitiesSystem", methodName : "update"});
		this.count++;
	}
	,componentRequirements: null
	,toString: function() {
		return "ComponentsEntitiesSystem";
	}
	,__process__: null
	,__class__: ComponentsEntitiesSystem
};
var HasAandBSystem = function() {
	this.componentRequirements = [];
	this.__process__ = new HasAandBSystem_SystemProcess(this);
};
HasAandBSystem.__name__ = ["HasAandBSystem"];
HasAandBSystem.__interfaces__ = [edge.ISystem];
HasAandBSystem.prototype = {
	viewA: null
	,viewB: null
	,update: function() {
	}
	,componentRequirements: null
	,toString: function() {
		return "HasAandBSystem";
	}
	,__process__: null
	,__class__: HasAandBSystem
};
var BeforeSystem = function() {
	this.componentRequirements = [A];
	this.results = [];
	this.__process__ = new BeforeSystem_SystemProcess(this);
};
BeforeSystem.__name__ = ["BeforeSystem"];
BeforeSystem.__interfaces__ = [edge.ISystem];
BeforeSystem.prototype = {
	results: null
	,before: function() {
		this.results.push(1);
	}
	,update: function(a) {
		this.results.push(2);
	}
	,componentRequirements: null
	,toString: function() {
		return "BeforeSystem";
	}
	,__process__: null
	,__class__: BeforeSystem
};
var UpdateAddedSystem = function() {
	this.componentRequirements = [A];
	this.results = [];
	this.__process__ = new UpdateAddedSystem_SystemProcess(this);
};
UpdateAddedSystem.__name__ = ["UpdateAddedSystem"];
UpdateAddedSystem.__interfaces__ = [edge.ISystem];
UpdateAddedSystem.prototype = {
	results: null
	,updateAdded: function(entity,o) {
		utest.Assert["is"](entity,edge.Entity,null,{ fileName : "TestAll.hx", lineNumber : 318, className : "UpdateAddedSystem", methodName : "updateAdded"});
		this.results.push(1);
	}
	,update: function(a) {
		this.results.push(2);
	}
	,componentRequirements: null
	,toString: function() {
		return "UpdateAddedSystem";
	}
	,__process__: null
	,__class__: UpdateAddedSystem
};
var UpdateRemovedSystem = function() {
	this.componentRequirements = [A];
	this.results = [];
	this.__process__ = new UpdateRemovedSystem_SystemProcess(this);
};
UpdateRemovedSystem.__name__ = ["UpdateRemovedSystem"];
UpdateRemovedSystem.__interfaces__ = [edge.ISystem];
UpdateRemovedSystem.prototype = {
	results: null
	,updateRemoved: function(entity) {
		utest.Assert["is"](entity,edge.Entity,null,{ fileName : "TestAll.hx", lineNumber : 331, className : "UpdateRemovedSystem", methodName : "updateRemoved"});
		this.results.push(1);
	}
	,update: function(a) {
		this.results.push(2);
	}
	,componentRequirements: null
	,toString: function() {
		return "UpdateRemovedSystem";
	}
	,__process__: null
	,__class__: UpdateRemovedSystem
};
var UpdateAddedRemovedSystem = function() {
	this.componentRequirements = [A];
	this.results = [];
	this.__process__ = new UpdateAddedRemovedSystem_SystemProcess(this);
};
UpdateAddedRemovedSystem.__name__ = ["UpdateAddedRemovedSystem"];
UpdateAddedRemovedSystem.__interfaces__ = [edge.ISystem];
UpdateAddedRemovedSystem.prototype = {
	results: null
	,updateAdded: function(entity,o) {
		utest.Assert["is"](entity,edge.Entity,null,{ fileName : "TestAll.hx", lineNumber : 344, className : "UpdateAddedRemovedSystem", methodName : "updateAdded"});
		this.results.push(1);
	}
	,updateRemoved: function(entity) {
		utest.Assert["is"](entity,edge.Entity,null,{ fileName : "TestAll.hx", lineNumber : 349, className : "UpdateAddedRemovedSystem", methodName : "updateRemoved"});
		this.results.push(2);
	}
	,update: function(a) {
		this.results.push(3);
	}
	,componentRequirements: null
	,toString: function() {
		return "UpdateAddedRemovedSystem";
	}
	,__process__: null
	,__class__: UpdateAddedRemovedSystem
};
var A = function() {
};
A.__name__ = ["A"];
A.prototype = {
	__class__: A
};
var B = function() {
};
B.__name__ = ["B"];
B.prototype = {
	__class__: B
};
var ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return js.Boot.getClass(o);
};
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js.Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumConstructor = function(e) {
	return e[0];
};
Type.enumParameters = function(e) {
	return e.slice(2);
};
Type.enumIndex = function(e) {
	return e[1];
};
var UpdateAddedRemovedSystem_SystemProcess = function(system) {
	this.system = system;
	this.updateItems = new edge.View();
};
UpdateAddedRemovedSystem_SystemProcess.__name__ = ["UpdateAddedRemovedSystem_SystemProcess"];
UpdateAddedRemovedSystem_SystemProcess.__interfaces__ = [edge.core.ISystemProcess];
UpdateAddedRemovedSystem_SystemProcess.prototype = {
	removeEntity: function(entity) {
		if(this.updateItems.tryRemove(entity)) this.system.updateRemoved(entity);
	}
	,addEntity: function(entity) {
		this.updateMatchRequirements(entity);
	}
	,system: null
	,updateItems: null
	,update: function(engine,delta) {
		var data;
		var $it0 = this.updateItems.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			data = item.data;
			this.system.update(data.a);
		}
	}
	,updateMatchRequirements: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		var count = 1;
		var o = { a : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js.Boot.__instanceof(component,A)) {
				o.a = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.updateItems.tryAdd(entity,o);
		if(removed && !added) this.system.updateRemoved(entity);
		if(added && !removed) this.system.updateAdded(entity,o);
	}
	,__class__: UpdateAddedRemovedSystem_SystemProcess
};
var UpdateAddedSystem_SystemProcess = function(system) {
	this.system = system;
	this.updateItems = new edge.View();
};
UpdateAddedSystem_SystemProcess.__name__ = ["UpdateAddedSystem_SystemProcess"];
UpdateAddedSystem_SystemProcess.__interfaces__ = [edge.core.ISystemProcess];
UpdateAddedSystem_SystemProcess.prototype = {
	removeEntity: function(entity) {
		this.updateItems.tryRemove(entity);
	}
	,addEntity: function(entity) {
		this.updateMatchRequirements(entity);
	}
	,system: null
	,updateItems: null
	,update: function(engine,delta) {
		var data;
		var $it0 = this.updateItems.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			data = item.data;
			this.system.update(data.a);
		}
	}
	,updateMatchRequirements: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		var count = 1;
		var o = { a : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js.Boot.__instanceof(component,A)) {
				o.a = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.updateItems.tryAdd(entity,o);
		if(added && !removed) this.system.updateAdded(entity,o);
	}
	,__class__: UpdateAddedSystem_SystemProcess
};
var UpdateRemovedSystem_SystemProcess = function(system) {
	this.system = system;
	this.updateItems = new edge.View();
};
UpdateRemovedSystem_SystemProcess.__name__ = ["UpdateRemovedSystem_SystemProcess"];
UpdateRemovedSystem_SystemProcess.__interfaces__ = [edge.core.ISystemProcess];
UpdateRemovedSystem_SystemProcess.prototype = {
	removeEntity: function(entity) {
		if(this.updateItems.tryRemove(entity)) this.system.updateRemoved(entity);
	}
	,addEntity: function(entity) {
		this.updateMatchRequirements(entity);
	}
	,system: null
	,updateItems: null
	,update: function(engine,delta) {
		var data;
		var $it0 = this.updateItems.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			data = item.data;
			this.system.update(data.a);
		}
	}
	,updateMatchRequirements: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		var count = 1;
		var o = { a : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js.Boot.__instanceof(component,A)) {
				o.a = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.updateItems.tryAdd(entity,o);
		if(removed && !added) this.system.updateRemoved(entity);
	}
	,__class__: UpdateRemovedSystem_SystemProcess
};
edge.Engine = function() {
	this.mapEntities = new haxe.ds.ObjectMap();
	this.listPhases = [];
};
edge.Engine.__name__ = ["edge","Engine"];
edge.Engine.prototype = {
	mapEntities: null
	,listPhases: null
	,create: function(components) {
		var entity = new edge.Entity(this,components);
		this.mapEntities.set(entity,true);
		this.matchSystems(entity);
		return entity;
	}
	,clear: function() {
		var $it0 = this.mapEntities.keys();
		while( $it0.hasNext() ) {
			var entity = $it0.next();
			this.remove(entity);
		}
	}
	,remove: function(entity) {
		this.eachSystem(function(system) {
			system.__process__.removeEntity(entity);
		});
		this.mapEntities.remove(entity);
		entity.engine = null;
	}
	,entities: function() {
		return this.mapEntities.keys();
	}
	,createPhase: function() {
		var phase = new edge.Phase(this);
		this.listPhases.push(phase);
		return phase;
	}
	,phases: function() {
		return HxOverrides.iter(this.listPhases);
	}
	,eachSystem: function(f) {
		var _g = 0;
		var _g1 = this.listPhases;
		while(_g < _g1.length) {
			var phase = _g1[_g];
			++_g;
			var $it0 = phase.systems();
			while( $it0.hasNext() ) {
				var system = $it0.next();
				f(system);
			}
		}
	}
	,addSystem: function(phase,system) {
		this.eachSystem(function(s) {
			if(s == system) throw "System \"" + Std.string(system) + "\" already exists in Engine";
		});
		var $it0 = this.mapEntities.keys();
		while( $it0.hasNext() ) {
			var entity = $it0.next();
			system.__process__.addEntity(entity);
		}
	}
	,removeSystem: function(system) {
		var $it0 = this.mapEntities.keys();
		while( $it0.hasNext() ) {
			var entity = $it0.next();
			system.__process__.removeEntity(entity);
		}
	}
	,updateSystem: function(system,t) {
		system.__process__.update(this,t);
	}
	,matchSystems: function(entity) {
		var _g = this;
		this.eachSystem(function(system) {
			system.__process__.addEntity(entity);
		});
	}
	,match: function(entity,system) {
		system.__process__.addEntity(entity);
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
	,add: function(component) {
		if(null == this.engine) return;
		this._add(component);
		this.engine.matchSystems(this);
	}
	,addMany: function(components) {
		var _g = this;
		if(null == this.engine) return;
		components.map(function(_) {
			_g._add(_);
			return;
		});
		this.engine.matchSystems(this);
	}
	,destroy: function() {
		if(null == this.engine) return;
		this.engine.remove(this);
		this.map = new haxe.ds.StringMap();
	}
	,exists: function(component) {
		return this.existsType(Type.getClassName(Type.getClass(component)));
	}
	,existsType: function(type) {
		return this.map.exists(type);
	}
	,remove: function(component) {
		this._remove(component);
		this.engine.matchSystems(this);
	}
	,removeMany: function(components) {
		var _g = this;
		components.map(function(_) {
			_g._remove(_);
			return;
		});
		this.engine.matchSystems(this);
	}
	,removeType: function(type) {
		this._removeTypeName(Type.getClassName(type));
		this.engine.matchSystems(this);
	}
	,removeTypes: function(types) {
		var _g = this;
		types.map(function(_) {
			_g._removeTypeName(Type.getClassName(_));
			return;
		});
		this.engine.matchSystems(this);
	}
	,components: function() {
		return this.map.iterator();
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
	,key: function(component) {
		return Type.getClassName(Type.getClass(component));
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
	,clear: function() {
		var $it0 = this.systems();
		while( $it0.hasNext() ) {
			var system = $it0.next();
			this.remove(system);
		}
	}
	,insertBefore: function(ref,system) {
		var noderef = this.mapSystem.h[ref.__id__];
		if(null == noderef) throw "Phase.insertBefore: unable to find " + Std.string(ref) + " system";
		var node = this.createNode(system);
		if(noderef == this.first) {
			node.next = noderef;
			noderef.prev = node;
			this.first = node;
		} else {
			var prev = noderef.prev;
			prev.next = node;
			node.prev = prev;
			node.next = noderef;
			noderef.prev = node;
		}
	}
	,insertAfter: function(ref,system) {
		var noderef = this.mapSystem.h[ref.__id__];
		if(null == noderef) throw "Phase.insertAfter: unable to find " + Std.string(ref) + " system";
		var node = this.createNode(system);
		if(noderef == this.last) {
			node.prev = noderef;
			noderef.next = node;
			this.last = node;
		} else {
			var next = noderef.next;
			next.prev = node;
			node.next = next;
			node.prev = noderef;
			noderef.next = node;
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
	,removeType: function(cls) {
		var system;
		var key = Type.getClassName(cls);
		system = this.mapType.get(key);
		if(null == system) throw "type system " + Type.getClassName(cls) + " is not included in this Phase";
		this.remove(system);
		return;
	}
	,systems: function() {
		return new edge.core.NodeSystemIterator(this.first);
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
		var node = new edge.core.NodeSystem(system);
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
edge.View = function() {
	this.map = new haxe.ds.ObjectMap();
	this.count = 0;
};
edge.View.__name__ = ["edge","View"];
edge.View.prototype = {
	count: null
	,map: null
	,iterator: function() {
		var _g = this;
		var keys = this.map.keys();
		var holder = { entity : null, data : null};
		return { hasNext : function() {
			return keys.hasNext();
		}, next : function() {
			var key = keys.next();
			holder.entity = key;
			holder.data = _g.map.h[key.__id__];
			return holder;
		}};
	}
	,tryAdd: function(entity,data) {
		if(this.map.h.__keys__[entity.__id__] != null) return false;
		this.map.set(entity,data);
		this.count++;
		return true;
	}
	,tryRemove: function(entity) {
		if(!(this.map.h.__keys__[entity.__id__] != null)) return false;
		this.map.remove(entity);
		this.count--;
		return true;
	}
	,__class__: edge.View
};
edge.core.NodeSystem = function(system) {
	this.system = system;
};
edge.core.NodeSystem.__name__ = ["edge","core","NodeSystem"];
edge.core.NodeSystem.prototype = {
	system: null
	,next: null
	,prev: null
	,__class__: edge.core.NodeSystem
};
edge.core.NodeSystemIterator = function(node) {
	this.node = node;
};
edge.core.NodeSystemIterator.__name__ = ["edge","core","NodeSystemIterator"];
edge.core.NodeSystemIterator.prototype = {
	node: null
	,hasNext: function() {
		return null != this.node;
	}
	,next: function() {
		var system = this.node.system;
		this.node = this.node.next;
		return system;
	}
	,__class__: edge.core.NodeSystemIterator
};
var haxe = {};
haxe.StackItem = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.CallStack = function() { };
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe.CallStack.exceptionStack = function() {
	return [];
};
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe.CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
};
haxe.IMap = function() { };
haxe.IMap.__name__ = ["haxe","IMap"];
haxe.IMap.prototype = {
	get: null
	,keys: null
	,__class__: haxe.IMap
};
haxe.Log = function() { };
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
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
	,get: function(key) {
		return this.h[key.__id__];
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
haxe.io = {};
haxe.io.Bytes = function() { };
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.prototype = {
	length: null
	,b: null
	,__class__: haxe.io.Bytes
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
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
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js.Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.Boot.__nativeClassName = function(o) {
	var name = js.Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js.Boot.__isNativeObj = function(o) {
	return js.Boot.__nativeClassName(o) != null;
};
js.Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
js.html = {};
js.html.compat = {};
js.html.compat.ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else throw "TODO";
};
js.html.compat.ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js.html.compat.ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js.html.compat.ArrayBuffer.prototype = {
	byteLength: null
	,a: null
	,slice: function(begin,end) {
		return new js.html.compat.ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js.html.compat.ArrayBuffer
};
js.html.compat.Uint8Array = function() { };
js.html.compat.Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js.html.compat.Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js.html.compat.ArrayBuffer(arr);
	} else if(js.Boot.__instanceof(arg1,js.html.compat.ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js.html.compat.ArrayBuffer(arr);
	} else throw "TODO";
	arr.subarray = js.html.compat.Uint8Array._subarray;
	arr.set = js.html.compat.Uint8Array._set;
	return arr;
};
js.html.compat.Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js.Boot.__instanceof(arg.buffer,js.html.compat.ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw "set() outside of range";
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw "set() outside of range";
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw "TODO";
};
js.html.compat.Uint8Array._subarray = function(start,end) {
	var t = this;
	return js.html.compat.Uint8Array._new(t.buffer,start + t.byteOffset,end == null?null:end - start);
};
var thx = {};
thx.core = {};
thx.core.Arrays = function() { };
thx.core.Arrays.__name__ = ["thx","core","Arrays"];
thx.core.Arrays.after = function(array,element) {
	return array.slice(HxOverrides.indexOf(array,element,0) + 1);
};
thx.core.Arrays.all = function(arr,predicate) {
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(!predicate(item)) return false;
	}
	return true;
};
thx.core.Arrays.any = function(arr,predicate) {
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(predicate(item)) return true;
	}
	return false;
};
thx.core.Arrays.at = function(arr,indexes) {
	return indexes.map(function(i) {
		return arr[i];
	});
};
thx.core.Arrays.before = function(array,element) {
	return array.slice(0,HxOverrides.indexOf(array,element,0));
};
thx.core.Arrays.compact = function(arr) {
	return arr.filter(function(v) {
		return null != v;
	});
};
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
thx.core.Arrays.cross = function(a,b) {
	var r = [];
	var _g = 0;
	while(_g < a.length) {
		var va = a[_g];
		++_g;
		var _g1 = 0;
		while(_g1 < b.length) {
			var vb = b[_g1];
			++_g1;
			r.push([va,vb]);
		}
	}
	return r;
};
thx.core.Arrays.crossMulti = function(array) {
	var acopy = array.slice();
	var result = acopy.shift().map(function(v) {
		return [v];
	});
	while(acopy.length > 0) {
		var array1 = acopy.shift();
		var tresult = result;
		result = [];
		var _g = 0;
		while(_g < array1.length) {
			var v1 = array1[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < tresult.length) {
				var ar = tresult[_g1];
				++_g1;
				var t = ar.slice();
				t.push(v1);
				result.push(t);
			}
		}
	}
	return result;
};
thx.core.Arrays.eachPair = function(array,callback) {
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		var _g3 = i;
		var _g2 = array.length;
		while(_g3 < _g2) {
			var j = _g3++;
			if(!callback(array[i],array[j])) return;
		}
	}
};
thx.core.Arrays.equals = function(a,b,equality) {
	if(a == null || b == null || a.length != b.length) return false;
	if(null == equality) equality = thx.core.Functions.equality;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(!equality(a[i],b[i])) return false;
	}
	return true;
};
thx.core.Arrays.extract = function(a,predicate) {
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(predicate(a[i])) return a.splice(i,1)[0];
	}
	return null;
};
thx.core.Arrays.find = function(array,predicate) {
	var _g = 0;
	while(_g < array.length) {
		var item = array[_g];
		++_g;
		if(predicate(item)) return item;
	}
	return null;
};
thx.core.Arrays.findLast = function(array,predicate) {
	var len = array.length;
	var j;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		j = len - i - 1;
		if(predicate(array[j])) return array[j];
	}
	return null;
};
thx.core.Arrays.first = function(array) {
	return array[0];
};
thx.core.Arrays.flatMap = function(array,callback) {
	return thx.core.Arrays.flatten(array.map(callback));
};
thx.core.Arrays.flatten = function(array) {
	return Array.prototype.concat.apply([],array);
};
thx.core.Arrays.from = function(array,element) {
	return array.slice(HxOverrides.indexOf(array,element,0));
};
thx.core.Arrays.head = function(array) {
	return array[0];
};
thx.core.Arrays.ifEmpty = function(value,alt) {
	if(null != value && 0 != value.length) return value; else return alt;
};
thx.core.Arrays.initial = function(array) {
	return array.slice(0,array.length - 1);
};
thx.core.Arrays.isEmpty = function(array) {
	return array.length == 0;
};
thx.core.Arrays.last = function(array) {
	return array[array.length - 1];
};
thx.core.Arrays.mapi = function(array,callback) {
	var r = [];
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		r.push(callback(array[i],i));
	}
	return r;
};
thx.core.Arrays.mapRight = function(array,callback) {
	var i = array.length;
	var result = [];
	while(--i >= 0) result.push(callback(array[i]));
	return result;
};
thx.core.Arrays.order = function(array,sort) {
	var n = array.slice();
	n.sort(sort);
	return n;
};
thx.core.Arrays.pull = function(array,toRemove,equality) {
	var _g = 0;
	while(_g < toRemove.length) {
		var item = toRemove[_g];
		++_g;
		thx.core.Arrays.removeAll(array,item,equality);
	}
};
thx.core.Arrays.pushIf = function(array,condition,value) {
	if(condition) array.push(value);
	return array;
};
thx.core.Arrays.reduce = function(array,callback,initial) {
	return array.reduce(callback,initial);
};
thx.core.Arrays.resize = function(array,length,fill) {
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx.core.Arrays.reducei = function(array,callback,initial) {
	return array.reduce(callback,initial);
};
thx.core.Arrays.reduceRight = function(array,callback,initial) {
	var i = array.length;
	while(--i >= 0) initial = callback(initial,array[i]);
	return initial;
};
thx.core.Arrays.removeAll = function(array,element,equality) {
	if(null == equality) equality = thx.core.Functions.equality;
	var i = array.length;
	while(--i >= 0) if(equality(array[i],element)) array.splice(i,1);
};
thx.core.Arrays.rest = function(array) {
	return array.slice(1);
};
thx.core.Arrays.sample = function(array,n) {
	n = thx.core.Ints.min(n,array.length);
	var copy = array.slice();
	var result = [];
	var _g = 0;
	while(_g < n) {
		var i = _g++;
		result.push(copy.splice(Std.random(copy.length),1)[0]);
	}
	return result;
};
thx.core.Arrays.sampleOne = function(array) {
	return array[Std.random(array.length)];
};
thx.core.Arrays.shuffle = function(a) {
	var t = thx.core.Ints.range(a.length);
	var array = [];
	while(t.length > 0) {
		var pos = Std.random(t.length);
		var index = t[pos];
		t.splice(pos,1);
		array.push(a[index]);
	}
	return array;
};
thx.core.Arrays.take = function(arr,n) {
	return arr.slice(0,n);
};
thx.core.Arrays.takeLast = function(arr,n) {
	return arr.slice(arr.length - n);
};
thx.core.Arrays.rotate = function(arr) {
	var result = [];
	var _g1 = 0;
	var _g = arr[0].length;
	while(_g1 < _g) {
		var i = _g1++;
		var row = [];
		result.push(row);
		var _g3 = 0;
		var _g2 = arr.length;
		while(_g3 < _g2) {
			var j = _g3++;
			row.push(arr[j][i]);
		}
	}
	return result;
};
thx.core.Arrays.zip = function(array1,array2) {
	var length = thx.core.Ints.min(array1.length,array2.length);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i]});
	}
	return array;
};
thx.core.Arrays.zip3 = function(array1,array2,array3) {
	var length = thx.core.ArrayInts.min([array1.length,array2.length,array3.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i]});
	}
	return array;
};
thx.core.Arrays.zip4 = function(array1,array2,array3,array4) {
	var length = thx.core.ArrayInts.min([array1.length,array2.length,array3.length,array4.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i], _3 : array4[i]});
	}
	return array;
};
thx.core.Arrays.zip5 = function(array1,array2,array3,array4,array5) {
	var length = thx.core.ArrayInts.min([array1.length,array2.length,array3.length,array4.length,array5.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i], _3 : array4[i], _4 : array5[i]});
	}
	return array;
};
thx.core.Arrays.unzip = function(array) {
	var a1 = [];
	var a2 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
	});
	return { _0 : a1, _1 : a2};
};
thx.core.Arrays.unzip3 = function(array) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
	});
	return { _0 : a1, _1 : a2, _2 : a3};
};
thx.core.Arrays.unzip4 = function(array) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
		a4.push(t._3);
	});
	return { _0 : a1, _1 : a2, _2 : a3, _3 : a4};
};
thx.core.Arrays.unzip5 = function(array) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	var a5 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
		a4.push(t._3);
		a5.push(t._4);
	});
	return { _0 : a1, _1 : a2, _2 : a3, _3 : a4, _4 : a5};
};
thx.core.ArrayFloats = function() { };
thx.core.ArrayFloats.__name__ = ["thx","core","ArrayFloats"];
thx.core.ArrayFloats.average = function(arr) {
	return thx.core.ArrayFloats.sum(arr) / arr.length;
};
thx.core.ArrayFloats.compact = function(arr) {
	return arr.filter(function(v) {
		return null != v && isFinite(v);
	});
};
thx.core.ArrayFloats.max = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(max,v) {
		if(v > max) return v; else return max;
	},arr[0]);
};
thx.core.ArrayFloats.min = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(min,v) {
		if(v < min) return v; else return min;
	},arr[0]);
};
thx.core.ArrayFloats.resize = function(array,length,fill) {
	if(fill == null) fill = 0.0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx.core.ArrayFloats.sum = function(arr) {
	return arr.reduce(function(tot,v) {
		return tot + v;
	},0.0);
};
thx.core.ArrayInts = function() { };
thx.core.ArrayInts.__name__ = ["thx","core","ArrayInts"];
thx.core.ArrayInts.average = function(arr) {
	return thx.core.ArrayInts.sum(arr) / arr.length;
};
thx.core.ArrayInts.max = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(max,v) {
		if(v > max) return v; else return max;
	},arr[0]);
};
thx.core.ArrayInts.min = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(min,v) {
		if(v < min) return v; else return min;
	},arr[0]);
};
thx.core.ArrayInts.resize = function(array,length,fill) {
	if(fill == null) fill = 0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx.core.ArrayInts.sum = function(arr) {
	return arr.reduce(function(tot,v) {
		return tot + v;
	},0);
};
thx.core.ArrayStrings = function() { };
thx.core.ArrayStrings.__name__ = ["thx","core","ArrayStrings"];
thx.core.ArrayStrings.compact = function(arr) {
	return arr.filter(function(v) {
		return !thx.core.Strings.isEmpty(v);
	});
};
thx.core.ArrayStrings.max = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(max,v) {
		if(v > max) return v; else return max;
	},arr[0]);
};
thx.core.ArrayStrings.min = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(min,v) {
		if(v < min) return v; else return min;
	},arr[0]);
};
thx.core.Functions0 = function() { };
thx.core.Functions0.__name__ = ["thx","core","Functions0"];
thx.core.Functions0.after = function(callback,n) {
	return function() {
		if(--n == 0) callback();
	};
};
thx.core.Functions0.join = function(fa,fb) {
	return function() {
		fa();
		fb();
	};
};
thx.core.Functions0.once = function(f) {
	return function() {
		var t = f;
		f = thx.core.Functions.noop;
		t();
	};
};
thx.core.Functions0.negate = function(callback) {
	return function() {
		return !callback();
	};
};
thx.core.Functions0.times = function(n,callback) {
	return function() {
		return thx.core.Ints.range(n).map(function(_) {
			return callback();
		});
	};
};
thx.core.Functions0.timesi = function(n,callback) {
	return function() {
		return thx.core.Ints.range(n).map(function(i) {
			return callback(i);
		});
	};
};
thx.core.Functions1 = function() { };
thx.core.Functions1.__name__ = ["thx","core","Functions1"];
thx.core.Functions1.compose = function(fa,fb) {
	return function(v) {
		return fa(fb(v));
	};
};
thx.core.Functions1.join = function(fa,fb) {
	return function(v) {
		fa(v);
		fb(v);
	};
};
thx.core.Functions1.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v) {
		return "" + Std.string(v);
	};
	var map = new haxe.ds.StringMap();
	return function(v1) {
		var key = resolver(v1);
		if(__map_reserved[key] != null?map.existsReserved(key):map.h.hasOwnProperty(key)) return __map_reserved[key] != null?map.getReserved(key):map.h[key];
		var result = callback(v1);
		if(__map_reserved[key] != null) map.setReserved(key,result); else map.h[key] = result;
		return result;
	};
};
thx.core.Functions1.negate = function(callback) {
	return function(v) {
		return !callback(v);
	};
};
thx.core.Functions1.noop = function(_) {
};
thx.core.Functions1.times = function(n,callback) {
	return function(value) {
		return thx.core.Ints.range(n).map(function(_) {
			return callback(value);
		});
	};
};
thx.core.Functions1.timesi = function(n,callback) {
	return function(value) {
		return thx.core.Ints.range(n).map(function(i) {
			return callback(value,i);
		});
	};
};
thx.core.Functions1.swapArguments = function(callback) {
	return function(a2,a1) {
		return callback(a1,a2);
	};
};
thx.core.Functions2 = function() { };
thx.core.Functions2.__name__ = ["thx","core","Functions2"];
thx.core.Functions2.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v1,v2) {
		return "" + Std.string(v1) + ":" + Std.string(v2);
	};
	var map = new haxe.ds.StringMap();
	return function(v11,v21) {
		var key = resolver(v11,v21);
		if(__map_reserved[key] != null?map.existsReserved(key):map.h.hasOwnProperty(key)) return __map_reserved[key] != null?map.getReserved(key):map.h[key];
		var result = callback(v11,v21);
		if(__map_reserved[key] != null) map.setReserved(key,result); else map.h[key] = result;
		return result;
	};
};
thx.core.Functions2.negate = function(callback) {
	return function(v1,v2) {
		return !callback(v1,v2);
	};
};
thx.core.Functions3 = function() { };
thx.core.Functions3.__name__ = ["thx","core","Functions3"];
thx.core.Functions3.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v1,v2,v3) {
		return "" + Std.string(v1) + ":" + Std.string(v2) + ":" + Std.string(v3);
	};
	var map = new haxe.ds.StringMap();
	return function(v11,v21,v31) {
		var key = resolver(v11,v21,v31);
		if(__map_reserved[key] != null?map.existsReserved(key):map.h.hasOwnProperty(key)) return __map_reserved[key] != null?map.getReserved(key):map.h[key];
		var result = callback(v11,v21,v31);
		if(__map_reserved[key] != null) map.setReserved(key,result); else map.h[key] = result;
		return result;
	};
};
thx.core.Functions3.negate = function(callback) {
	return function(v1,v2,v3) {
		return !callback(v1,v2,v3);
	};
};
thx.core.Functions = function() { };
thx.core.Functions.__name__ = ["thx","core","Functions"];
thx.core.Functions.constant = function(v) {
	return function() {
		return v;
	};
};
thx.core.Functions.equality = function(a,b) {
	return a == b;
};
thx.core.Functions.identity = function(value) {
	return value;
};
thx.core.Functions.noop = function() {
};
thx.core.Ints = function() { };
thx.core.Ints.__name__ = ["thx","core","Ints"];
thx.core.Ints.abs = function(v) {
	if(v < 0) return -v; else return v;
};
thx.core.Ints.canParse = function(s) {
	return thx.core.Ints.pattern_parse.match(s);
};
thx.core.Ints.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
};
thx.core.Ints.clampSym = function(v,max) {
	return thx.core.Ints.clamp(v,-max,max);
};
thx.core.Ints.compare = function(a,b) {
	return a - b;
};
thx.core.Ints.interpolate = function(f,a,b) {
	return Math.round(a + (b - a) * f);
};
thx.core.Ints.isEven = function(v) {
	return v % 2 == 0;
};
thx.core.Ints.isOdd = function(v) {
	return v % 2 != 0;
};
thx.core.Ints.max = function(a,b) {
	if(a > b) return a; else return b;
};
thx.core.Ints.min = function(a,b) {
	if(a < b) return a; else return b;
};
thx.core.Ints.parse = function(s,base) {
	var v = parseInt(s,base);
	if(isNaN(v)) return null; else return v;
};
thx.core.Ints.random = function(min,max) {
	if(min == null) min = 0;
	return Std.random(max + 1) + min;
};
thx.core.Ints.range = function(start,stop,step) {
	if(step == null) step = 1;
	if(null == stop) {
		stop = start;
		start = 0;
	}
	if((stop - start) / step == Infinity) throw "infinite range";
	var range = [];
	var i = -1;
	var j;
	if(step < 0) while((j = start + step * ++i) > stop) range.push(j); else while((j = start + step * ++i) < stop) range.push(j);
	return range;
};
thx.core.Ints.toString = function(value,base) {
	return value.toString(base);
};
thx.core.Ints.sign = function(value) {
	if(value < 0) return -1; else return 1;
};
thx.core.Ints.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
};
thx.core.Iterators = function() { };
thx.core.Iterators.__name__ = ["thx","core","Iterators"];
thx.core.Iterators.all = function(it,predicate) {
	while( it.hasNext() ) {
		var item = it.next();
		if(!predicate(item)) return false;
	}
	return true;
};
thx.core.Iterators.any = function(it,predicate) {
	while( it.hasNext() ) {
		var item = it.next();
		if(predicate(item)) return true;
	}
	return false;
};
thx.core.Iterators.eachPair = function(it,handler) {
	thx.core.Arrays.eachPair(thx.core.Iterators.toArray(it),handler);
};
thx.core.Iterators.filter = function(it,predicate) {
	return thx.core.Iterators.reduce(it,function(acc,item) {
		if(predicate(item)) acc.push(item);
		return acc;
	},[]);
};
thx.core.Iterators.find = function(it,f) {
	while( it.hasNext() ) {
		var item = it.next();
		if(f(item)) return item;
	}
	return null;
};
thx.core.Iterators.first = function(it) {
	if(it.hasNext()) return it.next(); else return null;
};
thx.core.Iterators.isEmpty = function(it) {
	return !it.hasNext();
};
thx.core.Iterators.isIterator = function(v) {
	var fields;
	if(Reflect.isObject(v) && null == Type.getClass(v)) fields = Reflect.fields(v); else fields = Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"next") || !Lambda.has(fields,"hasNext")) return false;
	return Reflect.isFunction(Reflect.field(v,"next")) && Reflect.isFunction(Reflect.field(v,"hasNext"));
};
thx.core.Iterators.last = function(it) {
	var buf = null;
	while(it.hasNext()) buf = it.next();
	return buf;
};
thx.core.Iterators.map = function(it,f) {
	var acc = [];
	while( it.hasNext() ) {
		var v = it.next();
		acc.push(f(v));
	}
	return acc;
};
thx.core.Iterators.mapi = function(it,f) {
	var acc = [];
	var i = 0;
	while( it.hasNext() ) {
		var v = it.next();
		acc.push(f(v,i++));
	}
	return acc;
};
thx.core.Iterators.order = function(it,sort) {
	var n = thx.core.Iterators.toArray(it);
	n.sort(sort);
	return n;
};
thx.core.Iterators.reduce = function(it,callback,initial) {
	thx.core.Iterators.map(it,function(v) {
		initial = callback(initial,v);
	});
	return initial;
};
thx.core.Iterators.reducei = function(it,callback,initial) {
	thx.core.Iterators.mapi(it,function(v,i) {
		initial = callback(initial,v,i);
	});
	return initial;
};
thx.core.Iterators.toArray = function(it) {
	var items = [];
	while( it.hasNext() ) {
		var item = it.next();
		items.push(item);
	}
	return items;
};
thx.core.Nil = { __ename__ : ["thx","core","Nil"], __constructs__ : ["nil"] };
thx.core.Nil.nil = ["nil",0];
thx.core.Nil.nil.__enum__ = thx.core.Nil;
thx.core.Strings = function() { };
thx.core.Strings.__name__ = ["thx","core","Strings"];
thx.core.Strings.after = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return ""; else return value.substring(pos + searchFor.length);
};
thx.core.Strings.capitalize = function(s) {
	return s.substring(0,1).toUpperCase() + s.substring(1);
};
thx.core.Strings.capitalizeWords = function(value,whiteSpaceOnly) {
	if(whiteSpaceOnly == null) whiteSpaceOnly = false;
	if(whiteSpaceOnly) return thx.core.Strings.UCWORDSWS.map(value.substring(0,1).toUpperCase() + value.substring(1),thx.core.Strings.upperMatch); else return thx.core.Strings.UCWORDS.map(value.substring(0,1).toUpperCase() + value.substring(1),thx.core.Strings.upperMatch);
};
thx.core.Strings.collapse = function(value) {
	return thx.core.Strings.WSG.replace(StringTools.trim(value)," ");
};
thx.core.Strings.compare = function(a,b) {
	if(a < b) return -1; else if(a > b) return 1; else return 0;
};
thx.core.Strings.contains = function(s,test) {
	return s.indexOf(test) >= 0;
};
thx.core.Strings.dasherize = function(s) {
	return StringTools.replace(s,"_","-");
};
thx.core.Strings.ellipsis = function(s,maxlen,symbol) {
	if(symbol == null) symbol = "...";
	if(maxlen == null) maxlen = 20;
	if(s.length > maxlen) return s.substring(0,symbol.length > maxlen - symbol.length?symbol.length:maxlen - symbol.length) + symbol; else return s;
};
thx.core.Strings.filter = function(s,predicate) {
	return s.split("").filter(predicate).join("");
};
thx.core.Strings.filterCharcode = function(s,predicate) {
	return thx.core.Strings.toCharcodeArray(s).filter(predicate).map(function(i) {
		return String.fromCharCode(i);
	}).join("");
};
thx.core.Strings.from = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return ""; else return value.substring(pos);
};
thx.core.Strings.humanize = function(s) {
	return StringTools.replace(thx.core.Strings.underscore(s),"_"," ");
};
thx.core.Strings.isAlphaNum = function(value) {
	return thx.core.Strings.ALPHANUM.match(value);
};
thx.core.Strings.isLowerCase = function(value) {
	return value.toLowerCase() == value;
};
thx.core.Strings.isUpperCase = function(value) {
	return value.toUpperCase() == value;
};
thx.core.Strings.ifEmpty = function(value,alt) {
	if(null != value && "" != value) return value; else return alt;
};
thx.core.Strings.isDigitsOnly = function(value) {
	return thx.core.Strings.DIGITS.match(value);
};
thx.core.Strings.isEmpty = function(value) {
	return value == null || value == "";
};
thx.core.Strings.iterator = function(s) {
	var _this = s.split("");
	return HxOverrides.iter(_this);
};
thx.core.Strings.map = function(value,callback) {
	return value.split("").map(callback);
};
thx.core.Strings.remove = function(value,toremove) {
	return StringTools.replace(value,toremove,"");
};
thx.core.Strings.removeAfter = function(value,toremove) {
	if(StringTools.endsWith(value,toremove)) return value.substring(0,value.length - toremove.length); else return value;
};
thx.core.Strings.removeBefore = function(value,toremove) {
	if(StringTools.startsWith(value,toremove)) return value.substring(toremove.length); else return value;
};
thx.core.Strings.repeat = function(s,times) {
	return ((function($this) {
		var $r;
		var _g = [];
		{
			var _g1 = 0;
			while(_g1 < times) {
				var i = _g1++;
				_g.push(s);
			}
		}
		$r = _g;
		return $r;
	}(this))).join("");
};
thx.core.Strings.reverse = function(s) {
	var arr = s.split("");
	arr.reverse();
	return arr.join("");
};
thx.core.Strings.stripTags = function(s) {
	return thx.core.Strings.STRIPTAGS.replace(s,"");
};
thx.core.Strings.surround = function(s,left,right) {
	return "" + left + s + (null == right?left:right);
};
thx.core.Strings.toArray = function(s) {
	return s.split("");
};
thx.core.Strings.toCharcodeArray = function(s) {
	return thx.core.Strings.map(s,function(s1) {
		return HxOverrides.cca(s1,0);
	});
};
thx.core.Strings.toChunks = function(s,len) {
	var chunks = [];
	while(s.length > 0) {
		chunks.push(s.substring(0,len));
		s = s.substring(len);
	}
	return chunks;
};
thx.core.Strings.trimChars = function(value,charlist) {
	return thx.core.Strings.trimCharsRight(thx.core.Strings.trimCharsLeft(value,charlist),charlist);
};
thx.core.Strings.trimCharsLeft = function(value,charlist) {
	var pos = 0;
	var _g1 = 0;
	var _g = value.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(thx.core.Strings.contains(charlist,value.charAt(i))) pos++; else break;
	}
	return value.substring(pos);
};
thx.core.Strings.trimCharsRight = function(value,charlist) {
	var len = value.length;
	var pos = len;
	var i;
	var _g = 0;
	while(_g < len) {
		var j = _g++;
		i = len - j - 1;
		if(thx.core.Strings.contains(charlist,value.charAt(i))) pos = i; else break;
	}
	return value.substring(0,pos);
};
thx.core.Strings.underscore = function(s) {
	s = new EReg("::","g").replace(s,"/");
	s = new EReg("([A-Z]+)([A-Z][a-z])","g").replace(s,"$1_$2");
	s = new EReg("([a-z\\d])([A-Z])","g").replace(s,"$1_$2");
	s = new EReg("-","g").replace(s,"_");
	return s.toLowerCase();
};
thx.core.Strings.upTo = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return value; else return value.substring(0,pos);
};
thx.core.Strings.wrapColumns = function(s,columns,indent,newline) {
	if(newline == null) newline = "\n";
	if(indent == null) indent = "";
	if(columns == null) columns = 78;
	return thx.core.Strings.SPLIT_LINES.split(s).map(function(part) {
		return thx.core.Strings.wrapLine(StringTools.trim(thx.core.Strings.WSG.replace(part," ")),columns,indent,newline);
	}).join(newline);
};
thx.core.Strings.upperMatch = function(re) {
	return re.matched(0).toUpperCase();
};
thx.core.Strings.wrapLine = function(s,columns,indent,newline) {
	var parts = [];
	var pos = 0;
	var len = s.length;
	var ilen = indent.length;
	columns -= ilen;
	while(true) {
		if(pos + columns >= len - ilen) {
			parts.push(s.substring(pos));
			break;
		}
		var i = 0;
		while(!StringTools.isSpace(s,pos + columns - i) && i < columns) i++;
		if(i == columns) {
			i = 0;
			while(!StringTools.isSpace(s,pos + columns + i) && pos + columns + i < len) i++;
			parts.push(s.substring(pos,pos + columns + i));
			pos += columns + i + 1;
		} else {
			parts.push(s.substring(pos,pos + columns - i));
			pos += columns - i + 1;
		}
	}
	return indent + parts.join(newline + indent);
};
thx.core._Tuple = {};
thx.core._Tuple.Tuple0_Impl_ = {};
thx.core._Tuple.Tuple0_Impl_.__name__ = ["thx","core","_Tuple","Tuple0_Impl_"];
thx.core._Tuple.Tuple0_Impl_._new = function() {
	return thx.core.Nil.nil;
};
thx.core._Tuple.Tuple0_Impl_["with"] = function(this1,v) {
	return v;
};
thx.core._Tuple.Tuple0_Impl_.toString = function(this1) {
	return "Tuple0()";
};
thx.core._Tuple.Tuple0_Impl_.toNil = function(this1) {
	return this1;
};
thx.core._Tuple.Tuple0_Impl_.nilToTuple = function(v) {
	return thx.core.Nil.nil;
};
thx.core._Tuple.Tuple1_Impl_ = {};
thx.core._Tuple.Tuple1_Impl_.__name__ = ["thx","core","_Tuple","Tuple1_Impl_"];
thx.core._Tuple.Tuple1_Impl_._new = function(_0) {
	return _0;
};
thx.core._Tuple.Tuple1_Impl_.get__0 = function(this1) {
	return this1;
};
thx.core._Tuple.Tuple1_Impl_["with"] = function(this1,v) {
	return { _0 : this1, _1 : v};
};
thx.core._Tuple.Tuple1_Impl_.toString = function(this1) {
	return "Tuple1(" + Std.string(this1) + ")";
};
thx.core._Tuple.Tuple2_Impl_ = {};
thx.core._Tuple.Tuple2_Impl_.__name__ = ["thx","core","_Tuple","Tuple2_Impl_"];
thx.core._Tuple.Tuple2_Impl_._new = function(_0,_1) {
	return { _0 : _0, _1 : _1};
};
thx.core._Tuple.Tuple2_Impl_.get_left = function(this1) {
	return this1._0;
};
thx.core._Tuple.Tuple2_Impl_.get_right = function(this1) {
	return this1._1;
};
thx.core._Tuple.Tuple2_Impl_.flip = function(this1) {
	return { _0 : this1._1, _1 : this1._0};
};
thx.core._Tuple.Tuple2_Impl_.dropLeft = function(this1) {
	return this1._1;
};
thx.core._Tuple.Tuple2_Impl_.dropRight = function(this1) {
	return this1._0;
};
thx.core._Tuple.Tuple2_Impl_["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : v};
};
thx.core._Tuple.Tuple2_Impl_.toString = function(this1) {
	return "Tuple2(" + Std.string(this1._0) + "," + Std.string(this1._1) + ")";
};
thx.core._Tuple.Tuple3_Impl_ = {};
thx.core._Tuple.Tuple3_Impl_.__name__ = ["thx","core","_Tuple","Tuple3_Impl_"];
thx.core._Tuple.Tuple3_Impl_._new = function(_0,_1,_2) {
	return { _0 : _0, _1 : _1, _2 : _2};
};
thx.core._Tuple.Tuple3_Impl_.flip = function(this1) {
	return { _0 : this1._2, _1 : this1._1, _2 : this1._0};
};
thx.core._Tuple.Tuple3_Impl_.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2};
};
thx.core._Tuple.Tuple3_Impl_.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1};
};
thx.core._Tuple.Tuple3_Impl_["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : v};
};
thx.core._Tuple.Tuple3_Impl_.toString = function(this1) {
	return "Tuple3(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + ")";
};
thx.core._Tuple.Tuple4_Impl_ = {};
thx.core._Tuple.Tuple4_Impl_.__name__ = ["thx","core","_Tuple","Tuple4_Impl_"];
thx.core._Tuple.Tuple4_Impl_._new = function(_0,_1,_2,_3) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
};
thx.core._Tuple.Tuple4_Impl_.flip = function(this1) {
	return { _0 : this1._3, _1 : this1._2, _2 : this1._1, _3 : this1._0};
};
thx.core._Tuple.Tuple4_Impl_.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3};
};
thx.core._Tuple.Tuple4_Impl_.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2};
};
thx.core._Tuple.Tuple4_Impl_["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : v};
};
thx.core._Tuple.Tuple4_Impl_.toString = function(this1) {
	return "Tuple4(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + ")";
};
thx.core._Tuple.Tuple5_Impl_ = {};
thx.core._Tuple.Tuple5_Impl_.__name__ = ["thx","core","_Tuple","Tuple5_Impl_"];
thx.core._Tuple.Tuple5_Impl_._new = function(_0,_1,_2,_3,_4) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4};
};
thx.core._Tuple.Tuple5_Impl_.flip = function(this1) {
	return { _0 : this1._4, _1 : this1._3, _2 : this1._2, _3 : this1._1, _4 : this1._0};
};
thx.core._Tuple.Tuple5_Impl_.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3, _3 : this1._4};
};
thx.core._Tuple.Tuple5_Impl_.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3};
};
thx.core._Tuple.Tuple5_Impl_["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : this1._4, _5 : v};
};
thx.core._Tuple.Tuple5_Impl_.toString = function(this1) {
	return "Tuple5(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + "," + Std.string(this1._4) + ")";
};
thx.core._Tuple.Tuple6_Impl_ = {};
thx.core._Tuple.Tuple6_Impl_.__name__ = ["thx","core","_Tuple","Tuple6_Impl_"];
thx.core._Tuple.Tuple6_Impl_._new = function(_0,_1,_2,_3,_4,_5) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4, _5 : _5};
};
thx.core._Tuple.Tuple6_Impl_.flip = function(this1) {
	return { _0 : this1._5, _1 : this1._4, _2 : this1._3, _3 : this1._2, _4 : this1._1, _5 : this1._0};
};
thx.core._Tuple.Tuple6_Impl_.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3, _3 : this1._4, _4 : this1._5};
};
thx.core._Tuple.Tuple6_Impl_.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : this1._4};
};
thx.core._Tuple.Tuple6_Impl_.toString = function(this1) {
	return "Tuple6(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + "," + Std.string(this1._4) + "," + Std.string(this1._5) + ")";
};
thx.core.Types = function() { };
thx.core.Types.__name__ = ["thx","core","Types"];
thx.core.Types.isAnonymousObject = function(v) {
	return Reflect.isObject(v) && null == Type.getClass(v);
};
thx.core.Types.isPrimitive = function(v) {
	{
		var _g = Type["typeof"](v);
		switch(_g[1]) {
		case 1:case 2:case 3:
			return true;
		case 0:case 5:case 7:case 4:case 8:
			return false;
		case 6:
			var c = _g[2];
			return Type.getClassName(c) == "String";
		}
	}
};
thx.core.Types.hasSuperClass = function(cls,sup) {
	while(null != cls) {
		if(cls == sup) return true;
		cls = Type.getSuperClass(cls);
	}
	return false;
};
thx.core.Types.sameType = function(a,b) {
	return thx.core.Types.typeToString(Type["typeof"](a)) == thx.core.Types.typeToString(Type["typeof"](b));
};
thx.core.Types.typeInheritance = function(type) {
	switch(type[1]) {
	case 1:
		return ["Int"];
	case 2:
		return ["Float"];
	case 3:
		return ["Bool"];
	case 4:
		return ["{}"];
	case 5:
		return ["Function"];
	case 6:
		var c = type[2];
		var classes = [];
		while(null != c) {
			classes.push(c);
			c = Type.getSuperClass(c);
		}
		return classes.map(Type.getClassName);
	case 7:
		var e = type[2];
		return [Type.getEnumName(e)];
	default:
		throw "invalid type " + Std.string(type);
	}
};
thx.core.Types.typeToString = function(type) {
	switch(type[1]) {
	case 0:
		return "Null";
	case 1:
		return "Int";
	case 2:
		return "Float";
	case 3:
		return "Bool";
	case 4:
		return "{}";
	case 5:
		return "Function";
	case 6:
		var c = type[2];
		return Type.getClassName(c);
	case 7:
		var e = type[2];
		return Type.getEnumName(e);
	default:
		throw "invalid type " + Std.string(type);
	}
};
thx.core.Types.valueTypeInheritance = function(value) {
	return thx.core.Types.typeInheritance(Type["typeof"](value));
};
thx.core.Types.valueTypeToString = function(value) {
	return thx.core.Types.typeToString(Type["typeof"](value));
};
var utest = {};
utest.Assert = function() { };
utest.Assert.__name__ = ["utest","Assert"];
utest.Assert.isTrue = function(cond,msg,pos) {
	if(utest.Assert.results == null) throw "Assert.results is not currently bound to any assert context";
	if(null == msg) msg = "expected true";
	if(cond) utest.Assert.results.add(utest.Assertation.Success(pos)); else utest.Assert.results.add(utest.Assertation.Failure(msg,pos));
};
utest.Assert.isFalse = function(value,msg,pos) {
	if(null == msg) msg = "expected false";
	utest.Assert.isTrue(value == false,msg,pos);
};
utest.Assert.isNull = function(value,msg,pos) {
	if(msg == null) msg = "expected null but was " + utest.Assert.q(value);
	utest.Assert.isTrue(value == null,msg,pos);
};
utest.Assert.notNull = function(value,msg,pos) {
	if(null == msg) msg = "expected not null";
	utest.Assert.isTrue(value != null,msg,pos);
};
utest.Assert["is"] = function(value,type,msg,pos) {
	if(msg == null) msg = "expected type " + utest.Assert.typeToString(type) + " but was " + utest.Assert.typeToString(value);
	utest.Assert.isTrue(js.Boot.__instanceof(value,type),msg,pos);
};
utest.Assert.notEquals = function(expected,value,msg,pos) {
	if(msg == null) msg = "expected " + utest.Assert.q(expected) + " and testa value " + utest.Assert.q(value) + " should be different";
	utest.Assert.isFalse(expected == value,msg,pos);
};
utest.Assert.equals = function(expected,value,msg,pos) {
	if(msg == null) msg = "expected " + utest.Assert.q(expected) + " but was " + utest.Assert.q(value);
	utest.Assert.isTrue(expected == value,msg,pos);
};
utest.Assert.match = function(pattern,value,msg,pos) {
	if(msg == null) msg = "the value " + utest.Assert.q(value) + "does not match the provided pattern";
	utest.Assert.isTrue(pattern.match(value),msg,pos);
};
utest.Assert.floatEquals = function(expected,value,approx,msg,pos) {
	if(msg == null) msg = "expected " + utest.Assert.q(expected) + " but was " + utest.Assert.q(value);
	utest.Assert.isTrue(utest.Assert._floatEquals(expected,value,approx),msg,pos);
	return;
};
utest.Assert._floatEquals = function(expected,value,approx) {
	if(isNaN(expected)) return isNaN(value); else if(isNaN(value)) return false; else if(!isFinite(expected) && !isFinite(value)) return expected > 0 == value > 0;
	if(null == approx) approx = 1e-5;
	return Math.abs(value - expected) < approx;
};
utest.Assert.getTypeName = function(v) {
	{
		var _g = Type["typeof"](v);
		switch(_g[1]) {
		case 0:
			return "[null]";
		case 1:
			return "Int";
		case 2:
			return "Float";
		case 3:
			return "Bool";
		case 5:
			return "function";
		case 6:
			var c = _g[2];
			return Type.getClassName(c);
		case 7:
			var e = _g[2];
			return Type.getEnumName(e);
		case 4:
			return "Object";
		case 8:
			return "Unknown";
		}
	}
};
utest.Assert.isIterable = function(v,isAnonym) {
	var fields;
	if(isAnonym) fields = Reflect.fields(v); else fields = Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"iterator")) return false;
	return Reflect.isFunction(Reflect.field(v,"iterator"));
};
utest.Assert.isIterator = function(v,isAnonym) {
	var fields;
	if(isAnonym) fields = Reflect.fields(v); else fields = Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"next") || !Lambda.has(fields,"hasNext")) return false;
	return Reflect.isFunction(Reflect.field(v,"next")) && Reflect.isFunction(Reflect.field(v,"hasNext"));
};
utest.Assert.sameAs = function(expected,value,status) {
	var texpected = utest.Assert.getTypeName(expected);
	var tvalue = utest.Assert.getTypeName(value);
	if(texpected != tvalue) {
		status.error = "expected type " + texpected + " but it is " + tvalue + (status.path == ""?"":" for field " + status.path);
		return false;
	}
	{
		var _g = Type["typeof"](expected);
		switch(_g[1]) {
		case 2:
			if(!utest.Assert._floatEquals(expected,value)) {
				status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			return true;
		case 0:case 1:case 3:
			if(expected != value) {
				status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			return true;
		case 5:
			if(!Reflect.compareMethods(expected,value)) {
				status.error = "expected same function reference" + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			return true;
		case 6:
			var c = _g[2];
			var cexpected = Type.getClassName(c);
			var cvalue = Type.getClassName(Type.getClass(value));
			if(cexpected != cvalue) {
				status.error = "expected instance of " + utest.Assert.q(cexpected) + " but it is " + utest.Assert.q(cvalue) + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			if(typeof(expected) == "string" && expected != value) {
				status.error = "expected '" + Std.string(expected) + "' but it is '" + Std.string(value) + "'";
				return false;
			}
			if((expected instanceof Array) && expected.__enum__ == null) {
				if(status.recursive || status.path == "") {
					if(expected.length != value.length) {
						status.error = "expected " + Std.string(expected.length) + " elements but they were " + Std.string(value.length) + (status.path == ""?"":" for field " + status.path);
						return false;
					}
					var path = status.path;
					var _g2 = 0;
					var _g1 = expected.length;
					while(_g2 < _g1) {
						var i = _g2++;
						if(path == "") status.path = "array[" + i + "]"; else status.path = path + "[" + i + "]";
						if(!utest.Assert.sameAs(expected[i],value[i],status)) {
							status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
							return false;
						}
					}
				}
				return true;
			}
			if(js.Boot.__instanceof(expected,Date)) {
				if(expected.getTime() != value.getTime()) {
					status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				return true;
			}
			if(js.Boot.__instanceof(expected,haxe.io.Bytes)) {
				if(status.recursive || status.path == "") {
					var ebytes = expected;
					var vbytes = value;
					if(ebytes.length != vbytes.length) return false;
					var _g21 = 0;
					var _g11 = ebytes.length;
					while(_g21 < _g11) {
						var i1 = _g21++;
						if(ebytes.b[i1] != vbytes.b[i1]) {
							status.error = "expected byte " + ebytes.b[i1] + " but wss " + ebytes.b[i1] + (status.path == ""?"":" for field " + status.path);
							return false;
						}
					}
				}
				return true;
			}
			if(js.Boot.__instanceof(expected,haxe.IMap)) {
				if(status.recursive || status.path == "") {
					var map;
					map = js.Boot.__cast(expected , haxe.IMap);
					var vmap;
					vmap = js.Boot.__cast(value , haxe.IMap);
					var keys;
					var _g12 = [];
					var $it0 = map.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						_g12.push(k);
					}
					keys = _g12;
					var vkeys;
					var _g22 = [];
					var $it1 = vmap.keys();
					while( $it1.hasNext() ) {
						var k1 = $it1.next();
						_g22.push(k1);
					}
					vkeys = _g22;
					if(keys.length != vkeys.length) {
						status.error = "expected " + keys.length + " keys but they were " + vkeys.length + (status.path == ""?"":" for field " + status.path);
						return false;
					}
					var path1 = status.path;
					var _g3 = 0;
					while(_g3 < keys.length) {
						var key = keys[_g3];
						++_g3;
						if(path1 == "") status.path = "hash[" + Std.string(key) + "]"; else status.path = path1 + "[" + Std.string(key) + "]";
						if(!utest.Assert.sameAs(map.get(key),vmap.get(key),status)) {
							status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
							return false;
						}
					}
				}
				return true;
			}
			if(utest.Assert.isIterator(expected,false)) {
				if(status.recursive || status.path == "") {
					var evalues = Lambda.array({ iterator : function() {
						return expected;
					}});
					var vvalues = Lambda.array({ iterator : function() {
						return value;
					}});
					if(evalues.length != vvalues.length) {
						status.error = "expected " + evalues.length + " values in Iterator but they were " + vvalues.length + (status.path == ""?"":" for field " + status.path);
						return false;
					}
					var path2 = status.path;
					var _g23 = 0;
					var _g13 = evalues.length;
					while(_g23 < _g13) {
						var i2 = _g23++;
						if(path2 == "") status.path = "iterator[" + i2 + "]"; else status.path = path2 + "[" + i2 + "]";
						if(!utest.Assert.sameAs(evalues[i2],vvalues[i2],status)) {
							status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
							return false;
						}
					}
				}
				return true;
			}
			if(utest.Assert.isIterable(expected,false)) {
				if(status.recursive || status.path == "") {
					var evalues1 = Lambda.array(expected);
					var vvalues1 = Lambda.array(value);
					if(evalues1.length != vvalues1.length) {
						status.error = "expected " + evalues1.length + " values in Iterable but they were " + vvalues1.length + (status.path == ""?"":" for field " + status.path);
						return false;
					}
					var path3 = status.path;
					var _g24 = 0;
					var _g14 = evalues1.length;
					while(_g24 < _g14) {
						var i3 = _g24++;
						if(path3 == "") status.path = "iterable[" + i3 + "]"; else status.path = path3 + "[" + i3 + "]";
						if(!utest.Assert.sameAs(evalues1[i3],vvalues1[i3],status)) return false;
					}
				}
				return true;
			}
			if(status.recursive || status.path == "") {
				var fields = Type.getInstanceFields(Type.getClass(expected));
				var path4 = status.path;
				var _g15 = 0;
				while(_g15 < fields.length) {
					var field = fields[_g15];
					++_g15;
					if(path4 == "") status.path = field; else status.path = path4 + "." + field;
					var e = Reflect.field(expected,field);
					if(Reflect.isFunction(e)) continue;
					var v = Reflect.field(value,field);
					if(!utest.Assert.sameAs(e,v,status)) return false;
				}
			}
			return true;
		case 7:
			var e1 = _g[2];
			var eexpected = Type.getEnumName(e1);
			var evalue = Type.getEnumName(Type.getEnum(value));
			if(eexpected != evalue) {
				status.error = "expected enumeration of " + utest.Assert.q(eexpected) + " but it is " + utest.Assert.q(evalue) + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			if(status.recursive || status.path == "") {
				if(Type.enumIndex(expected) != Type.enumIndex(value)) {
					status.error = "expected " + utest.Assert.q(Type.enumConstructor(expected)) + " but is " + utest.Assert.q(Type.enumConstructor(value)) + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var eparams = Type.enumParameters(expected);
				var vparams = Type.enumParameters(value);
				var path5 = status.path;
				var _g25 = 0;
				var _g16 = eparams.length;
				while(_g25 < _g16) {
					var i4 = _g25++;
					if(path5 == "") status.path = "enum[" + i4 + "]"; else status.path = path5 + "[" + i4 + "]";
					if(!utest.Assert.sameAs(eparams[i4],vparams[i4],status)) {
						status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
						return false;
					}
				}
			}
			return true;
		case 4:
			if(status.recursive || status.path == "") {
				var tfields = Reflect.fields(value);
				var fields1 = Reflect.fields(expected);
				var path6 = status.path;
				var _g17 = 0;
				while(_g17 < fields1.length) {
					var field1 = fields1[_g17];
					++_g17;
					HxOverrides.remove(tfields,field1);
					if(path6 == "") status.path = field1; else status.path = path6 + "." + field1;
					if(!Object.prototype.hasOwnProperty.call(value,field1)) {
						status.error = "expected field " + status.path + " does not exist in " + utest.Assert.q(value);
						return false;
					}
					var e2 = Reflect.field(expected,field1);
					if(Reflect.isFunction(e2)) continue;
					var v1 = Reflect.field(value,field1);
					if(!utest.Assert.sameAs(e2,v1,status)) return false;
				}
				if(tfields.length > 0) {
					status.error = "the tested object has extra field(s) (" + tfields.join(", ") + ") not included in the expected ones";
					return false;
				}
			}
			if(utest.Assert.isIterator(expected,true)) {
				if(!utest.Assert.isIterator(value,true)) {
					status.error = "expected Iterable but it is not " + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				if(status.recursive || status.path == "") {
					var evalues2 = Lambda.array({ iterator : function() {
						return expected;
					}});
					var vvalues2 = Lambda.array({ iterator : function() {
						return value;
					}});
					if(evalues2.length != vvalues2.length) {
						status.error = "expected " + evalues2.length + " values in Iterator but they were " + vvalues2.length + (status.path == ""?"":" for field " + status.path);
						return false;
					}
					var path7 = status.path;
					var _g26 = 0;
					var _g18 = evalues2.length;
					while(_g26 < _g18) {
						var i5 = _g26++;
						if(path7 == "") status.path = "iterator[" + i5 + "]"; else status.path = path7 + "[" + i5 + "]";
						if(!utest.Assert.sameAs(evalues2[i5],vvalues2[i5],status)) {
							status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
							return false;
						}
					}
				}
				return true;
			}
			if(utest.Assert.isIterable(expected,true)) {
				if(!utest.Assert.isIterable(value,true)) {
					status.error = "expected Iterator but it is not " + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				if(status.recursive || status.path == "") {
					var evalues3 = Lambda.array(expected);
					var vvalues3 = Lambda.array(value);
					if(evalues3.length != vvalues3.length) {
						status.error = "expected " + evalues3.length + " values in Iterable but they were " + vvalues3.length + (status.path == ""?"":" for field " + status.path);
						return false;
					}
					var path8 = status.path;
					var _g27 = 0;
					var _g19 = evalues3.length;
					while(_g27 < _g19) {
						var i6 = _g27++;
						if(path8 == "") status.path = "iterable[" + i6 + "]"; else status.path = path8 + "[" + i6 + "]";
						if(!utest.Assert.sameAs(evalues3[i6],vvalues3[i6],status)) return false;
					}
				}
				return true;
			}
			return true;
		case 8:
			throw "Unable to compare two unknown types";
			break;
		}
	}
	throw "Unable to compare values: " + utest.Assert.q(expected) + " and " + utest.Assert.q(value);
};
utest.Assert.q = function(v) {
	if(typeof(v) == "string") return "\"" + StringTools.replace(v,"\"","\\\"") + "\""; else return Std.string(v);
};
utest.Assert.same = function(expected,value,recursive,msg,pos) {
	var status = { recursive : null == recursive?true:recursive, path : "", error : null};
	if(utest.Assert.sameAs(expected,value,status)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?status.error:msg,pos);
};
utest.Assert.raises = function(method,type,msgNotThrown,msgWrongType,pos) {
	if(type == null) type = String;
	try {
		method();
		var name = Type.getClassName(type);
		if(name == null) name = "" + Std.string(type);
		if(null == msgNotThrown) msgNotThrown = "exception of type " + name + " not raised";
		utest.Assert.fail(msgNotThrown,pos);
	} catch( ex ) {
		var name1 = Type.getClassName(type);
		if(name1 == null) name1 = "" + Std.string(type);
		if(null == msgWrongType) msgWrongType = "expected throw of type " + name1 + " but was " + Std.string(ex);
		utest.Assert.isTrue(js.Boot.__instanceof(ex,type),msgWrongType,pos);
	}
};
utest.Assert.allows = function(possibilities,value,msg,pos) {
	if(Lambda.has(possibilities,value)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"value " + utest.Assert.q(value) + " not found in the expected possibilities " + Std.string(possibilities):msg,pos);
};
utest.Assert.contains = function(match,values,msg,pos) {
	if(Lambda.has(values,match)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"values " + utest.Assert.q(values) + " do not contain " + Std.string(match):msg,pos);
};
utest.Assert.notContains = function(match,values,msg,pos) {
	if(!Lambda.has(values,match)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"values " + utest.Assert.q(values) + " do contain " + Std.string(match):msg,pos);
};
utest.Assert.stringContains = function(match,value,msg,pos) {
	if(value != null && value.indexOf(match) >= 0) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"value " + utest.Assert.q(value) + " does not contain " + utest.Assert.q(match):msg,pos);
};
utest.Assert.stringSequence = function(sequence,value,msg,pos) {
	if(null == value) {
		utest.Assert.fail(msg == null?"null argument value":msg,pos);
		return;
	}
	var p = 0;
	var _g = 0;
	while(_g < sequence.length) {
		var s = sequence[_g];
		++_g;
		var p2 = value.indexOf(s,p);
		if(p2 < 0) {
			if(msg == null) {
				msg = "expected '" + s + "' after ";
				if(p > 0) {
					var cut = HxOverrides.substr(value,0,p);
					if(cut.length > 30) cut = "..." + HxOverrides.substr(cut,-27,null);
					msg += " '" + cut + "'";
				} else msg += " begin";
			}
			utest.Assert.fail(msg,pos);
			return;
		}
		p = p2 + s.length;
	}
	utest.Assert.isTrue(true,msg,pos);
};
utest.Assert.fail = function(msg,pos) {
	if(msg == null) msg = "failure expected";
	utest.Assert.isTrue(false,msg,pos);
};
utest.Assert.warn = function(msg) {
	utest.Assert.results.add(utest.Assertation.Warning(msg));
};
utest.Assert.createAsync = function(f,timeout) {
	return function() {
	};
};
utest.Assert.createEvent = function(f,timeout) {
	return function(e) {
	};
};
utest.Assert.typeToString = function(t) {
	try {
		var _t = Type.getClass(t);
		if(_t != null) t = _t;
	} catch( e ) {
	}
	try {
		return Type.getClassName(t);
	} catch( e1 ) {
	}
	try {
		var _t1 = Type.getEnum(t);
		if(_t1 != null) t = _t1;
	} catch( e2 ) {
	}
	try {
		return Type.getEnumName(t);
	} catch( e3 ) {
	}
	try {
		return Std.string(Type["typeof"](t));
	} catch( e4 ) {
	}
	try {
		return Std.string(t);
	} catch( e5 ) {
	}
	return "<unable to retrieve type name>";
};
utest.Assertation = { __ename__ : ["utest","Assertation"], __constructs__ : ["Success","Failure","Error","SetupError","TeardownError","TimeoutError","AsyncError","Warning"] };
utest.Assertation.Success = function(pos) { var $x = ["Success",0,pos]; $x.__enum__ = utest.Assertation; return $x; };
utest.Assertation.Failure = function(msg,pos) { var $x = ["Failure",1,msg,pos]; $x.__enum__ = utest.Assertation; return $x; };
utest.Assertation.Error = function(e,stack) { var $x = ["Error",2,e,stack]; $x.__enum__ = utest.Assertation; return $x; };
utest.Assertation.SetupError = function(e,stack) { var $x = ["SetupError",3,e,stack]; $x.__enum__ = utest.Assertation; return $x; };
utest.Assertation.TeardownError = function(e,stack) { var $x = ["TeardownError",4,e,stack]; $x.__enum__ = utest.Assertation; return $x; };
utest.Assertation.TimeoutError = function(missedAsyncs,stack) { var $x = ["TimeoutError",5,missedAsyncs,stack]; $x.__enum__ = utest.Assertation; return $x; };
utest.Assertation.AsyncError = function(e,stack) { var $x = ["AsyncError",6,e,stack]; $x.__enum__ = utest.Assertation; return $x; };
utest.Assertation.Warning = function(msg) { var $x = ["Warning",7,msg]; $x.__enum__ = utest.Assertation; return $x; };
utest._Dispatcher = {};
utest._Dispatcher.EventException = { __ename__ : ["utest","_Dispatcher","EventException"], __constructs__ : ["StopPropagation"] };
utest._Dispatcher.EventException.StopPropagation = ["StopPropagation",0];
utest._Dispatcher.EventException.StopPropagation.__enum__ = utest._Dispatcher.EventException;
utest.Dispatcher = function() {
	this.handlers = [];
};
utest.Dispatcher.__name__ = ["utest","Dispatcher"];
utest.Dispatcher.stop = function() {
	throw utest._Dispatcher.EventException.StopPropagation;
};
utest.Dispatcher.prototype = {
	handlers: null
	,add: function(h) {
		this.handlers.push(h);
		return h;
	}
	,remove: function(h) {
		var _g1 = 0;
		var _g = this.handlers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Reflect.compareMethods(this.handlers[i],h)) return this.handlers.splice(i,1)[0];
		}
		return null;
	}
	,clear: function() {
		this.handlers = [];
	}
	,dispatch: function(e) {
		try {
			var list = this.handlers.slice();
			var _g = 0;
			while(_g < list.length) {
				var l = list[_g];
				++_g;
				l(e);
			}
			return true;
		} catch( exc ) {
			if( js.Boot.__instanceof(exc,utest._Dispatcher.EventException) ) {
				return false;
			} else throw(exc);
		}
	}
	,has: function() {
		return this.handlers.length > 0;
	}
	,__class__: utest.Dispatcher
};
utest.Notifier = function() {
	this.handlers = [];
};
utest.Notifier.__name__ = ["utest","Notifier"];
utest.Notifier.stop = function() {
	throw utest._Dispatcher.EventException.StopPropagation;
};
utest.Notifier.prototype = {
	handlers: null
	,add: function(h) {
		this.handlers.push(h);
		return h;
	}
	,remove: function(h) {
		var _g1 = 0;
		var _g = this.handlers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Reflect.compareMethods(this.handlers[i],h)) return this.handlers.splice(i,1)[0];
		}
		return null;
	}
	,clear: function() {
		this.handlers = [];
	}
	,dispatch: function() {
		try {
			var list = this.handlers.slice();
			var _g = 0;
			while(_g < list.length) {
				var l = list[_g];
				++_g;
				l();
			}
			return true;
		} catch( exc ) {
			if( js.Boot.__instanceof(exc,utest._Dispatcher.EventException) ) {
				return false;
			} else throw(exc);
		}
	}
	,has: function() {
		return this.handlers.length > 0;
	}
	,__class__: utest.Notifier
};
utest.Runner = function() {
	this.fixtures = [];
	this.onProgress = new utest.Dispatcher();
	this.onStart = new utest.Dispatcher();
	this.onComplete = new utest.Dispatcher();
	this.onPrecheck = new utest.Dispatcher();
	this.length = 0;
};
utest.Runner.__name__ = ["utest","Runner"];
utest.Runner.prototype = {
	fixtures: null
	,onProgress: null
	,onStart: null
	,onComplete: null
	,onPrecheck: null
	,length: null
	,addCase: function(test,setup,teardown,prefix,pattern) {
		if(prefix == null) prefix = "test";
		if(teardown == null) teardown = "teardown";
		if(setup == null) setup = "setup";
		if(!Reflect.isObject(test)) throw "can't add a null object as a test case";
		if(!this.isMethod(test,setup)) setup = null;
		if(!this.isMethod(test,teardown)) teardown = null;
		var fields = Type.getInstanceFields(Type.getClass(test));
		if(pattern == null) {
			var _g = 0;
			while(_g < fields.length) {
				var field = fields[_g];
				++_g;
				if(!StringTools.startsWith(field,prefix)) continue;
				if(!this.isMethod(test,field)) continue;
				this.addFixture(new utest.TestFixture(test,field,setup,teardown));
			}
		} else {
			var _g1 = 0;
			while(_g1 < fields.length) {
				var field1 = fields[_g1];
				++_g1;
				if(!pattern.match(field1)) continue;
				if(!this.isMethod(test,field1)) continue;
				this.addFixture(new utest.TestFixture(test,field1,setup,teardown));
			}
		}
	}
	,addFixture: function(fixture) {
		this.fixtures.push(fixture);
		this.length++;
	}
	,getFixture: function(index) {
		return this.fixtures[index];
	}
	,isMethod: function(test,name) {
		try {
			return Reflect.isFunction(Reflect.field(test,name));
		} catch( e ) {
			return false;
		}
	}
	,pos: null
	,run: function() {
		this.pos = 0;
		this.onStart.dispatch(this);
		this.runNext();
	}
	,runNext: function() {
		if(this.fixtures.length > this.pos) this.runFixture(this.fixtures[this.pos++]); else this.onComplete.dispatch(this);
	}
	,runFixture: function(fixture) {
		var handler = new utest.TestHandler(fixture);
		handler.onComplete.add($bind(this,this.testComplete));
		handler.onPrecheck.add(($_=this.onPrecheck,$bind($_,$_.dispatch)));
		handler.execute();
	}
	,testComplete: function(h) {
		this.onProgress.dispatch({ result : utest.TestResult.ofHandler(h), done : this.pos, totals : this.length});
		this.runNext();
	}
	,__class__: utest.Runner
};
utest.TestFixture = function(target,method,setup,teardown) {
	this.target = target;
	this.method = method;
	this.setup = setup;
	this.teardown = teardown;
};
utest.TestFixture.__name__ = ["utest","TestFixture"];
utest.TestFixture.prototype = {
	target: null
	,method: null
	,setup: null
	,teardown: null
	,checkMethod: function(name,arg) {
		var field = Reflect.field(this.target,name);
		if(field == null) throw arg + " function " + name + " is not a field of target";
		if(!Reflect.isFunction(field)) throw arg + " function " + name + " is not a function";
	}
	,__class__: utest.TestFixture
};
utest.TestHandler = function(fixture) {
	if(fixture == null) throw "fixture argument is null";
	this.fixture = fixture;
	this.results = new List();
	this.asyncStack = new List();
	this.onTested = new utest.Dispatcher();
	this.onTimeout = new utest.Dispatcher();
	this.onComplete = new utest.Dispatcher();
	this.onPrecheck = new utest.Dispatcher();
};
utest.TestHandler.__name__ = ["utest","TestHandler"];
utest.TestHandler.exceptionStack = function(pops) {
	if(pops == null) pops = 2;
	var stack = haxe.CallStack.exceptionStack();
	while(pops-- > 0) stack.pop();
	return stack;
};
utest.TestHandler.prototype = {
	results: null
	,fixture: null
	,asyncStack: null
	,onTested: null
	,onTimeout: null
	,onComplete: null
	,onPrecheck: null
	,precheck: null
	,execute: function() {
		try {
			this.executeMethod(this.fixture.setup);
			try {
				this.executeMethod(this.fixture.method);
			} catch( e ) {
				this.results.add(utest.Assertation.Error(e,utest.TestHandler.exceptionStack()));
			}
		} catch( e1 ) {
			this.results.add(utest.Assertation.SetupError(e1,utest.TestHandler.exceptionStack()));
		}
		this.onPrecheck.dispatch(this);
		this.checkTested();
	}
	,checkTested: function() {
		if(this.expireson == null || this.asyncStack.length == 0) this.tested(); else if(haxe.Timer.stamp() > this.expireson) this.timeout(); else haxe.Timer.delay($bind(this,this.checkTested),10);
	}
	,expireson: null
	,setTimeout: function(timeout) {
		var newexpire = haxe.Timer.stamp() + timeout / 1000;
		if(this.expireson == null) this.expireson = newexpire; else if(newexpire > this.expireson) this.expireson = newexpire; else this.expireson = this.expireson;
	}
	,bindHandler: function() {
		utest.Assert.results = this.results;
		utest.Assert.createAsync = $bind(this,this.addAsync);
		utest.Assert.createEvent = $bind(this,this.addEvent);
	}
	,unbindHandler: function() {
		utest.Assert.results = null;
		utest.Assert.createAsync = function(f,t) {
			return function() {
			};
		};
		utest.Assert.createEvent = function(f1,t1) {
			return function(e) {
			};
		};
	}
	,addAsync: function(f,timeout) {
		if(timeout == null) timeout = 250;
		if(null == f) f = function() {
		};
		this.asyncStack.add(f);
		var handler = this;
		this.setTimeout(timeout);
		return function() {
			if(!handler.asyncStack.remove(f)) {
				handler.results.add(utest.Assertation.AsyncError("async function already executed",[]));
				return;
			}
			try {
				handler.bindHandler();
				f();
			} catch( e ) {
				handler.results.add(utest.Assertation.AsyncError(e,utest.TestHandler.exceptionStack(0)));
			}
		};
	}
	,addEvent: function(f,timeout) {
		if(timeout == null) timeout = 250;
		this.asyncStack.add(f);
		var handler = this;
		this.setTimeout(timeout);
		return function(e) {
			if(!handler.asyncStack.remove(f)) {
				handler.results.add(utest.Assertation.AsyncError("event already executed",[]));
				return;
			}
			try {
				handler.bindHandler();
				f(e);
			} catch( e1 ) {
				handler.results.add(utest.Assertation.AsyncError(e1,utest.TestHandler.exceptionStack(0)));
			}
		};
	}
	,executeMethod: function(name) {
		if(name == null) return;
		this.bindHandler();
		Reflect.callMethod(this.fixture.target,Reflect.field(this.fixture.target,name),[]);
	}
	,tested: function() {
		if(this.results.length == 0) this.results.add(utest.Assertation.Warning("no assertions"));
		this.onTested.dispatch(this);
		this.completed();
	}
	,timeout: function() {
		this.results.add(utest.Assertation.TimeoutError(this.asyncStack.length,[]));
		this.onTimeout.dispatch(this);
		this.completed();
	}
	,completed: function() {
		try {
			this.executeMethod(this.fixture.teardown);
		} catch( e ) {
			this.results.add(utest.Assertation.TeardownError(e,utest.TestHandler.exceptionStack(2)));
		}
		this.unbindHandler();
		this.onComplete.dispatch(this);
	}
	,__class__: utest.TestHandler
};
utest.TestResult = function() {
};
utest.TestResult.__name__ = ["utest","TestResult"];
utest.TestResult.ofHandler = function(handler) {
	var r = new utest.TestResult();
	var path = Type.getClassName(Type.getClass(handler.fixture.target)).split(".");
	r.cls = path.pop();
	r.pack = path.join(".");
	r.method = handler.fixture.method;
	r.setup = handler.fixture.setup;
	r.teardown = handler.fixture.teardown;
	r.assertations = handler.results;
	return r;
};
utest.TestResult.prototype = {
	pack: null
	,cls: null
	,method: null
	,setup: null
	,teardown: null
	,assertations: null
	,allOk: function() {
		var _g_head = this.assertations.h;
		var _g_val = null;
		try {
			while(_g_head != null) {
				var l;
				l = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				switch(l[1]) {
				case 0:
					throw "__break__";
					break;
				default:
					return false;
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return true;
	}
	,__class__: utest.TestResult
};
utest.ui = {};
utest.ui.Report = function() { };
utest.ui.Report.__name__ = ["utest","ui","Report"];
utest.ui.Report.create = function(runner,displaySuccessResults,headerDisplayMode) {
	var report;
	if(typeof window != 'undefined') report = new utest.ui.text.HtmlReport(runner,null,true); else report = new utest.ui.text.PrintReport(runner);
	if(null == displaySuccessResults) report.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors; else report.displaySuccessResults = displaySuccessResults;
	if(null == headerDisplayMode) report.displayHeader = utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults; else report.displayHeader = headerDisplayMode;
	return report;
};
utest.ui.common = {};
utest.ui.common.ClassResult = function(className,setupName,teardownName) {
	this.fixtures = new haxe.ds.StringMap();
	this.className = className;
	this.setupName = setupName;
	this.hasSetup = setupName != null;
	this.teardownName = teardownName;
	this.hasTeardown = teardownName != null;
	this.methods = 0;
	this.stats = new utest.ui.common.ResultStats();
};
utest.ui.common.ClassResult.__name__ = ["utest","ui","common","ClassResult"];
utest.ui.common.ClassResult.prototype = {
	fixtures: null
	,className: null
	,setupName: null
	,teardownName: null
	,hasSetup: null
	,hasTeardown: null
	,methods: null
	,stats: null
	,add: function(result) {
		if(this.fixtures.exists(result.methodName)) throw "invalid duplicated fixture result";
		this.stats.wire(result.stats);
		this.methods++;
		this.fixtures.set(result.methodName,result);
	}
	,get: function(method) {
		return this.fixtures.get(method);
	}
	,exists: function(method) {
		return this.fixtures.exists(method);
	}
	,methodNames: function(errorsHavePriority) {
		if(errorsHavePriority == null) errorsHavePriority = true;
		var names = [];
		var $it0 = this.fixtures.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			names.push(name);
		}
		if(errorsHavePriority) {
			var me = this;
			names.sort(function(a,b) {
				var $as = me.get(a).stats;
				var bs = me.get(b).stats;
				if($as.hasErrors) if(!bs.hasErrors) return -1; else if($as.errors == bs.errors) return Reflect.compare(a,b); else return Reflect.compare($as.errors,bs.errors); else if(bs.hasErrors) return 1; else if($as.hasFailures) if(!bs.hasFailures) return -1; else if($as.failures == bs.failures) return Reflect.compare(a,b); else return Reflect.compare($as.failures,bs.failures); else if(bs.hasFailures) return 1; else if($as.hasWarnings) if(!bs.hasWarnings) return -1; else if($as.warnings == bs.warnings) return Reflect.compare(a,b); else return Reflect.compare($as.warnings,bs.warnings); else if(bs.hasWarnings) return 1; else return Reflect.compare(a,b);
			});
		} else names.sort(function(a1,b1) {
			return Reflect.compare(a1,b1);
		});
		return names;
	}
	,__class__: utest.ui.common.ClassResult
};
utest.ui.common.FixtureResult = function(methodName) {
	this.methodName = methodName;
	this.list = new List();
	this.hasTestError = false;
	this.hasSetupError = false;
	this.hasTeardownError = false;
	this.hasTimeoutError = false;
	this.hasAsyncError = false;
	this.stats = new utest.ui.common.ResultStats();
};
utest.ui.common.FixtureResult.__name__ = ["utest","ui","common","FixtureResult"];
utest.ui.common.FixtureResult.prototype = {
	methodName: null
	,hasTestError: null
	,hasSetupError: null
	,hasTeardownError: null
	,hasTimeoutError: null
	,hasAsyncError: null
	,stats: null
	,list: null
	,iterator: function() {
		return new _List.ListIterator(this.list.h);
	}
	,add: function(assertation) {
		this.list.add(assertation);
		switch(assertation[1]) {
		case 0:
			this.stats.addSuccesses(1);
			break;
		case 1:
			this.stats.addFailures(1);
			break;
		case 2:
			this.stats.addErrors(1);
			break;
		case 3:
			this.stats.addErrors(1);
			this.hasSetupError = true;
			break;
		case 4:
			this.stats.addErrors(1);
			this.hasTeardownError = true;
			break;
		case 5:
			this.stats.addErrors(1);
			this.hasTimeoutError = true;
			break;
		case 6:
			this.stats.addErrors(1);
			this.hasAsyncError = true;
			break;
		case 7:
			this.stats.addWarnings(1);
			break;
		}
	}
	,__class__: utest.ui.common.FixtureResult
};
utest.ui.common.HeaderDisplayMode = { __ename__ : ["utest","ui","common","HeaderDisplayMode"], __constructs__ : ["AlwaysShowHeader","NeverShowHeader","ShowHeaderWithResults"] };
utest.ui.common.HeaderDisplayMode.AlwaysShowHeader = ["AlwaysShowHeader",0];
utest.ui.common.HeaderDisplayMode.AlwaysShowHeader.__enum__ = utest.ui.common.HeaderDisplayMode;
utest.ui.common.HeaderDisplayMode.NeverShowHeader = ["NeverShowHeader",1];
utest.ui.common.HeaderDisplayMode.NeverShowHeader.__enum__ = utest.ui.common.HeaderDisplayMode;
utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults = ["ShowHeaderWithResults",2];
utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults.__enum__ = utest.ui.common.HeaderDisplayMode;
utest.ui.common.SuccessResultsDisplayMode = { __ename__ : ["utest","ui","common","SuccessResultsDisplayMode"], __constructs__ : ["AlwaysShowSuccessResults","NeverShowSuccessResults","ShowSuccessResultsWithNoErrors"] };
utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults = ["AlwaysShowSuccessResults",0];
utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults.__enum__ = utest.ui.common.SuccessResultsDisplayMode;
utest.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults = ["NeverShowSuccessResults",1];
utest.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults.__enum__ = utest.ui.common.SuccessResultsDisplayMode;
utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors = ["ShowSuccessResultsWithNoErrors",2];
utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors.__enum__ = utest.ui.common.SuccessResultsDisplayMode;
utest.ui.common.IReport = function() { };
utest.ui.common.IReport.__name__ = ["utest","ui","common","IReport"];
utest.ui.common.IReport.prototype = {
	displaySuccessResults: null
	,displayHeader: null
	,setHandler: null
	,__class__: utest.ui.common.IReport
};
utest.ui.common.PackageResult = function(packageName) {
	this.packageName = packageName;
	this.classes = new haxe.ds.StringMap();
	this.packages = new haxe.ds.StringMap();
	this.stats = new utest.ui.common.ResultStats();
};
utest.ui.common.PackageResult.__name__ = ["utest","ui","common","PackageResult"];
utest.ui.common.PackageResult.prototype = {
	packageName: null
	,classes: null
	,packages: null
	,stats: null
	,addResult: function(result,flattenPackage) {
		var pack = this.getOrCreatePackage(result.pack,flattenPackage,this);
		var cls = this.getOrCreateClass(pack,result.cls,result.setup,result.teardown);
		var fix = this.createFixture(result.method,result.assertations);
		cls.add(fix);
	}
	,addClass: function(result) {
		this.classes.set(result.className,result);
		this.stats.wire(result.stats);
	}
	,addPackage: function(result) {
		this.packages.set(result.packageName,result);
		this.stats.wire(result.stats);
	}
	,existsPackage: function(name) {
		return this.packages.exists(name);
	}
	,existsClass: function(name) {
		return this.classes.exists(name);
	}
	,getPackage: function(name) {
		if(this.packageName == null && name == "") return this;
		return this.packages.get(name);
	}
	,getClass: function(name) {
		return this.classes.get(name);
	}
	,classNames: function(errorsHavePriority) {
		if(errorsHavePriority == null) errorsHavePriority = true;
		var names = [];
		var $it0 = this.classes.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			names.push(name);
		}
		if(errorsHavePriority) {
			var me = this;
			names.sort(function(a,b) {
				var $as = me.getClass(a).stats;
				var bs = me.getClass(b).stats;
				if($as.hasErrors) if(!bs.hasErrors) return -1; else if($as.errors == bs.errors) return Reflect.compare(a,b); else return Reflect.compare($as.errors,bs.errors); else if(bs.hasErrors) return 1; else if($as.hasFailures) if(!bs.hasFailures) return -1; else if($as.failures == bs.failures) return Reflect.compare(a,b); else return Reflect.compare($as.failures,bs.failures); else if(bs.hasFailures) return 1; else if($as.hasWarnings) if(!bs.hasWarnings) return -1; else if($as.warnings == bs.warnings) return Reflect.compare(a,b); else return Reflect.compare($as.warnings,bs.warnings); else if(bs.hasWarnings) return 1; else return Reflect.compare(a,b);
			});
		} else names.sort(function(a1,b1) {
			return Reflect.compare(a1,b1);
		});
		return names;
	}
	,packageNames: function(errorsHavePriority) {
		if(errorsHavePriority == null) errorsHavePriority = true;
		var names = [];
		if(this.packageName == null) names.push("");
		var $it0 = this.packages.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			names.push(name);
		}
		if(errorsHavePriority) {
			var me = this;
			names.sort(function(a,b) {
				var $as = me.getPackage(a).stats;
				var bs = me.getPackage(b).stats;
				if($as.hasErrors) if(!bs.hasErrors) return -1; else if($as.errors == bs.errors) return Reflect.compare(a,b); else return Reflect.compare($as.errors,bs.errors); else if(bs.hasErrors) return 1; else if($as.hasFailures) if(!bs.hasFailures) return -1; else if($as.failures == bs.failures) return Reflect.compare(a,b); else return Reflect.compare($as.failures,bs.failures); else if(bs.hasFailures) return 1; else if($as.hasWarnings) if(!bs.hasWarnings) return -1; else if($as.warnings == bs.warnings) return Reflect.compare(a,b); else return Reflect.compare($as.warnings,bs.warnings); else if(bs.hasWarnings) return 1; else return Reflect.compare(a,b);
			});
		} else names.sort(function(a1,b1) {
			return Reflect.compare(a1,b1);
		});
		return names;
	}
	,createFixture: function(method,assertations) {
		var f = new utest.ui.common.FixtureResult(method);
		var $it0 = $iterator(assertations)();
		while( $it0.hasNext() ) {
			var assertation = $it0.next();
			f.add(assertation);
		}
		return f;
	}
	,getOrCreateClass: function(pack,cls,setup,teardown) {
		if(pack.existsClass(cls)) return pack.getClass(cls);
		var c = new utest.ui.common.ClassResult(cls,setup,teardown);
		pack.addClass(c);
		return c;
	}
	,getOrCreatePackage: function(pack,flat,ref) {
		if(pack == null || pack == "") return ref;
		if(flat) {
			if(ref.existsPackage(pack)) return ref.getPackage(pack);
			var p = new utest.ui.common.PackageResult(pack);
			ref.addPackage(p);
			return p;
		} else {
			var parts = pack.split(".");
			var _g = 0;
			while(_g < parts.length) {
				var part = parts[_g];
				++_g;
				ref = this.getOrCreatePackage(part,true,ref);
			}
			return ref;
		}
	}
	,__class__: utest.ui.common.PackageResult
};
utest.ui.common.ReportTools = function() { };
utest.ui.common.ReportTools.__name__ = ["utest","ui","common","ReportTools"];
utest.ui.common.ReportTools.hasHeader = function(report,stats) {
	var _g = report.displayHeader;
	switch(_g[1]) {
	case 1:
		return false;
	case 2:
		if(!stats.isOk) return true;
		var _g1 = report.displaySuccessResults;
		switch(_g1[1]) {
		case 1:
			return false;
		case 0:case 2:
			return true;
		}
		break;
	case 0:
		return true;
	}
};
utest.ui.common.ReportTools.skipResult = function(report,stats,isOk) {
	if(!stats.isOk) return false;
	var _g = report.displaySuccessResults;
	switch(_g[1]) {
	case 1:
		return true;
	case 0:
		return false;
	case 2:
		return !isOk;
	}
};
utest.ui.common.ReportTools.hasOutput = function(report,stats) {
	if(!stats.isOk) return true;
	return utest.ui.common.ReportTools.hasHeader(report,stats);
};
utest.ui.common.ResultAggregator = function(runner,flattenPackage) {
	if(flattenPackage == null) flattenPackage = false;
	if(runner == null) throw "runner argument is null";
	this.flattenPackage = flattenPackage;
	this.runner = runner;
	runner.onStart.add($bind(this,this.start));
	runner.onProgress.add($bind(this,this.progress));
	runner.onComplete.add($bind(this,this.complete));
	this.onStart = new utest.Notifier();
	this.onComplete = new utest.Dispatcher();
	this.onProgress = new utest.Dispatcher();
};
utest.ui.common.ResultAggregator.__name__ = ["utest","ui","common","ResultAggregator"];
utest.ui.common.ResultAggregator.prototype = {
	runner: null
	,flattenPackage: null
	,root: null
	,onStart: null
	,onComplete: null
	,onProgress: null
	,start: function(runner) {
		this.root = new utest.ui.common.PackageResult(null);
		this.onStart.dispatch();
	}
	,getOrCreatePackage: function(pack,flat,ref) {
		if(ref == null) ref = this.root;
		if(pack == null || pack == "") return ref;
		if(flat) {
			if(ref.existsPackage(pack)) return ref.getPackage(pack);
			var p = new utest.ui.common.PackageResult(pack);
			ref.addPackage(p);
			return p;
		} else {
			var parts = pack.split(".");
			var _g = 0;
			while(_g < parts.length) {
				var part = parts[_g];
				++_g;
				ref = this.getOrCreatePackage(part,true,ref);
			}
			return ref;
		}
	}
	,getOrCreateClass: function(pack,cls,setup,teardown) {
		if(pack.existsClass(cls)) return pack.getClass(cls);
		var c = new utest.ui.common.ClassResult(cls,setup,teardown);
		pack.addClass(c);
		return c;
	}
	,createFixture: function(result) {
		var f = new utest.ui.common.FixtureResult(result.method);
		var _g_head = result.assertations.h;
		var _g_val = null;
		while(_g_head != null) {
			var assertation;
			assertation = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			f.add(assertation);
		}
		return f;
	}
	,progress: function(e) {
		this.root.addResult(e.result,this.flattenPackage);
		this.onProgress.dispatch(e);
	}
	,complete: function(runner) {
		this.onComplete.dispatch(this.root);
	}
	,__class__: utest.ui.common.ResultAggregator
};
utest.ui.common.ResultStats = function() {
	this.assertations = 0;
	this.successes = 0;
	this.failures = 0;
	this.errors = 0;
	this.warnings = 0;
	this.isOk = true;
	this.hasFailures = false;
	this.hasErrors = false;
	this.hasWarnings = false;
	this.onAddSuccesses = new utest.Dispatcher();
	this.onAddFailures = new utest.Dispatcher();
	this.onAddErrors = new utest.Dispatcher();
	this.onAddWarnings = new utest.Dispatcher();
};
utest.ui.common.ResultStats.__name__ = ["utest","ui","common","ResultStats"];
utest.ui.common.ResultStats.prototype = {
	assertations: null
	,successes: null
	,failures: null
	,errors: null
	,warnings: null
	,onAddSuccesses: null
	,onAddFailures: null
	,onAddErrors: null
	,onAddWarnings: null
	,isOk: null
	,hasFailures: null
	,hasErrors: null
	,hasWarnings: null
	,addSuccesses: function(v) {
		if(v == 0) return;
		this.assertations += v;
		this.successes += v;
		this.onAddSuccesses.dispatch(v);
	}
	,addFailures: function(v) {
		if(v == 0) return;
		this.assertations += v;
		this.failures += v;
		this.hasFailures = this.failures > 0;
		this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
		this.onAddFailures.dispatch(v);
	}
	,addErrors: function(v) {
		if(v == 0) return;
		this.assertations += v;
		this.errors += v;
		this.hasErrors = this.errors > 0;
		this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
		this.onAddErrors.dispatch(v);
	}
	,addWarnings: function(v) {
		if(v == 0) return;
		this.assertations += v;
		this.warnings += v;
		this.hasWarnings = this.warnings > 0;
		this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
		this.onAddWarnings.dispatch(v);
	}
	,sum: function(other) {
		this.addSuccesses(other.successes);
		this.addFailures(other.failures);
		this.addErrors(other.errors);
		this.addWarnings(other.warnings);
	}
	,subtract: function(other) {
		this.addSuccesses(-other.successes);
		this.addFailures(-other.failures);
		this.addErrors(-other.errors);
		this.addWarnings(-other.warnings);
	}
	,wire: function(dependant) {
		dependant.onAddSuccesses.add($bind(this,this.addSuccesses));
		dependant.onAddFailures.add($bind(this,this.addFailures));
		dependant.onAddErrors.add($bind(this,this.addErrors));
		dependant.onAddWarnings.add($bind(this,this.addWarnings));
		this.sum(dependant);
	}
	,unwire: function(dependant) {
		dependant.onAddSuccesses.remove($bind(this,this.addSuccesses));
		dependant.onAddFailures.remove($bind(this,this.addFailures));
		dependant.onAddErrors.remove($bind(this,this.addErrors));
		dependant.onAddWarnings.remove($bind(this,this.addWarnings));
		this.subtract(dependant);
	}
	,__class__: utest.ui.common.ResultStats
};
utest.ui.text = {};
utest.ui.text.HtmlReport = function(runner,outputHandler,traceRedirected) {
	if(traceRedirected == null) traceRedirected = true;
	this.aggregator = new utest.ui.common.ResultAggregator(runner,true);
	runner.onStart.add($bind(this,this.start));
	this.aggregator.onComplete.add($bind(this,this.complete));
	if(null == outputHandler) this.setHandler($bind(this,this._handler)); else this.setHandler(outputHandler);
	if(traceRedirected) this.redirectTrace();
	this.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = utest.ui.common.HeaderDisplayMode.AlwaysShowHeader;
};
utest.ui.text.HtmlReport.__name__ = ["utest","ui","text","HtmlReport"];
utest.ui.text.HtmlReport.__interfaces__ = [utest.ui.common.IReport];
utest.ui.text.HtmlReport.prototype = {
	traceRedirected: null
	,displaySuccessResults: null
	,displayHeader: null
	,handler: null
	,aggregator: null
	,oldTrace: null
	,_traces: null
	,setHandler: function(handler) {
		this.handler = handler;
	}
	,redirectTrace: function() {
		if(this.traceRedirected) return;
		this._traces = [];
		this.oldTrace = haxe.Log.trace;
		haxe.Log.trace = $bind(this,this._trace);
	}
	,restoreTrace: function() {
		if(!this.traceRedirected) return;
		haxe.Log.trace = this.oldTrace;
	}
	,_traceTime: null
	,_trace: function(v,infos) {
		var time = haxe.Timer.stamp();
		var delta;
		if(this._traceTime == null) delta = 0; else delta = time - this._traceTime;
		this._traces.push({ msg : StringTools.htmlEscape(Std.string(v)), infos : infos, time : time - this.startTime, delta : delta, stack : haxe.CallStack.callStack()});
		this._traceTime = haxe.Timer.stamp();
	}
	,startTime: null
	,start: function(e) {
		this.startTime = haxe.Timer.stamp();
	}
	,cls: function(stats) {
		if(stats.hasErrors) return "error"; else if(stats.hasFailures) return "failure"; else if(stats.hasWarnings) return "warn"; else return "ok";
	}
	,resultNumbers: function(buf,stats) {
		var numbers = [];
		if(stats.assertations == 1) numbers.push("<strong>1</strong> test"); else numbers.push("<strong>" + stats.assertations + "</strong> tests");
		if(stats.successes != stats.assertations) {
			if(stats.successes == 1) numbers.push("<strong>1</strong> pass"); else if(stats.successes > 0) numbers.push("<strong>" + stats.successes + "</strong> passes");
		}
		if(stats.errors == 1) numbers.push("<strong>1</strong> error"); else if(stats.errors > 0) numbers.push("<strong>" + stats.errors + "</strong> errors");
		if(stats.failures == 1) numbers.push("<strong>1</strong> failure"); else if(stats.failures > 0) numbers.push("<strong>" + stats.failures + "</strong> failures");
		if(stats.warnings == 1) numbers.push("<strong>1</strong> warning"); else if(stats.warnings > 0) numbers.push("<strong>" + stats.warnings + "</strong> warnings");
		buf.add(numbers.join(", "));
	}
	,blockNumbers: function(buf,stats) {
		buf.add("<div class=\"" + this.cls(stats) + "bg statnumbers\">");
		this.resultNumbers(buf,stats);
		buf.b += "</div>";
	}
	,formatStack: function(stack,addNL) {
		if(addNL == null) addNL = true;
		var parts = [];
		var nl;
		if(addNL) nl = "\n"; else nl = "";
		var last = null;
		var count = 1;
		var _g = 0;
		var _g1 = haxe.CallStack.toString(stack).split("\n");
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			if(StringTools.trim(part) == "") continue;
			if(-1 < part.indexOf("Called from utest.")) continue;
			if(part == last) parts[parts.length - 1] = part + " (#" + ++count + ")"; else {
				count = 1;
				parts.push(last = part);
			}
		}
		var s = "<ul><li>" + parts.join("</li>" + nl + "<li>") + "</li></ul>" + nl;
		return "<div>" + s + "</div>" + nl;
	}
	,addFixture: function(buf,result,name,isOk) {
		if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
		buf.b += "<li class=\"fixture\"><div class=\"li\">";
		buf.add("<span class=\"" + this.cls(result.stats) + "bg fixtureresult\">");
		if(result.stats.isOk) buf.b += "OK "; else if(result.stats.hasErrors) buf.b += "ERROR "; else if(result.stats.hasFailures) buf.b += "FAILURE "; else if(result.stats.hasWarnings) buf.b += "WARNING ";
		buf.b += "</span>";
		buf.b += "<div class=\"fixturedetails\">";
		buf.b += Std.string("<strong>" + name + "</strong>");
		buf.b += ": ";
		this.resultNumbers(buf,result.stats);
		var messages = [];
		var _g = result.iterator();
		while(_g.head != null) {
			var assertation;
			assertation = (function($this) {
				var $r;
				_g.val = _g.head[0];
				_g.head = _g.head[1];
				$r = _g.val;
				return $r;
			}(this));
			switch(assertation[1]) {
			case 0:
				break;
			case 1:
				var pos = assertation[3];
				var msg = assertation[2];
				messages.push("<strong>line " + pos.lineNumber + "</strong>: <em>" + StringTools.htmlEscape(msg) + "</em>");
				break;
			case 2:
				var s = assertation[3];
				var e = assertation[2];
				messages.push("<strong>error</strong>: <em>" + this.getErrorDescription(e) + "</em>\n<br/><strong>stack</strong>:" + this.getErrorStack(s,e));
				break;
			case 3:
				var s1 = assertation[3];
				var e1 = assertation[2];
				messages.push("<strong>setup error</strong>: " + this.getErrorDescription(e1) + "\n<br/><strong>stack</strong>:" + this.getErrorStack(s1,e1));
				break;
			case 4:
				var s2 = assertation[3];
				var e2 = assertation[2];
				messages.push("<strong>tear-down error</strong>: " + this.getErrorDescription(e2) + "\n<br/><strong>stack</strong>:" + this.getErrorStack(s2,e2));
				break;
			case 5:
				var missedAsyncs = assertation[2];
				messages.push("<strong>missed async call(s)</strong>: " + missedAsyncs);
				break;
			case 6:
				var s3 = assertation[3];
				var e3 = assertation[2];
				messages.push("<strong>async error</strong>: " + this.getErrorDescription(e3) + "\n<br/><strong>stack</strong>:" + this.getErrorStack(s3,e3));
				break;
			case 7:
				var msg1 = assertation[2];
				messages.push(StringTools.htmlEscape(msg1));
				break;
			}
		}
		if(messages.length > 0) {
			buf.b += "<div class=\"testoutput\">";
			buf.add(messages.join("<br/>"));
			buf.b += "</div>\n";
		}
		buf.b += "</div>\n";
		buf.b += "</div></li>\n";
	}
	,getErrorDescription: function(e) {
		return Std.string(e);
	}
	,getErrorStack: function(s,e) {
		return this.formatStack(s);
	}
	,addClass: function(buf,result,name,isOk) {
		if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
		buf.b += "<li>";
		buf.b += Std.string("<h2 class=\"classname\">" + name + "</h2>");
		this.blockNumbers(buf,result.stats);
		buf.b += "<ul>\n";
		var _g = 0;
		var _g1 = result.methodNames();
		while(_g < _g1.length) {
			var mname = _g1[_g];
			++_g;
			this.addFixture(buf,result.get(mname),mname,isOk);
		}
		buf.b += "</ul>\n";
		buf.b += "</li>\n";
	}
	,addPackages: function(buf,result,isOk) {
		if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
		buf.b += "<ul id=\"utest-results-packages\">\n";
		var _g = 0;
		var _g1 = result.packageNames(false);
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			this.addPackage(buf,result.getPackage(name),name,isOk);
		}
		buf.b += "</ul>\n";
	}
	,addPackage: function(buf,result,name,isOk) {
		if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
		if(name == "" && result.classNames().length == 0) return;
		buf.b += "<li>";
		buf.b += Std.string("<h2>" + name + "</h2>");
		this.blockNumbers(buf,result.stats);
		buf.b += "<ul>\n";
		var _g = 0;
		var _g1 = result.classNames();
		while(_g < _g1.length) {
			var cname = _g1[_g];
			++_g;
			this.addClass(buf,result.getClass(cname),cname,isOk);
		}
		buf.b += "</ul>\n";
		buf.b += "</li>\n";
	}
	,getHeader: function() {
		var buf = new StringBuf();
		if(!utest.ui.common.ReportTools.hasHeader(this,this.result.stats)) return "";
		var end = haxe.Timer.stamp();
		var time = ((end - this.startTime) * 1000 | 0) / 1000;
		var msg = "TEST OK";
		if(this.result.stats.hasErrors) msg = "TEST ERRORS"; else if(this.result.stats.hasFailures) msg = "TEST FAILED"; else if(this.result.stats.hasWarnings) msg = "WARNING REPORTED";
		buf.add("<h1 class=\"" + this.cls(this.result.stats) + "bg header\">" + msg + "</h1>\n");
		buf.b += "<div class=\"headerinfo\">";
		this.resultNumbers(buf,this.result.stats);
		buf.b += Std.string(" performed on <strong>" + utest.ui.text.HtmlReport.platform + "</strong>, executed in <strong> " + time + " sec. </strong></div >\n ");
		return buf.b;
	}
	,getTrace: function() {
		var buf = new StringBuf();
		if(this._traces == null || this._traces.length == 0) return "";
		buf.b += "<div class=\"trace\"><h2>traces</h2><ol>";
		var _g = 0;
		var _g1 = this._traces;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			buf.b += "<li><div class=\"li\">";
			var stack = StringTools.replace(this.formatStack(t.stack,false),"'","\\'");
			var method = "<span class=\"tracepackage\">" + t.infos.className + "</span><br/>" + t.infos.methodName + "(" + t.infos.lineNumber + ")";
			buf.b += Std.string("<span class=\"tracepos\" onmouseover=\"utestTooltip(this.parentNode, '" + stack + "')\" onmouseout=\"utestRemoveTooltip()\">");
			if(method == null) buf.b += "null"; else buf.b += "" + method;
			buf.b += "</span><span class=\"tracetime\">";
			buf.add("@ " + this.formatTime(t.time));
			if(Math.round(t.delta * 1000) > 0) buf.add(", ~" + this.formatTime(t.delta));
			buf.b += "</span><span class=\"tracemsg\">";
			buf.add(StringTools.replace(StringTools.trim(t.msg),"\n","<br/>\n"));
			buf.b += "</span><div class=\"clr\"></div></div></li>";
		}
		buf.b += "</ol></div>";
		return buf.b;
	}
	,getResults: function() {
		var buf = new StringBuf();
		this.addPackages(buf,this.result,this.result.stats.isOk);
		return buf.b;
	}
	,getAll: function() {
		if(!utest.ui.common.ReportTools.hasOutput(this,this.result.stats)) return ""; else return this.getHeader() + this.getTrace() + this.getResults();
	}
	,getHtml: function(title) {
		if(null == title) title = "utest: " + utest.ui.text.HtmlReport.platform;
		var s = this.getAll();
		if("" == s) return ""; else return this.wrapHtml(title,s);
	}
	,result: null
	,complete: function(result) {
		this.result = result;
		this.handler(this);
		this.restoreTrace();
	}
	,formatTime: function(t) {
		return Math.round(t * 1000) + " ms";
	}
	,cssStyle: function() {
		return "body, dd, dt {\n  font-family: Verdana, Arial, Sans-serif;\n  font-size: 12px;\n}\ndl {\n  width: 180px;\n}\ndd, dt {\n  margin : 0;\n  padding : 2px 5px;\n  border-top: 1px solid #f0f0f0;\n  border-left: 1px solid #f0f0f0;\n  border-right: 1px solid #CCCCCC;\n  border-bottom: 1px solid #CCCCCC;\n}\ndd.value {\n  text-align: center;\n  background-color: #eeeeee;\n}\ndt {\n  text-align: left;\n  background-color: #e6e6e6;\n  float: left;\n  width: 100px;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  margin: 0;\n  padding: 0;\n}\n\nh1 {\n  text-align: center;\n  font-weight: bold;\n  padding: 5px 0 4px 0;\n  font-family: Arial, Sans-serif;\n  font-size: 18px;\n  border-top: 1px solid #f0f0f0;\n  border-left: 1px solid #f0f0f0;\n  border-right: 1px solid #CCCCCC;\n  border-bottom: 1px solid #CCCCCC;\n  margin: 0 2px 0px 2px;\n}\n\nh2 {\n  font-weight: bold;\n  padding: 2px 0 2px 8px;\n  font-family: Arial, Sans-serif;\n  font-size: 13px;\n  border-top: 1px solid #f0f0f0;\n  border-left: 1px solid #f0f0f0;\n  border-right: 1px solid #CCCCCC;\n  border-bottom: 1px solid #CCCCCC;\n  margin: 0 0 0px 0;\n  background-color: #FFFFFF;\n  color: #777777;\n}\n\nh2.classname {\n  color: #000000;\n}\n\n.okbg {\n  background-color: #66FF55;\n}\n.errorbg {\n  background-color: #CC1100;\n}\n.failurebg {\n  background-color: #EE3322;\n}\n.warnbg {\n  background-color: #FFCC99;\n}\n.headerinfo {\n  text-align: right;\n  font-size: 11px;\n  font - color: 0xCCCCCC;\n  margin: 0 2px 5px 2px;\n  border-left: 1px solid #f0f0f0;\n  border-right: 1px solid #CCCCCC;\n  border-bottom: 1px solid #CCCCCC;\n  padding: 2px;\n}\n\nli {\n  padding: 4px;\n  margin: 2px;\n  border-top: 1px solid #f0f0f0;\n  border-left: 1px solid #f0f0f0;\n  border-right: 1px solid #CCCCCC;\n  border-bottom: 1px solid #CCCCCC;\n  background-color: #e6e6e6;\n}\n\nli.fixture {\n  background-color: #f6f6f6;\n  padding-bottom: 6px;\n}\n\ndiv.fixturedetails {\n  padding-left: 108px;\n}\n\nul {\n  padding: 0;\n  margin: 6px 0 0 0;\n  list-style-type: none;\n}\n\nol {\n  padding: 0 0 0 28px;\n  margin: 0px 0 0 0;\n}\n\n.statnumbers {\n  padding: 2px 8px;\n}\n\n.fixtureresult {\n  width: 100px;\n  text-align: center;\n  display: block;\n  float: left;\n  font-weight: bold;\n  padding: 1px;\n  margin: 0 0 0 0;\n}\n\n.testoutput {\n  border: 1px dashed #CCCCCC;\n  margin: 4px 0 0 0;\n  padding: 4px 8px;\n  background-color: #eeeeee;\n}\n\nspan.tracepos, span.traceposempty {\n  display: block;\n  float: left;\n  font-weight: bold;\n  font-size: 9px;\n  width: 170px;\n  margin: 2px 0 0 2px;\n}\n\nspan.tracepos:hover {\n  cursor : pointer;\n  background-color: #ffff99;\n}\n\nspan.tracemsg {\n  display: block;\n  margin-left: 180px;\n  background-color: #eeeeee;\n  padding: 7px;\n}\n\nspan.tracetime {\n  display: block;\n  float: right;\n  margin: 2px;\n  font-size: 9px;\n  color: #777777;\n}\n\n\ndiv.trace ol {\n  padding: 0 0 0 40px;\n  color: #777777;\n}\n\ndiv.trace li {\n  padding: 0;\n}\n\ndiv.trace li div.li {\n  color: #000000;\n}\n\ndiv.trace h2 {\n  margin: 0 2px 0px 2px;\n  padding-left: 4px;\n}\n\n.tracepackage {\n  color: #777777;\n  font-weight: normal;\n}\n\n.clr {\n  clear: both;\n}\n\n#utesttip {\n  margin-top: -3px;\n  margin-left: 170px;\n  font-size: 9px;\n}\n\n#utesttip li {\n  margin: 0;\n  background-color: #ffff99;\n  padding: 2px 4px;\n  border: 0;\n  border-bottom: 1px dashed #ffff33;\n}";
	}
	,jsScript: function() {
		return "function utestTooltip(ref, text) {\n  var el = document.getElementById(\"utesttip\");\n  if(!el) {\n    var el = document.createElement(\"div\")\n    el.id = \"utesttip\";\n    el.style.position = \"absolute\";\n    document.body.appendChild(el)\n  }\n  var p = utestFindPos(ref);\n  el.style.left = (4 + p[0]) + \"px\";\n  el.style.top = (p[1] - 1) + \"px\";\n  el.innerHTML =  text;\n}\n\nfunction utestFindPos(el) {\n  var left = 0;\n  var top = 0;\n  do {\n    left += el.offsetLeft;\n    top += el.offsetTop;\n  } while(el = el.offsetParent)\n  return [left, top];\n}\n\nfunction utestRemoveTooltip() {\n  var el = document.getElementById(\"utesttip\")\n  if(el)\n    document.body.removeChild(el)\n}";
	}
	,wrapHtml: function(title,s) {
		return "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n<title>" + title + "</title>\n      <style type=\"text/css\">" + this.cssStyle() + "</style>\n      <script type=\"text/javascript\">\n" + this.jsScript() + "\n</script>\n</head>\n      <body>\n" + s + "\n</body>\n</html>";
	}
	,_handler: function(report) {
		var isDef = function(v) {
			return typeof v != 'undefined';
		};
		var hasProcess = typeof process != 'undefined';
		if(hasProcess) {
			process.stdout.write(report.getHtml());
			return;
		}
		var head = window.document.getElementsByTagName("head")[0];
		var script = window.document.createElement("script");
		script.type = "text/javascript";
		var sjs = report.jsScript();
		if(isDef(script.text)) script.text = sjs; else script.innerHTML = sjs;
		head.appendChild(script);
		var style = window.document.createElement("style");
		style.type = "text/css";
		var scss = report.cssStyle();
		if(isDef(style.styleSheet)) style.styleSheet.cssText = scss; else if(isDef(style.cssText)) style.cssText = scss; else if(isDef(style.innerText)) style.innerText = scss; else style.innerHTML = scss;
		head.appendChild(style);
		var el = window.document.getElementById("utest-results");
		if(null == el) {
			el = window.document.createElement("div");
			el.id = "utest-results";
			window.document.body.appendChild(el);
		}
		el.innerHTML = report.getAll();
	}
	,__class__: utest.ui.text.HtmlReport
};
utest.ui.text.PlainTextReport = function(runner,outputHandler) {
	this.aggregator = new utest.ui.common.ResultAggregator(runner,true);
	runner.onStart.add($bind(this,this.start));
	this.aggregator.onComplete.add($bind(this,this.complete));
	if(null != outputHandler) this.setHandler(outputHandler);
	this.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = utest.ui.common.HeaderDisplayMode.AlwaysShowHeader;
};
utest.ui.text.PlainTextReport.__name__ = ["utest","ui","text","PlainTextReport"];
utest.ui.text.PlainTextReport.__interfaces__ = [utest.ui.common.IReport];
utest.ui.text.PlainTextReport.prototype = {
	displaySuccessResults: null
	,displayHeader: null
	,handler: null
	,aggregator: null
	,newline: null
	,indent: null
	,setHandler: function(handler) {
		this.handler = handler;
	}
	,startTime: null
	,start: function(e) {
		this.startTime = haxe.Timer.stamp();
	}
	,indents: function(c) {
		var s = "";
		var _g = 0;
		while(_g < c) {
			var _ = _g++;
			s += this.indent;
		}
		return s;
	}
	,dumpStack: function(stack) {
		if(stack.length == 0) return "";
		var parts = haxe.CallStack.toString(stack).split("\n");
		var r = [];
		var _g = 0;
		while(_g < parts.length) {
			var part = parts[_g];
			++_g;
			if(part.indexOf(" utest.") >= 0) continue;
			r.push(part);
		}
		return r.join(this.newline);
	}
	,addHeader: function(buf,result) {
		if(!utest.ui.common.ReportTools.hasHeader(this,result.stats)) return;
		var end = haxe.Timer.stamp();
		var time = ((end - this.startTime) * 1000 | 0) / 1000;
		buf.b += Std.string("\nassertations: " + result.stats.assertations + this.newline);
		buf.b += Std.string("successes: " + result.stats.successes + this.newline);
		buf.b += Std.string("errors: " + result.stats.errors + this.newline);
		buf.b += Std.string("failures: " + result.stats.failures + this.newline);
		buf.b += Std.string("warnings: " + result.stats.warnings + this.newline);
		buf.b += Std.string("execution time: " + time + this.newline);
		buf.b += Std.string(this.newline);
		buf.b += Std.string("results: " + (result.stats.isOk?"ALL TESTS OK (success: true)":"SOME TESTS FAILURES (success: false)"));
		buf.b += Std.string(this.newline);
	}
	,result: null
	,getResults: function() {
		var buf = new StringBuf();
		this.addHeader(buf,this.result);
		var _g = 0;
		var _g1 = this.result.packageNames();
		while(_g < _g1.length) {
			var pname = _g1[_g];
			++_g;
			var pack = this.result.getPackage(pname);
			if(utest.ui.common.ReportTools.skipResult(this,pack.stats,this.result.stats.isOk)) continue;
			var _g2 = 0;
			var _g3 = pack.classNames();
			while(_g2 < _g3.length) {
				var cname = _g3[_g2];
				++_g2;
				var cls = pack.getClass(cname);
				if(utest.ui.common.ReportTools.skipResult(this,cls.stats,this.result.stats.isOk)) continue;
				buf.b += Std.string((pname == ""?"":pname + ".") + cname + this.newline);
				var _g4 = 0;
				var _g5 = cls.methodNames();
				while(_g4 < _g5.length) {
					var mname = _g5[_g4];
					++_g4;
					var fix = cls.get(mname);
					if(utest.ui.common.ReportTools.skipResult(this,fix.stats,this.result.stats.isOk)) continue;
					buf.add(this.indents(1) + mname + ": ");
					if(fix.stats.isOk) buf.b += "OK "; else if(fix.stats.hasErrors) buf.b += "ERROR "; else if(fix.stats.hasFailures) buf.b += "FAILURE "; else if(fix.stats.hasWarnings) buf.b += "WARNING ";
					var messages = "";
					var _g6 = fix.iterator();
					while(_g6.head != null) {
						var assertation;
						assertation = (function($this) {
							var $r;
							_g6.val = _g6.head[0];
							_g6.head = _g6.head[1];
							$r = _g6.val;
							return $r;
						}(this));
						switch(assertation[1]) {
						case 0:
							buf.b += ".";
							break;
						case 1:
							var pos = assertation[3];
							var msg = assertation[2];
							buf.b += "F";
							messages += this.indents(2) + "line: " + pos.lineNumber + ", " + msg + this.newline;
							break;
						case 2:
							var s = assertation[3];
							var e = assertation[2];
							buf.b += "E";
							messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
							break;
						case 3:
							var s1 = assertation[3];
							var e1 = assertation[2];
							buf.b += "S";
							messages += this.indents(2) + Std.string(e1) + this.dumpStack(s1) + this.newline;
							break;
						case 4:
							var s2 = assertation[3];
							var e2 = assertation[2];
							buf.b += "T";
							messages += this.indents(2) + Std.string(e2) + this.dumpStack(s2) + this.newline;
							break;
						case 5:
							var s3 = assertation[3];
							var missedAsyncs = assertation[2];
							buf.b += "O";
							messages += this.indents(2) + "missed async calls: " + missedAsyncs + this.dumpStack(s3) + this.newline;
							break;
						case 6:
							var s4 = assertation[3];
							var e3 = assertation[2];
							buf.b += "A";
							messages += this.indents(2) + Std.string(e3) + this.dumpStack(s4) + this.newline;
							break;
						case 7:
							var msg1 = assertation[2];
							buf.b += "W";
							messages += this.indents(2) + msg1 + this.newline;
							break;
						}
					}
					buf.b += Std.string(this.newline);
					if(messages == null) buf.b += "null"; else buf.b += "" + messages;
				}
			}
		}
		return buf.b;
	}
	,complete: function(result) {
		this.result = result;
		this.handler(this);
		if(typeof process != "undefined") process.exit(result.stats.isOk?0:1);
	}
	,__class__: utest.ui.text.PlainTextReport
};
utest.ui.text.PrintReport = function(runner) {
	utest.ui.text.PlainTextReport.call(this,runner,$bind(this,this._handler));
	this.newline = "\n";
	this.indent = "  ";
};
utest.ui.text.PrintReport.__name__ = ["utest","ui","text","PrintReport"];
utest.ui.text.PrintReport.__super__ = utest.ui.text.PlainTextReport;
utest.ui.text.PrintReport.prototype = $extend(utest.ui.text.PlainTextReport.prototype,{
	useTrace: null
	,_handler: function(report) {
		this._trace(report.getResults());
	}
	,_trace: function(s) {
		s = StringTools.replace(s,"  ",this.indent);
		s = StringTools.replace(s,"\n",this.newline);
		haxe.Log.trace(s,{ fileName : "PrintReport.hx", lineNumber : 59, className : "utest.ui.text.PrintReport", methodName : "_trace"});
	}
	,__class__: utest.ui.text.PrintReport
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
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
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
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
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var __map_reserved = {}
var ArrayBuffer = typeof(window) != "undefined" && window.ArrayBuffer || js.html.compat.ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js.html.compat.ArrayBuffer.sliceImpl;
var Uint8Array = typeof(window) != "undefined" && window.Uint8Array || js.html.compat.Uint8Array._new;

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
haxe.ds.ObjectMap.count = 0;
js.Boot.__toStr = {}.toString;
js.html.compat.Uint8Array.BYTES_PER_ELEMENT = 1;
thx.core.Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
thx.core.Ints.BASE = "0123456789abcdefghijklmnopqrstuvwxyz";
thx.core.Strings.UCWORDS = new EReg("[^a-zA-Z]([a-z])","g");
thx.core.Strings.UCWORDSWS = new EReg("\\s[a-z]","g");
thx.core.Strings.ALPHANUM = new EReg("^[a-z0-9]+$","i");
thx.core.Strings.DIGITS = new EReg("^[0-9]+$","");
thx.core.Strings.STRIPTAGS = new EReg("</?[a-z]+[^>]*?/?>","gi");
thx.core.Strings.WSG = new EReg("\\s+","g");
thx.core.Strings.SPLIT_LINES = new EReg("\r\n|\n\r|\n|\r","g");
utest.TestHandler.POLLING_TIME = 10;
utest.ui.text.HtmlReport.platform = "javascript";
TestAll.main();
})(typeof console != "undefined" ? console : {log:function(){}});
