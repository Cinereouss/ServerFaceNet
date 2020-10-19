(function($) {



    var form = $("#signup-form");
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            email: {
                email: true
            }
        },
        onfocusout: function(element) {
            $(element).valid();
        },
    });
    form.children("div").steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "fade",
        stepsOrientation: "vertical",
        titleTemplate: '<div class="title"><span class="step-number">#index#</span><span class="step-text">#title#</span></div>',
        labels: {
            previous: '< Quay lại',
            next: 'Bước tiếp theo >',
            finish: 'Hoàn thành',
            current: ''
        },
        onStepChanging: function(event, currentIndex, newIndex) {
            if (currentIndex === 0) {
                form.parent().parent().parent().append('<div class="footer footer-' + currentIndex + '"></div>');
            }
            if (currentIndex === 1) {
                form.parent().parent().parent().find('.footer').removeClass('footer-0').addClass('footer-' + currentIndex + '');
            }
            if (currentIndex === 2) {
                form.parent().parent().parent().find('.footer').removeClass('footer-1').addClass('footer-' + currentIndex + '');
            }
            if (currentIndex === 3) {
                form.parent().parent().parent().find('.footer').removeClass('footer-2').addClass('footer-' + currentIndex + '');
            }
            // if(currentIndex === 4) {
            //     form.parent().parent().parent().append('<div class="footer" style="height:752px;"></div>');
            // }
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onFinishing: function(event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function(event, currentIndex) {
            $.ajax({
                url: '/dangkyonline',
                type: 'post',
                data: $("#signup-form").serialize(),
                success : function(data) {
					console.log(data);
					if(data === 'success'){
						alert('Đăng ký thành công! Chúng tôi sẽ sớm liên hệ lại với bạn.');
					}else{
						console.log(data);
					}
					window.location="/";
                }
        	});
        },
        onStepChanged: function(event, currentIndex, priorIndex) {

            return true;
        }
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });

    var marginSlider = document.getElementById('slider-margin');
    if (marginSlider != undefined) {
        noUiSlider.create(marginSlider, {
              start: [1100],
              step: 100,
              connect: [true, false],
              tooltips: [true],
              range: {
                  'min': 100,
                  'max': 2000
              },
              pips: {
                    mode: 'values',
                    values: [100, 2000],
                    density: 4
                    },
                format: wNumb({
                    decimals: 0,
                    thousand: '',
                    prefix: '$ ',
                })
        });
        var marginMin = document.getElementById('value-lower'),
	    marginMax = document.getElementById('value-upper');

        marginSlider.noUiSlider.on('update', function ( values, handle ) {
            if ( handle ) {
                marginMax.innerHTML = values[handle];
            } else {
                marginMin.innerHTML = values[handle];
            }
        });
    }
})(jQuery);

   ////////////////////////////////////
  // prerequisite utility functions //
 // the real stuff starts below    //
////////////////////////////////////
var util = {
	f: {
		addStyle: function (elem, prop, val, vendors) {
			var i, ii, property, value
			if (!util.f.isElem(elem)) {
				elem = document.getElementById(elem)
			}
			if (!util.f.isArray(prop)) {
				prop = [prop]
				val = [val]
			}
			for (i = 0; i < prop.length; i += 1) {
				var thisProp = String(prop[i]),
					thisVal = String(val[i])
				if (typeof vendors !== "undefined") {
					if (!util.f.isArray(vendors)) {
						vendors.toLowerCase() == "all" ? vendors = ["webkit", "moz", "ms", "o"] : vendors = [vendors]
					}
					for (ii = 0; ii < vendors.length; ii += 1) {
						elem.style[vendors[i] + thisProp] = thisVal
					}
				}
				thisProp = thisProp.charAt(0).toLowerCase() + thisProp.slice(1)
				elem.style[thisProp] = thisVal
			}
		},
		cssLoaded: function (event) {
			var child = util.f.getTrg(event)
			child.setAttribute("media", "all")
		},
		events: {
			cancel: function (event) {
				util.f.events.prevent(event)
				util.f.events.stop(event)
			},
			prevent: function (event) {
				event = event || window.event
				event.preventDefault()
			},
			stop: function (event) {
				event = event || window.event
				event.stopPropagation()
			}
		},
		getPath: function (cb, args) {
			GLOBAL.path = window.location.href.split("masterdemolition")[1].replace("inc.com/admin/", "").replace("inc.com/admin", "").replace("#!/", "").replace("#!", "").replace("#/", "").replace("#", "")
			if (GLOBAL.path.indexOf("?") >= 0) {
				GLOBAL.path = GLOBAL.path.split("?")[0]
			}
			if (typeof cb !== "undefined") {
				typeof args !== "undefined" ? cb(args) : cb()
			} else {
				return GLOBAL.path
			}
		},
		getSize: function (elem, prop) {
			return parseInt(elem.getBoundingClientRect()[prop], 10)
		},
		getTrg: function (event) {
			event = event || window.event
			if (event.srcElement) {
				return event.srcElement
			} else {
				return event.target
			}
		},
		isElem: function (elem) {
			return (util.f.isNode(elem) && elem.nodeType == 1)
		},
		isArray: function(v) {
			return (v.constructor === Array)
		},
		isNode: function(elem) {
			return (typeof Node === "object" ? elem instanceof Node : elem && typeof elem === "object" && typeof elem.nodeType === "number" && typeof elem.nodeName==="string" && elem.nodeType !== 3)
		},
		isObj: function (v) {
			return (typeof v == "object")
		},
		replaceAt: function(str, index, char) {
			return str.substr(0, index) + char + str.substr(index + char.length);
		}
	}
},
   //////////////////////////////////////
  // ok that's all the utilities      //
 // onto the select box / form stuff //
//////////////////////////////////////
form = {
f: {
	init: {
		register: function () {
			console.clear()// just cuz codepen
			var child, children = document.getElementsByClassName("field"), i
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				util.f.addStyle(child, "Opacity", 1)
			}
			children = document.getElementsByClassName("psuedo_select")
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				child.addEventListener("click", form.f.select.toggle)
			}
		},
		unregister: function () {
			//just here as a formallity
			//call this to stop all ongoing timeouts are ready the page for some sort of json re-route
		}
	},
	select: {
		blur: function (field) {
			field.classList.remove("focused")
			var child, children = field.childNodes, i, ii, nested_child, nested_children
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				if (util.f.isElem(child)) {
					if (child.classList.contains("deselect")) {
						child.parentNode.removeChild(child)
					} else if (child.tagName == "SPAN") {
						if (!field.dataset.value) {
							util.f.addStyle(child, ["FontSize", "Top"], ["16px", "32px"])
						}
					} else if (child.classList.contains("psuedo_select")) {
						nested_children = child.childNodes
						for (ii = 0; ii < nested_children.length; ii += 1) {
							nested_child = nested_children[ii]
							if (util.f.isElem(nested_child)) {
								if (nested_child.tagName == "SPAN") {
									if (!field.dataset.value) {
										util.f.addStyle(nested_child, ["Opacity", "Transform"], [0, "translateY(24px)"])
									}
								} else if (nested_child.tagName == "UL") {
										util.f.addStyle(nested_child, ["Height", "Opacity"], [0, 0])
								}
							}
						}
					}
				}
			}
		},
		focus: function (field) {
			field.classList.add("focused")
			var bool = false, child, children = field.childNodes, i, ii, iii, nested_child, nested_children, nested_nested_child, nested_nested_children, size = 0
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				util.f.isElem(child) && child.classList.contains("deselect") ? bool = true : null
			}
			if (!bool) {
				child = document.createElement("div")
				child.className = "deselect"
				child.addEventListener("click", form.f.select.toggle)
				field.insertBefore(child, children[0])
			}
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				if (util.f.isElem(child) && child.classList.contains("psuedo_select")) {
					nested_children = child.childNodes
					for (ii = 0; ii < nested_children.length; ii += 1) {
						nested_child = nested_children[ii]
						if (util.f.isElem(nested_child) && nested_child.tagName == "UL") {
							size = 0
							nested_nested_children = nested_child.childNodes
							for (iii = 0; iii < nested_nested_children.length; iii += 1) {
								nested_nested_child = nested_nested_children[iii]
								if (util.f.isElem(nested_nested_child) && nested_nested_child.tagName == "LI") {
									size += util.f.getSize(nested_nested_child, "height")
									console.log("size: " + size)
								}
							}
							util.f.addStyle(nested_child, ["Height", "Opacity"], [size + "px", 1])
						}
					}
				}
			}
		},
		selection: function (child, parent) {
			var children = parent.childNodes, i, ii, nested_child, nested_children, time = 0, value
			if (util.f.isElem(child) && util.f.isElem(parent)) {
				parent.dataset.value = child.dataset.value
				value = child.innerHTML
			}
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				if (util.f.isElem(child)) {
					if (child.classList.contains("psuedo_select")) {
						nested_children = child.childNodes
						for (ii = 0; ii < nested_children.length; ii += 1) {
							nested_child = nested_children[ii]
							if (util.f.isElem(nested_child) && nested_child.classList.contains("selected")) {
								if (nested_child.innerHTML)  {
									time = 1E2
									util.f.addStyle(nested_child, ["Opacity", "Transform"], [0, "translateY(24px)"], "all")
								}
								setTimeout(function (c, v) {
									c.innerHTML = v
									util.f.addStyle(c, ["Opacity", "Transform", "TransitionDuration"], [1, "translateY(0px)", ".1s"], "all")
								}, time, nested_child, value)
							}
						}
					} else if (child.tagName == "SPAN") {
						util.f.addStyle(child, ["FontSize", "Top"], ["12px", "8px"])
				   }
			   }
			}
		},
		toggle: function (event) {
			util.f.events.stop(event)
			var child = util.f.getTrg(event), children, i, parent
			switch (true) {
				case (child.classList.contains("psuedo_select")):
				case (child.classList.contains("deselect")):
					parent = child.parentNode
					break
				case (child.classList.contains("options")):
					parent = child.parentNode.parentNode
					break
				case (child.classList.contains("option")):
					parent = child.parentNode.parentNode.parentNode
					form.f.select.selection(child, parent)
					break
			}
			parent.classList.contains("focused") ? form.f.select.blur(parent) : form.f.select.focus(parent)
		}
	}
}}
window.onload = form.f.init.register
////////////////////////////
/*Dropdown Menu*/
$('.dropdown').click(function () {
	$(this).attr('tabindex', 1).focus();
	$(this).toggleClass('active');
	$(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
	$(this).removeClass('active');
	$(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
	$(this).parents('.dropdown').find('span').text($(this).text());
	$(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});
/*End Dropdown Menu*/


$('.dropdown-menu li').click(function () {
var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
  msg = '<span class="msg">Hidden input value: ';
$('.msg').html(msg + input + '</span>');
}); 


/*********  Capcha  ********* */

function showResult(text) {
	console.log(text)
}

function handleClick(token) {
	return function() {
		var hello = document.querySelector('#OPT').value;
		var data = {
			hello: hello,
			token: token
		};

		fetch('/api/v1/users/confirm-capcha', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(data)
		})
			.then(response => response.text())
			.then(text => showResult(text))
			.catch(error => showResult(error));
	}
}

grecaptcha.ready(function() {
	grecaptcha.execute('6Lc8rdYZAAAAAAouHQUBMRO-uos1bCD4lMJpEYI_', {action: 'demo'})
		.then(function(token) {
			document.querySelector('#confirm').addEventListener('click', handleClick(token));
		});
});