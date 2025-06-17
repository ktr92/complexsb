window.onload = function () {
  
  $('.filter__header-js').on('click', function () {
    $(this).parent().toggleClass('filter__item_open');
    $(this).siblings('.filter__form').slideToggle();
  });

  if ($("#sliderprice1").length) {
    

    $('input#maxCost1').on('focusin', function () {
      $(this).val("");
      $(this).trigger('change')
    });

    $('input#minCost1').on('focusin', function () {
      $(this).val("");
      $(this).trigger('change')
    });
    $('input#maxCost2').on('focusin', function () {
      $(this).val("");
      $(this).trigger('change')
    });

    $('input#minCost2').on('focusin', function () {
      $(this).val("");
      $(this).trigger('change')
    });


    $("#maxCost1").val($('#limitMax1').val());
    $("#minCost1").val($('#limitMin1').val());
    $("#maxCost1").trigger('change')
    $("#minCost1").trigger('change')
    $("#maxCost1").prop("placeholder", $("#limitMax1").val());
    $("#minCost1").prop("placeholder", $("#limitMin1").val());

    
    


      jQuery("#sliderprice1").slider({
        min: +jQuery("input#limitMin1").val(),
        max: +jQuery("input#limitMax1").val(),
        values: [+jQuery("input#limitMin1").val(), +jQuery("input#limitMax1").val()],
        range: true,
        stop: function (event, ui) {
          jQuery("input#minCost1").val(jQuery("#sliderprice1").slider("values", 0));
          jQuery("input#maxCost1").val(jQuery("#sliderprice1").slider("values", 1));
        

          //var val1 = $test1.prop("value");
          //$test1.prop("value", prettify(val1));

          if (jQuery("input#minCost1").val() == $('#limitMin1').val()) {
            jQuery("input#minCost1").addClass('notchanged');
          } else {
            jQuery("input#minCost1").removeClass('notchanged');
          }

          if (jQuery("input#maxCost1").val() == $('#limitMax1').val()) {
            jQuery("input#maxCost1").addClass('notchanged');
          } else {
            jQuery("input#maxCost1").removeClass('notchanged');
          }

          jQuery("input#maxCost1").trigger('change')
          jQuery("input#minCost1").trigger('change')
        },
        slide: function (event, ui) {
          jQuery("input#minCost1").val(jQuery("#sliderprice1").slider("values", 0));
          jQuery("input#maxCost1").val(jQuery("#sliderprice1").slider("values", 1));

          if (jQuery("input#minCost1").val() == $('#limitMin1').val()) {
            jQuery("input#minCost1").addClass('notchanged');
          } else {
            jQuery("input#minCost1").removeClass('notchanged');
          }

          if (jQuery("input#maxCost1").val() == $('#limitMax1').val()) {
            jQuery("input#maxCost1").addClass('notchanged');
          } else {
            jQuery("input#maxCost1").removeClass('notchanged');
          }
          jQuery("input#maxCost1").trigger('change')
          jQuery("input#minCost1").trigger('change')

          //var val1 = $test1.prop("value");
          // $test1.prop("value", prettify(val1));
        }
      });


      jQuery("input#maxCost1").change(function () {
          console.log(jQuery("input#maxCost1").val())

        var value1 = jQuery("input#minCost1").val();
        var value2 = jQuery("input#maxCost1").val();

        if (value2 > (+jQuery("input#limitMax1").val())) {
          value2 = +jQuery("input#limitMax1").val();
          jQuery("input#maxCost1").val(+jQuery("input#limitMax1").val())
        }


        jQuery("#sliderprice1").slider("values", 1, value2);
       /*  $test1.prop("value", prettify(val1));
        var val1 = $test1.prop("value");

        $test1.prop("value", prettify(val1)); */

        if (jQuery("input#minCost1").val() == $('#limitMin1').val()) {
          jQuery("input#minCost1").addClass('notchanged');
        } else {
          jQuery("input#minCost1").removeClass('notchanged');
        }

        if (jQuery("input#maxCost1").val() == $('#limitMax1').val()) {
          jQuery("input#maxCost1").addClass('notchanged');
        } else {
          jQuery("input#maxCost1").removeClass('notchanged');
        }

      });

      jQuery("input#minCost1").change(function () {

        var value1 = jQuery("input#minCost1").val();
        var value2 = jQuery("input#maxCost1").val();

        if (value2 < (+jQuery("input#limitMin1").val())) {
          value2 = +jQuery("input#limitMin1").val();
          jQuery("input#minCost1").val(+jQuery("input#limitMin1").val())
          jQuery("input#minCost1").trigger('change')
        }


        jQuery("#sliderprice1").slider("values", 0, value1);
     /*    var val1 = $test1.prop("value");
        $test1.prop("value", prettify(val1));

        var val1 = $test1.prop("value");
        $test1.prop("value", prettify(val1)); */

        if (jQuery("input#minCost1").val() == $('#limitMin1').val()) {
          jQuery("input#minCost1").addClass('notchanged');
        } else {
          jQuery("input#minCost1").removeClass('notchanged');
        }

        if (jQuery("input#maxCost1").val() == $('#limitMax1').val()) {
          jQuery("input#maxCost1").addClass('notchanged');
        } else {
          jQuery("input#maxCost1").removeClass('notchanged');
        }

      });



  }

};