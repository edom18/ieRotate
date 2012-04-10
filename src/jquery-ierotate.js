/**
 * Rotation elements for IEs (6, 7, 8)
 * This script is jQuery plugin.
 * @author edo
 * @version 0.1
 */
(function ($) {

    var DEG_TO_RAD = Math.PI / 180,
        cos = Math.cos,
        sin = Math.sin,
        angleManager = {};

    $.fn.ieRotate = function (deg) {
    
        var rad = deg * DEG_TO_RAD,
            cos_ta, sin_ta,
            i = 0, l = this.length,
            ele, style, filters, filter;

        if (angleManager[deg]) {
            cos_ta = angleManager[deg].cos_ta;
            sin_ta = angleManager[deg].sin_ta;
        }
        else {
            angleManager[deg] = {};
            angleManager[deg].cos_ta = cos_ta = cos(rad);
            angleManager[deg].sin_ta = sin_ta = sin(rad);
        }

        //apply to all DOM elements.
        for (; ele = this[i]; i++) {
            filters = ele.filters;
            style = ele.style;

            //check matrix of filters are applied.
            try {
                filter = filters.item('DXImageTransform.Microsoft.Matrix');
            } catch (e) {
                ele.style.filter += "progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=1, M21=1, M22=1, sizingMethod='auto expand')";
                filters = ele.filters;
                filter = filters.item('DXImageTransform.Microsoft.Matrix');
            }

            //Apply angle to the element.
            filter.M11 = cos_ta; filter.M12 = -sin_ta;
            filter.M21 = sin_ta; filter.M22 = cos_ta;

            style.marginLeft = style.marginRight = -(ele.offsetWidth - ele.clientWidth) / 2;
            style.marginTop = style.marginBottom = -(ele.offsetHeight - ele.clientHeight) / 2;
        }

        return this;
    };
}(jQuery));
