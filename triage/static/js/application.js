function Application($, ns) {
	this.modules = [];
	this.events = {};
	this.$ = $;
	this.ns = ns;
	this.autoRegister();
}

Application.prototype.register = function(moduleDef, options) {
	if (!moduleDef.isRegistered) {
		this.modules.push(moduleDef(this.$, this, options));
		moduleDef.isRegistered = true;
	}
};

Application.prototype.autoRegister = function() {
	for (var moduleDef in this.ns.modules) {
		moduleDef = this.ns.modules[moduleDef];
		if (moduleDef.autoRegister)
			this.register(moduleDef);
	}
};

Application.prototype.start = function() {
	for (var module in this.modules) {
		module = this.modules[module];
		module.start();
	}
};

Application.prototype.stop = function() {
	for (var module in this.modules) {
		module = this.modules[module];
		module.stop();
	}
};

// Events

// Bind an event, specified by a string name, `ev`, to a `callback`
// function. Passing `"all"` will bind the callback to all events fired.
Application.prototype.on = function(events, callback, context) {
	var ev;
	events = events.split(/\s+/);
	var calls = this._callbacks || (this._callbacks = {});
	while (ev = events.shift()) {
		// Create an immutable callback list, allowing traversal during
		// modification.  The tail is an empty object that will always be used
		// as the next node.
		var list  = calls[ev] || (calls[ev] = {});
		var tail = list.tail || (list.tail = list.next = {});
		tail.callback = callback;
		tail.context = context;
		list.tail = tail.next = {};
	}
	return this;
};

// Remove one or many callbacks. If `context` is null, removes all callbacks
// with that function. If `callback` is null, removes all callbacks for the
// event. If `ev` is null, removes all bound callbacks for all events.
Application.prototype.off = function(events, callback, context) {
	var ev, calls, node;
	if (!events) {
		delete this._callbacks;
	} else if (calls = this._callbacks) {
		events = events.split(/\s+/);
		while (ev = events.shift()) {
			node = calls[ev];
			delete calls[ev];
			if (!callback || !node) continue;
			// Create a new list, omitting the indicated event/context pairs.
			while ((node = node.next) && node.next) {
				if (node.callback === callback && (!context || node.context === context)) continue;
				this.on(ev, node.callback, node.context);
			}
		}
	}
	return this;
};

    // Trigger an event, firing all bound callbacks. Callbacks are passed the
    // same arguments as `trigger` is, apart from the event name.
    // Listening for `"all"` passes the true event name as the first argument.
Application.prototype.trigger = function(events) {
	var event, node, calls, tail, args, all, rest;
	if (!(calls = this._callbacks)) return this;
	all = calls['all'];
	(events = events.split(/\s+/)).push(null);
	// Save references to the current heads & tails.
	while (event = events.shift()) {
		if (all) events.push({next: all.next, tail: all.tail, event: event});
		if (!(node = calls[event])) continue;
		events.push({next: node.next, tail: node.tail});
	}
	// Traverse each list, stopping when the saved tail is reached.
	rest = Array.prototype.slice.call(arguments, 1);
	while (node = events.pop()) {
		tail = node.tail;
		args = node.event ? [node.event].concat(rest) : rest;
		while ((node = node.next) !== tail) {
			node.callback.apply(node.context || this, args);
		}
	}
	return this;
};
