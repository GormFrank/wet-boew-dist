/*! Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 - v4.0.0-a1-development - 2013-11-19
*/
/*! Modernizr (Custom Build) | MIT & BSD */
/*
 * Web Experience Toolkit (WET) / Boîte à outils de l"expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
/*
----- Spanish dictionary (il8n) ---
 */
( function( window ) {
"use strict";
/* main index */
var ind = {
	"lang-code": "es",
	"lang-nat": "Español",
	"all": "Todo",
	"tphp": "Arriba",
	"load": "cargando …",
	"process": "en proceso …",
	"srch": "Búsqueda",
	"no-match": "0 resultados encontrados",
	"matches": {
		"mixin": "[MIXIN] resultado(s) encontrados"
	},
	"curr": "(actual)",
	"hide": "Ocultar",
	"err": "Error",
	"colon": ":",
	"hyphen": " - ",
	"full-stop": ".",
	"comma-space": ", ",
	"space": "&#32;",
	"start": "Iniciar",
	"stop": "Detener",
	"back": "Volver",
	"cancel": "Cancelar",
	"min-ago": "hace un minuto",
	"coup-mins": "hace algunos minutos",
	"mins-ago": {
		"mixin": "hace [MIXIN] minutos"
	},
	"hour-ago": "hace una hora",
	"hours-ago": {
		"mixin": "hace [MIXIN] horas"
	},
	"days-ago": {
		"mixin": "hace [MIXIN] días"
	},
	"yesterday": "ayer",

	"nxt": "Siguiente",
	"nxt-r": "Siguiente (tecla flecha derecha)",
	"prv": "Anterior",
	"prv-l": "Anterior (tecla flecha izquierda)",
	"first": "Primero",
	"last": "Último",
	"close-esc": "Cerrar (tecla \"esc\")",
	"show": "Mostrar",

	/* Tabbed interface */
	"tab-rot": {
		"off": "Detener rotación de pestañas",
		"on": "Comenzar rotación de pestañas"
	},
	"tab-list": "Lista de pestañas",
	"tab-pnl-end1": "Fin de este panel de pestaña.",
	"tab-pnl-end2": "Volver a la lista de pestañas",
	"tab-pnl-end3": "o continuar al resto de la página.",
	/* Multimedia player */
	"play": "Reproducir",
	"pause": "Pausa",
	"open": "Abrir",
	"close": "Cerrar",
	"rew": "Retroceder",
	"ffwd": "Avanzar",
	"mute": {
		"on": "Silencio",
		"off": "Habilitar sonido"
	},
	"cc": {
		"off": "Ocultar subtítulos",
		"on": "Mostrar subtítulos"
	},
	"cc-err": "Error al cargar subtítulos",
	"adesc": {
		"on": "Habilitar audio descripción ",
		"off": "Deshabilitar audio descripción"
	},
	"pos": "Posición actual:",
	"dur": "Tiempo total:",
	/* Share widget */
	"shr-txt": "Compartir esta página",
	"shr-hnt": " con {s} ",
	"shr-disc": "No implica la promoción ni recomendación de ningún producto o servicio.",
	/* Form validation */
	"frm-nosubmit": "El formulario no pudo ser enviado debido a ",
	"errs-fnd": " errores encontrados.",
	"err-fnd": " error encontrado.",
	/* Date picker */
	"date-hide": "Ocultar calendario",
	"date-show": "Escoger una fecha de un calendario para el campo:",
	"date-sel": "Seleccionado",
	/* Calendar */
	"days": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
	"mnths": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
	"cal": "Calendario",
	"currDay": "(hoy)",
	"cal-goToLnk": "Ir a<span class=\"wb-inv\"> mes del año</span>",
	"cal-goToTtl": "Ir al mes del año",
	"cal-goToMnth": "Mes:",
	"cal-goToYr": "Año:",
	"cal-goToBtn": "Ir",
	"prvMnth": "Mes anterior: ",
	"nxtMnth": "Mes siguiente: ",
	/* Lightbox */
	"lb-curr": "Artículo curr de total",
	"lb-xhr-err": "Este contenido no pudo ser cargado.",
	"lb-img-err": "Esta imagen no pudo ser cargada.",
	/* Charts widget */
	"table-mention": "Tabla",
	"table-following": "Cuadro. Los detalles aparecen en la siguiente tabla.",
	/* Session timeout */
	"st-to-msg-bgn": "Su sesión expirará automáticamente en #min# min #sec# sec.",
	"st-to-msg-end": "Seleccione \"Continuar sesión\" para prolongar tu sesión.",
	"st-msgbx-ttl": "Aviso de finalización de sesión",
	"st-alrdy-to-msg": "Lo sentimos, su sesión ha expirado. Por favor ingrese nuevamente.",
	"st-btn-cont": "Continuar sesión",
	"st-btn-end": "Finalizar sesión ahora",
	/* Toggle details */
	"td-toggle": "Alternar todo",
	"td-open": "Expandir todo",
	"td-close": "Colapsar todo",
	"td-ttl-open": "Expandir todas las secciones de contenido",
	"td-ttl-close": "Colapsar todas las secciones de contenido",
	/* Table enhancement */
	"sortAsc": "active para ordenar en sentido ascendente",
	"sortDesc": "active para ordenar en sentido decendente",
	"emptyTbl": "No hay información disponible en la tabla",
	"infoEntr": "Mostrar _START_ a _END_ de _TOTAL_ entradas",
	"infoEmpty": "Mostrar 0 a 0 de 0 entradas",
	"infoFilt": "(filtrado de _MAX_ entradas totales)",
	"info1000": ".",
	"lenMenu": "Mostrar _MENU_ entradas",
	/* Geomap */
	"geo-mapctrl": "Control de mapa",
	"geo-zmin": "Aumentar",
	"geo-zmout": "Reducir",
	"geo-zmwrld": "Reducir al mapa completo",
	"geo-zmfeat": "Aumentar al elemento",
	"geo-sclln": "La escala del mapa",
	"geo-msepos": "Latitud y longitud del cursor del ratón",
	"geo-ariamap": "Objeto: mapa. Las descripciones de las características del mapa están en la tabla a continuación.",
	"geo-ally": "<strong>Keyboard users:</strong> When the map is in focus, use the arrow keys to pan the map and the plus and minus keys to zoom. The arrow keys will not pan the map when zoomed to the map extent.",
	"geo-allyttl": "Instrucciones: Mapa de navegación",
	"geo-tgllyr": "Cambiar la visualización de la capa",
	"geo-hdnlyr": "Esta capa está oculta.",
	"geo-bmapurl": "http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg",
	"geo-bmapttl": "BaseMaps_CBMT3978",
	"geo-bmapurltxt": "http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg",
	"geo-attrlnk": "http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en",
	"geo-attrttl": "GeoGratis - Canadá mapa base (Inglés o francés)",
	"geo-sel": "Seleccionar",
	"geo-lblsel": "Haga clic para seleccionar el elemento en el mapa",
	/* Disable/enable WET plugins and polyfills */
	"wb-disable": "Versión HTML básica",
	"wb-enable": "Versión estándar",
	/* Template */
	"tmpl-signin": "Iniciar sesión"
};

window.i18nObj = ind;

})( window );

vapour.doc.one( "formLanguages.wb", function() {
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ES (Spanish; Español)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Este campo es obligatorio.",
		remote: "Por favor, rellena este campo.",
		email: "Por favor, escribe una dirección de correo válida",
		url: "Por favor, escribe una URL válida.",
		date: "Por favor, escribe una fecha válida.",
		dateISO: "Por favor, escribe una fecha (ISO) válida.",
		number: "Por favor, escribe un número entero válido.",
		digits: "Por favor, escribe sólo dígitos.",
		creditcard: "Por favor, escribe un número de tarjeta válido.",
		equalTo: "Por favor, escribe el mismo valor de nuevo.",
		accept: "Por favor, escribe un valor con una extensión aceptada.",
		maxlength: $.validator.format("Por favor, no escribas más de {0} caracteres."),
		minlength: $.validator.format("Por favor, no escribas menos de {0} caracteres."),
		rangelength: $.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
		range: $.validator.format("Por favor, escribe un valor entre {0} y {1}."),
		max: $.validator.format("Por favor, escribe un valor menor o igual a {0}."),
		min: $.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
	});
}(jQuery));

});