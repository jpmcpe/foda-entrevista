String.prototype.format = function () {
    /**
     * http://stackoverflow.com/questions/13639464/javascript-equivalent-to-pythons-format
     * @type {Arguments}
     */
    var args = arguments;
    this.unkeyed_index = 0;
    return this.replace(/\{(\w*)\}/g, function (match, key) {
        if (key === '') {
            key = this.unkeyed_index;
            this.unkeyed_index++
        }
        if (key == +key) {
            return args[key] !== 'undefined'
                ? args[key]
                : match;
        } else {
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === 'object' && typeof args[i][key] !== 'undefined') {
                    return args[i][key];
                }
            }
            return match;
        }
    }.bind(this));
};

Date.prototype.toDateYYYYMMDDString = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    mm = (mm[1] ? mm : "0" + mm[0]);
    var dd = this.getDate().toString();
    dd = (dd[1] ? dd : "0" + dd[0]);
    return "{0}-{1}-{2}".format(yyyy, mm, dd); // padding
};

Date.prototype.toTimeHHMMSSString = function () {
    return this.toTimeString().split(' ')[0];
};

Number.prototype.toCurrency = function () {
    return (this / 100).toFixed(2);
};


(function ($) {
    var count = 0;
    $.fn.nodoubletapzoom = function () {
        $(this).bind('touchstart', function preventZoom(e) {
            var t2 = e.timeStamp;
            var t1 = $(this).data('lastTouch') || t2;
            var dt = t2 - t1;
            var fingers = e.originalEvent.touches.length;
            $(this).data('lastTouch', t2);
            if (!dt || dt > 500 || fingers > 1) {
                return; // not double-tap
            }
            e.preventDefault(); // double tap - prevent the zoom
            // also synthesize click events we just swallowed up
            $(e.target).trigger('click');
        });
    };
})(jQuery);


var hideIfClickOutside = function (container) {
    $(document).mouseup(function (e) {
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.hide();
        }
    });
};

var isNumberKey = function (evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57));


};

var Utils = function () {
};

Utils.input_is_empty = function (selector) {
    var original_inputs = $(selector);
    var inputs = $(selector).filter(function () {
        return $.trim($(this).val()).length > 0
    });
    return inputs.length == original_inputs.length;

};

Utils.go_back_button = function () {
    history.back();
};

Utils.to_int_currency = function (amount) {
    return amount * 100;
};

Utils.to_decimal_currency = function (amount) {
    return (amount / 100).toFixed(2);
};

Utils.geo_location = function (success_function, error_function) {
    if (!error_function) {
        error_function = Utils.geo_error;
    }

    var geo_options = {
        maximumAge: 5 * 60 * 1000
    };

    navigator.geolocation.getCurrentPosition(success_function, error_function, geo_options);
};

Utils.geo_error = function (position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
};

Utils.attach_event_enter_key = function(selector, a_function) {
    selector.bind("enterKey", function (e) {
        a_function();
    });
    selector.keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
};


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


var _ = function (text) {
    return translate[text] || text;
};

var disable_enter = function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
};



var zeropad = function (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

var isSmartphone = function () {
    return $(window).width() <= 480;
};
var isTablet = function () {
    if (isSmartphone()) {
        return false
    }
    else {
        return $(window).width() <= 1024;
    }
};
