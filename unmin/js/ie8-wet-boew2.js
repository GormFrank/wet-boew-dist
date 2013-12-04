/*!
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * v4.0.0-a1-development - 2013-12-04
 *
 *//**
 * @title WET-BOEW JQuery Helper Methods
 * @overview Helper methods for WET
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 * Credits: http://kaibun.net/blog/2013/04/19/a-fully-fledged-coffeescript-boilerplate-for-jquery-plugins/
 */
(function( $, wb ) {
	wb.getData = function( element, dataName ) {
		var elm = !element.jquery ? element : element[ 0 ],
			dataAttr = elm.getAttribute( "data-" + dataName ),
			dataObj;

		if ( dataAttr ) {
			try {
				dataObj = JSON.parse( dataAttr );
			} catch ( error ) {
				$.error( "Bad JSON array in data-" + dataName + " attribute" );
			}
		}

		$.data( elm, dataName, dataObj );
		return dataObj;
	};
})( jQuery, wb );

(function( wb ) {
	"use strict";

	// Escapes the characters in a string for use in a jQuery selector
	// Based on http://totaldev.com/content/escaping-characters-get-valid-jquery-id
	wb.jqEscape = function( selector ) {
		return selector.replace( /([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1" );
	};

	/**
	 * @namespace wb.string
	 */
	wb.string = {
		/*
		 * Left-pads a number with zeros.
		 * @memberof wb.string
		 * @param {number} number The original number to pad.
		 * @param {number} length The width of the resulting padded number, not the number of zeros to add to the front of the string.
		 * @return {string} The padded string
		 */
		pad: function( number, length ) {
			var str = number + "",
				diff = length - str.length,
				i;
			for ( i = 0; i !== diff; i += 1 ) {
				str = "0" + str;
			}
			return str;
		}
	};

	/*
	 * A suite of date related functions for easier parsing of dates
	 * @namespace wb.date
	 */
	wb.date = {
		/*
		 * Converts the date to a date-object. The input can be:
		 * <ul>
		 * <li>a Date object: returned without modification.</li>
		 * <li>an array: Interpreted as [year,month,day]. NOTE: month is 0-11.</li>
		 * <li>a number: Interpreted as number of milliseconds since 1 Jan 1970 (a timestamp).</li>
		 * <li>a string: Any format supported by the javascript engine, like 'YYYY/MM/DD', 'MM/DD/YYYY', 'Jan 31 2009' etc.</li>
		 * <li>an object: Interpreted as an object with year, month and date attributes. **NOTE** month is 0-11.</li>
		 * </ul>
		 * @memberof wb.date
		 * @param {Date | number[] | number | string | object} dateValue
		 * @return {Date | NaN}
		 */
		convert: function( dateValue ) {
			var dateConstructor = dateValue.constructor;

			switch ( dateConstructor ) {
			case Date:
				return dateConstructor;
			case Array:
				return new Date( dateValue[ 0 ], dateValue[ 1 ], dateValue[ 2 ] );
			case Number:
			case String:
				return new Date( dateValue );
			default:
				return typeof dateValue === "object" ? new Date( dateValue.year, dateValue.month, dateValue.date ) : NaN;
			}
		},

		/*
		 * Compares two dates (input can be any type supported by the convert function).
		 * @memberof wb.date
		 * @param {Date | number[] | number | string | object} dateValue1
		 * @param {Date | number[] | number | string | object} dateValue2
		 * @return {number | NaN}
		 * @example returns
		 * -1 if dateValue1 < dateValue2
		 * 0 if dateValue1 = dateValue2
		 * 1 if dateValue1 > dateValue2
		 * NaN if dateValue1 or dateValue2 is an illegal date
		 */
		compare: function( dateValue1, dateValue2 ) {
			var convert = wb.date.convert;

			if ( isFinite( dateValue1 = convert( dateValue1 ).valueOf() ) && isFinite( dateValue2 = convert( dateValue2 ).valueOf() ) ) {
				return ( dateValue1 > dateValue2 ) - ( dateValue1 < dateValue2 );
			}
			return NaN;
		},

		/*
		 * Cross-browser safe way of translating a date to ISO format
		 * @memberof wb.date
		 * @param {Date | number[] | number | string | object} dateValue
		 * @param {boolean} withTime Optional. Whether to include the time in the result, or just the date. False if blank.
		 * @return {string}
		 * @example
		 * toDateISO( new Date() )
		 * returns "2012-04-27"
		 * toDateISO( new Date(), true )
		 * returns "2012-04-27 13:46"
		 */
		toDateISO: function( dateValue, withTime ) {
			var date = wb.date.convert( dateValue ),
				pad = wb.string.pad;

			return date.getFullYear() + "-" + pad( date.getMonth() + 1, 2, "0" ) + "-" + pad( date.getDate(), 2, "0" ) +
				( withTime ? " " + pad( date.getHours(), 2, "0" ) + ":" + pad( date.getMinutes(), 2, "0" ) : "" );
		},

		/*
		 * Cross-browser safe way of creating a date object from a date string in ISO format
		 * @memberof wb.date
		 * @param {string} dateISO Date string in ISO format
		 * @return {Date}
		 */
		fromDateISO: function( dateISO ) {
			var date = null;

			if ( dateISO && dateISO.match( /\d{4}-\d{2}-\d{2}/ ) ) {
				date = new Date();
				date.setFullYear( dateISO.substr( 0, 4 ), dateISO.substr( 5, 2 ) - 1, dateISO.substr( 8, 2 ) );
			}
			return date;
		}
	};

})( wb );

(function( $, undef ) {
	"use strict";

	var methods,
		_settings = {
			"default": "wet-boew"
		};

	methods = {

		init: function( options ) {
			return $.extend( _settings, options || {} );
		},

		show: function( onlyAria ) {
			$( this ).each( function() {
				var $elm = $( this );
				$elm.attr( "aria-hidden", "false" );
				if ( onlyAria === undef ) {
					$elm.removeClass( "wb-inv" );
				}
			} );
		},

		hide: function( onlyAria ) {
			$( this )
				.each( function() {
					var $elm = $( this );
					$elm.attr( "aria-hidden", "true" );
					if ( onlyAria === undef ) {
						return $elm.addClass( "wb-inv" );
					}
				} );
		},

		toggle: function( to, from ) {
			$( this )
				.addClass( to )
				.removeClass( from );
		}
	};

	$.fn.wb = function( method ) {

		if ( methods[ method ] ) {
			methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof method === "object" || !method ) {
			methods.init.apply( this, arguments );
		} else {
			$.error( "Method " + method + " does not exist on jquery.wb" );
		}
	};

})( jQuery );

/*
:focusable and :tabable jQuery helper expressions - https://github.com/jquery/jquery-ui/blob/24756a978a977d7abbef5e5bce403837a01d964f/ui/jquery.ui.core.js
*/
(function( $ ) {
	"use strict";

	function focusable( element, isTabIndexNotNaN, visibility ) {
		var map, mapName, img,
			nodeName = element.nodeName.toLowerCase( );
		if ( "area" === nodeName ) {
			map = element.parentNode;
			mapName = map.name;
			if ( !element.href || !mapName || map.nodeName.toLowerCase( ) !== "map" ) {
				return false;
			}
			img = $( "img[usemap=#" + mapName + "]" )[ 0 ];
			return !!img && visible( img );
		}
		if ( visibility ) {
			return ( /input|select|textarea|button|object/.test( nodeName ) ? !element.disabled :
				"a" === nodeName ?
				element.href || isTabIndexNotNaN :
				isTabIndexNotNaN ) &&
			// the element and all of its ancestors must be visible
			visible( element );
		} else {
			return ( /input|select|textarea|button|object/.test( nodeName ) ? !element.disabled :
				"a" === nodeName ?
				element.href || isTabIndexNotNaN :
				isTabIndexNotNaN );
		}
	}

	function visible( element ) {
		return $.expr.filters.visible( element ) && !$( element )
			.parents( )
			.addBack( )
			.filter(function() {
				return $.css( this, "visibility" ) === "hidden";
			})
			.length;
	}

	$.extend( $.expr[ ":" ], {
		data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		} ) :
		// support: jQuery <1.8

		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},
		focusable: function( element ) {
			return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
		},
		discoverable: function( element ) {
			return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
		},
		tabbable: function( element ) {
			var tabIndex = $.attr( element, "tabindex" ),
				isTabIndexNaN = isNaN( tabIndex );
			return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
		}
	});

})( jQuery );
/*
Peformant micro templater
@credit: https://github.com/premasagar/tim/blob/master/tinytim.js
@todo: caching
*/
(function( window, undef ) {
	"use strict";
	var tmpl = (function() {
		var start = "{{",
			end = "}}",
			path = "[a-z0-9_$][\\.a-z0-9_]*", // e.g. config.person.name
			pattern = new RegExp( start + "\\s*(" + path + ")\\s*" + end, "gi" );
		return function( template, data ) {
			// Merge data into the template string
			return template.replace( pattern, function( tag, token ) {
				var path = token.split( "." ),
					len = path.length,
					lookup = data,
					i = 0;
				for ( ; i < len; i += 1 ) {
					lookup = lookup[ path[ i ] ];
					// Property not found
					if ( lookup === undef ) {
						throw "tim: '" + path[ i ] + "' not found in " + tag;
					}
					// Return the required value
					if ( i === len - 1 ) {
						return lookup;
					}
				}
			});
		};
	}());

	window.tmpl = tmpl;

})( window );

/**
 * @title WET-BOEW Ajax Fetch [ ajax-fetch ]
 * @overview A basic AjaxLoader wrapper for WET-BOEW
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
(function( $, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var $document = wb.doc,

	/**
	 * @method generateSerial
	 * @param {integer} len Length of the random string to be generated
	 */
	generateSerial = function( len ) {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
			string_length = len,
			randomstring = "",
			counter = 0,
			letterOrNumber,
			newNum,
			rnum;

		for ( counter; counter !== string_length; counter += 1 ) {
			letterOrNumber = Math.floor( Math.random( ) * 2 );
			if ( letterOrNumber === 0 ) {
				newNum = Math.floor( Math.random( ) * 9 );
				randomstring += newNum;
			} else {
				rnum = Math.floor( Math.random( ) * chars.length );
				randomstring += chars.substring( rnum, rnum + 1 );
			}
		}
		return randomstring;
	};

// Event binding
$document.on( "ajax-fetch.wb", function( event ) {
	var caller = event.element,
		url = event.fetch,
		id;

	// Filter out any events triggered by descendants
	if ( event.currentTarget === event.target ) {
		id = "wb" + ( generateSerial( 8 ) );

		$( "<div id='" + id + "' />" )
			.load( url, function() {
				$( caller )
					.trigger( {
						type: "ajax-fetched.wb",
						pointer: $( this )
					});
			});
	}
});

})( jQuery, wb );

/**
 * @title WET-BOEW Events Calendar
 * @overview Dynamically generates a calendar interface for navigating a list of events.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-cal-evt",
	$document = wb.doc,
	i18n, i18nText,

	init = function( $elm ) {
		wb.remove( selector );

		// Only initialize the i18nText once
		if ( !i18nText ) {
			i18n = wb.i18n;
			i18nText = {
				monthNames: i18n( "mnths" ),
				calendar: i18n( "cal" )
			};
		}

		// Load ajax content
		$.when.apply($, $.map( $elm.find( "[data-calEvt]" ), getAjax))
			.always( function() { processEvents( $elm ); } );
	},

	getAjax = function( ajaxContainer ) {
		var $ajaxContainer = $( ajaxContainer ),
			urls = $ajaxContainer.data( "calEvt" ).split(/\s+/),
			dfd = $.Deferred(),
			len = urls.length,
			promises = [],
			i, appendData;

		appendData = function( data ) {
			$ajaxContainer.append( $.trim( data ) );
		};

		for ( i = 0; i < len; i += 1 ) {
			promises.push( $.get( urls[ i ], appendData, "html" ) );
		}

		$.when.apply( $, promises ).always(function() {
			dfd.resolve();
		});

		return dfd.promise();
	},

	processEvents = function( $elm ) {
		var date = new Date(),
			year = date.getFullYear(),
			month = date.getMonth(),
			elmYear = $elm.find( ".year" ),
			elmMonth = $elm.find( ".month" ),
			events, containerId, $containerId;

		if ( elmYear.length > 0 && elmMonth.length > 0 ) {
			// We are going to assume this is always a number.
			year = elmYear.text();

			month = elmMonth.hasClass( "textformat" ) ? $.inArray( elmMonth.text(), i18nText.monthNames ) : elmMonth.text() - 1;
		}

		events = getEvents( $elm );
		containerId = $elm.attr( "class" ).split( " " ).slice( -1 );
		$containerId = $( "#" + containerId );

		$document.on( "displayed.wb-cal", "#" + containerId, function( event, year, month, days ) {
			addEvents(year, month, days, containerId, events.list);
			showOnlyEventsFor(year, month, containerId);
		});
		$document.trigger( "create.wb-cal", [
				containerId,
				year,
				month,
				true,
				events.minDate,
				events.maxDate
			]
		);
		$containerId.attr({
			role: "application",
			"aria-label": i18nText.calendar
		});
	},

	daysBetween = function( dateLow, dateHigh ) {

		// Simplified conversion to date object
		var date1 = wb.date.convert( dateLow ),
			date2 = wb.date.convert( dateHigh ),
			dstAdjust = 0,
			oneMinute = 1000 * 60,
			oneDay = oneMinute * 60 * 24,
			diff;

		// Equalize times in case date objects have them
		date1.setHours( 0 );
		date1.setMinutes( 0 );
		date1.setSeconds( 0 );
		date2.setHours( 0 );
		date2.setMinutes( 0 );
		date2.setSeconds( 0 );

		// Take care of spans across Daylight Saving Time changes
		if ( date2 > date1 ) {
			dstAdjust = ( date2.getTimezoneOffset() - date1.getTimezoneOffset() ) * oneMinute;
		} else {
			dstAdjust = ( date1.getTimezoneOffset() - date2.getTimezoneOffset() ) * oneMinute;
		}
		diff = Math.abs( date2.getTime() - date1.getTime() ) - dstAdjust;
		return Math.ceil( diff / oneDay );
	},

	getEvents = function( obj ) {
		var directLinking = !( $( obj ).hasClass( "evt-anchor" ) ),
			events = {
				minDate: null,
				maxDate: null,
				iCount: 0,
				list: [
					{
						a: 1
					}
				]
			},
			objEventsList = null;

		if ( obj.find( "ol" ).length > 0 ) {
			objEventsList = obj.find( "ol" );
		} else if ( obj.find( "ul" ).length > 0 ) {
			objEventsList = obj.find( "ul" );
		}

		if ( objEventsList.length > 0 ) {
			objEventsList.children( "li" ).each(function() {
				var event = $( this ),
					objTitle = event.find( "*:header:first" ),
					title = objTitle.text(),
					origLink = event.find( "a" ).first(),
					link = origLink.attr( "href" ),
					linkId, date, tCollection, $tCollection, tCollectionTemp,
					strDate1, strDate2, strDate, z, zLen, className;

				/*
				 * Modification direct-linking or page-linking
				 *	- added the ability  to have class set the behaviour of the links
				 *	- default is to use the link of the item as the event link in the calendar
				 *	- 'evt-anchor' class dynamically generates page anchors on the links it maps to the event
				 */
				if ( !directLinking ) {
					linkId = event.attr( "id" ) || randomId( 6 );
					event.attr( "id", linkId );

					/*
					 * Fixes IE tabbing error:
					 * http://www.earthchronicle.com/ECv1point8/Accessibility01IEAnchoredKeyboardNavigation.aspx
					 */
					if ( wb.ie ) {
						event.attr( "tabindex", "-1" );
					}
					link = "#" + linkId;
				}

				/*
				 * Modification XHTML 1.0 strict compatible
				 *   - XHTML 1.0 Strict does not contain the time element
				 */
				date = new Date();
				tCollection = event.find( "time, span.datetime" );

				/*
				 * Date spanning capability
				 *   - since there maybe some dates that are capable of spanning over months we need to identify them
				 *     the process is see how many time nodes are in the event. 2 nodes will trigger a span
				 */
				if ( tCollection.length > 1 ) {

					// This is a spanning event
					tCollectionTemp = tCollection[ 0 ];
					strDate1 = tCollectionTemp.nodeName.toLowerCase() === "time" ?
						$( tCollectionTemp ).attr( "datetime" ).substr( 0, 10 ).split( "-" ) :
						$( tCollectionTemp ).attr( "class" ).match( /datetime\s+\{date\:\s*(\d+-\d+-\d+)\}/ )[ 1 ].substr( 0, 10 ).split( "-" );

					tCollectionTemp = tCollection[ 1 ];
					strDate2 = tCollectionTemp.nodeName.toLowerCase() === "time" ?
						$( tCollectionTemp ).attr( "datetime" ).substr( 0, 10 ).split( "-" ) :
						$( tCollectionTemp ).attr( "class" ).match( /datetime\s+\{date\:\s*(\d+-\d+-\d+)\}/ )[ 1 ].substr( 0, 10 ).split( "-" );

					// Convert to zero-base month
					strDate1[ 1 ] = strDate1[ 1 ] - 1;
					strDate2[ 1 ] = strDate2[ 1 ] - 1;

					date.setFullYear( strDate1[ 0 ], strDate1[ 1 ], strDate1[ 2 ] );

					// Now loop in events to load up all the days that it would be on tomorrow.setDate(tomorrow.getDate() + 1);
					for ( z = 0, zLen = daysBetween( strDate1, strDate2 ); z <= zLen; z += 1 ) {
						if ( events.minDate === null || date < events.minDate ) {
							events.minDate = date;
						}
						if ( events.maxDate === null || date > events.maxDate ) {
							events.maxDate = date;
						}

						events.list[ events.iCount ] = {
							title: title,
							date: new Date( date.getTime() ),
							href: link
						};

						date = new Date( date.setDate( date.getDate() + 1 ) );

						// Add a viewfilter
						className = "filter-" + ( date.getFullYear() ) + "-" +
							wb.string.pad( date.getMonth() + 1, 2 );
						if ( !objTitle.hasClass( className ) ) {
							objTitle.addClass( className );
						}
						events.iCount += 1;
					}
				} else if ( tCollection.length === 1 ) {
					$tCollection = $( tCollection[ 0 ] );
					strDate = ( $tCollection.get( 0 ).nodeName.toLowerCase() === "time" ) ?
						$tCollection.attr( "datetime" ).substr( 0, 10 ).split( "-" ) :
						$tCollection.attr( "class" ).match(/datetime\s+\{date\:\s*(\d+-\d+-\d+)\}/)[ 1 ].substr( 0, 10 ).split( "-" );

					date.setFullYear( strDate[ 0 ], strDate[ 1 ] - 1, strDate[ 2 ] );

					if ( events.minDate === null || date < events.minDate ) {
						events.minDate = date;
					}
					if ( events.maxDate === null || date > events.maxDate ) {
						events.maxDate = date;
					}
					events.list[ events.iCount ] = {
						title: title,
						date: date,
						href: link
					};

					// Add a viewfilter
					className = "filter-" + ( date.getFullYear() ) + "-" + wb.string.pad( date.getMonth() + 1, 2 );
					if ( !objTitle.hasClass( className ) ) {
						objTitle.addClass( className );
					}
					events.iCount += 1;
				}

			// End of loop through objects/events
			});
		}

		window.events = events;
		return events;
	},

	randomId = function( sInt ) {
		var s = "",
			randomChar, n;

		randomChar = function() {
			n = Math.floor( Math.random() * 62 );
			if ( n < 10 ) {

				// 1-10
				return n;
			}
			if ( n < 36 ) {

				// A-Z
				return String.fromCharCode( n + 55 );
			}

			// a-z
			return String.fromCharCode( n + 61 );
		};
		while ( s.length < sInt ) {
			s += randomChar();
		}
		return "id" + s;
	},

	keyboardNavEvents = function( event ) {
		var $this = $( this ),
			length, $children;

		switch ( event.keyCode ) {

		// Up arrow
		case 38:
			$children = $this.closest( "ul" ).children( "li" );
			length = $children.length;
			$children.eq( ( $this.closest( "li" ).index() - 1 ) % length )
				.children( "a" ).trigger( "setfocus.wb" );
			return false;

		// Down arrow
		case 40:
			$children = $this.closest( "ul" ).children( "li" );
			length = $children.length;
			$children.eq( ( $this.closest( "li" ).index() + 1 ) % length )
				.children( "a" ).trigger( "setfocus.wb" );
			return false;

		// Left arrow
		case 37:
			$this.closest( "ol" )
				.children( "li:lt(" + $this.closest( "li[id^=cal-]" ).index() + ")" )
				.children( "a" ).last().trigger( "setfocus.wb" );
			return false;

		// Right arrow
		case 39:
			$this.closest( "ol" )
				.children( "li:gt(" + $this.closest( "li[id^=cal-]" ).index() + ")" )
				.children( "a" ).first().trigger( "setfocus.wb" );
			return false;

		// Escape
		case 27:
			$this.closest( "li[id^=cal-]" ).children( ".cal-evt" ).trigger( "setfocus.wb" );
			return false;
		}
	},

	mouseOnDay = function( dayEvents ) {
		dayEvents.dequeue()
			.removeClass( "wb-inv" )
			.addClass( "ev-details" );
	},

	mouseOutDay = function( dayEvents ) {
		dayEvents.delay( 100 ).queue(function() {
			$( this ).removeClass( "ev-details" )
				.addClass( "wb-inv" )
				.dequeue();
		});
	},

	focus = function( dayEvents ) {
		dayEvents.removeClass( "wb-inv" )
			.addClass( "ev-details" );
	},

	blur = function( dayEvents ) {
		setTimeout(function() {
			var $elm = dayEvents;

			if ( $elm.find( "a:focus" ).length === 0 ) {
				$elm.removeClass( "ev-details" )
					.addClass( "wb-inv" );
			}
		}, 5);
	},

	keyboardEvents = function( event ) {
		var eventType = event.type,
			dayEvents = event.data.details;

		switch ( eventType ) {
		case "keydown":
			keyboardNavEvents( event );
			break;

		case "blur":
			blur( dayEvents );
			break;

		case "focus":
			focus( dayEvents );
			break;
		}
	},

	mouseEvents = function( event ) {
		var eventType = event.type,
			dayEvents = event.data.details;

		switch ( eventType ) {
		case "mouseover":
			mouseOnDay( dayEvents );
			break;

		case "mouseout":
			mouseOutDay( dayEvents );
			break;
		}
	},

	addEvents = function( year, month, days, containerId, eventsList ) {
		var i, eLen, date, day, content, dayEvents, link, eventDetails, itemLink;

		// Fix required to make up with the IE z-index behavior mismatch
		days.each(function( index, day ) {
			$( day ).css( "z-index", 31 - index );
		});

		/*
		 * Determines for each event, if it occurs in the display month
		 * Modification - the author used a jQuery native $.each function for
		 * looping. This is a great function, but has a tendency to like
		 * HTMLELEMENTS and jQuery objects better. We have modified this
		 * to a for loop to ensure that all the elements are accounted for.
		 */
		for ( i = 0, eLen = eventsList.length; i !== eLen; i += 1 ) {
			date = new Date( eventsList[ i ].date );

			if ( date.getMonth() === month && date.getFullYear() === year ) {
				day = $( days[ date.getDate() - 1 ] );

				// Gets the day cell to display an event
				content = day.children( "div" ).html();

				// Lets see if the cell is empty is so lets create the cell
				if ( day.children( "a" ).length < 1 ) {
					day.empty();
					link = $( "<a href='#ev-" + day.attr( "id" ) + "' class='cal-evt'>" + content + "</a>" );
					day.append( link );
					dayEvents = $( "<ul class='wb-inv'></ul>" );

					link.on( "keydown blur focus", { details: dayEvents }, keyboardEvents );

					day.on( "mouseover mouseout", { details: dayEvents }, mouseEvents )
						.append( dayEvents );

				} else {
					/*
					 * Modification - added an else to the date find due to
					 * event collisions not being handled. So the pointer was
					 * getting lost.
					 */
					dayEvents = day.find( "ul.wb-inv" );
				}

				eventDetails = $( "<li><a tabindex='-1' href='" + eventsList[ i ].href + "'>" + eventsList[ i ].title + "</a></li>" );

				dayEvents.append( eventDetails );

				itemLink = eventDetails.children( "a" );

				itemLink.on( "keydown blur focus", { details: dayEvents }, keyboardEvents );
			}
		}
	},

	showOnlyEventsFor = function( year, month, calendarId ) {
		$( "." + calendarId + " li.calendar-display-onshow" )
			.addClass( "wb-inv" )
			.has( ":header[class*=filter-" + year + "-" +
				wb.string.pad( parseInt( month, 10 ) + 1, 2 ) + "]" )
			.removeClass( "wb-inv" );
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb wb-init.wb-cal-evt", selector, function() {
	init( $( this ) );

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Calendar library
 * @overview A library for building calendar interfaces
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once
 * per page, not once per instance of plugin on the page. So, this is a good
 * place to define variables that are common to all instances of the plugin on a
 * page.
 */
var $document = wb.doc,
	i18n, i18nText,

	/**
	 * Creates a calendar instance
	 * @method create
	 */
	create = function( event, calendarId, year, month, shownav, mindate, maxdate, day ) {
		var calendar = document.getElementById( calendarId ),
			$calendar = $( calendar ),
			objCalendarId = "#cal-" + calendarId + "-cnt",
			fromDateISO = wb.date.fromDateISO,
			$objCalendar, $calendarHeader, $oldCalendarHeader, $days, $daysList,
			maxDateYear, maxDateMonth, minDateYear, minDateMonth;

		// Only initialize the i18nText once
		if ( !i18nText ) {
			i18n = wb.i18n;
			i18nText = {
				monthNames: i18n( "mnths" ),
				prevMonth: i18n( "prvMnth" ),
				nextMonth: i18n( "nxtMnth" ),
				goToTitle: i18n( "cal-goToTtl" ),
				goToYear: i18n( "cal-goToYr" ),
				goToMonth: i18n( "cal-goToMnth" ),
				goToLink: i18n( "cal-goToLnk" ),
				goToBtn: i18n( "cal-goToBtn" ),
				cancelBtn: i18n( "cancel" ),
				dayNames: i18n( "days" ),
				currDay: i18n( "currDay" )
			};
		}

		$calendar.addClass( "cal-cnt" );

		// Converts min and max date from string to date objects
		if ( typeof mindate === "string" ) {
			mindate = fromDateISO( mindate );
		} else if ( !( typeof mindate === "object" && mindate.getFullYear() ) ) {
			mindate = null;
		}
		if ( mindate === null ) {
			mindate = new Date();
			mindate.setFullYear( year - 1, month, 1 );
		}

		if ( typeof maxdate === "string" ) {
			maxdate = fromDateISO( maxdate );
		} else if ( typeof maxdate !== "object" || maxdate.constructor !== Date ) {
			maxdate = new Date();
			maxdate.setFullYear( year + 1, month, 1 );
		}

		// Validates that the year and month are in the min and max date range
		maxDateYear = maxdate.getFullYear();
		maxDateMonth = maxdate.getMonth();
		minDateYear = mindate.getFullYear();
		minDateMonth = mindate.getMonth();
		if ( year > maxDateYear || ( year === maxDateYear && month > maxDateMonth ) ) {
			year = maxDateYear;
			month = maxDateMonth;
		} else if ( year < minDateYear || ( year === minDateYear && month < minDateMonth ) ) {
			year = minDateYear;
			month = minDateMonth;
		}

		// Reset calendar if the calendar previously existed
		$objCalendar = $( objCalendarId );
		if ( $objCalendar.length !== 0 ) {
			$objCalendar.find( "#cal-" + calendarId + "-wd, .cal-mnth, #cal-" + calendarId + "-days").remove();
			$objCalendar = $calendar.children("#cal-" + calendarId + "-cnt");
		} else {
			$objCalendar = $( "<table id='cal-" + calendarId + "-cnt' class='cal-cnt'></table>" );
			$calendar.append( $objCalendar );
		}

		// Creates the calendar header
		$calendarHeader = $( "<div class='cal-hd'><div class='cal-mnth'>" +
			i18nText.monthNames[ month ] + " " + year + "</div></div>" );

		// Create the month navigation
		if ( shownav ) {
			$calendarHeader.append( createMonthNav( calendarId, year, month, mindate, maxdate, minDateYear, maxDateYear ) );
		}

		$oldCalendarHeader = $objCalendar.prev( ".cal-hd" );
		if ( $oldCalendarHeader.length === 0 ) {
			$objCalendar.before( $calendarHeader );
		} else {
			$oldCalendarHeader.replaceWith( $calendarHeader );
		}

		// Create the calendar body

		// Creates weekdays | Cree les jours de la semaines
		$objCalendar.append( createWeekdays( calendarId ) );

		// Creates the rest of the calendar | Cree le reste du calendrier
		$days = createDays( calendarId, year, month );
		$daysList = $days.find( "td:not(.cal-empty)" );

		$objCalendar.append( $days );

		// Trigger the displayed.wb-cal event
		$calendar.trigger( "displayed.wb-cal", [ year, month, $daysList, day ] );
	},

	createMonthNav = function( calendarId, year, month, minDate, maxDate, minDateYear, maxDateYear ) {
		var monthNames = i18nText.monthNames,
			$monthNav = $( "#cal-" + calendarId + "-mnthnav" ),
			buttonStart = "<button class='cal-",
			buttonSpecs = [
				[
					"prvmnth",
					-1,
					i18nText.prevMonth,
					"prepend"
				],
				[
					"nxtmnth",
					1,
					i18nText.nextMonth,
					"append"
				]
			],
			alt, $btn, buttonSpec, buttonClass, newMonth, newYear, hideButton, index;

		if ( $monthNav.length === 0 ) {
			$monthNav = $( "<div id='cal-" + calendarId + "-mnthnav'></div>" );
		}

		// Create the go to form if one doesn't already exist
		if ( $( "#" + calendarId + " .cal-goto" ).length === 0 ) {
			$monthNav.append( createGoToForm( calendarId, year, month, minDate, maxDate ) );
		}

		for ( index = 0; index !== 2; index += 1 ) {
			buttonSpec = buttonSpecs[ index ];
			buttonClass = buttonSpec[ 0 ];
			newMonth = month + buttonSpec[ 1 ];
			if ( newMonth < 0 ) {
				newMonth = 11;
				newYear = year - 1;
			} else if ( newMonth > 11 ) {
				newMonth = 0;
				newYear = year + 1;
			} else {
				newYear = year;
			}

			hideButton = ( index === 0 ?
				( ( newYear === minDateYear && newMonth < minDate.getMonth() ) || newYear < minDateYear ) :
				( ( newYear === maxDateYear && newMonth > maxDate.getMonth() ) || newYear > maxDateYear )
			);
			alt = buttonSpec[ 2 ] + monthNames[ newMonth ] + " " + newYear;
			$btn = $monthNav.find( ".cal-" + buttonClass );

			if ( $btn.length !== 0 ) {
				$btn
					.off()
					.attr( "title", alt );
			} else {
				$btn = $( buttonStart + buttonClass + "' title='" + alt +
					"'><span class='glyphicon glyphicon-arrow-" +
					( buttonSpec[ 0 ] === "prvmnth" ? "left" : "right" ) + "'></span></button>" );
				$monthNav[ buttonSpec[ 3 ] ]( $btn );
			}

			$btn
				.toggleClass( "hide", hideButton )
				.attr( "aria-hidden", hideButton );

			if ( !hideButton ) {
				$btn.on( "click", {
					calID: calendarId,
					year: newYear,
					month: newMonth,
					mindate: minDate,
					maxdate: maxDate
				}, changeMonth );
			}
		}

		return $monthNav;
	},

	changeMonth = function( event ) {
		var which = event.which,
			$btn = $( event.target ),
			eventData = event.data,
			$container = $btn.closest( ".cal-cnt" );

		// Ignore middle/right mouse buttons
		if ( !which || which === 1 ) {

			if ( typeof eventData !== "undefined" ) {
				$document.trigger( "create.wb-cal", [
					eventData.calID,
					eventData.year,
					eventData.month,
					true,
					eventData.mindate,
					eventData.maxdate
				]);
			}

			if ( $btn.hasClass( "wb-inv" ) ) {
				$container.find( ".cal-goto-lnk a" ).trigger( "setfocus.wb" );
			} else {
				$btn.trigger( "setfocus.wb" );
			}
		}
	},

	yearChanged = function( event ) {
		var year = parseInt( this.value, 10 ),
			eventData = event.data,
			minDate = eventData.minDate,
			maxDate = eventData.maxDate,
			$monthField = eventData.$monthField,
			minMonth = 0,
			maxMonth = 11,
			monthNames = i18nText.monthNames,
			month, i;

		if ( year === minDate.getFullYear() ) {
			minMonth = minDate.getMonth();
		}

		if ( year === maxDate.getFullYear() ) {
			maxMonth = maxDate.getMonth();
		}

		month = $monthField.val();

		// Can't use $monthField.empty() or .html("") on <select> in IE
		// http://stackoverflow.com/questions/3252382/why-does-dynamically-populating-a-select-drop-down-list-element-using-javascript
		for ( i = $monthField.length - 1 ; i !== -1; i -= 1 ) {
			$monthField[ i ].remove( i );
		}

		for ( i = minMonth; i !== maxMonth; i += 1 ) {
			$monthField.append( "<option value='" + i + "'" + ( (i === month ) ? " selected='selected'" : "" ) +
				">" + monthNames[ i ] + "</option>" );
		}
	},

	createGoToForm = function( calendarId, year, month, minDate, maxDate ) {
		var $goToForm = $( "<div class='cal-goto'></div>" ),
			$form = $( "<form id='cal-" + calendarId + "-goto' role='form' style='display:none;' action=''><fieldset><legend>" +
				i18nText.goToTitle + "</legend></fieldset></form>" ),
			$fieldset, $yearContainer, $yearField, y, ylen, $monthContainer, $monthField, $buttonContainer,
			$button, $buttonCancelContainer, $buttonCancel, $goToLinkContainer, $goToLink;

		$form.on( "submit", function( event ) {
			event.preventDefault();
			onGoTo( calendarId, minDate, maxDate );
			return false;
		});
		$fieldset = $form.children( "fieldset" );

		// Create the year field
		$yearContainer = $( "<div class='cal-goto-yr'></div>" );
		$yearField = $( "<select title='" + i18nText.goToYear + "' id='cal-" + calendarId + "-goto-year'></select>" );
		for ( y = minDate.getFullYear(), ylen = maxDate.getFullYear(); y <= ylen; y += 1 ) {
			$yearField.append( $( "<option value='" + y + "'" + (y === year ? " selected='selected'" : "" ) + ">" + y + "</option>" ) );
		}

		$yearContainer.append( $yearField );
		$fieldset.append( $yearContainer );

		// Create the list of month field
		$monthContainer = $( "<div class='cal-goto-mnth'></div>" );
		$monthField = $( "<select title='" + i18nText.goToMonth + "' id='cal-" + calendarId + "-goto-month'></select>" );

		$monthContainer.append( $monthField );
		$fieldset
			.append( $monthContainer )
			.append( "<span class='clearfix'></span>" );

		// Update the list of available months when changing the year
		$yearField.on( "change", { minDate: minDate, maxDate: maxDate, $monthField: $monthField }, yearChanged );

		// Populate initial month list
		$yearField.trigger( "change" );

		$buttonContainer = $( "<div class='cal-goto-btn'></div>" );
		$button = $( "<input type='submit' class='btn btn-primary' value='" + i18nText.goToBtn + "' />" );
		$buttonContainer.append( $button );
		$fieldset.append( $buttonContainer );

		$buttonCancelContainer = $( "<div class='cal-goto-btn'></div>" );
		$buttonCancel = $( "<input type='button' class='btn btn-default' value='" + i18nText.cancelBtn + "' />" );
		$buttonCancel.on( "click", function( event ) {
			var which = event.which;

			// Ignore middle/right mouse buttons
			if ( !which || which === 1 ) {
				$( "#" + calendarId ).trigger( "hideGoToFrm.wb-cal" );
			}
		});
		$buttonCancelContainer.append( $buttonCancel );
		$fieldset.append( $buttonCancelContainer );

		$goToLinkContainer = $( "<p class='cal-goto-lnk' id='cal-" + calendarId + "-goto-lnk'></p>" );
		$goToLink = $( "<a href='javascript:;' role='button' aria-controls='cal-" +
			calendarId + "-goto' aria-expanded='false'>" + i18nText.goToLink + "</a>" );
		$goToLink.on( "click", function( event ) {
			var which = event.which;

			// Ignore middle/right mouse buttons
			if ( !which || which === 1 ) {
				showGoToForm( calendarId );
			}
		} );
		$goToLinkContainer.append( $goToLink );

		$goToForm.append( $goToLinkContainer );
		$goToForm.append( $form );

		return $goToForm;
	},

	createWeekdays = function( calendarId ) {
		var weekdays = "<thead id='cal-" + calendarId + "-days' class='cal-wd' role='presentation'><tr>",
			dayNames = i18nText.dayNames,
			wd, wd1, dayName;
		for ( wd = 0; wd < 7; wd += 1 ) {
			dayName = dayNames[ wd ];
			wd1 = wd + 1;
			weekdays += "<th id='cal-" + calendarId + "-wd" + wd1 + "' class='cal-wd cal-wd" + wd1 +
				( wd === 0 || wd === 6 ? "we" : "" ) + "' role='columnheader'><abbr title='" + dayName + "'>" +
				dayName.charAt( 0 ) + "</abbr></th>";
		}

		return $( weekdays + "</tr></thead>" );
	},

	createDays = function( calendarId, year, month ) {
		var cells = "<tbody id='cal-" + calendarId + "-days' class='cal-days'>",
			date = new Date(),
			textWeekDayNames = i18nText.dayNames,
			textMonthNames = i18nText.monthNames,
			textCurrentDay = i18nText.currDay,
			frenchLang = ( document.documentElement.lang === "fr" ),
			breakAtEnd = false,
			dayCount = 0,
			firstDay, lastDay, week, day, currYear, currMonth, currDay, id, className, isCurrentDate;

		// Get the day of the week of the first day of the month | Determine le jour de la semaine du premier jour du mois
		date.setFullYear( year, month, 1 );
		firstDay = date.getDay();

		// Get the last day of the month | Determine le dernier jour du mois
		date.setFullYear( year, month + 1, 0 );
		lastDay = date.getDate() - 1;

		// Get the current date
		date = new Date();
		currYear = date.getFullYear();
		currMonth = date.getMonth();
		currDay = date.getDate();

		for ( week = 1; week < 7; week += 1 ) {
			cells += "<tr>";
			for ( day = 0; day < 7; day += 1 ) {

				id = "cal-" + calendarId + "-w" + week + "d" + ( day + 1 );
				className = ( day === 0 || day === 6 ? "cal-we " : "" ) +
					"cal-w" + week + "d" + ( day + 1 ) + " cal-index-" + ( dayCount + 1 );

				if ( ( week === 1 && day < firstDay ) || ( dayCount > lastDay ) ) {

					// Creates empty cells | Cree les cellules vides
					cells += "<td id='" + id + "' class='cal-empty " + className + "'>&#160;</td>";
				} else {

					// Creates date cells | Cree les cellules de date
					dayCount += 1;
					isCurrentDate = ( dayCount === currDay && month === currMonth && year === currYear );

					cells += "<td id='" + id + "' class='" + ( isCurrentDate ? "cal-currday " : "" ) + className + "'><div><time datetime='" + currYear + "-" +
						( month < 9 ? "0" : "" ) + ( month + 1 ) + "-" + ( dayCount < 10 ? "0" : "" ) + dayCount + "'><span class='wb-inv'>" + textWeekDayNames[ day ] +
						( frenchLang ? ( " </span>" + dayCount + "<span class='wb-inv'> " + textMonthNames[ month ].toLowerCase() + " " ) :
						( " " + textMonthNames[ month ] + " </span>" + dayCount + "<span class='wb-inv'> " ) ) + year +
						( isCurrentDate ? textCurrentDay : "" ) + "</span></time></div></td>";

					if ( dayCount > lastDay ) {
						breakAtEnd = true;
					}
				}
			}
			cells += "</tr>";
			if ( breakAtEnd ) {
				break;
			}
		}
		cells += "</tbody></table>";

		return $( cells );
	},

	showGoToForm = function( calendarId ) {
		var gotoId = "#cal-" + calendarId + "-goto",
			$link = $( gotoId + "-lnk" ),
			$form = $( gotoId );

		// TODO: Replace with CSS animation
		$link.stop().slideUp( 0 );
		$form.stop().slideDown( 0 ).queue(function() {
			$( this ).find( ":input:eq(0)" ).trigger( "setfocus.wb" );
		});
		$link
			.children( "a" )
				.attr({
					"aria-hidden": "true",
					"aria-expanded": "true"
				});
	},

	hideGoToFrm = function( event ) {
		var calendarId = event.target.id,
			gotoId = "#cal-" + calendarId + "-goto",
			$link = $( gotoId + "-lnk" ),
			$form = $( gotoId );

		// TODO: Replace with CSS animation
		$form.stop().slideUp( 0 );
		$link
			.stop()
			.slideDown( 0 )
			.children( "a" )
				.attr({
					"aria-hidden": "false",
					"aria-expanded": "false"
				});
	},

	onGoTo = function( calendarId, minDate, maxDate ) {
		var $container = $( "#" + calendarId ),
			fieldset = $container.find( "fieldset" ),
			month = parseInt( fieldset.find( ".cal-goto-mnth select option:selected" ).val(), 10 ),
			year = parseInt( fieldset.find( ".cal-goto-yr select" ).val(), 10 );

		if (!(month < minDate.getMonth() && year <= minDate.getFullYear()) && !(month > maxDate.getMonth() && year >= maxDate.getFullYear())) {
			$document.trigger( "create.wb-cal", [
				calendarId,
				year,
				month,
				true,
				minDate,
				maxDate
			]);
			$container.trigger( "hideGoToFrm.wb-cal" );

			// Go to the first day to avoid having to tab over the navigation again.
			$( "#cal-" + calendarId + "-days a" )
				.eq( 0 )
				.trigger( "setfocus.wb" );
		}
	},

	setFocus = function( event, calendarId, year, month, minDate, maxDate, targetDate ) {
		var time = targetDate.getTime();

		if ( time < minDate.getTime() ) {
			targetDate = minDate;
		} else if ( time > maxDate.getTime() ) {
			targetDate = maxDate;
		}

		if ( targetDate.getMonth() !== month || targetDate.getFullYear() !== year ) {
			$document.trigger( "create.wb-cal", [
					calendarId,
					targetDate.getFullYear(),
					targetDate.getMonth(),
					true,
					minDate,
					maxDate,
					targetDate.getDate()
				]
			);
		}
	};

// Event binding
$document.on( "create.wb-cal", create );

// Keyboard nav
$document.on( "keydown", ".cal-days a", function( event ) {
	var elm = event.target,
		$elm = $( elm ),
		$monthContainer = $elm.closest( ".cal-cnt" ),
		$container = $monthContainer.parent().closest( ".cal-cnt" ),
		calendarId = $container.attr( "id" ),
		fieldId = $container.attr( "aria-controls" ),
		which = event.which,
		fromDateISO = wb.date.fromDateISO,
		date = fromDateISO( elm.getElementsByTagName( "time" )[ 0 ].getAttribute( "datetime" ) ),
		currYear = date.getFullYear(),
		currMonth = date.getMonth(),
		currDay = date.getDate(),
		days = $monthContainer.find( "td > a" ).get(),
		maxDay = days.length,
		field, minDate, maxDate, modifier;

	if ( fieldId ) {
		field = document.getElementById( fieldId );
		minDate = field.getAttribute( "min" );
		maxDate = field.getAttribute( "max" );
	} else {
		minDate = $container.data( "minDate" );
		maxDate = $container.data( "maxDate" );
	}

	minDate = fromDateISO( ( minDate ? minDate : "1800-01-01" ) );
	maxDate = fromDateISO( ( maxDate ? maxDate : "2100-01-01" ) );

	if ( !event.altKey && !event.metaKey && which > 31 && which < 41 ) {
		switch ( which ) {

		// spacebar
		case 32:
			$elm.trigger( "click" );
			return false;

		// page up / page down
		case 33:
		case 34:
			modifier = ( which === 33 ? -1 : 1 );

			if ( event.ctrlKey ) {
				date.setYear( currYear + modifier );
			} else {
				date.setMonth( currMonth + modifier );
			}
			break;

		// end key
		case 35:
			date.setDate( maxDay );
			break;

		// home key
		case 36:
			date.setDate( 1 );
			break;

		// left arrow key
		case 37:
			date.setDate( currDay - 1 );
			break;

		// up arrow key
		case 38:
			date.setDate( currDay - 7 );
			break;

		// right arrow key
		case 39:
			date.setDate( currDay + 1 );
			break;

		// down arrow key
		case 40:
			date.setDate( currDay + 7 );
			break;
		}

		// Move focus to the new date
		if ( currYear !== date.getFullYear() || currMonth !== date.getMonth() ) {
			$document.trigger( "setFocus.wb-cal", [
					calendarId,
					currYear,
					currMonth,
					minDate,
					maxDate,
					date
				]
			);
		} else if ( currDay !== date.getDate() ) {
			$( days[ date.getDate() - 1 ] ).trigger( "setfocus.wb" );
		}

		return false;
	}
});

$document.on( "hideGoToFrm.wb-cal", ".cal-cnt", hideGoToFrm );

$document.on( "setFocus.wb-cal", setFocus );

$document.on( "click", ".cal-prvmnth, .cal-nxtmnth", changeMonth );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Country Content
 * @overview A basic AjaxLoader wrapper that inserts AJAXed in content based on a visitors country as resolved by http://freegeoip.net
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @nschonni
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once
 * per page, not once per instance of plugin on the page. So, this is a good
 * place to define variables that are common to all instances of the plugin on a
 * page.
 */
var $document = wb.doc,
	selector = "[data-country-content]",

	/**
	 * Init runs once per plugin element on the page. There may be multiple
	 * elements. It will run more than once per plugin if you don"t remove the
	 * selector from the timer.
	 * @method init
	 * @param {jQuery DOM element} $elm The plugin element being initialized
	 */
	init = function( $elm ) {

		var url = $elm.data( "countryContent" );

		// All plugins need to remove their reference from the timer in the init
		// sequence unless they have a requirement to be poked every 0.5 seconds
		wb.remove( selector );

		$.when( getCountry() ).then( function( countryCode ) {

			if ( countryCode === "") {
				// Leave default content since we couldn"t find the country
				return;
			} else {
				// @TODO: Handle bad country values or any whitelist of countries.
			}

			url = url.replace( "{country}", countryCode.toLowerCase() );

			$elm.removeAttr( "data-country-content" );

			$elm.load(url);
		});
	},
	getCountry = function() {
		var dfd = $.Deferred(),
			countryCode = localStorage.getItem( "countryCode" );

		// Couldn"t find a value in the session
		if ( countryCode === null ) {

			// From https://github.com/aFarkas/webshim/blob/master/src/shims/geolocation.js#L89-L127
			$.ajax({
				url: "http://freegeoip.net/json/",
				dataType: "jsonp",
				cache: true,
				jsonp: "callback",
				success: function( data ) {
					if ( data ) {
						countryCode = data.country_code;
						localStorage.setItem( "countryCode", countryCode );
					}

					dfd.resolve( countryCode );
				},
				error: function() {
					dfd.reject( "" );
				}
			});
		} else {
			dfd.resolve( countryCode );
		}

		return dfd.promise();
	};

$document.on( "timerpoke.wb wb-init.wb-country-content", selector, function( event ) {
	var eventTarget = event.target;

	// Filter out any events triggered by descendants
	if ( event.currentTarget === eventTarget ) {
		init( $( eventTarget ) );
	}

	/*
	 * Since we are working with events we want to ensure that we are being
	 * passive about our control, so returning true allows for events to always
	 * continue
	 */
	return true;
} );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Data Ajax [data-ajax-after], [data-ajax-append],
 * [data-ajax-before], [data-ajax-prepend] and [data-ajax-replace]
 * @overview A basic AjaxLoader wrapper that inserts AJAXed-in content
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once
 * per page, not once per instance of plugin on the page. So, this is a good
 * place to define variables that are common to all instances of the plugin on a
 * page.
 */
var $document = wb.doc,
	selector = "[data-ajax-after], [data-ajax-append], [data-ajax-before], " +
		"[data-ajax-prepend], [data-ajax-replace]",

	/**
	 * Init runs once per plugin element on the page. There may be multiple
	 * elements. It will run more than once per plugin if you don't remove the
	 * selector from the timer.
	 * @method init
	 * @param {jQuery DOM element} $elm The plugin element being initialized
	 * @param {string} ajaxType The type of AJAX operation, either after, append, before or replace
	 */
	init = function( $elm, ajaxType ) {

		var _url = $elm.data( "ajax-" + ajaxType );

		// All plugins need to remove their reference from the timer in the init
		// sequence unless they have a requirement to be poked every 0.5 seconds
		wb.remove( selector );

		$document.trigger({
			type: "ajax-fetch.wb",
			element: $elm,
			fetch: _url
		});
	};

$document.on( "timerpoke.wb wb-init.wb-data-ajax ajax-fetched.wb", selector, function( event ) {
	var eventTarget = event.target,
		eventType = event.type,
		ajaxTypes = [
			"before",
			"replace",
			"after",
			"append",
			"prepend"
		],
		len = ajaxTypes.length,
		$elm, ajaxType, i, content;

	// Filter out any events triggered by descendants
	if ( event.currentTarget === eventTarget ) {
		$elm = $( eventTarget );

		for ( i = 0; i !== len; i += 1 ) {
			ajaxType = ajaxTypes[ i ];
			if ( this.getAttribute( "data-ajax-" + ajaxType ) !== null ) {
				break;
			}
		}

		switch ( eventType ) {

		case "timerpoke":
		case "wb-init":
			init( $elm, ajaxType );
			break;

		default:

			// ajax-fetched event
			content = event.pointer.html();
			$elm.removeAttr( "data-ajax-" + ajaxType );

			// "replace" is the only event that doesn't map to a jQuery function
			if ( ajaxType === "replace") {
				$elm.html( content );
			} else {
				$elm[ ajaxType ]( content );
			}

			$elm.trigger( "ajax-" + ajaxType + "-loaded.wb" );
		}
	}

	/*
	 * Since we are working with events we want to ensure that we are being
	 * passive about our control, so returning true allows for events to always
	 * continue
	 */
	return true;
} );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Data InView
 * @overview A simplified data-attribute driven plugin that responds to moving in and out of the viewport.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-inview",
	$elms = $( selector ),
	$document = wb.doc,
	$window = wb.win,
	scrollEvent = "scroll.wb-inview",

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery DOM element} $elm The plugin element being initialized
	 */
	init = function( $elm ) {

		// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
		wb.remove( selector );

		$elm.trigger( scrollEvent );
	},

	/**
	 * @method onInView
	 * @param {jQuery DOM element} $elm The plugin element
	 */
	onInView = function( $elm ) {
		var elementWidth = $elm.outerWidth(),
			elementHeight = $elm.outerHeight(),
			scrollTop = $window.scrollTop(),
			scrollBottom = scrollTop + $window.height(),
			scrollRight = $window.scrollLeft() + elementWidth,
			x1 = $elm.offset().left,
			x2 = x1 + elementWidth,
			y1 = $elm.offset().top,
			y2 = y1 + elementHeight,
			oldViewState = $elm.attr( "data-inviewstate" ),
			inView = ( scrollBottom < y1 || scrollTop > y2 ) || ( scrollRight < x1 || scrollRight > x2 ),

			// this is a bit of a play on true/false to get the desired effect. In short this variable depicts
			// the view state of the element
			// all - the whole element is in the viewport
			// partial - part of the element is in the viewport
			// none - no part of the element is in the viewport
			viewState = ( scrollBottom > y2 && scrollTop < y1 ) ? "all" : inView ? "none" : "partial",
			$dataInView, show;

		// Only if the view state has changed
		if ( viewState !== oldViewState ) {

			// Show on "partial"/"none" (default) or just "none" (requires "show-none" class)
			show = inView || ( $elm.hasClass( "show-none" ) ? false : viewState === "partial" );

			$elm.attr( "data-inviewstate", viewState );
			$dataInView = $( "#" + $elm.attr( "data-inview" ) );

			// Keep closed if the user closed the inView result
			if ( !$dataInView.hasClass( "user-closed" ) ) {
				if ( $dataInView.hasClass( "wb-overlay" ) ) {
					if ( !oldViewState ) {
						$dataInView.addClass( "outside-off" );
					}
					$dataInView.trigger(
						( show ? "open" : "close" ) + ".wb-overlay"
					);
				} else {
					$dataInView
						.attr( "aria-hidden", !show )
						.toggleClass( "in", !show )
						.toggleClass( "out", show );
				}
			}
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb wb-init.wb-inview " + scrollEvent, selector, function( event ) {
	var eventTarget = event.target,
		eventType = event.type,
		$elm;

	// Filter out any events triggered by descendants
	if ( event.currentTarget === eventTarget ) {
		$elm = $( eventTarget );

		switch ( eventType ) {
		case "timerpoke":
		case "wb-init":
			init( $elm );
			break;
		case "scroll":
			onInView( $elm );
			break;
		}
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

$window.on( "scroll scrollstop", function() {
	$elms.trigger( scrollEvent );
});

$document.on( "txt-rsz.wb win-rsz-width.wb win-rsz-height.wb", function() {
	$elms.trigger( scrollEvent );
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Data Picture
 * @overview Event driven port of the Picturefill library: https://github.com/scottjehl/picturefill
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @patheard
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = "[data-picture]",
	$document = wb.doc,
	picturefillEvent = "picfill.wb-data-pic",

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery DOM element} $elm The plugin element being initialized
	 */
	init = function( $elm ) {

		// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
		wb.remove( selector );

		$elm.trigger( picturefillEvent );
	},

	/**
	 * Updates the image displayed according to media queries.
	 * This is the logic ported from Picturefill.
	 * @method picturefill
	 * @param {DOM element} elm The element containing the images to be updated
	 */
	picturefill = function( elm ) {
		var matches = [],
			img = elm.getElementsByTagName( "img" )[ 0 ],
			sources = elm.getElementsByTagName( "span" ),
			i, len, matchedElm, media;

		// Loop over the data-media elements and find matching media queries
		for ( i = 0, len = sources.length; i !== len; i += 1 ) {
			media = sources[ i ].getAttribute( "data-media" );
			if ( !media || Modernizr.mq( media ) ) {
				matches.push( sources[ i ] );
			}
		}

		// If a media query match was found, add the image to the page
		if ( matches.length !== 0 ) {
			matchedElm = matches.pop();
			if ( !img ) {
				img = $document[ 0 ].createElement( "img" );
				img.alt = elm.getAttribute( "data-alt" );
			}
			img.src = matchedElm.getAttribute( "data-src" );
			matchedElm.appendChild( img );

		// No match and an image exists: delete it
		} else if ( img ) {
			img.parentNode.removeChild( img );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb wb-init.wb-data-pic " + picturefillEvent, selector, function( event ) {
	var eventTarget = event.target,
		eventType = event.type;

	// Filter out any events triggered by descendants
	if ( event.currentTarget === eventTarget ) {
		switch ( eventType ) {
		case "timerpoke":
		case "wb-init":
			init( $( eventTarget ) );
			break;
		case "picfill":
			picturefill( eventTarget );
			break;
		}
	}
});

// Handles window resize so images can be updated as new media queries match
$document.on( "txt-rsz.wb win-rsz-width.wb win-rsz-height.wb", function() {
	$( selector ).trigger( picturefillEvent );
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Responsive equal height
 * @overview Sets the same height for all elements in a container that are rendered on the same baseline (row). Adapted from http://codepen.io/micahgodbolt/pen/FgqLc.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @thomasgohard
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-equalheight",
	$document = wb.doc,

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {

		// Filter out any events triggered by descendants
		if ( event.currentTarget === event.target ) {

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Remove the event handler since only want init fired once per page (not per element)
			$document.off( "timerpoke.wb", selector );

			onResize();
		}
	},

	/**
	 * Re-equalise any time the window/document or a child element of 'selector' is resized.
	 * @method onResize
	 */
	onResize = function() {
		var $elm = $( selector ),
			$children = $elm.children(),
			row = [ ],
			rowTop = -1,
			currentChild,
			currentChildTop = -1,
			currentChildHeight = -1,
			tallestHeight = -1,
			i;

		for ( i = $children.length - 1; i >= 0; i-- ) {
			currentChild = $children[ i ];

			// Ensure all children that are on the same baseline have the same 'top' value.
			currentChild.style.verticalAlign = "top";

			// Remove any previously set min height
			currentChild.style.minHeight = 0;

			currentChildTop = currentChild.offsetTop;
			currentChildHeight = currentChild.offsetHeight;

			if ( currentChildTop !== rowTop ) {
				setRowHeight( row, tallestHeight );

				rowTop = currentChildTop;
				tallestHeight = currentChildHeight;
			} else {
				tallestHeight = (currentChildHeight > tallestHeight) ? currentChildHeight : tallestHeight;
			}

			row.push( currentChild );
		}

		if ( row.length !== 0 ) {
			setRowHeight( row, tallestHeight );
		}
	},

	/**
	 * @method setRowHeight
	 * @param {array} row The rows to be updated
	 * @param {integer} height The new row height
	 */
	setRowHeight = function( row, height ) {
		for ( var i = row.length - 1; i >= 0; i-- ) {
			row[ i ].style.minHeight = height + "px";
		}
		row.length = 0;
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb wb-init.wb-equalheight", selector, init );

// Handle text and window resizing
$document.on( "txt-rsz.wb win-rsz-width.wb win-rsz-height.wb tables-draw.wb", onResize );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Favicon Plugin
 * @overview Provides the ability to add and update a page's favicons
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @patheard
 *
 * This plugin provides the ability to add and update the favicon's on a web page. Its default behaviour is to add a mobile favicon to web pages that have a favicon defined by a `<link rel="shortcut icon">` element.
 *
 * The mobile favicon's file name, rel, path and sizes can be set with data attributes on the `<link rel="shortcut icon">`:
 *
 * -**data-filename:** filename of the mobile favicon (defaults to "favicon-mobile.png"). This will be appended to the favicon's path.
 * -**data-path:** path to the mobile favicon (defaults to using the same path as the shortcut icon).
 * -**data-rel:** rel attribute of the mobile favicon (defaults to "apple-touch-icon").
 * -**data-sizes:** sizes attribute of the mobile favicon (defaults to "57x57 72x72 114x114 144x144 150x150").
 *
 * For example, the following overides the rel and file name attributes of the mobile favicon:
 *
 *     <link href="favion.ico" rel="shortcut icon" data-rel="apple-touch-icon-precomposed" data-filename="my-mobile-favicon.ico">
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = "link[rel='shortcut icon']",
	$document = wb.doc,

	/*
	 * Plugin users can override these defaults by setting attributes on the html elements that the
	 * selector matches.
	 * For example, adding the attribute data-option1="false", will override option1 for that plugin instance.
	 */
	defaults = {
		filename: "favicon-mobile.png",
		path: null,
		rel: "apple-touch-icon",
		sizes: "57x57 72x72 114x114 144x144 150x150"
	},

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery DOM element} $favicon The plugin element being initialized
	 */
	init = function( $favicon ) {
		// Merge default settings with overrides from the selected plugin element. There may be more than one, so don't override defaults globally!
		var settings = $.extend( {}, defaults, $favicon.data() );

		// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
		wb.remove( selector );

		$favicon.trigger( "mobile.wb-favicon", settings );
	},

	/**
	 * Adds, or updates, the mobile favicon on a page. Mobile favicons are identified by the
	 * `apple` prefix in the `<link>` elements rel attribute.
	 * @method mobile
	 * @param {DOM element} favicon Favicon element
	 * @param {jQuery Event} event Event that triggered this handler
	 * @param {Object} data Key-value data object passed with the event
	 */
	mobile = function( favicon, event, data ) {
		var faviconPath,
			faviconMobile = $( "link[rel^='apple']" ),
			isFaviconMobile = faviconMobile.length !== 0;

		// Create the mobile favicon if it doesn't exist
		if ( !isFaviconMobile ) {
			faviconMobile = $( "<link rel='" + data.rel + "' sizes='" + data.sizes + "' class='wb-favicon'>" );
		}

		// Only add/update a mobile favicon that was created by the plugin
		if ( faviconMobile.hasClass( "wb-favicon" ) ) {
			faviconPath = data.path !== null ? data.path : getPath( favicon.getAttribute( "href" ) );
			faviconMobile.attr( "href", faviconPath + data.filename );

			if ( !isFaviconMobile ) {
				favicon.parentNode.insertBefore( faviconMobile[ 0 ], favicon );
			}
		}
	},

	/**
	 * Updates the the page's shortcut icon
	 * @method icon
	 * @param {DOM element} favicon Favicon element
	 * @param {jQuery Event} event Event that triggered this handler
	 * @param {Object} data Key-value data object passed with the event
	 */
	icon = function( favicon, event, data ) {
		var faviconPath = data.path !== null ? data.path : getPath( favicon.getAttribute( "href" ) );
		favicon.setAttribute( "href", faviconPath + data.filename );
	},

	/**
	 * Given a full file path, returns the path without the filename
	 * @method getPath
	 * @param {string} filepath The full path to file, including filename
	 * @returns {string} The path to the file
	 */
	getPath = function( filepath ) {
		return filepath.substring( 0, filepath.lastIndexOf( "/" ) + 1 );
	};

// Bind the plugin events
$document.on( "timerpoke.wb wb-init.wb-favicon mobile.wb-favicon icon.wb-favicon", selector, function( event, data ) {
	var eventTarget = event.target;

	// Filter out any events triggered by descendants
	if ( event.currentTarget === eventTarget ) {
		switch ( event.type ) {
		case "timerpoke":
		case "wb-init":
			init( $( eventTarget ) );
			break;
		case "mobile":
			mobile( eventTarget, event, data );
			break;
		case "icon":
			icon( eventTarget, event, data );
			break;
		}
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Feedback form
 * @overview Allows users to submit feedback for a specific Web page or Web site.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-fdbck",
	$document = wb.doc,
	fbrsn, fbaxs, fbcntc1, fbcntc2, $fbweb, $fbmob, $fbcomp, $fbinfo,

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {
		var eventTarget = event.target,
			referrerUrl = document.referrer,
			$elm, $fbrsn, urlParams;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === eventTarget ) {
			$elm = $( eventTarget );
			$fbrsn = $elm.find( "#fbrsn" );
			urlParams = wb.pageUrlParts.params;

			// Cache the form areas
			fbrsn = $fbrsn[ 0 ];
			fbaxs = document.getElementById( "fbaxs" );
			fbcntc1 = document.getElementById( "fbcntc1" );
			fbcntc2 = document.getElementById( "fbcntc2" );
			$fbweb = $elm.find( "#fbweb" );
			$fbmob = $fbweb.find( "#fbmob" );
			$fbcomp = $fbweb.find( "#fbcomp" );
			$fbinfo = $elm.find( "#fbinfo" );

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Set the initial value for the fbrsn field based on the query string
			if ( !urlParams.submit && urlParams.fbrsn ) {
				$fbrsn.find( "option[value='" + urlParams.fbrsn + "']" ).attr( "selected", "selected" );
			}

			// Set aria-controls
			fbrsn.setAttribute( "aria-controls", "fbweb" );
			fbaxs.setAttribute( "aria-controls", "fbmob fbcomp" );

			// Set the initial show/hide state of the form
			showHide( fbrsn );
			showHide( fbaxs );
			showHide( fbcntc1 );
			showHide( fbcntc2 );

			// Prepopulates URL form field with referrer
			document.getElementById( "fbpg" ).setAttribute( "value", referrerUrl );
		}
	},

	/**
	 * @method showHide
	 * @param {DOM element} elm The element triggering the show/hide
	 */
	showHide = function( elm ) {
		var targetId = elm.id,
			$show,
			$hide;

		switch ( targetId ) {
		case "fbrsn":
			if ( elm.value === "web" ) {
				$show = $fbweb;
			} else {
				$hide = $fbweb;
			}
			break;
		case "fbaxs":
			if ( elm.value === "mobile" ) {
				$show = $fbmob;
				$hide = $fbcomp;
			} else {
				$show = $fbcomp;
				$hide = $fbmob;
			}
			break;
		case "fbcntc1":
		case "fbcntc2":
			if ( document.getElementById( "fbcntc1" ).checked || document.getElementById( "fbcntc2" ).checked ) {
				$show = $fbinfo;
			} else {
				$hide = $fbinfo;
			}
			break;
		}

		// Element to show
		if ( $show ) {
			// TODO: Use CSS transitions instead
			$show.attr( "aria-hidden", "false" ).show( "slow" );
		}

		// Element to hide
		if ( $hide ) {
			// TODO: Use CSS transitions instead
			$hide.attr( "aria-hidden", "true" ).hide( "slow" );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb wb-init.wb-fdbck", selector, init );

// Show/hide form areas when certain form fields are changed
$document.on( "keydown click change", "#fbrsn, #fbaxs, #fbcntc1, #fbcntc2", function( event ) {
	var which = event.which;

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {
		showHide( event.target );
	}
} );

// Return to the form defaults when the reset button is activated
$document.on( "click", selector + " input[type=reset]", function( event ) {
	var which = event.which;

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {
		showHide( fbrsn );
		showHide( fbaxs );
		showHide( fbcntc1 );
		showHide( fbcntc2 );
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Feeds
 * @overview Aggregates and displays entries from one or more Web feeds.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-feeds",
	$document = wb.doc,

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {

		// Filter out any events triggered by descendants
		if ( event.currentTarget === event.target ) {

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			var elm = event.target,
				$content = $( elm ).find( ".feeds-cont" ),
				limit = getLimit( elm ),
				feeds = elm.getElementsByTagName( "a" ),
				last = feeds.length - 1,
				i = last,
				entries = [],
				_results = [],
				deferred = [],
				processEntries = function( data ) {
					var k, len;

					data = data.responseData.feed.entries;
					len = data.length;
					for ( k = 0; k !== len; k += 1 ) {
						entries.push( data[ k ] );
					}
					if ( !last ) {
						parseEntries( entries, limit, $content );
					}

					last -= 1;
					return last;
				},
				finalize = function() {

					// TODO: Use CSS instead
					$content.find( "li" ).show();
				};

			while ( i >= 0 ) {
				deferred[ i ] = $.ajax({
					url: jsonRequest( feeds[ i ].href, limit ),
					dataType: "json",
					timeout: 1000
				}).done( processEntries );
				_results.push( i -= 1 );
			}
			$.when.apply( null, deferred ).always( finalize );

			$.extend( {}, _results );
		}
	},

	/**
	 * Returns a class-based set limit on plugin instances
	 * @method getLimit
	 * @param {DOM object} elm The element to search for a class of the form blimit-5
	 * @return {number} 0 if none found, which means the plugin default
	 */
	getLimit = function( elm ) {
		var count = elm.className.match( /\blimit-\d+/ );
		if ( !count ) {
			return 0;
		}
		return Number( count[ 0 ].replace( /limit-/i, "" ) );
	},

	/**
	 * Builds the URL for the JSON request
	 * @method jsonRequest
	 * @param {url} url URL of the feed.
	 * @param {integer} limit Limit on the number of results for the JSON request to return.
	 * @return {url} The URL for the JSON request
	 */
	jsonRequest = function( url, limit ) {
		var requestURL = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent( decodeURIComponent( url ) );

		// API returns a maximum of 4 entries by default so only override if more entries should be returned
		if ( limit > 4 ) {
			requestURL += "&num=" + limit;
		}
		return requestURL;
	},

	/**
	 * Parses the results from a JSON request and appends to an element
	 * @method parseEntries
	 * @param {object} entries Results from a JSON request.
	 * @param {integer} limit Limit on the number of results to append to the element.
	 * @param {jQuery DOM element} $elm Element to which the elements will be appended.
	 * @return {url} The URL for the JSON request
	 */
	parseEntries = function( entries, limit, $elm ) {
		var cap = ( limit > 0 && limit < entries.length ? limit : entries.length ),
			result = "",
			toDateISO = wb.date.toDateISO,
			compare = wb.date.compare,
			i, sorted, sortedEntry;

		sorted = entries.sort( function( a, b ) {
			return compare( b.publishedDate, a.publishedDate );
		});

		for ( i = 0; i !== cap; i += 1 ) {
			sortedEntry = sorted[ i ];
			result += "<li><a href='" + sortedEntry.link + "'>" + sortedEntry.title + "</a>" +
				( sortedEntry.publishedDate !== "" ? " <span class='feeds-date'>[" +
				toDateISO( sortedEntry.publishedDate, true ) + "]</span>" : "" ) + "</li>";
		}
		return $elm.empty().append( result );
	};

$document.on( "timerpoke.wb wb-init.wb-feeds", selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Focus
 * @overview User agent safe way of assigning focus to an element
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, wb ) {
"use strict";

var $document = wb.doc,
	hash = wb.pageUrlParts.hash,
	clickEvents = "click vclick",
	setFocusEvent = "setfocus.wb",
	linkSelector = "a[href]",
	$linkTarget;

// Bind the setfocus event
$document.on( setFocusEvent, function( event ) {
	var $elm = $( event.target );

	// Set the tabindex to -1 (as needed) to ensure the element is focusable
	$elm
		.filter( ":not([tabindex], a, button, input, textarea, select)" )
			.attr( "tabindex", "-1" );

	// Assigns focus to an element (delay allows for revealing of hidden content)
	setTimeout(function() {
		return $elm.focus();
	}, 1 );
});

// Set focus to the target of a deep link from a different page
// (helps browsers that can't set the focus on their own)
if ( hash && ( $linkTarget = $( hash ) ).length !== 0 ) {
	$linkTarget.trigger( setFocusEvent );
}

// Helper for browsers that can't change keyboard and/or event focus on a same page link click
$document.on( clickEvents, linkSelector, function( event ) {
	var testHref = event.currentTarget.getAttribute( "href" );

	// Same page links only
	if ( testHref.charAt( 0 ) === "#" && ( $linkTarget = $( testHref ) ).length !== 0 ) {
		$linkTarget.trigger( setFocusEvent );
	}
});

})( jQuery, wb );

/**
 * @title WET-BOEW Footnotes
 * @overview Provides a consistent, accessible way of handling footnotes across websites.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @EricDunsworth
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-fnote",
	$document = wb.doc,

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {
		var elm = event.target,
			$elm, footnoteDd, footnoteDt, i, len, dd, dt, dtId, $returnLinks;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === elm ) {
			$elm = $( elm );
			footnoteDd = elm.getElementsByTagName( "dd" );
			footnoteDt = elm.getElementsByTagName( "dt" );

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Apply aria-labelledby and set initial event handlers for return to referrer links
			len = footnoteDd.length;
			for ( i = 0; i !== len; i += 1 ) {
				dd = footnoteDd[ i ];
				dt = footnoteDt[ i ];
				dtId = dd.id + "-dt";
				dd.setAttribute( "tabindex", "-1" );
				dd.setAttribute( "aria-labelledby", dtId );
				dt.id = dtId ;
			}

			// Remove "first/premier/etc"-style text from certain footnote return links (via the child spans that hold those bits of text)
			$returnLinks = $elm.find( "dd p.fn-rtn a span span" ).remove();
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb wb-init.wb-fnote", selector, init );

// Listen for footnote reference links that get clicked
$document.on( "click vclick", "main :not(" + selector + ") sup a.fn-lnk", function( event ) {
	var eventTarget = event.target,
		which = event.which,
		refId, $refLinkDest;

	// Ignore middle/right mouse button
	if ( !which || which === 1 ) {
		refId = "#" + wb.jqEscape( eventTarget.getAttribute( "href" ).substring( 1 ) );
		$refLinkDest = $document.find( refId );

		$refLinkDest.find( "p.fn-rtn a" )
					.attr( "href", "#" + eventTarget.parentNode.id );

		// Assign focus to $refLinkDest
		$refLinkDest.trigger( "setfocus.wb" );
		return false;
	}
} );

// Listen for footnote return links that get clicked
$document.on( "click vclick", selector + " dd p.fn-rtn a", function( event ) {
	var which = event.which,
		refId;

	// Ignore middle/right mouse button
	if ( !which || which === 1 ) {
		refId = "#" + wb.jqEscape( event.target.getAttribute( "href" ).substring( 1 ) );

		// Assign focus to the link
		$document.find( refId + " a" ).trigger( "setfocus.wb" );
		return false;
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Form validation
 * @overview Provides generic validation and error message handling for Web forms.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-formvalid",
	$document = wb.doc,
	i18n, i18nText,

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {
		var eventTarget = event.target,
			modeJS, $elm;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === eventTarget ) {

			// read the selector node for parameters
			modeJS = wb.getMode() + ".js";
			$elm = $( eventTarget );

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					colon: i18n( "colon" ),
					hyphen: i18n( "hyphen" ),
					error: i18n( "err" ),
					errorFound: i18n( "err-fnd" ),
					errorsFound: i18n( "errs-fnd" ),
					formNotSubmitted: i18n( "frm-nosubmit" )
				};
			}

			Modernizr.load({
				// For loading multiple dependencies
				both: [
					"site!deps/jquery.validate" + modeJS,
					"site!deps/additional-methods" + modeJS
				],
				complete: function() {
					var $form = $elm.find( "form" ),
						formDOM = $form.get( 0 ),
						formId = $form.attr( "id" ),
						labels = formDOM.getElementsByTagName( "label" ),
						labels_len = labels.length,
						$formElms = $form.find( "input, select, textarea" ),
						$inputs = $formElms.filter( "input" ),
						$pattern = $inputs.filter( "[pattern]" ),
						submitted = false,
						$required = $form.find( "[required]" ).attr( "aria-required", "true" ),
						errorFormId = "errors-" + ( !formId ? "default" : formId ),
						i, len,	validator;

					// Append the aria-live region (for provide message updates to screen readers)
					$elm.append( "<div class='arialive wb-inv' aria-live='polite' aria-relevant='all'></div>" );

					// Add space to the end of the labels (so separation between label and error when CSS turned off)
					len = labels_len;
					for ( i = 0; i !== len; i += 1 ) {
						labels[ i ].innerHTML += " ";
					}

					// Remove the pattern attribute until it is safe to use with jQuery Validation
					len = $pattern.length;
					for ( i = 0; i !== len; i += 1 ) {
						$pattern.eq( i ).removeAttr( "pattern" );
					}

					// Change form attributes and values that interfere with validation in IE7/8
					// TODO: Need better way of dealing with this rather than browser sniffing
					if ( wb.ieVersion > 0 && wb.ieVersion < 9 ) {
						len = $required.length;
						$required.removeAttr( "required" );
						for ( i = 0; i !== len; i += 1) {
							$required[ i ].setAttribute( "data-rule-required", "true" );
						}
						$inputs.filter( "[type=date]" ).each( function() {
							var $this = $( this ),
								$parent = $this.wrap( "<div/>" ).parent(),
								newElm = $( $parent.html().replace( "type=date", "type=text" ) );
							$parent.replaceWith( newElm );
						});
						$formElms = $form.find( "input, select, textarea" );
					}

					// The jQuery validation plug-in in action
					validator = $form.validate({
						meta: "validate",
						focusInvalid: false,

						// Set the element which will wrap the inline error messages
						errorElement: "strong",

						// Location for the inline error messages
						// In this case we will place them in the associated label element
						errorPlacement: function( $error, $element ) {
							var type = $element.attr( "type" ),
								$fieldset, $legend;

							$error.data( "element-id", $element.attr( "id" ) );
							if ( type ) {
								type = type.toLowerCase();
								if ( type === "radio" || type === "checkbox" ) {
									$fieldset = $element.closest( "fieldset" );
									if ( $fieldset.length !== 0 ) {
										$legend = $fieldset.find( "legend" ).first();
										if ( $legend.length !== 0 && $fieldset.find( "input[name=" + $element.attr( "name" ) + "]" ) !== 1) {
											$error.appendTo( $legend );
											return;
										}
									}
								}
							}
							$error.appendTo( $form.find( "label[for=" + $element.attr( "id" ) + "]" ) );
							return;
						},

						// Create our error summary that will appear before the form
						showErrors: function( errorMap ) {
							this.defaultShowErrors();
							var _i18nText = i18nText,
								$errors = $form.find( "strong.error" ).filter( ":not(:hidden)" ),
								$errorfields = $form.find( "input.error, select.error, textarea.error" ),
								$summaryContainer = $form.find( "#" + errorFormId ),
								prefixStart = "<span class='prefix'>" + _i18nText.error + "&#160;",
								prefixEnd = _i18nText.colon + " </span>",
								separator = _i18nText.hyphen,
								ariaLive = $form.parent().find( ".arialive" )[ 0 ],
								summary, key, i, len, $error, prefix, $fieldName, $fieldset, label, labelString;

							$form.find( "[aria-invalid=true]" ).removeAttr( "aria-invalid" );
							if ( $errors.length !== 0 ) {
								// Create our container if one doesn't already exist
								if ( $summaryContainer.length === 0 ) {
									$summaryContainer = $( "<div id='" + errorFormId + "' class='errCnt' tabindex='-1'/>" ).prependTo( $form );
								} else {
									$summaryContainer.empty();
								}

								// Post process
								summary = "<p>" + _i18nText.formNotSubmitted + $errors.length + ( $errors.length !== 1 ? _i18nText.errorsFound : _i18nText.errorFound ) + "</p><ul>";
								$errorfields.attr( "aria-invalid", "true" );
								len = $errors.length;
								for ( i = 0; i !== len; i += 1 ) {
									$error = $errors.eq( i );
									prefix = prefixStart + ( i + 1 ) + prefixEnd;
									$fieldName = $error.closest( "label" ).find( ".field-name" );

									// Try to find the field name in the legend (if one exists)
									if ( $fieldName.length === 0 ) {
										$fieldset = $error.closest( "fieldset" );
										if ( $fieldset.length !== 0 ) {
											$fieldName = $fieldset.find( "legend .field-name" );
										}
									}

									$error.find( "span.prefix" ).detach();
									summary += "<li><a href='#" + $error.data( "element-id" ) + "'>" + prefix + ( $fieldName.length !== 0 ? $fieldName.html() + separator : "" ) + $error[ 0 ].innerHTML + "</a></li>";
									$error.prepend( prefix );
								}
								summary += "</ul>";

								// Output our error summary and place it in the error container
								$summaryContainer.append( summary );

								// Put focus on the error if the errors are generated by an attempted form submission
								if ( submitted ) {

									// Assign focus to $summaryContainer
									$summaryContainer.trigger( "setfocus.wb" );
								} else {

									// Update the aria-live region as necessary
									i = 0;
									for ( key in errorMap ) {
										if ( errorMap.hasOwnProperty( key ) ) {
											i += 1;
											break;
										}
									}
									if ( i !== 0 ) {
										len = $errors.length;
										for ( i = 0; i !== len; i += 1 ) {
											label = $errors[ i ].parentNode;
											if ( label.getAttribute( "for" ) === key ) {
												labelString = label.innerHTML;
												if ( labelString !== ariaLive.innerHTML ) {
													ariaLive.innerHTML = labelString;
												}
												break;
											}
										}
									} else if ( ariaLive.innerHTML.length !== 0 ) {
										ariaLive.innerHTML = "";
									}
								}

								submitted = false;
							} else {
								// Update the aria-live region as necessary
								if ( ariaLive.innerHTML.length !== 0 ) {
									ariaLive.innerHTML = "";
								}
								$summaryContainer.detach();
							}
						}, // End of showErrors()
						invalidHandler: function() {
							submitted = true;
						}
					} ); //end of validate()

					// Clear the form and remove error messages on reset
					$document.on( "click vclick touchstart", selector + " input[type=reset]", function( event ) {
						var $summaryContainer,
							which = event.which,
							ariaLive;

						// Ignore middle/right mouse buttons
						if ( !which || which === 1 ) {
							validator.resetForm();
							$summaryContainer = $form.find( "#" + errorFormId );
							if ( $summaryContainer.length > 0 ) {
								$summaryContainer.empty();
							}

							$form.find( "[aria-invalid=true]" ).removeAttr( "aria-invalid" );
							ariaLive = $form.parent().find( ".arialive" )[ 0 ];
							if ( ariaLive.innerHTML.length !== 0 ) {
								ariaLive.innerHTML = "";
							}
						}
					});

					// Tell the i18n file to execute to run any $.validator extends
					$form.trigger( "formLanguages.wb" );
				}
			});
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb wb-init.wb-formvalid", selector, init );

// Move the focus to the associated input when an error message link is clicked
// and scroll to the top of the label or legend that contains the error
$document.on( "click vclick", selector + " .errCnt a", function( event ) {
	var which = event.which,
		hash, $input, $label, $legend, errorTop;

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {
		hash = this.href.substring( this.href.indexOf( "#" ) );
		$input = $( hash );
		$label = $input.prev();
		$legend = $label.length === 0 ? $input.closest( "fieldset" ).find( "legend" ) : [];
		errorTop = $label.length !== 0 ? $label.offset().top : ( $legend.length !== 0 ? $legend.offset().top : -1 );

		// Assign focus to $input
		$input.trigger( "setfocus.wb" );

		if ( errorTop !== -1 ) {
			window.scroll( 0, errorTop );
		}
		return false;
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Lightbox
 * @overview Helps build a photo gallery on a web page.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-lightbox",
	$document = wb.doc,
	i18n, i18nText,
	extendedGlobal = false,

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {
		var elm = event.target,
			$elm, modeJS;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === elm ) {

			// read the selector node for parameters
			modeJS = wb.getMode() + ".js";
			$elm = $( elm );

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					tClose: i18n( "overlay-close" ) + i18n( "space" ) + i18n( "esc-key" ),
					tLoading: i18n( "load" ),
					gallery: {
						tPrev: i18n( "prv-l" ),
						tNext: i18n( "nxt-r" ),
						tCounter: i18n( "lb-curr" )
					},
					image: {
						tError: i18n( "lb-img-err" ) + " (<a href=\"url%\">)"
					},
					ajax: {
						tError: i18n( "lb-xhr-err" ) + " (<a href=\"url%\">)"
					}
				};
			}

			// Load Magnific Popup dependency and bind the init event handler
			Modernizr.load({
				load: "site!deps/jquery.magnific-popup" + modeJS,
				complete: function() {
					var settings = {},
						firstLink;

					// Set the dependency i18nText only once
					if ( !extendedGlobal ) {
						$.extend( true, $.magnificPopup.defaults, i18nText );
						extendedGlobal = true;
					}

					// TODO: Add swipe support

					settings.callbacks = {
						open: function() {

							// TODO: Better if dealt with upstream by Magnific popup
							var $item = this.currItem,
								$content = this.contentContainer,
								$bottomBar;

							this.wrap.attr({
								role: "dialog",
								"aria-live": "polite",
								"aria-labelledby": "lb-title"
							});

							if ( $item.type === "image" ) {
								$bottomBar = $content.find( ".mfp-bottom-bar" ).attr( "id", "lb-title" );
							} else {
								$content.attr( "role", "document" );
							}
						},
						change: function() {
							var $item = this.currItem,
								$content = this.contentContainer,
								$el, $bottomBar, $source, $target, description, altTitleId, altTitle;

							// TODO: Better if dealt with upstream by Magnific Popup
							if ( $item.type === "image" ) {
								$el = $item.el;
								$source = $el.find( "img" );
								$target = $item.img.attr( "alt", $source.attr( "alt" ) );
								$bottomBar = $content.find( ".mfp-bottom-bar" );

								// Replicate aria-describedby if it exists
								description = $source.attr( "aria-describedby" );
								if ( description ) {
									$target.attr( "aria-describedby", description );
								}

								// Replicate longdesc if it exists
								description = $source.attr( "longdesc" );
								if ( description ) {
									$target.attr( "longdesc", description );
								}

								// Handle alternate titles
								altTitleId = $el.attr( "data-title" );
								if ( altTitleId ) {
									altTitle = document.getElementById( altTitleId );
									if ( altTitle !== null ) {
										$bottomBar.find( ".mfp-title" ).html( altTitle.innerHTML );
									}
								}
							} else {
								$content
									.find( ".modal-title, h1" )
									.first()
									.attr( "id", "lb-title" );
							}
						}
					};

					if ( elm.nodeName.toLowerCase() !== "a" ) {
						settings.delegate = "a";
						firstLink = elm.getElementsByTagName( "a" )[0];

						// Is the element a gallery?
						if ( elm.className.indexOf( "-gallery" ) !== -1 ) {
							settings.gallery = {
								enabled: true
							};
						}
					} else {
						firstLink = elm;
					}

					if ( firstLink.getAttribute( "href" ).charAt( 0 ) === "#" ) {
						settings.type = "inline";
					} else if ( firstLink.className.indexOf( "lb-iframe" ) !== -1 ) {
						settings.type = "iframe";
					} else if ( firstLink.getElementsByTagName( "img" ).length === 0 ) {
						settings.type = "ajax";
					} else {
						settings.type = "image";
					}

					if ( elm.className.indexOf( "lb-modal" ) !== -1 ) {
						settings.modal = true;
					}

					// Extend the settings with data-wet-boew then
					$elm.magnificPopup(
						$.extend(
							true,
							settings,
							wb.getData( $elm, "wet-boew" )
						)
					);
				}
			});
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb wb-init.wb-lightbox", selector, init );

$document.on( "keydown", ".mfp-wrap", function( event ) {
	var $elm, $focusable, index, length;

	// If the tab key is used and filter out any events triggered by descendants
	if ( extendedGlobal && event.which === 9 ) {
		event.preventDefault();
		$elm = $( this );
		$focusable = $elm.find( ":focusable" );
		length = $focusable.length;
		index = $focusable.index( event.target ) + ( event.shiftKey ? -1 : 1 );
		if ( index === -1 ) {
			index = length - 1;
		} else if ( index === length ) {
			index = 0;
		}
		$focusable.eq( index ).trigger( "setfocus.wb" );
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

// Event handler for closing a modal popup
$(document).on( "click", ".popup-modal-dismiss", function( event ) {
	event.preventDefault();
	$.magnificPopup.close();
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Menu plugin
 * @overview A Menu plugin for WET
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET community
 */

(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-menu",
	$document = wb.doc,
	breadcrumb = document.getElementById( "wb-bc" ),
	selectEvent = "sel.wb-menu",
	incrementEvent = "inc.wb-menu",
	displayEvent = "disp.wb-menu",
	navCurrentEvent = "navcurr.wb",

	// Used for half second delay on showing/hiding menus because of mouse hover
	hoverDelay = 500,
	menuCount = 0,
	globalTimeout = {},

	/**
	 * Lets leverage JS assigment deconstruction to reduce the code output
	 * @method expand
	 * @param {DOM element} element The plugin element
	 * @param {boolean} scopeitems ***Description needed***
	 */
	expand = function( element, scopeitems ) {
		var $elm = $( element ),
			elm = $elm.hasClass( "wb-menu" ) ? $elm.data() : $elm.parents( ".wb-menu" )
				.first()
				.data(),
			items = scopeitems ? elm.items.has( element ) : elm.items;
		return [ elm.self, elm.menu, items, $elm ];
	},

	/**
	 * Lets set some aria states and attributes
	 * @method onInit
	 * @param {jQuery DOM element} $elm The plugin element
	 */
	onInit = function( $elm ) {

		// All plugins need to remove their reference from the timer in the init
		// sequence unless they have a requirement to be poked every 0.5 seconds
		wb.remove( selector );

		// Ensure the container has an id attribute
		if ( !$elm.attr( "id" ) ) {
			$elm.attr( "id", "wb-menu-" + menuCount );
		}
		menuCount += 1;

		// Lets test to see if we have any
		if ( $elm.data( "ajax-fetch" ) ) {
			$document.trigger({
				type: "ajax-fetch.wb",
				element: $elm,
				fetch: $elm.data( "ajax-fetch" )
			});
		} else {

			// Trigger the navcurrent plugin
			$elm.trigger( navCurrentEvent, breadcrumb );
			$( "#wb-sec" ).trigger( navCurrentEvent, breadcrumb );
		}
	},

	/**
	 * Lets set some aria states and attributes
	 * @method drizzleAria
	 * @param {jQuery DOM elements} $elements The collection of elements
	 */
	drizzleAria = function( $elements ) {
		var length = $elements.length,
			$elm, $subMenu, i;

		// Lets tweak for aria
		for ( i = 0; i !== length; i += 1 ) {
			$elm = $elements.eq( i );
			$subMenu = $elm.siblings( ".sm" );

			$elm.attr({
				"aria-posinset": ( i + 1 ),
				"aria-setsize": length,
				role: "menuitem"
			});

			// if there is a submenu lets put in the aria for it
			if ( $subMenu.length !== 0 ) {

				$elm.attr( "aria-haspopup", "true" );

				$subMenu.attr({
					"aria-expanded": "false",
					"aria-hidden": "true"
				});

				// recurse into submenu
				drizzleAria( $subMenu.find( ":discoverable" ) );
			}
		}
	},

	/**
	 * @method onAjaxLoaded
	 * @param {jQuery DOM element} $elm The plugin element
	 * @param {jQuery DOM element} $ajaxed The AJAX'd in menu content to import
	 */
	onAjaxLoaded = function( $elm, $ajaxed ) {
		var $menu = $ajaxed.find( "[role='menubar'] .item" ),

			// Optimized the code block to look to see if we need to import anything instead
			// of just doing a query with which could result in no result
			imports = $elm.data( "import" ) ? $elm.data( "import" ).split( " " ) : 0,
			$panel, i, classList, $iElement;

		// lets see if there is anything to import into our panel
		if ( imports !== 0 ) {
			$panel = $ajaxed.find( ".pnl-strt" );
			classList = $panel.siblings( ".wb-info" ).eq( 0 ).attr( "class" );

			for ( i = imports.length - 1; i >= 0; i-- ) {
				$iElement = $( "#" + imports[ i ] );

				// lets only deal with elements that exist since there are possibilites where templates
				// could add into a header and footer and the content areas change depending on levels
				// in the site
				if ( $iElement.length === 0 ) {
					continue;
				}

				// Lets DomInsert since we are complete all our safeguards and pre-processing
				// ** note we need to ensure our content is ID safe since this will invalidate the DOM
				$panel.before( "<section id='wb-imprt-" + i + "' class='" +
					classList + "'>" +
					$iElement.html().replace( /\b(id|for)="([^"]+)"/g, "$1='$2-imprt'" ) +
				"</section>" );
			}
		}

		$ajaxed.find( ":discoverable" )
			.attr( "tabindex", "-1" );

		$menu.eq( 0 ).attr( "tabindex", "0" );
		$menu.filter( "[href^=#]" )
			.append( "<span class='expicon'></span>" );

		drizzleAria( $menu );

		// Now lets replace the html since we were working off canvas for performance
		if ( $elm.has( "[data-post-remove]" ) ) {
			$elm.removeClass( $elm.data( "post-remove" ) )
				.removeAttr( "data-post-remove" );
		}

		// Replace elements
		$elm.html( $ajaxed.html() );

		// Recalibrate context
		$elm.data({
			self: $elm,
			menu: $elm.find( "[role=menubar] .item" ),
			items: $elm.find( ".sm" )
		});

		// Trigger the navcurrent plugin
		$elm.trigger( navCurrentEvent, breadcrumb );
	},

	/**
	 * @method onSelect
	 * @param {jQuery event} event The current event
	 */
	onSelect = function( event ) {
		var $goTo = event.goTo,
			special = event.special;

		$goTo.trigger( "setfocus.wb" );
		if ( special || ( $goTo.hasClass( "item" ) && !$goTo.attr( "aria-haspopup" ) ) ) {
			onReset( $goTo.parents( selector ), true, special );
		}

	},

	/**
	 * @method onIncrement
	 * @param {jQuery DOM element} $elm The plugin element
	 * @param {jQuery event} event The current event
	 */
	onIncrement = function( $elm, event ) {
		var $links = event.cnode,
			next = event.current + event.increment,
			index = next >= $links.length ? 0 : next < 0 ? $links.length - 1 : next;

		$elm.trigger({
			type: selectEvent,
			goTo: $links.eq( index )
		});
	},

	/**
	 * @method onReset
	 * @param {jQuery DOM element} $elm The plugin element
	 * @param {boolean} cancelDelay Whether or not to delay the closing of the menus (false by default)
	 * @param {boolean} keepActive Whether or not to leave the active class alone (false by default)
	 */
	onReset = function( $elm, cancelDelay, keepActive ) {
		var id = $elm.attr( "id" ),
			$openActive = $elm.find( ".open, .active" );

		// Clear any timeouts for open/closing menus
		clearTimeout( globalTimeout[ id ] );

		if ( cancelDelay ) {
			$openActive.removeClass( "open sm-open" );
			if ( !keepActive ) {
				$openActive.removeClass( "active" );
			}
		} else {

			// Delay the closing of the menus
			globalTimeout[ id ] = setTimeout( function() {
					$openActive.removeClass( "open sm-open active" );
			}, hoverDelay );
		}
	},

	/**
	 * @method onDisplay
	 * @param {jQuery DOM element} $elm The plugin element
	 * @param {jQuery event} event The current event

	 */
	onDisplay = function( $elm, event ) {
		var menuItem = event.ident,
			menuLink = menuItem.children( "a" );

		// Lets reset the menus with no delay to ensure no overlap
		$elm.find( ".open, .active" ).removeClass( "open sm-open active" );

		// Ignore if doesn't have a submenu
		if ( menuLink.attr( "aria-haspopup" ) === "true" ) {

			// Add the open state classes
			menuItem
				.addClass( "active sm-open" )
				.find( ".sm" )
				.addClass( "open" );
		}
	},

	/**
	 * @method onHoverFocus
	 * @param {jQuery event} event The current event
	 */
	onHoverFocus = function( event ) {
		var ref = expand( event.target ),
			$container = ref[ 0 ],
			$elm = ref[ 3 ];

		if ( $container ) {

			// Clear any timeouts for open/closing menus
			clearTimeout( globalTimeout[ $container.attr( "id" ) ] );

			$container.trigger({
				type: displayEvent,
				ident: $elm.parent(),
				cancelDelay: event.type === "focusin"
			});
		}
	},

	/**
	 * Causes clicks on panel menu items to open and close submenus (except for mouse)
	 * @method onPanelClick
	 * @param {jQuery event} event The current event
	 */
	onPanelClick = function( event ) {
		var which = event.which,
			$this;

		if ( which === 1 ) {
			event.preventDefault();
		} else if ( !which ) {
			event.preventDefault();
			$this = $( this );
			if ( $( "#wb-sm" ).find( ".nav-close" ).is( ":visible" ) ) {
				$this.trigger( "focusin" );
			} else if ( !which ) {
				event.preventDefault();
				onReset( $this, true );
			}
		}
	},

	/**
	 * Searches for the next link that has link text starting with a specific letter
	 * @method selectByLetter
	 * @param {integer} charCode The charCode of the letter to search for
	 * @param {DOM elements} links Collection of links to search
	 * @param {jQuery DOM element} $container Plugin element
	 */
	selectByLetter = function( charCode, links, $container ) {
		var len = links.length,
			keyChar = String.fromCharCode( charCode ),
			link, i;

		for ( i = 0; i !== len; i += 1 ) {
			link = links[ i ];
			if ( link.innerHTML.charAt( 0 ) === keyChar ) {
				$container.trigger({
					type: selectEvent,
					goTo: $( link )
				});
				return true;
			}
		}

		return false;
	};

// Bind the events of the plugin
$document.on( "timerpoke.wb wb-init.wb-menu " + selectEvent + " ajax-fetched.wb " + incrementEvent + " " + displayEvent, selector, function( event ) {
	var elm = event.target,
		eventType = event.type,
		$elm = $( elm );

	switch ( eventType ) {
	case "ajax-fetched":

		// Filter out any events triggered by descendants
		if ( event.currentTarget === elm ) {
			onAjaxLoaded( $elm, event.pointer );
		}
		return false;

	case "sel":
		onSelect( event );
		break;

	case "timerpoke":
	case "init":

		// Filter out any events triggered by descendants
		if ( event.currentTarget === elm ) {
			onInit( $elm );
		}
		break;

	case "inc":
		onIncrement( $elm, event );
		break;

	case "disp":
		if ( event.cancelDelay ) {
			onDisplay( $elm, event );
		} else {
			globalTimeout[ $elm.attr( "id" ) ] = setTimeout( function() {
				onDisplay( $elm, event );
			}, hoverDelay );
		}
		break;
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

$document.on( "mouseleave", selector + " .menu", function( event ) {
	onReset( $( event.target ).closest( ".wb-menu" ) );
});

// Panel clicks on menu items should open submenus
$document.on( "click vclick", selector + " .item[aria-haspopup]", onPanelClick );

/*
 * Menu Keyboard bindings
 */
$document.on( "mouseover focusin", selector + " .item", onHoverFocus );

$document.on( "keydown", selector + " .item", function( event ) {
	var elm = event.target,
		which = event.which,
		ref = expand( elm ),
		$container = ref[ 0 ],
		$menu = ref[ 1 ],
		$elm = ref[ 3 ],
		$parent, $subMenu;

	switch ( which ) {

	// Enter key, up/down arrow
	case 13:
	case 38:
	case 40:
		if ( $elm.find( ".expicon" ).length !== 0 ) {
			event.preventDefault();
			$parent = $elm.parent();
			$subMenu = $parent.find( ".sm" );

			// Open the submenu if it is not already open
			if ( !$subMenu.hasClass( "open" ) ) {
				$container.trigger({
					type: displayEvent,
					ident: $parent,
					cancelDelay: true
				});
			}

			$container.trigger({
				type: selectEvent,
				goTo: $subMenu.find( "a" ).first()
			});
		}
		break;

	// Tab/escape key
	case 9:
	case 27:
		onReset( $container, true, ( which === 27 ) );
		break;

	// Left/right arrow
	case 37:
	case 39:
		event.preventDefault();
		$container.trigger({
			type: incrementEvent,
			cnode: $menu,
			increment: ( which === 37 ? -1 : 1 ),
			current: $menu.index( $elm )
		});
		break;

	default:

		// Letters only
		if ( which > 64 && which < 91 ) {
			event.preventDefault();
			selectByLetter(
				which,
				$elm.parent().find( "ul a" ).get(),
				$container
			);
		}
	}
});

/*
 * Item Keyboard bindings
 */
$document.on( "keydown", selector + " [role=menu]", function( event ) {
	var elm = event.target,
		which = event.which,
		ref = expand( elm, true ),
		$container = ref[ 0 ],
		$menu = ref[ 1 ],
		$items = ref[ 2 ],
		$elm = ref[ 3 ],
		$links = $items.find( ":focusable" ),
		selector = "[href=#" + $items.attr( "id" ) + "]",
		$parent, result;

	switch ( which ) {

	// Escape key/left arrow
	case 27:
		event.preventDefault();
		$container.trigger({
			type: selectEvent,
			goTo: $menu.filter( selector ),
			special: "reset"
		});
		break;

	// Left/right arrow
	case 37:
	case 39:
		event.preventDefault();
		$container.trigger({
			type: incrementEvent,
			cnode: $menu,
			increment: ( which === 37 ? -1 : 1 ),
			current: $menu.index( $menu.filter( selector ) )
		});
		break;

	// Up/down arrow
	case 38:
	case 40:
		event.preventDefault();
		$container.trigger({
			type: incrementEvent,
			cnode: $links,
			increment: ( which === 38 ? -1 : 1 ),
			current: $links.index( $elm )
		});
		break;

	// Tab key
	case 9:
		onReset( $container, true );
		break;

	default:

		// Letters only
		if ( which > 64 && which < 91 ) {
			event.preventDefault();
			$parent = $elm.parent();

			// Try to find a match in the next siblings
			result = selectByLetter(
				which,
				$parent.nextAll().find( "a" ).get(),
				$container
			);

			// If couldn't find a match, try the previous siblings
			if ( !result ) {
				result = selectByLetter(
					which,
					$parent.prevAll().find( "a" ).get(),
					$container
				);
			}
		}
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Modal
 * @overview Uses the Magnific Popup library to create a modal dialog
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @patheard
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-modal",
	$document = wb.doc,

	/*
	 * Plugin users can override these defaults by setting attributes on the html elements that the
	 * selector matches.
	 * For example, adding the attribute data-option1="false", will override option1 for that plugin instance.
	 */
	defaults = {
		modal: false,		// When true, force a modal-like behaviour (no close button and escape key or overlay click won't close)
		mainClass: "mfp",	// CSS class for the modal wrapper element
		removalDelay: 0		// Number of milliseconds to wait before removing modal element from DOM (use with closing animations)
	},

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @function init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {

		// Filter out any events triggered by descendants
		if ( event.currentTarget === event.target ) {

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Load the magnific popup dependency
			Modernizr.load({
				load: "site!deps/jquery.magnific-popup" + wb.getMode() + ".js",
				complete: function() {
					$document.trigger( "ready.wb-modal" );
				}
			});
		}
	},

	/**
	 * Opens a popup defined by the settings object
	 * @function show
	 * @param {Object} settings Key-value object
	 */
	show = function( settings ) {
		$.magnificPopup.open( $.extend( {}, defaults, settings ) );
	},

	/**
	 * Closes a popup
	 * @function hide
	 */
	hide = function() {
		$.magnificPopup.close();
	},

	/**
	 * Creates a modal dialog for use with the Magnific Popup library.
	 * @function build
	 * @param {Object} settings Key-value object used to build the modal dialog
	 * @returns {jQuery Object} The modal jQuery DOM object
	 */
	build = function( settings ) {
		// TODO: Add random serial to `id` attribute to prevent collisions
		var $modal = $( "<section class='modal-dialog modal-content overlay-def'>" +
			"<div class='modal-body' id='lb-desc'>" + settings.content + "</div></section>" );

		// Add modal's ID if it exists
		if ( settings.id != null ) {
			$modal.attr( "id", settings.id );
		}

		// Add modal's title if it exists
		if ( settings.title != null ) {
			$modal
				.prepend( "<header class='modal-header'><h2 class='modal-title'>" + settings.title + "</h2></header>" )
				.attr( "aria-labelledby", "lb-title" );
		}

		// Add the buttons
		if ( settings.buttons != null ) {
			$modal
				.append( "<div class='modal-footer'>" )
				.find( ".modal-footer" )
					.append( settings.buttons );
		}

		// Set modal's accessibility attributes
		// TODO: Better if dealt with upstream by Magnific popup
		$modal.attr({
			role: "dialog",
			"aria-live": "polite",
			"aria-describedby": "lb-desc"
		});

		// Let the triggering process know that the modal has been built
		if ( settings.deferred != null ) {
			settings.deferred.resolve( $modal, true );
		}

		return $modal;
	};

// Bind the plugin events
$document
	.on( "timerpoke.wb wb-init.wb-modal", selector, init )
	.on( "build.wb-modal show.wb-modal hide.wb-modal", function( event, settings ) {
		var eventType = event.type;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === event.target ) {
			switch ( eventType ) {
			case "build":
				build( settings );
				break;
			case "show":
				show( settings );
				break;
			case "hide":
				hide();
				break;
			}
		}
	});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Multimedia PLayer
 * @overview An accessible multimedia player for <audio> and <video> tags, including a Flash fallback
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
/* globals YT */
(function( $, window, wb, undef ) {
"use strict";

/* Local scoped variables*/
var $document = wb.doc,
	selector = ".wb-mltmd",
	seed = 0,
	templatetriggered = false,
	i18n, i18nText,
	captionsLoadedEvent = "ccloaded" + selector,
	captionsLoadFailedEvent = "ccloadfail" + selector,
	captionsVisibleChangeEvent = "ccvischange" + selector,
	renderUIEvent = "renderui" + selector,
	initializedEvent = "inited" + selector,
	fallbackEvent = "fallback" + selector,
	youtubeEvent = "youtube" + selector,

/* helper functions*/

/**
 * @method formatTime
 * @description format a number of seconds to SMTPE Timecode format (HH:MM:SS.FF)
 * @param {Float} time The time to format
 * @returns {String} the formatted time
 */
formatTime = function( time ) {
	var index = 2,
		timecode = "",
		secondsIn, current, pad;

	pad = function( number, digits ) {
		return new Array( Math.max( digits - String( number ).length + 1, 0 ) ).join( 0 ) + number;
	};

	time = Math.floor( time );

	//Loop to extract hours, minutes and seconds
	while ( index >= 0 ) {
		//Get the number of seconds for the current iteration (hour, minute or second)
		secondsIn = Math.pow( 60, index );
		current = Math.floor( time / secondsIn );

		if ( timecode !== "" ) {
			timecode += ":";
		}

		timecode += pad( current, 2 );
		time -= secondsIn * current;
		index -= 1;
	}
	return timecode;
},

/**
 * @method parseTime
 * @description parse an SMTPE Timecode string (HH:MM:SS.FF) or duration (45s) and returns the number of seconds for the timecode
 * @param {String} time The timecode or duration string to parse
 * @returns {Float} the number of seconds in time
 */
parseTime = function( time ) {
	var i, parts, timeStringPortion, partLength, seconds;

	if ( time !== undef ) {
		if ( time.charAt( time.length - 1 ) === "s" ) {
			//Duration parsing
			return parseFloat( time.substring( 0, time.length - 1 ) );
		} else {
			//SMTPE Timecode Parsing
			parts = time.split( ":" ).reverse();
			seconds = 0;

			for ( i = 0, partLength = parts.length; i < partLength; i += 1 ) {
				timeStringPortion = i === 0 ?
					parseFloat( parts[ i ] ) :
					parseInt( parts[ i ], 10 );
				seconds += timeStringPortion * Math.pow( 60, i );
			}
			return seconds;
		}
	}
	return -1;
},

// TODO: Document this function
expand = function( elm, withPlayer ) {
	var $this = $( elm ),
		$data = $this.data( "properties" );

	return withPlayer !== undef ?
		 [ $this, $data, $data.player ] :
		 [ $this, $data ];
},

/**
 * @method parseHtml
 * @description parse an HTML fragment and extract embed captions
 * @param {String} content The HTML fragment containing the captions
 * @returns {Array} An array of captions objects (ex: {text: "Caption", begin: 0, end :10})
 */
parseHtml = function( content ) {
	var captions = [],
		captionSelector = ".wb-tmtxt",
		captionElements = content.find( captionSelector ),
		len = captionElements.length,
		i, captionElement, json, begin, end;

	for ( i = 0; i !== len; i += 1 ) {
		captionElement = $( captionElements[ i ] );
		begin = -1;
		end = -1;

		if ( captionElement.attr( "data-begin" ) !== undef ) {
			begin = parseTime( captionElement.attr( "data-begin" ) );
			end = captionElement.attr( "data-end" ) !== undef ?
				parseTime( captionElement.attr( "data-end" ) ) :
				parseTime( captionElement.attr( "data-dur" ) ) + begin;
		} else if ( captionElement.attr( "data" ) !== undef ) {
			json = captionElement.attr( "data" )
				.replace( /(begin|dur|end)/g, "\"$1\"" )
				.replace( /'/g, "\"" );
			json = $.parseJSON( json );
			begin = parseTime( json.begin );
			end = json.end !== undef ?
				parseTime( json.end ) :
				parseTime( json.dur ) + begin;
		}

		//Removes nested captions if an
		captionElement = captionElement.clone();
		captionElement.find( captionSelector ).detach();

		captions[ captions.length ] = {
			text: captionElement.html(),
			begin: begin,
			end: end
		};
	}
	return captions;
},

/**
 * @method parseXml
 * @description parse an TTML (Xml) document and extract captions
 * @param {String} content The TTML fragment containing the captions
 * @returns {Array} An array of captions objects (ex: {text: "Caption", begin: 0, end :10})
 */
parseXml = function( content ) {
	var captions = [],
		captionSelector = "[begin]",
		captionElements = content.find( captionSelector ),
		len = captionElements.length,
		i, captionElement, begin, end;

	for ( i = 0; i !== len; i += 1 ) {
		captionElement = $( captionElements[ i ] );
		begin = parseTime( captionElement.attr( "begin" ) );
		end = captionElement.attr( "end" ) !== undef ?
			parseTime( captionElement.attr( "end" ) ) :
			parseTime( captionElement.attr( "dur" ) ) + begin;

		captionElement = captionElement.clone();
		captionElement.find( captionSelector ).detach();

		captions[ captions.length ] = {
			text: captionElement.html(),
			begin: begin,
			end: end
		};
	}
	return captions;
},

/**
 * @method loadCaptionsExternal
 * @description Loads captions from an external source (HTML embed or TTML)
 * @param {Object} elm The jQuery object for the multimedia player loading the captions
 * @param {String} url The url for the captions resource to load
 * @fires ccloaded.wb-mltmd
 * @fires ccloadfail.wb-mltmd
 */
loadCaptionsExternal = function( elm, url ) {
	$.ajax({
		url: url,
		dataType: "html",
		//Filters out images and objects from the content to avoid loading them
		dataFilter: function( data ) {
			return data.replace( /<img|object [^>]*>/g, "" );
		},
		success: function( data ) {
			elm.trigger({
				type: captionsLoadedEvent,
				captions: data.indexOf( "<html" ) !== -1 ?
					parseHtml( $( data ) ) :
					parseXml( $( data ) )
			});
		},
		error: function( response, textStatus, errorThrown ) {
			elm.trigger({
				type: captionsLoadFailedEvent,
				error: errorThrown
			});
		}
	});
},

/**
 * @method loadCaptionsInternal
 * @description Loads same page captions emebed in HTML
 * @param {Object} elm The jQuery object for the multimedia player loading the captions
 * @param {Object} obj The jQUery object containing the captions
 * @fires ccloaded.wb-mltmd
 */
loadCaptionsInternal = function( elm, obj ) {
	elm.trigger({
		type: captionsLoadedEvent,
		captions: parseHtml( obj )
	});
},

/**
 * @method updateCaptions
 * @description Update the captions for a multimedia player (called from the timeupdate event of the HTML5 media API)
 * @param {Object} area The jQuery object for the element where captions are displayed
 * @param {Float} seconds The current time of the media (use to sync the captions)
 * @param {Object} captions The JavaScript object containing the captions
 */
updateCaptions = function( area, seconds, captions ) {
	var caption, i,
		captionsLength = captions.length;

	// lets not waste cycles in updating if captions are not visible
	// and remove any text if there was some there before.
	if ( !area.hasClass( "on" ) ) {
		return area.is( "empty" ) ? 1 : area.empty();
	}

	// added &nbsp; to prevent caption space from collapsing
	// Used .html() instead of .append for performance purposes
	// http://jsperf.com/jquery-append-vs-html-list-performance/2
	area.html( "&nbsp;" );

	for ( i = 0; i < captionsLength; i += 1 ) {
		caption = captions[ i ];
		if ( seconds >= caption.begin && seconds <= caption.end ) {
			area.html( $( "<div>" + caption.text + "</div>" ) );
		}
	}
},

/**
 * @method playerApi
 * @description Normalizes the calls to the HTML5 media API and Flash Fallback
 * @param {String} fn The function to call
 * @param {object} args The arguments to send to the function call
 */
playerApi = function( fn, args ) {
	var $this, captionsArea, method;

	switch ( fn ) {
	case "play":
		try {
			this.object.play();
		} catch ( ex ) {
			this.object.doPlay();
		}
		break;
	case "pause":
		try {
			this.object.pause();
		} catch ( ex ) {
			this.object.doPause();
		}
		break;
	case "getCaptionsVisible":
		return $( this ).find( ".wb-mm-cc" ).hasClass( "on" );
	case "setCaptionsVisible":
		$this = $( this );
		captionsArea = $this.find( ".wb-mm-cc" );
		if ( args ) {
			captionsArea.addClass( "on" );
		} else {
			captionsArea.removeClass( "on" );
		}
		$this.trigger( captionsVisibleChangeEvent );
		break;
	case "setPreviousTime":
		this.object.previousTime = args;
		break;
	case "getBuffering":
		return this.object.buffering || false;
	case "setBuffering":
		this.object.buffering = args;
		break;
	case "getPreviousTime":
		return this.object.previousTime;
	case "setPreviousTime":
		this.object.previousTime = args;
		break;
	default:
		method = fn.charAt( 3 ).toLowerCase() + fn.substr( 4 );
		switch ( fn.substr( 0, 3 ) ) {
		case "get":
			return typeof this.object[ method ] !== "function" ?
				this.object[ method ] :
				this.object[ method ]();
		case "set":
			typeof this.object[ method ] !== "function" ?
				this.object[ method ] = args :
				this.object[ fn ]( args );
		}
	}
},

/**
 * @method youTubeApi
 * @description Normalizes the calls to the YouTube API
 * @param {String} fn The function to call
 * @param {object} args The arguments to send to the function call
 */
youTubeApi = function( fn, args ) {
	var $this = $( this.object.a ),
		state;

	switch ( fn ) {
	case "play":
		return this.object.playVideo();
	case "pause":
		return this.object.pauseVideo();
	case "getPaused":
		state = this.object.getPlayerState();
		return state === -1 || state === 0 || state === 2;
	case "getPlayed":
		return this.object.getPlayerState() > -1;
	case "getEnded":
		return this.object.getPlayerState() === 0;
	case "getDuration":
		return this.object.getDuration();
	case "getCurrentTime":
		return this.object.getCurrentTime();
	case "setCurrentTime":
		return this.object.seekTo( args, true );
	case "getMuted":
		return this.object.isMuted();
	case "setMuted":
		if ( args === true ) {
			this.object.mute();
		} else {
			this.object.unMute();
		}
		setTimeout( function() {
			$this.trigger( "volumechange" );
		}, 50 );
		break;
	case "getVolume":
		return this.object.getVolume() / 100;
	case "setVolume":
		this.object.setVolume( args * 100 );
		setTimeout( function() {
			$this.trigger( "volumechange" );
		}, 50 );

	}
},

/**
 * @method youTubeEvennts
 * @description Youtube API event manager
 * @param {object} event The event object fior the triggered event
 */
youTubeEvents = function( event ) {
	var target = event.target.a,
		$target = $( event.target.a ),
		timeline = function() {
			$target.trigger( "timeupdate" );
		};

	switch ( event.data ) {
	case null:
		$target.trigger( "durationchange" );
		$target.trigger( "canplay" );
		break;
	case 0:
		$target.trigger( "ended" );
		target.timeline = clearInterval( target.timeline );
		break;
	case 1:
		$target.trigger( "play" );
		target.timeline = setInterval( timeline, 250 );
		break;
	case 2:
		$target.trigger( "pause" );
		target.timeline = clearInterval( target.timeline );
		break;
	case 3:
		$target.trigger( "waiting" );
		target.timeline = clearInterval( target.timeline );
		break;
	}
};

$document.on( "timerpoke.wb wb-init" + selector, selector, function() {
	wb.remove( selector );

	// Only initialize the i18nText once
	if ( !i18nText ) {
		i18n = wb.i18n;
		i18nText = {
			rewind: i18n( "rew" ),
			ff: i18n( "ffwd" ),
			play: i18n( "play" ),
			pause: i18n( "pause" ),
			cc_on: i18n( "cc", "on" ),
			cc_off: i18n( "cc", "off" ),
			cc_error: i18n ( "cc-err" ),
			mute_on: i18n( "mute", "on" ),
			mute_off: i18n( "mute", "off" ),
			duration: i18n( "dur" ),
			position: i18n( "pos" )
		};
	}

	if ( !templatetriggered ) {
		templatetriggered = true;
		$document.trigger({
			type: "ajax-fetch.wb",
			element: $( selector ),
			fetch: wb.getPath( "/assets" ) + "/mediacontrols.html"
		});
	}
});

$document.on( "ajax-fetched.wb", selector, function( event ) {
	var $this = $( this ),
		$template = event.pointer.html();

	$this.data( "template", $template );
	$this.trigger({
		type: initializedEvent
	});
});

$document.on( initializedEvent, selector, function() {
	var $this = $( this ),
		$media = $this.children( "audio, video" ).eq( 0 ),
		$captions = $media.children( "track[kind='captions']" ) ? $media.children( "track[kind='captions']" ).attr( "src" ) : undef,
		id = $this.attr( "id" ) !== undef ? $this.attr( "id" ) : "wb-mm-" + ( seed++ ),
		mId = $media.attr( "id" ) !== undef ? $media.attr( "id" ) : "" + id + "-md",
		type = $media.is( "video" ) ? "video" : "audio",
		width = type === "video" ? $media.attr( "width" ) : "0",
		height = type === "video" ? $media.attr( "height" ) : "0",
		data = $.extend({
			media: $media,
			captions: $captions,
			id: id,
			mId: mId,
			type: type,
			height: height,
			width: width
		}, i18nText),
		media = $media.get( 0 ),
		url;

	if ( $media.attr( "id" ) === undef ) {
		$media.attr( "id", mId );
	}

	$this.data( "properties", data );

	if ( $media.find( "[type='video/youtube']" ).length > 0 ){
		// lets tweak some variables and start the load sequence
		url = wb.getUrlParts( $this.find( "[type='video/youtube']").attr( "src") );

		// lets set the flag for the call back
		$this.data( "youtube", url.params.v );

		if ( window.needsYoutube === undefined ) {
			// lets create an empty set to store our elements
			window.needsYoutube = $([]);
		}

		// Method called the the YouTUbe API when ready
		if ( window.onYouTubeIframeAPIReady === undefined ) {

			// lets bind youtubes global function
			window.onYouTubeIframeAPIReady = function() {
				  $this.trigger( youtubeEvent );
			};
		}

		// finally lets load safely
		return Modernizr.load( {
			load: "https://www.youtube.com/iframe_api"
		} );

	} else if ( media.error === null && media.currentSrc !== "" && media.currentSrc !== undef ) {
		$this.trigger( type + selector );
	} else {
		$this.trigger( fallbackEvent );
	}
});

$document.on( fallbackEvent, selector, function() {
	var ref = expand( this ),
		$this = ref[ 0 ],
		$data = ref[ 1 ],
		$media = $data.media,
		$poster = $media.attr( "poster" ),
		$source = $data.media.find( "source" ),
		$playerresource;

	$data.flashvars = "id=" + $data.mId;
	$playerresource = wb.getPath( "/assets" ) + "/multimedia.swf?" + $data.flashvars;
	$data.poster = "";
	if ( $data.type === "video" ) {
		$data.poster = "<img src='" + $poster + " class='img-responsive' height='" +
			$data.height + "' width='" + $data.width + "' alt='" + $media.attr( "title" ) + "'/>";
		$data.flashvars += "&height=" + $media.height() + "&width=" +
			$media.width() + "&posterimg=" +
			encodeURI( wb.getUrlParts( $poster ).absolute ) + "&media=" +
			encodeURI( wb.getUrlParts( $source.filter( "[type='video/mp4']" ).attr( "src" ) ).absolute );
	} else {
		$data.flashvars += "&media=" + encodeURI( wb.getUrlParts( $source.filter( "[type='audio/mp3']" ).attr( "src" ) ).absolute );
	}
	$this.find( "video, audio" ).replaceWith( "<object id='" + $data.mId + "' width='" + $data.width +
		"' height='" + $data.height + "' class='" + $data.type +
		"' type='application/x-shockwave-flash' data='" +
		$playerresource + "' tabindex='-1'>" +
		"<param name='movie' value='" + $playerresource + "'/>" +
		"<param name='flashvars' value='" + $data.flashvars + "'/>" +
		"<param name='allowScriptAccess' value='always'/>" +
		"<param name='bgcolor' value='#000000'/>" +
		"<param name='wmode' value='opaque'/>" +
		$data.poster + "</object>" );
	$this.data( "properties", $data );

	$this.trigger( renderUIEvent );
});

/*
 *  Youtube Video mode Event
 */
$document.on( youtubeEvent, selector, function() {
	var ref = expand( this ),
		ytPlayer,
		$this = ref[ 0 ],
		media = $this.find( "video:eq(0)" ),
		id = media.get( 0 ).id,
		$data = ref[ 1 ];

	media.replaceWith( "<div id=" + id + "/>" );
	ytPlayer = new YT.Player( id, {
		videoId: $this.data( "youtube" ),
		playerVars: {
			autoplay: 0,
			controls: 0,
			origin: wb.pageUrlParts.host,
			modestbranding: 1,
			rel: 0,
			showinfo: 0
		},
		events: {
			onReady: youTubeEvents,
			onStateChange: youTubeEvents
		}
	});

	$this.find( "iframe" ).attr( "tabindex", -1 );

	$data.poster = "<img src='" + $data.media.attr( "poster" ) +
		"' class='img-responsive' height='" + $data.height +
		"' width='" + $data.width + "' alt='" + $data.media.attr( "title" ) + "'/>";
	$data.ytPlayer = ytPlayer;

	$this.data( "properties", $data );
	$this.trigger( renderUIEvent, "video" );
});

/*
 *  Native Video mode Event
 */
$document.on( "video.wb-mltmd", selector, function() {
	var ref = expand( this ),
		$this = ref[ 0 ],
		$data = ref[ 1 ];

	$data.poster = "<img src='" + $data.media.attr( "poster" ) +
		"' class='img-responsive' height='" + $data.height +
		"' width='" + $data.width + "' alt='" + $data.media.attr( "title" ) + "'/>";

	$this.data( "properties", $data );

	$this.trigger( renderUIEvent, "video" );
});

/*
 *  Native Audio mode Event
 */
$document.on( "audio.wb-mltmd", selector, function() {
	var ref = expand (this ),
		$this = ref[ 0 ],
		$data = ref[ 1 ];

	$data.poster = "";

	$this.data( "properties", $data );

	$this.trigger( renderUIEvent, "audio" );
});

$document.on( renderUIEvent, selector, function( event, type ) {
	var ref = expand( this ),
		$this = ref[ 0 ],
		$data = ref[ 1 ],
		$player,
		captionsUrl = wb.getUrlParts( $data.captions ),
		currentUrl = wb.getUrlParts( window.location.href ),
		media = $this.find( "video, audio, iframe, object" );

	media.after( window.tmpl( $this.data( "template" ), $data ) );
	if ( type === "video" ) {
		media.next( ".display" ).append( media );
	} else {
		media.next( ".display" ).remove();
	}

	$player = $( "#" + $data.mId );
	$data.player = $player.is( "object" ) ? $player.children( ":first-child" ) : $player.load();

	// Create an adapter for the event management
	$data.player.on( "durationchange play pause ended volumechange timeupdate " +
		captionsLoadedEvent + " " + captionsLoadFailedEvent + " " +
		captionsVisibleChangeEvent + " waiting canplay progress", function( event ) {

		$this.trigger( event );
	});

	this.object = $data.ytPlayer || $player.get( 0 );
	this.player = ( $data.ytPlayer ) ? youTubeApi : playerApi;
	$this.data( "properties", $data );

	if ( $data.captions === undef ) {
		return 1;
	}

	if ( currentUrl.absolute.replace( currentUrl.hash, "" ) !== captionsUrl.absolute.replace( captionsUrl.hash, "" ) ) {
		loadCaptionsExternal( $player, captionsUrl.absolute );
	} else {
		loadCaptionsInternal( $player, $( captionsUrl.hash ) );
	}
});

/*
 * UI Bindings
 */

$document.on( "click", selector, function( event ) {
	var $target = $( event.target ),
		className = $target.attr( "class" ) || "";

	// Ignore middle and right mouse buttons
	if ( event.which === 2 || event.which === 3 ) {
		return true;
	}

	// Opitmized multiple class tests to include child glyphicon because Safari was reporting the click event
	// from the child span not the parent button, forcing us to have to check for both elements
	// JSPerf for multiple class matching http://jsperf.com/hasclass-vs-is-stackoverflow/7
	if ( className.match( /playpause|-play|-pause|wb-mm-overlay/ ) || $target.is( "object" ) ) {
		this.player( "getPaused" ) ? this.player( "play" ) : this.player( "pause" );
	} else if ( className.match( /\bcc\b|-subtitles/ )  ) {
		this.player( "setCaptionsVisible", !this.player( "getCaptionsVisible" ) );
	} else if ( className.match( /\bmute\b|-volume-(up|off)/ ) ) {
		this.player( "setMuted", !this.player( "getMuted" ) );
	} else if ( $target.is( "progress" ) || $target.hasClass( "wb-progress-inner" ) || $target.hasClass( "wb-progress-outer" ) ) {
		this.player( "setCurrentTime", this.player( "getDuration" ) * ( ( event.pageX - $target.offset().left ) / $target.width() ) );
	} else if ( className.match( /\brewind\b|-backwards/ ) ) {
		this.player( "setCurrentTime", this.player( "getCurrentTime" ) - this.player( "getDuration" ) * 0.05);
	} else if ( className.match( /\bfastforward\b|-forward/ ) ) {
		this.player( "setCurrentTime", this.player( "getCurrentTime" ) + this.player( "getDuration" ) * 0.05);
	}
});

$document.on( "keydown", selector, function( event ) {
	var playerTarget = event.currentTarget,
		which = event.which,
		ctrls = ".wb-mm-ctrls",
		ref = expand( playerTarget ),
		$this = ref[ 0 ],
		volume = 0;

	switch ( which ) {
	case 32:
		$this.find( ctrls + " .playpause" ).trigger( "click" );
		break;

	case 37:
		$this.find( ctrls + " .rewind" ).trigger( "click" );
		break;

	case 39:
		$this.find( ctrls + " .fastforward" ).trigger( "click" );
		break;

	case 38:
		volume = Math.round( playerTarget.player( "getVolume" ) * 10 ) / 10 + 0.1;
		playerTarget.player( "setVolume", volume < 1 ? volume : 1 );
		break;

	case 40:
		volume = Math.round( playerTarget.player( "getVolume" ) * 10 ) / 10 - 0.1;
		playerTarget.player( "setVolume", volume > 0 ? volume : 0 );
		break;

	default:
		return true;
	}
	return false;
});

$document.on( "keyup", selector, function( event ) {
	if ( event.which === 32 ) {
		// Allows the spacebar to be used for play/pause without double triggering
		return false;
	}
});

$document.on( "durationchange play pause ended volumechange timeupdate " +
	captionsLoadedEvent + " " + captionsLoadFailedEvent + " " +
	captionsVisibleChangeEvent +
	" waiting canplay progress", selector, function( event ) {

	var eventTarget = event.currentTarget,
		eventType = event.type,
		$this = $( eventTarget ),
		currentTime,
		button;

	switch ( eventType ) {
	case "play":
		button = $this.find( ".playpause .glyphicon" )
			.removeClass( "glyphicon-play" )
			.addClass( "glyphicon-pause" )
			.parent();

		button.attr( "title", button.data( "state-off" ) );

		$this.find( ".wb-mm-ovrly" ).addClass( "playing" );

		$this.find( ".progress" ).addClass( "active" );
		break;

	case "pause":
		button = $this.find( ".playpause .glyphicon" )
			.removeClass( "glyphicon-pause" )
			.addClass( "glyphicon-play" )
			.parent();

		button.attr( "title", button.data( "state-on" ) );

		$this.find( ".progress" ).removeClass( "active" );
		break;

	case "ended":
		this.loading = clearTimeout( this.loading );
		button = $this.find( ".playpause .glyphicon" )
			.removeClass( "glyphicon-pause" )
			.addClass( "glyphicon-play" )
			.parent();

		button.attr( "title", button.data( "state-on" ) );
		$this.find( ".wb-mm-ovrly" ).removeClass( "playing" );
		break;

	case "volumechange":
		// TODO: Think can be optimized for the minifier with some ternaries
		button = $this.find( ".mute .glyphicon" );
		if ( eventTarget.player( "getMuted" ) ) {
			button = button.removeClass( "glyphicon-volume-up" )
				.addClass( "glyphicon-volume-off" )
				.parent();

			button.attr( "title", button.data( "state-off" ) );
		} else {
			button = button.removeClass( "glyphicon-volume-off" )
				.addClass( "glyphicon-volume-up" )
				.parent();
			button.attr( "title", button.data( "state-on" ) );
		}
		break;

	case "timeupdate":
		currentTime = eventTarget.player( "getCurrentTime" );
		$this.find( "progress" )
			.attr(
				"value",
				Math.round( currentTime / eventTarget.player( "getDuration" ) * 1000 ) / 10
			);

		$this.find( ".wb-mm-tmln-crrnt span" )
			.text( formatTime( currentTime ) );

		if ( $.data( eventTarget, "captions" ) !== undef ) {
			updateCaptions(
				$this.find( ".wb-mm-cc" ),
				currentTime,
				$.data( eventTarget, "captions" )
			);
		}
		break;

	case "durationchange":
		$this.find( ".wb-mm-tmln-ttl span" )
			.text( formatTime( eventTarget.player( "getDuration" ) ) );
		break;

	case "ccloaded":
		$.data( eventTarget, "captions", event.captions );
		break;

	case "ccloadfail":
		$this.find( ".wb-mm-cc" )
			.append( "<p class='errmsg'><span>" + i18nText.cc_error + "</span></p>" )
			.end()
			.find( ".cc" )
			.attr( "disabled", "" );
		break;

	case "ccvischange":
		// TODO: Think can be optimized for the minifier with some ternarie
		button = $this.find( ".cc" );
		if ( eventTarget.player( "getCaptionsVisible" ) ) {
			button.attr( "title", button.data( "state-on" ) )
				.css( "opacity", "1" );
		} else {
			button.attr( "title", button.data( "state-off" ) )
				.css( "opacity", ".5" );
		}
		break;

	case "waiting":
		this.loading = setTimeout( function() {
			$this.find( ".display" ).addClass( "waiting" );
		}, 500 );
		break;

	case "canplay":
		this.loading = clearTimeout( this.loading );
		$this.find( ".display" ).removeClass( "waiting" );
		break;

	// Fallback for browsers that don't implement the waiting events
	case "progress":
		// Waiting detected, display the loading icon
		if ( this.player( "getPaused" ) === false && this.player( "getCurrentTime" ) === this.player( "getPreviousTime" ) && eventTarget.player( "getBuffering" ) === false ) {
			eventTarget.player( "setBuffering", true );
			$this.trigger( "waiting" );
		// Waiting has ended, but icon is still visible - remove it.
		} else if ( eventTarget.player( "getBuffering" ) === true ) {
			eventTarget.player( "setBuffering", false );
			$this.trigger( "canplay" );
		}
		eventTarget.player( "setPreviousTime", eventTarget.player( "getCurrentTime" ) );
		break;
	}
});

wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW NavCurrent
 * @overview Identify URL in a navigation system that matches current page URL or a URL in the breadcrumb trail. Call by applying .trigger( "navcurr.wb", breadcrumb ) where the breadcrumb parameter is an optional object (DOM or jQuery)
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var $document = wb.doc,
	breadcrumbLinksArray, breadcrumbLinksUrlArray,
	navClass = "wb-navcurr",

	/**
	 * We start the logic for what the plugin truly does
	 * For demonstration purposes lets display some text with an alert
	 * @method otherEvent
	 * @param {jQuery Event} event The event that triggered this method call
	 * @param {jQuery DOM element | DOM element} breadcrumb Optional breadcrumb element
	 */
	navCurrent = function( event, breadcrumb ) {
		var menu = event.target,
			menuLinks = menu.getElementsByTagName( "a" ),
			menuLinksArray = [],
			menuLinksUrlArray = [],
			windowLocation = window.location,
			pageUrl = windowLocation.hostname + windowLocation.pathname.replace( /^([^\/])/, "/$1" ),
			pageUrlQuery = windowLocation.search,
			match = false,
			len = menuLinks.length,
			i, j, link, linkHref, linkUrl, linkQuery, linkQueryLen,
			localBreadcrumbLinks, localBreadcrumbLinksArray, localBreadcrumbLinksUrlArray,
			localBreadcrumbQuery, localBreadcrumbLinkUrl;

		// Try to find a match with the page Url and cache link + Url for later if no match found
		for ( i = 0; i !== len; i += 1 ) {
			link = menuLinks[ i ];
			linkHref = link.getAttribute( "href" );
			if ( linkHref !== null ) {
				if ( linkHref.length !== 0 && linkHref.charAt( 0 ) !== "#" ) {
					linkUrl = link.hostname + link.pathname.replace( /^([^\/])/, "/$1" );
					linkQuery = link.search;
					linkQueryLen = linkQuery.length;
					if ( pageUrl.slice( -linkUrl.length ) === linkUrl && ( linkQueryLen === 0 || pageUrlQuery.slice( -linkQueryLen ) === linkQuery ) ) {
						match = true;
						break;
					}
					menuLinksArray.push( link );
					menuLinksUrlArray.push( linkUrl );
				}
			}
		}

		// No page Url match found, try a breadcrumb link match instead
		if ( !match && breadcrumb ) {

			// Check to see if the data has been cached already
			if ( !localBreadcrumbLinksArray ) {

				// Pre-process the breadcrumb links
				localBreadcrumbLinksArray = [];
				localBreadcrumbLinksUrlArray = [];
				localBreadcrumbLinks = ( breadcrumb.jquery ? breadcrumb[ 0 ] : breadcrumb ).getElementsByTagName( "a" );
				len = localBreadcrumbLinks.length;
				for ( i = 0; i !== len; i += 1) {
					link = localBreadcrumbLinks[ i ];
					linkHref = link.getAttribute( "href" );
					if ( linkHref.length !== 0 && linkHref.charAt( 0 ) !== "#" ) {
						localBreadcrumbLinksArray.push( link );
						localBreadcrumbLinksUrlArray.push( link.hostname + link.pathname.replace( /^([^\/])/, "/$1" ) );
					}
				}

				// Cache the data in case of more than one execution (e.g., site menu + secondary navigation)
				breadcrumbLinksArray = localBreadcrumbLinksArray;
				breadcrumbLinksUrlArray = localBreadcrumbLinksUrlArray;
			} else {

				// Retrieve the cached data
				localBreadcrumbLinksArray = breadcrumbLinksArray;
				localBreadcrumbLinksUrlArray = breadcrumbLinksUrlArray;
			}

			// Try to match each breadcrumb link
			len = menuLinksArray.length;
			for ( j = localBreadcrumbLinksArray.length - 1; j !== -1; j -= 1 ) {
				localBreadcrumbLinkUrl = localBreadcrumbLinksUrlArray[ j ];
				localBreadcrumbQuery = localBreadcrumbLinksArray[ j ].search;

				for ( i = 0; i !== len; i += 1 ) {
					link = menuLinksArray[ i ];
					linkUrl = menuLinksUrlArray[ i ];
					linkQuery = link.search;
					linkQueryLen = linkQuery.length;

					if ( localBreadcrumbLinkUrl.slice( -linkUrl.length ) === linkUrl && ( linkQueryLen === 0 || localBreadcrumbQuery.slice( -linkQueryLen ) === linkQuery ) ) {
						match = true;
						break;
					}
				}
				if ( match ) {
					break;
				}
			}
		}

		if ( match ) {
			link.className += " " + navClass;
			if ( menu.className.indexOf( "wb-menu" ) !== -1 && link.className.indexOf( "item" ) === -1 ) {
				link.parentNode.parentNode.parentNode.getElementsByTagName( "a" )[ 0 ].className += " " + navClass;
			}
		}
	};

// Bind the navcurrent event of the plugin
$document.on( "navcurr.wb", navCurrent );

})( jQuery, window, wb );

/**
 * @title Responsive overlay
 * @overview Provides multiple styles of overlays such as panels and pop-ups
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @thomasgohard, @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-overlay",
	closeClass = "overlay-close",
	linkClass = "overlay-lnk",
	ignoreOutsideClass = "outside-off",
	sourceLinks = {},
	$document = wb.doc,
	i18n, i18nText,

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {
		var elm = event.target,
			overlayClose;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === event.target ) {

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					close: i18n( "overlay-close" ) + i18n( "space" ) + i18n( "esc-key" )
				};
			}

			// Add close button
			overlayClose = "<button class='mfp-close " + closeClass +
				"' title='" + i18nText.close + "'>×</button>";

			elm.appendChild( $( overlayClose )[ 0 ] );
			elm.setAttribute( "aria-hidden", "true" );
		}
	},

	openOverlay = function( overlayId, noFocus ) {
		var $overlay = $( "#" + overlayId );

		$overlay
			.addClass( "open" )
			.attr( "aria-hidden", "false" );

		if ( !noFocus ) {
			$overlay.trigger( "setfocus.wb" );
		}
	},

	closeOverlay = function( overlayId, noFocus, userClosed ) {
		var $overlay = $( "#" + overlayId ),
			sourceLink = sourceLinks[ overlayId ];

		$overlay
			.removeClass( "open" )
			.attr( "aria-hidden", "true" );

		if ( userClosed ) {
			$overlay.addClass( "user-closed" );
		}

		if ( !noFocus && sourceLink ) {

			// Returns focus to the source link for the overlay
			$( sourceLink ).trigger( "setfocus.wb" );

			// Delete the source link reference
			delete sourceLinks[ overlayId ];
		}
	};

$document.on( "timerpoke.wb wb-init.wb-overlay keydown open.wb-overlay close.wb-overlay", selector, function( event ) {
	var eventType = event.type,
		which = event.which,
		overlayId = event.currentTarget.id,
		overlay, $focusable, index, length;

	switch ( eventType ) {
	case "timerpoke":
	case "wb-init":
		init( event );
		break;

	case "open":
		openOverlay( overlayId );
		break;

	case "close":
		closeOverlay( overlayId );
		break;

	default:
		overlay = document.getElementById( overlayId );

		switch ( which ) {

		// Tab key
		case 9:

			// No special tab handling when ignoring outside activity
			if ( overlay.className.indexOf( ignoreOutsideClass ) === -1 ) {
				event.preventDefault();
				$focusable = $( overlay ).find( ":focusable" );
				length = $focusable.length;
				index = $focusable.index( event.target ) + ( event.shiftKey ? -1 : 1 );
				if ( index === -1 ) {
					index = length - 1;
				} else if ( index === length ) {
					index = 0;
				}
				$focusable.eq( index ).trigger( "setfocus.wb" );
			}
			break;

		// Escape key
		case 27:
			closeOverlay( overlayId, false, true );
			break;
		}
	}
});

// Handler for clicking on the close button of the overlay
$document.on( "click vclick", "." + closeClass, function( event ) {
	var which = event.which;

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {
		closeOverlay(
			$( event.currentTarget ).closest( ".wb-overlay" ).attr( "id" ),
			false,
			true
		);
	}
});

// Handler for clicking on a source link for the overlay
$document.on( "click vclick", "." + linkClass, function( event ) {
	var which = event.which,
		sourceLink = event.target,
		overlayId = sourceLink.hash.substring( 1 );

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {
		event.preventDefault();

		// Introduce a delay to prevent outside activity detection
		setTimeout(function() {

			// Stores the source link for the overlay
			sourceLinks[ overlayId ] = sourceLink;

			// Opens the overlay
			openOverlay( overlayId );
		}, 1 );
	}
});

// Outside activity detection
$document.on( "click vclick touchstart focusin", "body", function( event ) {
	var eventTarget = event.target,
		which = event.which,
		overlayId, overlay;

	// Ignore middle/right mouse buttons
	if ( !which || which === 1 ) {

		// Close any overlays with outside activity
		for ( overlayId in sourceLinks ) {
			overlay = document.getElementById( overlayId );
			if ( overlay.getAttribute( "aria-hidden" ) === "false" &&
				eventTarget.id !== overlayId &&
				overlay.className.indexOf( ignoreOutsideClass ) === -1 &&
				!$.contains( overlay, eventTarget ) ) {

				// Close the overlay
				closeOverlay( overlayId );
			}
		}
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * @title Prettify Plugin
 * @overview Wrapper for Google Code Prettify library: https://code.google.com/p/google-code-prettify/
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @patheard
 *
 * Syntax highlighting of source code snippets in an html page using [google-code-prettify](http://code.google.com/p/google-code-prettify/).
 *
 * 1. Apply `class="prettyprint"` to a `pre` or `code` element to apply syntax highlighting. Alternatively use `class="all-pre"` to apply syntax highlighting to all `pre` elements on the page.
 * 2. Apply `class="linenums"` to a `pre` or `code` element to add line numbers. Alternatively use `class="all-linenums"` to all applicable `pre` elements. Specify the starting number by adding `linenums:#` before `linenums`.
 * 3. Add extra language support by applying `class="lang-*"` to each applicable `pre` or `code` element. Supported language syntax CSS classes are as follows:
 *    - lang-apollo
 *    - lang-clj
 *    - lang-css
 *    - lang-dart
 *    - lang-go
 *    - lang-hs
 *    - lang-lisp
 *    - lang-lua
 *    - lang-ml
 *    - lang-n
 *    - lang-proto
 *    - lang-scala
 *    - lang-sql
 *    - lang-tex
 *    - lang-vb
 *    - lang-vhdl
 *    - lang-wiki
 *    - lang-xq
 *    - lang-yaml
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-prettify",
	$document = wb.doc,
	prettyPrintEvent = "prettyprint" + selector,

	/*
	 * Plugin users can override these defaults by setting attributes on the html elements that the
	 * selector matches.
	 */
	defaults = {
		linenums: false,
		allpre: false
	},

	/*
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event Event that triggered this handler
	 */
	init = function( event ) {
		var elm = event.target,
			modeJS = wb.getMode() + ".js",
			deps = [ "site!deps/prettify" + modeJS ],
			$elm, classes, settings, i, len, $pre;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === elm ) {
			$elm = $( elm );
			classes = elm.className.split( " " );

			// Merge default settings with overrides from the selected plugin element. There may be more than one, so don't override defaults globally!
			settings = $.extend( {}, defaults, $elm.data() );

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Check the element for `lang-*` syntax CSS classes
			for ( i = 0, len = classes.length; i !== len; i += 1 ) {
				if ( classes[ i ].indexOf( "lang-" ) === 0 ) {
					deps.push( "site!deps/" + classes[ i ] + modeJS );
				}
			}

			// CSS class overides of settings
			settings.allpre = settings.allpre || $elm.hasClass( "all-pre" );
			settings.linenums = settings.linenums || $elm.hasClass( "linenums" );

			// Apply global settings
			if ( settings.allpre || settings.linenums ) {
				$pre = $document.find( "pre" );
				if ( settings.allpre ) {
					$pre.addClass( "prettyprint" );
				}
				if ( settings.linenums ) {
					$pre.filter( ".prettyprint" ).addClass( "linenums" );
				}
			}

			// Load the required dependencies and prettify the code once finished
			Modernizr.load({
				load: deps,
				complete: function() {
					$document.trigger( prettyPrintEvent );
				}
			});
		}
	},

	/*
	 * Invoke the Google pretty print library if it has been initialized
	 * @method prettyprint
	 */
	prettyprint = function() {
		if ( typeof window.prettyPrint === "function" ) {
			window.prettyPrint();
		}
	};

// Bind the plugin events
$document
	.on( "timerpoke.wb wb-init" + selector, selector, init )
	.on( prettyPrintEvent, prettyprint );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Resize
 * @overview Text and window resizing event handler
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var id = "wb-rsz",
	selector = "#" + id,
	$window = wb.win,
	$document = wb.doc,
	sizes = [],
	events = [
		"txt-rsz.wb",
		"win-rsz-width.wb",
		"win-rsz-height.wb"
	],

	// Breakpoint names and lower pixel limits
	breakpoints = {
		xxsmallview: 0,
		xsmallview: 480,
		smallview: 768,
		mediumview: 992,
		largeview: 1200,
		xlargeview: 1600
	},
	initialized = false,
	eventsAll, resizeTest, currentView,

	/**
	 * Init runs once
	 * @method init
	 */
	init = function() {
		var localResizeTest = document.createElement( "span" );

		// Set up the DOM element used for resize testing
		localResizeTest.innerHTML = "&#160;";
		localResizeTest.setAttribute( "id", id );
		document.body.appendChild( localResizeTest );
		resizeTest = localResizeTest;

		// Get a snapshot of the current sizes
		sizes = [
			localResizeTest.offsetHeight,
			$window.width(),
			$window.height()
		];

		// Create a string containing all the events
		eventsAll = events.join( " " );

		// Determine the current view
		viewChange( sizes[ 1 ] );

		initialized = true;
	},

	viewChange = function( viewportWidth ) {
		var breakpoint, viewName;

		// Check for a change between views
		for ( breakpoint in breakpoints ) {

			// Determine the current view
			if ( viewportWidth < breakpoints[ breakpoint ] ) {
				break;
			} else {
				viewName = breakpoint;
			}
		}

		// Determine if the current view is different than the previous view
		if ( viewName !== currentView ) {

			// Change the breakpoint class on the html element
			wb.html
				.removeClass( currentView )
				.addClass( viewName );

			// Update the current view
			currentView = viewName;

			// Trigger the view event
			$document.trigger( viewName + ".wb" );
		}
	},

	/**
	 * Tests for text size, window width and window height changes and triggers an event when a change is found
	 * @method test
	 */
	test = function() {
		if ( initialized ) {
			var currentSizes = [
					resizeTest.offsetHeight,
					$window.width(),
					$window.height()
				],
				len = currentSizes.length,
				i;

			// Check for a viewport or text size change
			for ( i = 0; i !== len; i += 1 ) {
				if ( currentSizes[ i ] !== sizes[ i ] ) {

					// Change detected so trigger related event
					$document.trigger( events[ i ], currentSizes );

					// Check for a view change
					viewChange( currentSizes[ 1 ] );
				}
			}
			sizes = currentSizes;
			return;
		}
	};

// Re-test on each timerpoke
$document.on( "timerpoke.wb", selector, test );

// Initialize the resources
init();

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Session Timeout
 * @overview Helps Web asset owners to provide session timeout and inactivity timeout functionality.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @patheard
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var pluginName = "wb-session-timeout",
	selector = "." + pluginName,
	$document = wb.doc,
	i18n, i18nText,
	resetEvent = "reset" + selector,
	keepaliveEvent = "keepalive" + selector,
	inactivityEvent = "inactivity" + selector,
	confirmSelector = pluginName + "-confirm",

	/*
	 * Plugin users can override these defaults by setting attributes on the html elements that the
	 * selector matches.
	 * For example, adding the attribute data-option1="false", will override option1 for that plugin instance.
	 */
	defaults = {
		inactivity: 1200000,		// default inactivity period 20 minutes
		reactionTime: 180000,		// default confirmation period of 3 minutes
		sessionalive: 1200000,		// default keepalive period of 20 minutes
		refreshCallbackUrl: null,	// refresh callback if using AJAX keepalive (no default)
		logouturl: "./",			// logout URL once the session has expired
		refreshOnClick: true,		// refresh session if user clicks on the page
		refreshLimit: 200000		// default period of 2 minutes (ajax calls happen only once during this period)
	},

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @function init
	 * @param {jQuery Event} event `timerpoke.wb` event that triggered the function call
	 */
	init = function( event ) {
		var elm = event.target,
			$elm, settings;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === elm ) {
			$elm = $( elm );

			// Merge default settings with overrides from the selected plugin element. There may be more than one, so don't override defaults globally!
			settings = $.extend( {}, defaults, $elm.data( "wet-boew" ) );

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					buttonContinue: i18n( "st-btn-cont" ),
					buttonEnd: i18n( "st-btn-end" ),
					buttonSignin: i18n( "tmpl-signin" ),
					timeoutBegin: i18n( "st-to-msg-bgn" ),
					timeoutEnd: i18n( "st-to-msg-end" ),
					timeoutTitle: i18n( "st-msgbx-ttl" ),
					timeoutAlready: i18n( "st-alrdy-to-msg" )
				};
			}

			// Setup the modal dialog behaviour
			$elm
				.addClass( "wb-modal" )
				.trigger( "wb-init.wb-modal" );
			$document.one( "ready.wb-modal", function() {
				// Initialize the keepalive and inactive timeouts of the plugin
				$elm.trigger( resetEvent, settings );

				// Setup the refresh on click behaviour
				initRefreshOnClick( $elm, settings );
			});
		}
	},

	/**
	 * Initialize the refresh on click keepalive behaviour. This will cause a `keepalive.wb-session-timeout`
	 * event to be triggered when the document is clicked, limited by the settings.refreshLimit value.
	 * @function initRefreshOnClick
	 * @param {jQuery DOM Element} $elm DOM element to trigger the event on
	 * @param {Object} settings Key-value object that will be passed when event is triggered.
	 */
	initRefreshOnClick = function( $elm, settings ) {
		if ( settings.refreshOnClick ) {
			$document.on( "click", function() {
				var lastActivity = $elm.data( "lastActivity" ),
					currentTime = getCurrentTime();
				if ( !lastActivity || ( currentTime - lastActivity ) > settings.refreshLimit ) {
					$elm
						.trigger( resetEvent, settings )
						.trigger( keepaliveEvent, settings );
				}
				$elm.data( "lastActivity", currentTime );
			});
		}
	},

	/**
	 * Keepalive session event handler. Sends the POST request to determine if the session is still alive.
	 * @function keepalive
	 * @param {jQuery Event} event `keepalive.wb-session-timeout` event that triggered the function call
	 * @param {Object} settings Key-value object
	 */
	keepalive = function( event, settings ) {
		var $buttonSignin, building,
			$elm = $( event.target );
		if ( settings.refreshCallbackUrl !== null ) {
			$.post( settings.refreshCallbackUrl, function( response ) {
				// Session is valid
				if ( response && response.replace( /\s/g, "" ) === "true" ) {
					$elm.trigger( resetEvent, settings );

				// Session has timed out - let the user know they need to sign in again
				} else {
					building = $.Deferred();
					$buttonSignin = $( "<button type='button' class='" +
						confirmSelector + " btn btn-primary'>" +
						i18nText.buttonSignin + "</button>" );
					$buttonSignin.data( "logouturl", settings.logouturl );

					// Build the modal dialog
					$document.trigger( "build.wb-modal", {
						content: "<p>" + i18nText.timeoutAlready + "</p>",
						buttons: $buttonSignin,
						deferred: building
					});

					building.done( function( $modal ) {
						// End the inactivity timeouts since the session is already kaput
						clearTimeout( $elm.data( inactivityEvent ) );
						clearTimeout( $elm.data( keepaliveEvent ) );

						// Let the user know their session is dead
						setTimeout(function() {
							// Open the popup
							$document.trigger( "show.wb-modal", {
								modal: true,
								mainClass: "mfp-zoom-in",
								items: { src: $modal, type: "inline" }
							});
						}, Modernizr.csstransitions ? 500 : 0 );
					});
				}
			});
		}
	},

	/**
	 * Inactivity check event handler. Displays the modal dialog to allow the user to confirm their activity.
	 * @function inactivity
	 * @param {jQuery Event} event `inactivity.wb-session-timeout` event that triggered the function call
	 * @param {Object} settings Key-value object
	 */
	inactivity = function( event, settings ) {
		var $buttonContinue, $buttonEnd, countdownInterval,
			activeElement = $document[ 0 ].activeElement,
			building = $.Deferred(),
			time = getTime( settings.reactionTime ),
			timeoutBegin = i18nText.timeoutBegin
				.replace( "#min#", "<span class='min'>" + time.minutes + "</span>" )
				.replace( "#sec#", "<span class='sec'>" + time.seconds + "</span>" ),
			$modal = $( "#wb-session-modal" ),
			buttonStart = "<button type='button' class='",
			buttonEnd = "</button>";

		// Modal does not exists: build it
		if ( $modal.length === 0 ) {
			$buttonContinue = $( buttonStart + confirmSelector + " btn btn-primary'>" +
				i18nText.buttonContinue + buttonEnd );
			$buttonEnd = $( buttonStart + confirmSelector + " btn btn-default'>" +
				i18nText.buttonEnd + buttonEnd );

			// Build the modal
			$document.trigger( "build.wb-modal", {
				id: "wb-session-modal",
				title: i18nText.timeoutTitle,
				content: "<p class='content'>" + timeoutBegin + "<br />" + i18nText.timeoutEnd + "</p>",
				buttons: [ $buttonContinue, $buttonEnd ],
				deferred: building
			});

		// Modal already exists: get element references and resolve the deferred object (causes the modal to be displayed)
		} else {
			$buttonContinue = $modal.find( ".btn-primary" );
			$buttonEnd = $modal.find( ".btn-default" );
			$modal.find( ".content" ).html( timeoutBegin + "<br />" + i18nText.timeoutEnd );

			// Trigger the deferred object's done callback by resolving it
			building.resolve( $modal );
		}

		// Display the modal when it's finished being built
		building.done( function( $modal, isNew ) {

			if ( isNew === true ) {
				$document.find( "body" ).append( $modal );
			}

			// Add the session timeout settings to the buttons
			$buttonEnd.data( "logouturl", settings.logouturl );
			$buttonContinue
				.data( settings )
				.data( "start", getCurrentTime() );

			// Open the modal dialog
			$document.trigger( "show.wb-modal", {
				modal: true,
				mainClass: "mfp-zoom-in",
				removalDelay: Modernizr.csstransitions ? 500 : 0,
				items: {
					src: $modal,
					type: "inline"
				},
				callbacks: {
					// Start the time countdown when the popup opens
					open: function() {
						var $minutes = $modal.find( ".min" ),
							$seconds = $modal.find( ".sec" );
						countdownInterval = setInterval(function() {
							if ( countdown( $minutes, $seconds ) ) {
								clearInterval( countdownInterval );

								// Let the user know their session has timed out
								$modal.find( ".content" ).text( i18nText.timeoutAlready );
								$buttonContinue.text( i18nText.buttonSignin );
								$buttonEnd.hide();
							}
						}, 1000 );
					},

					// Stop the countdown and restore focus to the original active element
					afterClose: function() {
						clearInterval( countdownInterval );

						// Assign focus to activeElement
						$( activeElement ).trigger( "setfocus.wb" );
					}
				}
			});
		});
	},

	/**
	 * Initialize the inactivity and keepalive timeouts of the plugin
	 * @function reset
	 * @param {jQuery Event} event `reset.wb-session-timeout` event that triggered the function call
	 * @param {Object} settings Key-value object
	 */
	reset = function( event, settings ) {
		var $elm = $( event.target );

		initEventTimeout( $elm, inactivityEvent, settings.inactivity, settings );
		if ( settings.refreshCallbackUrl !== null ) {
			initEventTimeout( $elm, keepaliveEvent, settings.sessionalive, settings );
		}
	},

	/**
	 * Checks if the user wants to keep their session alive.
	 * @function inactivity
	 * @param {jQuery Event} event `confirm.wb-session-timeout` event that triggered the function call
	 */
	confirm = function( event ) {
		var elm = event.target,
			$elm = $( elm ),
			settings = $elm.data();

		event.preventDefault();
		$.magnificPopup.close();

		// User wants their session maintained
		if ( settings.start !== undefined && ( getCurrentTime() - settings.start ) <= settings.reactionTime ) {
			$( selector )
				.trigger( resetEvent, settings )
				.trigger( keepaliveEvent, settings );

		// Negative confirmation or the user took too long; logout
		} else {
			window.location.href = settings.logouturl;
		}
	},

	/**
	 * Initializes a timeout that triggers an event
	 * @function initEventTimeout
	 * @param {jQuery DOM Element} $elm Element to trigger the event on
	 * @param {string} eventName Name of the event to trigger on setTimeout
	 * @param {mixed} time Time to wait before triggering the event
	 * @param {Object} settings Key-value object
	 */
	initEventTimeout = function( $elm, eventName, time, settings ) {
		// Clear any existing timeout for the event
		clearTimeout( $elm.data( eventName ) );

		// Create the new timeout that will trigger the event
		$elm.data( eventName, setTimeout(function() {
			$elm.trigger( eventName, settings );
		}, parseTime( time ) ) );
	},

	/**
	 * Returns the current time in milliseconds
	 * @function getCurrentTime
	 * @returns {integer} Current time in milliseconds
	 */
	getCurrentTime = function() {
		return ( new Date() ).getTime();
	},

	/**
	 * Parses a time value into a milliseconds integer value.
	 * @function parseTime
	 * @param {Mixed} value The time value to parse (integer or string)
	 * @returns {integer} Millisecond integer value parsed from the time value
	 */
	parseTime = function( value ) {
		var result, num, mult,
			powers = {
				ms: 1,
				cs: 10,
				ds: 100,
				s: 1000,
				das: 10000,
				hs: 100000,
				ks: 1000000
			};

		if ( value == null ) {
			return null;
		}

		result = /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/.exec( $.trim( value.toString() ) );
		if ( result[ 2 ] ) {
			num = parseFloat( result[ 1 ] );
			mult = powers[ result[ 2 ] ] || 1;
			return num * mult;
		}
		return value;
	},

	/**
	 * Converts a millisecond value into minutes and seconds
	 * @function getTime
	 * @param {integer} milliseconds The time value in milliseconds
	 * @returns {Object} An object with a seconds and minutes property
	 */
	getTime = function( milliseconds ) {
		var time = { minutes: "", seconds: "" };

		if ( milliseconds != null ) {
			time.minutes = parseInt( ( milliseconds / ( 1000 * 60 ) ) % 60, 10 );
			time.seconds = parseInt( ( milliseconds / 1000 ) % 60, 10 );
		}
		return time;
	},

	/**
	 * Given 2 elements representing minutes and seconds, decrement their time value by 1 second
	 * @function countdown
	 * @param {jQuery DOM Element} $minutes Element that contains the minute value
	 * @param {jQuery DOM Element} $seconds Element that contains the second value
	 * @returns {boolean} Is the countdown finished?
	 */
	countdown = function( $minutes, $seconds ) {
		var minutes = parseInt( $minutes.text(), 10 ),
			seconds = parseInt( $seconds.text(), 10 );

		// Decrement seconds and minutes
		if ( seconds > 0 ) {
			seconds -= 1;
		} else if ( minutes > 0 ) {
			minutes -= 1;
			seconds = 59;
		}

		// Update the DOM elements
		$minutes.text( minutes );
		$seconds.text( seconds );

		return minutes === 0 && seconds === 0;
	};

// Bind the plugin events
$document.on( "timerpoke.wb wb-init" + selector + " " + keepaliveEvent + " " +
	inactivityEvent + " " + resetEvent, selector, function( event, settings ) {

	var eventType = event.type;

	switch ( eventType ) {
	case "timerpoke":
	case "wb-init":
		init( event );
		break;

	case "keepalive":
		keepalive( event, settings );
		break;

	case "inactivity":
		inactivity( event, settings );
		break;

	case "reset":
		reset( event, settings );
		break;
	}
});

$document.on( "click", "." + confirmSelector, confirm );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Share widget
 * @overview Facilitates sharing Web content on social media platforms.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-share",
	shareLink = "shr-lnk",
	initEvent = "wb-init" + selector,
	$document = wb.doc,
	i18n, i18nText,

	/*
	 * Plugin users can override these defaults by setting attributes on the html elements that the
	 * selector matches.
	 * For example, adding the attribute data-option1="false", will override option1 for that plugin instance.
	 */
	defaults = {
		heading: "h2",
		sites: {

			// The definitions of the available bookmarking sites, in URL use
			// '{u}' for the page URL, '{t}' for the page title, {i} for the image, and '{d}' for the description
			bitly: {
				name: "bitly",
				url: "http://bitly.com/?url={u}"
			},
			blogger: {
				name: "Blogger",
				url: "http://www.blogger.com/blog_this.pyra?t=&amp;u={u}&amp;n={t}"
			},
			delicious: {
				name: "Delicious",
				url: "http://delicious.com/post?url={u}&amp;title={t}"
			},
			digg: {
				name: "Digg",
				url: "http://digg.com/submit?phase=2&amp;url={u}&amp;title={t}"
			},
			diigo: {
				name: "Diigo",
				url: "http://www.diigo.com/post?url={u}&amp;title={t}"
			},
			dzone: {
				name: "DZone",
				url: "http://www.dzone.com/link/add.html?url={u}&amp;title={t}"
			},
			facebook: {
				name: "Facebook",
				url: "http://www.facebook.com/sharer.php?u={u}&amp;t={t}"
			},
			fark: {
				name: "Fark",
				url: "http://cgi.fark.com/cgi/fark/submit.pl?new_url={u}&amp;new_comment={t}"
			},
			googleplus: {
				name: "Google+",
				url: "https://plus.google.com/share?url={u}&amp;hl=" + document.documentElement.lang
			},
			linkedin: {
				name: "LinkedIn",
				url: "http://www.linkedin.com/shareArticle?mini=true&amp;url={u}&amp;title={t}&amp;ro=false&amp;summary={d}&amp;source="
			},
			myspace: {
				name: "MySpace",
				url: "http://www.myspace.com/Modules/PostTo/Pages/?u={u}&amp;t={t}"
			},
			netvibes: {
				name: "Netvibes",
				url: "http://www.netvibes.com/share?url={u}&amp;title={t}"
			},
			newsvine: {
				name: "Newsvine",
				url: "http://www.newsvine.com/_wine/save?u={u}&amp;h={t}"
			},
			pinterest: {
				name: "Pinterest",
				url: "http://www.pinterest.com/pin/create/button/?url={u}&amp;media={i}&amp;description={d}"
			},
			reddit: {
				name: "reddit",
				url: "http://reddit.com/submit?url={u}&amp;title={t}"
			},
			stumbleupon: {
				name: "StumbleUpon",
				url: "http://www.stumbleupon.com/submit?url={u}&amp;title={t}"
			},
			technorati: {
				name: "Technorati",
				url: "http://www.technorati.com/faves?add={u}"
			},
			tumblr: {
				name: "tumblr",
				url: "http://www.tumblr.com/share?v=3&amp;u={u}&amp;t={t}"
			},
			twitter: {
				name: "Twitter",
				url: "http://twitter.com/home?status={t}%20{u}"
			}
		}
	},

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event `timerpoke.wb` event that triggered the function call
	 */
	init = function( event ) {
		var elm = event.target,
			sites, heading, settings, panel, link, $share, $elm, pageHref,
			pageTitle, pageImage, pageDescription, site, siteProperties, url;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === elm ) {
			$elm = $( elm );
			settings = $.extend( true, defaults, wb.getData( $elm, "wet-boew" ) );
			sites = settings.sites;
			heading = settings.heading;
			pageHref = wb.pageUrlParts.href;
			pageTitle = encodeURIComponent( document.title || $document.find( "h1:first" ).text() );

			// Placeholders until source(s) can be determined and implemented
			pageImage = encodeURIComponent( "" ),
			pageDescription = encodeURIComponent( "" );

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					shareText: i18n( "shr-txt" ),
					disclaimer: i18n( "shr-disc" )
				};
			}

			panel = "<section id='shr-pg' class='shr-pg wb-overlay modal-content overlay-def wb-panel-" +
				( wb.html.attr( "dir" ) === "rtl" ? "l" : "r" ) +
				"'><header class='modal-header'><" + heading + " class='modal-title'>" +
				i18nText.shareText + "</" + heading + "></header><ul class='colcount-xs-2'>";

			for ( site in sites ) {
				siteProperties = sites[ site ];
				url = siteProperties.url
						.replace( /\{u\}/, pageHref )
						.replace( /\{t\}/, pageTitle )
						.replace( /\{i\}/, pageImage )
						.replace( /\{d\}/, pageDescription );
				panel += "<li><a href='" + url + "' class='" + shareLink + " " + site + " btn btn-default' target='_blank'>" + siteProperties.name + "</a></li>";
			}

			panel += "</ul><div class='clearfix'></div><p class='col-sm-12'>" + i18nText.disclaimer + "</p></section>";
			link = "<a href='#shr-pg' aria-controls='shr-pg' class='shr-opn overlay-lnk'><span class='glyphicon glyphicon-share'></span> " +
				i18nText.shareText + "</a>";

			$share = $( panel + link );

			$elm.append( $share );

			$share.trigger( initEvent );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

$document.on( "click vclick", "." + shareLink, function( event) {
	var which = event.which;

	// Ignore middle and right mouse buttons
	if ( !which || which === 1 ) {

		// Close the overlay
		$( event.target ).trigger( "close.wb-overlay" );
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Tables
 * @overview Integrates the DataTables plugin into WET providing searching, sorting, filtering, pagination and other advanced features for tables.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @jeresiv
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-tables",
	$document = wb.doc,
	i18n, i18nText, defaults,

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event `timerpoke.wb` event that triggered the function call
	 */
	init = function( event ) {
		var elm = event.target,
			$elm;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === elm ) {
			$elm = $( elm );

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					oAria: {
						sSortAscending: i18n( "sortAsc" ),
						sSortDescending: i18n( "sortDesc" )
					},
					oPaginate: {
						sFirst: i18n( "first" ),
						sLast: i18n( "last" ),
						sNext: i18n( "nxt" ),
						sPrevious: i18n( "prv" )
					},
					sEmptyTable: i18n( "emptyTbl" ),
					sInfo: i18n( "infoEntr" ),
					sInfoEmpty: i18n( "infoEmpty" ),
					sInfoFiltered: i18n( "infoFilt" ),
					sInfoThousands: i18n( "info1000" ),
					sLengthMenu: i18n( "lenMenu" ),
					sLoadingRecords: i18n( "load" ),
					sProcessing: i18n( "process" ),
					sSearch: i18n( "srch" ),
					sZeroRecords: i18n( "infoEmpty" )
				};
			}

			defaults = {
				asStripeClasses: [],
				oLanguage: i18nText,
				fnDrawCallback: function() {

					if ( $elm.data( "inviewstate" ) === "partial" ){
						$( "html, body" ).scrollTop( $elm.prev().offset().top );
					}

					$elm.trigger( "tables-draw.wb" );
				}
			};

			Modernizr.load({
				load: [ "site!deps/jquery.dataTables" + wb.getMode() + ".js" ],
				complete: function() {
					$elm.dataTable( $.extend( true, defaults, wb.getData( $elm, "wet-boew" ) ) );
				}
			});
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb wb-init.wb-tables", selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/*
 * @title Tabbed interface
 * @overview Dynamically stacks multiple sections of content, transforming them into a tabbed interface.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author WET Community
 */
 (function( $, window, wb ) {
 "use strict";

 /*
  * Variable and function definitions.
  * These are global to the plugin - meaning that they will be initialized once per page,
  * not once per instance of plugin on the page. So, this is a good place to define
  * variables that are common to all instances of the plugin on a page.
  */
 var selector = ".wb-tabs",
	$document = wb.doc,
	$window = wb.win,
	i18n, i18nText,
	controls = selector + " [role=tablist] a",
	uniqueCount = 0,
	initialized = false,
	equalHeightClass = "wb-equalheight",
	equalHeightOffClass = equalHeightClass + "-off",
	initEvent = "wb-init" + selector,
	shiftEvent = "shift" + selector,
	ariaExpanded = "aria-expanded",
	ariaHidden = "aria-hidden",
	ariaSelected = "aria-selected",

	// Includes "xsmallview" and "xxsmallview"
	smallViewPattern = "xsmallview",
	isSmallView,

	defaults = {
		addControls: true,
		excludePlay: false
	},

	// boolean to disable hashchange event listener on tab click,
	// but re-enable it for any other case
	ignoreHashChange = false,

	/*
	 * @method onInit
	 * @param {jQuery DOM element} $elm The plugin element
	 */
	onInit = function( $elm ) {
		var interval = $elm.hasClass( "slow" ) ? 9 : $elm.hasClass( "fast" ) ? 3 : 6,
			$panels = $elm.find( "[role=tabpanel]" ),
			$tablist = $elm.find( "[role=tablist]" ),
			addControls = defaults.addControls,
			excludePlay = defaults.excludePlay,
			hashId = wb.pageUrlParts.hash.substring( 1 ),
			$panel, $openPanel, i, len, tablist, isOpen, newId, $summaries,
			summary, accordionClass;

		// Determine the current view
		isSmallView = document.documentElement.className.indexOf( smallViewPattern ) !== -1;
			
		// Only initialize the i18nText once
		if ( !i18nText ) {
			i18n = wb.i18n;
			i18nText = {
				prev: i18n( "prv" ),
				next: i18n( "nxt" ),
				play: i18n( "play" ),
				rotStart: i18n( "tab-rot" ).on,
				rotStop: i18n( "tab-rot" ).off,
				space: i18n( "space" ),
				hyphen: i18n( "hyphen" ),
				pause: i18n( "pause" )
			};
		}

		// Build the tablist and enhance the panels as needed for details/summary
		if ( $tablist.length === 0 ) {
			addControls = false;
			accordionClass = "tabs-acc-" + uniqueCount;
			$elm.addClass( "tabs-acc " + accordionClass );
			uniqueCount += 1;
			$panels = $elm.children();
			$summaries = $panels.children( "summary" );
			len = $panels.length;

			// Ensure there is only one panel open
			// Order of priority is hash, open property, first details
			if ( hashId.length !== 0 ) {
				$openPanel = $panels.filter( "#" + hashId );
			}
			if ( !$openPanel || $openPanel.length === 0 ) {
				$openPanel = $panels.filter( "[open]" ).first();
				if ( $openPanel.length === 0 ) {
					$openPanel = $panels.eq( 0 );
				}
			}
			$panels.removeAttr( "open" );
			$openPanel.attr( "open", "open" );

			// Hide the tablist in small view and the summary elements in large view
			tablist = "<ul role='tablist' aria-live='off'>";
			if ( isSmallView && $elm.hasClass( equalHeightClass ) ) {
				$elm.toggleClass( equalHeightClass + " " + equalHeightOffClass );
			}
			$summaries
				.addClass( "wb-toggle" )
				.attr( "data-toggle", "{\"parent\": \"." + accordionClass +
					"\", \"group\": \"details\"}" )
				.trigger( "wb-init.wb-toggle" );

			for ( i = 0; i !== len; i += 1 ) {
				$panel = $panels.eq( i );
				summary = $summaries[ i ];
				newId = $panel.attr( "id" );
				if ( !newId ) {
					newId = "tabpanel" + uniqueCount;
					uniqueCount += 1;
					$panel.attr( "id", newId );
				}
				isOpen = !!$panel.attr( "open" );

				if ( isSmallView ) {
					if ( !Modernizr.details ) {
						$panel
							.toggleClass( "open", !isOpen )
							.attr({
								ariaExpanded: !isOpen,
								ariaHidden: isOpen
							});
					}
				} else {
					$panel.attr({
						"role": "tabpanel",
						"open": "open"
					});
					$panel.addClass( ( Modernizr.details ? "" :  "open " ) +
						"fade " + ( isOpen ? "in" : "out" ) );
				}

				tablist += "<li" + ( isOpen ? " class='active'" : "" ) +
					"><a id='" + newId + "-lnk' href='#" + newId + "'>" +
					summary.innerHTML + "</a></li>";
			}
			$tablist = $( tablist + "</ul>" );
			$elm.prepend( $tablist );
		} else {
			$panels.filter( ":not(.in)" )
				.addClass( "out" );
		}

		drizzleAria( $panels, $tablist );

		if ( addControls ) {
			createControls( $tablist, excludePlay );
		}

		$elm
			.addClass( "inited" )
			.data({
				"panels": $panels,
				"tablist": $tablist,
				"delay": interval,
				"ctime": 0
			});

		initialized = true;
	},

	/*
	 * @method onTimerPoke
	 * @param {jQuery DOM element} $elm The plugin element
	 */
	onTimerPoke = function( $elm ) {
		var dataDelay = $elm.data( "delay" ),
			setting, delay;

		if ( !dataDelay ) {
			$elm.trigger( initEvent );
			return false;
		}

		// State playing
		if ( !$elm.hasClass( "playing" ) ) {
			return false;
		}

		// Add settings and counter
		setting = parseFloat( dataDelay );
		delay = parseFloat( $elm.data( "ctime" ) ) + 0.5;

		// Check if we need
		if ( setting < delay ) {
			$elm.trigger( shiftEvent );
			delay = 0;
		}
		$elm.data( "ctime", delay );
	},

	/*
	 * @method createControls
	 * @param {jQuery DOM element} $tablist The plugin element
	 * @param {boolean} excludePlay Whether or not to exclude the play/pause control
	 */
	createControls = function( $tablist, excludePlay ) {
		var $sldr = $tablist.parents( selector ),
			prevText = i18nText.prev,
			nextText = i18nText.next,
			spaceText = i18nText.space,
			isPlaying = $sldr.hasClass( "playing" ),
			state = isPlaying ? i18nText.pause : i18nText.play,
			hidden = isPlaying ? i18nText.rotStop : i18nText.rotStart,
			glyphiconStart = "<span class='glyphicon glyphicon-",
			wbInvStart = "<span class='wb-inv'>",
			tabsToggleStart = "<li class='control ",
			btnMiddle = "' href='javascript:;' role='button' title='",
			btnEnd = "</span></a></li> ",
			iconState = glyphiconStart + ( isPlaying ? "pause" : "play" ) + "'></span>",
			prevControl = tabsToggleStart + "prv'><a class='prv" + btnMiddle +
				prevText + "'>" + glyphiconStart + "chevron-left'></span>" +
				wbInvStart + prevText + btnEnd,
			playControl =  tabsToggleStart + "plypause'><a class='plypause" +
				btnMiddle + state + "'>" + iconState + " <i>" + state +
				"</i>" + wbInvStart + spaceText + i18nText.hyphen + spaceText +
				hidden + btnEnd,
			nextControl = tabsToggleStart + "nxt'><a class='nxt" + btnMiddle +
				nextText + "'>" + glyphiconStart + "chevron-right'></span>" +
				wbInvStart + nextText + btnEnd;

		$tablist.append( prevControl + ( excludePlay ? "" : playControl ) + nextControl );
	},

	/*
	 * @method drizzleAria
	 * @param {2 jQuery DOM element} $panels for the tabpanel grouping, and $tablist for the pointers to the groupings
	 */
	drizzleAria = function( $panels, $tabList ) {

		// lets process the elements for aria
		var panels = $panels.get(),
			tabCounter = panels.length - 1,
			listItems = $tabList.children().get(),
			listCounter = listItems.length - 1,
			isDetails = $panels[ 0 ].nodeName.toLowerCase() === "details",
			isActive, item, link;

		$panels.attr( "tabindex", "-1" );

		for ( ; tabCounter !== -1; tabCounter -= 1 ) {
			item = panels[ tabCounter ];
			isActive = item.className.indexOf( "in" ) !== -1;

			if ( !isDetails ) {
				item.setAttribute( ariaHidden, isActive ? "false" : "true" );
				item.setAttribute( ariaExpanded, isActive ? "true" : "false" );
			}
			item.setAttribute( "aria-labelledby", item.id + "-lnk" );
		}

		for ( ; listCounter !== -1; listCounter -= 1 ) {
			item = listItems[ listCounter ];
			item.setAttribute( "role", "presentation" );
			isActive = item.className.indexOf( "active" ) !== -1;

			link = item.getElementsByTagName( "a" )[ 0 ];
			link.tabIndex = isActive ? "0" : "-1";
			link.setAttribute( "role", "tab" );
			link.setAttribute( ariaSelected, isActive ? "true" : "false" );
			link.setAttribute( "aria-controls", link.getAttribute( "href" ).substring( 1 ) );
		}
		$tabList.attr( "aria-live", "off" );
	},

	updateNodes = function( $panels, $controls, $next, $control ) {
		var nextId = $next.attr( "id" );

		$panels
			.filter( ".in" )
				.removeClass( "in" )
				.addClass( "out" )
				.attr({
					ariaHidden: "true",
					ariaExpanded: "false"
				});

		$next
			.removeClass( "out" )
			.addClass( "in" )
			.attr({
				ariaHidden: "false",
				ariaExpanded: "true"
			});
			
		$controls
			.find( ".active" )
				.removeClass( "active" )
				.children( "a" )
					.attr({
						ariaSelected: "false",
						tabindex: "-1"
					});

		$control
			.attr({
				ariaSelected: "true",
				tabindex: "0"
			})
			.parent()
				.addClass( "active" );

		// Update the hash with the current open tab panel id
		if ( nextId !== window.location.hash.substring( 1 ) ) {
			ignoreHashChange = true;
			window.location.hash = nextId;
		}
	},
	
	/*
	 * @method onPick
	 * @param {jQuery DOM element} $sldr The plugin element
	 * @param {jQuery DOM element} $elm The selected link from the tablist
	 */
	onPick = function( $sldr, $elm ) {
		var $panels = $sldr.data( "panels" ),
			$controls =  $sldr.data( "tablist" ),
			$next = $panels.filter( "#" + $elm.attr( "aria-controls" ) );

		updateNodes( $panels, $controls, $next, $elm );
	},

	/*
	 * @method onShift
	 * @param {jQuery DOM element} $elm The plugin element
	 * @param (jQuery event} event Current event
	 */
	onShift = function( $elm, event ) {
		var $panels = $elm.data( "panels" ),
			$controls = $elm.data( "tablist" ),
			len = $panels.length,
			current = $elm.find( ".in" ).prevAll( "[role=tabpanel]" ).length,
			shiftto = event.shiftto ? event.shiftto : 1,
			next = current > len ? 0 : current + shiftto,
			$next = $panels.eq( ( next > len - 1 ) ? 0 : ( next < 0 ) ? len - 1 : next );

		updateNodes(
			$panels, $controls, $next,
			$controls.find( "[href=#" + $next.attr( "id" ) + "]" )
		);
	},

	/*
	 * @method onShift
	 * @param {jQuery DOM element} $elm The plugin element
	 * @param {integer} shifto The item to shift to
	 */
	onCycle = function( $elm, shifto ) {
		$elm.trigger({
			type: shiftEvent,
			shiftto: shifto
		});
	},

	onHashChange = function( event ) {
		if ( initialized ) {
			var $hashTarget;

			if ( !ignoreHashChange && ( $hashTarget =  $( window.location.hash ) ).length !== 0 ) {
				event.preventDefault();
				if ( isSmallView ) {
					$hashTarget
						.children( "summary" )
							.trigger( "click" );
				} else {
					$hashTarget
						.parent()
							.find( "> ul [href$='" + window.location.hash + "']" )
								.trigger( "click" );
				}
			}

			// Make sure listener is re-enabled
			ignoreHashChange = false;
		}
	},

	onResize = function() {
		var oldIsSmallView = isSmallView,
			$details, $parent, $tablist, $openDetails, $nonOpenDetails, $active;

		isSmallView = document.documentElement.className.indexOf( smallViewPattern ) !== -1;

		if ( initialized && isSmallView !== oldIsSmallView ) {
			$details = $( selector + " details" );
			$parent = $details.parent();
			$tablist = $parent.children( "ul" );
			
			// Disable equal heights for small view and enable for large view
			if ( $parent.attr( "class" ).indexOf( equalHeightClass ) !== -1 ) {
				$parent.toggleClass( equalHeightClass + " " + equalHeightOffClass );
			}

			if ( isSmallView ) {

				// Switch to small view			
				$active = $tablist.find( ".active a" );
				$openDetails = $details.filter( "#" + $active.attr( "href" ).substring( 1 ) );
				$nonOpenDetails = $details
					.removeAttr( "role" )
					.removeClass( "fade out in" )
					.not( $openDetails )
						.removeAttr( "open" );
				if ( !Modernizr.details ) {
					$nonOpenDetails
						.attr({
							ariaExpanded: "false",
							ariaHidden: "true"
						});
					$openDetails.attr({
						ariaExpanded: "true",
						ariaHidden: "false"
					});
				}
			} else {

				// Switch to large view
				$openDetails = $details.filter( "[open]" );
				if ( $openDetails.length === 0 ) {
					$openDetails = $details.eq( 0 );
				}

				$details
					.attr({
						"role": "tabpanel",
						"open": "open"
					})
					.not( $openDetails )
						.addClass( "fade out" );

				$openDetails
					.addClass( "fade in" )
					.parent()
						.find( "> ul [href$='" + $openDetails.attr( "id" ) + "']" )
							.trigger( "click" );
			}

			$tablist.attr( ariaHidden, isSmallView );
		}
	};

 // Bind the init event of the plugin
 $document.on( "timerpoke.wb " + initEvent + " " + shiftEvent, selector, function( event ) {
	var eventType = event.type,

		// "this" is cached for all events to utilize
		$elm = $( this );

	switch ( eventType ) {
	case "timerpoke":
		onTimerPoke( $elm );
		break;

	/*
	 * Init
	 */
	case "wb-init":
		onInit( $elm );
		break;

	/*
	 * Change Slides
	 */
	case "shift":
		onShift( $elm, event );
		break;
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
 });

 /*
  * Next / Prev
  */
 $document.on( "click vclick keydown", controls, function( event ) {
	var which = event.which,
		elm = event.currentTarget,
		className = elm.className,
		rotStopText = i18nText.rotStop,
		playText = i18nText.play,
		$elm, text, inv, $sldr, $plypause;

	// Ignore middle and right mouse buttons
	if ( !which || which === 1 || which === 32 || ( which > 36 && which < 41 ) ) {
		event.preventDefault();
		$elm = $( elm );
		$sldr = $elm
			.parents( selector )
			.attr( "data-ctime", 0 );

		// Stop the slider from playing unless it is already stopped and the play button is activated
		if ( $sldr.hasClass( "playing" ) || ( which < 37 && className.indexOf( "plypause" ) !== -1 ) ) {
			$plypause = $sldr.find( "a.plypause" );
			$plypause.find( ".glyphicon" ).toggleClass( "glyphicon-play glyphicon-pause" );
			$sldr.toggleClass( "playing" );
			
			text = $plypause[ 0 ].getElementsByTagName( "i" )[ 0 ];
			text.innerHTML = text.innerHTML === playText ? i18nText.pause : playText;
				
			inv = $plypause.find( ".wb-inv" )[ 0 ];
			inv.innerHTML = inv.innerHTML === rotStopText ? i18nText.rotStart : rotStopText;
		}
			
		if ( which > 36 ) {
			onCycle( $elm, which < 39 ? -1 : 1 );
			$sldr.find( ".active a" ).trigger( "setfocus.wb" );
		} else {
			if ( elm.getAttribute( "role" ) === "tab" ) {
				onPick( $sldr, $elm );
				$( elm.getAttribute( "href" ) ).trigger( "setfocus.wb" );
			} else if ( !$sldr.hasClass( "playing" ) ) {
				onCycle( $elm, className.indexOf( "prv" ) !== -1 ? -1 : 1 );
			}
		}
	}

	/*
	 * Since we are working with events we want to ensure that we are being passive about our control,
	 * so returning true allows for events to always continue
	 */
	return true;
});

// These events only fire at the document level
$document.on( "xxsmallview.wb xsmallview.wb smallview.wb mediumview.wb largeview.wb xlargeview.wb", onResize );

// This event only fires on the window
$window.on( "hashchange", onHashChange );

// Update the hash with the current open details/tab panel id
$document.on( "click vclick keydown", selector + " > details > summary", function( event ) {
	var which = event.which,
		detailsId = event.currentTarget.parentNode.id;

	if ( !which || which === 1 || which === 13 || which === 32 ) {
		if ( detailsId !== window.location.hash.substring( 1 ) ) {
			ignoreHashChange = true;
			window.location.hash = detailsId;
		}
	}
});

// Add the timer poke to initialize the plugin
wb.add( selector );

 })( jQuery, window, wb );

/**
 * @title WET-BOEW Text highlighting
 * @overview Automatically highlights certain words on a Web page. The highlighted words can be selected via the query string.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-texthighlight",
	$document = wb.doc,

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event `timerpoke.wb` event that triggered the function call
	 */
	init = function( event ) {
		var elm = event.target,
			$elm, searchCriteria, newText;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === elm ) {
			$elm = $( elm );
			searchCriteria = wb.pageUrlParts.params.texthighlight;

			// all plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			if ( searchCriteria ) {
				// clean up the search criteria and OR each value
				searchCriteria = searchCriteria.replace( /^\s+|\s+$|\|+|\"|\(|\)/g, "" ).replace( /\++/g, "|" );
				searchCriteria = decodeURIComponent( searchCriteria );

				// Make sure that we're not checking for text within a tag; only the text outside of tags.
				searchCriteria = "(?=([^>]*<))([\\s'])?(" + searchCriteria + ")(?!>)";

				newText = $elm.html().replace( new RegExp( searchCriteria, "gi" ), function( match, group1, group2, group3 ) {
					return ( !group2 ? "" : group2 ) + "<span class='txthlt'><mark>" + group3 + "</mark></span>";
				});
				$elm.html( newText );
			}
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb wb-init.wb-texthighlight", selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, document, wb );

/**
 * @title WET-BOEW Toggle
 * @overview Plugin that allows a link to toggle elements between on and off states.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @patheard
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-toggle",
	$document = wb.doc,
	$window = wb.win,
	ariaEvent = "aria" + selector,
	toggleEvent = "toggle" + selector,
	toggledEvent = "toggled" + selector,
	states = {},
	defaults = {
		stateOn: "on",
		stateOff: "off"
	},

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event `timerpoke.wb` event that triggered the function call
	 */
	init = function( event ) {
		var $link, data,
			link = event.target;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === link ) {

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Merge the elements settings with the defaults
			$link = $( link );
			data = $.extend( {}, defaults, $link.data( "toggle" ) );
			$link.data( "toggle", data );

			// Initialize the aria-controls attribute of the link
			$link.trigger( ariaEvent, data );
		}
	},

	/**
	 * Sets the aria attribute for a given toggle element
	 * @param {jQuery Event} event The event that triggered this invocation
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 */
	setAria = function( event, data ) {
		var i, len, elm, $elm, $parent, $tab,
			ariaControls = "",
			link = event.target,
			prefix = "wb-" + new Date().getTime(),
			$elms = getElements( link, data );

		// Group toggle elements with a parent are assumed to be a tablist
		if ( data.group != null && data.parent != null ) {
			$parent = $( data.parent );

			// Check that the group toggle widget hasn't already been initialized
			if ( !$parent.data( "init" ) ) {
				$parent
					.attr( "role", "tablist" )
					.find( ".tab" )
						.attr( "role", "tab" );
				$parent
					.find( ".panel" )
						.attr( "role", "panel" );

				// Create the tab/panel relationships
				$elms = $parent.find( data.group );
				for ( i = 0, len = $elms.length; i !== len; i += 1 ) {
					$elm = $elms.eq( i );
					$tab = $elm.find( ".tab" );
					if ( !$tab.attr( "id" ) ) {
						$tab.attr( "id", prefix + i );
					}
					$elm.find( ".panel" ).attr( "aria-labelledby", $tab.attr( "id" ) );
				}

				// Mark this group toggle widget as initialized
				$parent.data( "init", true );
			}

		// Set the elements this link controls
		} else {
			for ( i = 0, len = $elms.length; i !== len; i += 1 ) {
				elm = $elms[ i ];
				if ( !elm.id ) {
					elm.id = prefix + i;
				}
				ariaControls += elm.id + " ";
			}
			link.setAttribute( "aria-controls", ariaControls.slice( 0, -1 ) );
		}
	},

	/**
	 * Click handler for the toggle links
	 * @param {jQuery Event} event The event that triggered this invocation
	 * @param {DOM element} link The toggle link that was clicked
	 */
	click = function( event, link ) {
		var $link = $( link );

		$link.trigger( toggleEvent, $link.data( "toggle" ) );
		event.preventDefault();

		// Assign focus to eventTarget
		$link.trigger( "setfocus.wb" );
	},

	/**
	 * Toggles the elements a link controls between the on and off states.
	 * @param {jQuery Event} event The event that triggered this invocation
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 */
	toggle = function( event, data ) {
		var dataGroup, $elmsGroup,
			link = event.target,
			$elms = getElements( link, data ),
			stateFrom = getState( link, data ),
			isGroup = !!data.group,
			isTablist = isGroup && !!data.parent,
			isToggleOn = stateFrom === data.stateOff,
			stateTo = isToggleOn ? data.stateOn : data.stateOff;

		// Group toggle behaviour: only one element in the group open at a time.
		if ( isGroup ) {

			// Get the grouped elements using data.group as the CSS selector
			dataGroup = $.extend( {}, data, { selector: data.group } );
			$elmsGroup = getElements( link, dataGroup );

			// Toggle all grouped elements to "off"
			setState( $elmsGroup, dataGroup, data.stateOff );
			$elmsGroup.wb( "toggle", data.stateOff, data.stateOn );
			$elmsGroup.trigger( toggledEvent, {
				isOn: false,
				isTablist: isTablist,
				elms: $elmsGroup
			});
		}

		// Toggle all elements identified by data.selector to the requested state
		setState( $elms, data, stateTo );
		$elms.wb( "toggle", stateTo, stateFrom );
		$elms.trigger( toggledEvent, {
			isOn: isToggleOn,
			isTablist: isTablist,
			elms: $elms
		});
	},

	/*
	 * Executed once the toggle has been completed. Used to set the aria
	 * attributes and ensure opened group toggle element is visible.
	 */
	toggled = function( event, data ) {
		var top,
			isOn = data.isOn,
			$elms = data.elms;

		if ( data.isTablist ) {

			// Set the required aria attributes
			$elms.find( ".tab" ).attr( "aria-selected", isOn );
			$elms.find( ".panel" ).attr({
				"aria-hidden": !isOn,
				"aria-expanded": isOn
			});

			// Check that the top of the open element is in view.
			if ( isOn && $elms.length === 1 ) {
				top = $elms.offset().top;
				if ( top < $window.scrollTop() ) {
					$window.scrollTop( top );
				}
			}
		}
	},

	/**
	 * Sets the required property and attribute for toggling open/closed a details element
	 * @param {jQuery Event} event The event that triggered this invocation
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 */
	toggleDetails = function( event, data ) {
		var isOn = data.isOn,
			$detail = $( this );

		// Native details support
		$detail.prop( "open", isOn );

		// Polyfill details support
		if ( !Modernizr.details ) {
			$detail.attr( "open", isOn ? null : "open" );
			$detail.find( "summary" ).trigger( "toggle.wb-details" );
		}
	},

	/**
	 * Returns the elements a given toggle element controls.
	 * @param {DOM element} link Toggle element that was clicked
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 * @returns {jQuery Object} DOM elements the toggle link controls
	 */
	getElements = function( link, data ) {
		var selector = data.selector !== undefined ? data.selector : link,
			parent = data.parent !== undefined ? data.parent : null;

		return parent !== null ? $( parent ).find( selector ) : $( selector );
	},

	/**
	 * Gets the current toggle state of elements controlled by the given link.
	 * @param {DOM element} link Toggle link that was clicked
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 */
	getState = function( link, data ) {
		var parent = data.parent,
			selector = data.selector,
			type = data.type,
			$link, state;

		// No toggle type: get the current on/off state of the elements
		// specified by the selector and parent
		if ( !type ) {
			if ( !selector ) {
				$link = $( link );
				if ( link.nodeName.toLowerCase() === "summary" ) {
					state = !$link.parent().attr( "open" ) ?
						data.stateOff : data.stateOn;
				} else {
					state = $link.data( "state" );
				}

				return state || data.stateOff;

			} else if ( states.hasOwnProperty( selector ) ) {
				return states[ selector ].hasOwnProperty( parent ) ?
					states[ selector ][ parent ] :
					states[ selector ].all;
			}

			return data.stateOff;
		}

		// Type: get opposite state of the type. Toggle reverses this
		// to the requested state.
		return type === data.stateOn ? data.stateOff : data.stateOn;
	},

	/*
	 * Sets the current toggle state of elements controlled by the given link.
	 * @param {DOM element} link Toggle link that was clicked
	 * @param {Object} data Simple key/value data object passed when the event was triggered
	 * @param {String} state The current state of the elements: "on" or "off"
	 */
	setState = function( $elms, data, state ) {
		var prop,
			parent = data.parent,
			selector = data.selector,
			elmsState = states[ selector ];

		if ( selector ) {

			// Check the selector object has been created
			if ( !elmsState ) {
				elmsState = { all: data.stateOff };
				states[ selector ] = elmsState;
			}

			// If there's a parent, set its state
			if ( parent ) {
				elmsState[ parent ] = state;

			// No parent means set all states for the given selector. This is
			// because toggle links that apply to the entire DOM also affect
			// links that are restricted by parent.
			} else {
				for ( prop in elmsState ) {
					if ( elmsState.hasOwnProperty( prop ) ) {
						elmsState[ prop ] = state;
					}
				}
			}
		}

		// Store the state on the elements as well. This allows a link to toggle itself.
		$elms.data( "state", state );
	};

// Bind the plugin's events
$document.on( "timerpoke.wb wb-init" + selector + " " + ariaEvent + " " + toggleEvent +
	" " + toggledEvent + " click", selector, function( event, data ) {

	var eventType = event.type;

	switch ( eventType ) {
	case "click":
		click( event, this );
		break;
	case "toggle":
		toggle( event, data );
		break;
	case "toggled":
		toggled( event, data );
		break;
	case "aria":
		setAria( event, data );
		break;
	case "timerpoke":
	case "wb-init":
		init( event );
		break;
	}
});
$document.on( toggledEvent, "details", toggleDetails );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Twitter embedded timeline
 * @overview Helps with implementing Twitter embedded timelines.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-twitter",
	$document = wb.doc,

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event `timerpoke.wb` event that triggered the function call
	 */
	init = function( event ) {

		// Filter out any events triggered by descendants
		if ( event.currentTarget === event.target ) {
			var protocol = wb.pageUrlParts.protocol;

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			Modernizr.load( {
				load: ( protocol.indexOf( "http" ) === -1 ? "http:" : protocol ) + "//platform.twitter.com/widgets.js"
			});
		}
	};

$document.on( "timerpoke.wb wb-init" + selector, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );

/**
 * @title WET-BOEW Disable Event
 * @overview Event creates the active offer for users that have disabled the event.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @gc
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the event - meaning that they will be initialized once per page,
 * not once per instance of event on the page.
 */
var selector = "#wb-tphp",
	$document = wb.doc,

	/**
	 * createOffer runs once per plugin element on the page.
	 * @method createOffer
	 * @param {jQuery Event} event `timerpoke.wb` event that triggered the function call
	 */
	createOffer = function( event ) {
		var elm = event.target,
			nQuery = "?",
			$html = wb.html,
			i18n = wb.i18n,
			pageUrl = wb.pageUrlParts,
			li, param;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === elm ) {

			// Let remove ourselves from the queue we only run once
			wb.remove( selector );

			li = document.createElement( "li" );
			li.className = "wb-slc";

			// Rebuild the query string
			for ( param in pageUrl.params ) {
				if ( pageUrl.params.hasOwnProperty( param ) && param !== "wbdisable" ) {
					nQuery += param + "=" + pageUrl.params[ param ] + "&#38;";
				}
			}

			if ( wb.isDisabled || ( wb.ie && wb.ielt7 ) ) {
				$html.addClass( "no-js wb-disable" );
				if ( localStorage ) {

					// Store preference for WET plugins and polyfills to be disabled in localStorage
					localStorage.setItem( "wbdisable", "true");
				}

				// Append the Standard version link
				li.innerHTML = "<a class='wb-sl' href='" + nQuery + "wbdisable=false'>" + i18n( "wb-enable" ) + "</a>";

				// Add link to re-enable WET plugins and polyfills
				elm.appendChild( li );
				return true;
			} else if ( localStorage ) {

				// Store preference for WET plugins and polyfills to be enabled in localStorage
				localStorage.setItem( "wbdisable", "false" );
			}

			// Append the Basic HTML version link version
			li.innerHTML = "<a class='wb-sl' href='" + nQuery + "wbdisable=true'>" + i18n( "wb-disable" ) + "</a>";
			elm.appendChild( li ); // Add link to disable WET plugins and polyfills
		}
	};

// Bind the events
$document.on( "timerpoke.wb", selector, createOffer );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );
