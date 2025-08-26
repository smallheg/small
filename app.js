console.log("Test");
$(document).ready(function(){

	$('.d-calc-product input').on('input', function() {

		$( '#add-to-project-btn' ).prev().hide();

		$( '#add-to-project-btn' ).prop( 'disabled', true );

		$('#calc_klei').val(0);
		$('#calc_bazalt_5').val(0);
		//$('#calc_bazalt_10').val(0);
		$('#calc_lenta').val(0);

		if ( $(this).val() == 'vozd-square' ) {
			$('.d-vozd-round').slideUp(200, function() {
   				$('.d-vozd-square').slideDown(200)
			});
		}
		if ( $(this).val() == 'vozd-round' ) {
			$('.d-vozd-square').slideUp(200, function() {
   				$('.d-vozd-round').slideDown(200)
			});
		}

		$('#calc-rashod').val(0);
		$('#calc-bazis').text('0');
		$('#calc-komplekt').val(0);
		$('#calc-price').text('0');
		$('#calc-palet').text('0');

		vozd_width = 1;
		vozd_height = 1;
		vozd_diametr = 1;

		quality = $('.d-radio input[name=quality]:checked').val();

		if ( $('.d-radio input[name=gruppa]').length ) {
			gruppa = $('.d-radio input[name=gruppa]:checked').val();
		} else {
			gruppa = 1;
		}

		calc_area = $('input[name=calc_area]').val();
		if ( typeof calc_area != "undefined" ) {
			calc_area = calc_area.replace(',', '.')
		}
		calc_area = Math.abs(calc_area);

		calc_depth = $('input[name=calc_depth]').val();
		if (typeof calc_depth != "undefined") {
			calc_depth = calc_depth.replace(',', '.');
			calc_depth = Math.round(calc_depth*10)/10;
		}
				
		if (bazis == 'ptk-vent-5') {
			calc_depth_min = 1;
			calc_depth_max = 1;
			calc_depth = 1;
			quality = 1;
			calc_massa_komplekt = 1;
			calc_price_1_kg = 2.04;
			calc_palet_comp = 1; // сколько комплектов влезает на 1 палету

// определение площади воздуховода
			vozd_width = $('input[name=vozd_width]').val();
			vozd_width = vozd_width.replace(',', '.');

			vozd_height = $('input[name=vozd_height]').val();
			vozd_height = vozd_height.replace(',', '.');

			vozd_diametr = $('input[name=vozd_diametr]').val();
			vozd_diametr = vozd_diametr.replace(',', '.');

			vozd_length_square = $('input[name=vozd_length_square]').val();
			vozd_length_square = vozd_length_square.replace(',', '.');

			vozd_length_round = $('input[name=vozd_length_round]').val();
			vozd_length_round = vozd_length_round.replace(',', '.');

			if ( $('input[name=vozd-type]:checked').val() == 'vozd-square' ) {
				calc_area = Math.round( ( vozd_width * 2 + vozd_height * 2 ) * vozd_length_square / 1000 * 10 ) / 10;
// периметр
				vozd_perimetr = ( vozd_width * 2 + vozd_height * 2 ) / 1000;
				if ( calc_area ) {
					$( 'input[name=calc_area_square]' ).val(calc_area);
				} else {
					calc_area = $( 'input[name=calc_area_square]' ).val();
					if ( calc_area !== undefined ) {
						calc_area = calc_area.replace(',', '.');
					}
				}
			}

			if ( $('input[name=vozd-type]:checked').val() == 'vozd-round' ) {
				calc_area = Math.round( 3.14 * vozd_diametr * vozd_length_round / 1000 * 10 ) / 10;
				vozd_perimetr = 3.14 * vozd_diametr / 1000;
				if ( calc_area ) {
					$( 'input[name=calc_area_round]' ).val(calc_area);
				} else {
					calc_area = $( 'input[name=calc_area_round]' ).val();
					if ( calc_area !== undefined ) {
						calc_area = calc_area.replace(',', '.');
					}
				}
			}
		}

		if ( (calc_area>0) && (calc_depth>0) && (calc_depth>=calc_depth_min) && (calc_depth<=calc_depth_max) && (calc_area<100000) && (typeof quality != "undefined") 
			&& ( (vozd_width && vozd_height) || vozd_diametr ) && gruppa 
		) {

			$( '#add-to-project-btn' ).prop( 'disabled', false );

			if (bazis == 'ptk-vent-5') { // ПТК-ВЕНТ

				if ( $('input[name=vozd-type]:checked').val() == 'vozd-square' ) {
					$('input[name=calc_area_square]').val(calc_area);
				}

				if ( $('input[name=vozd-type]:checked').val() == 'vozd-round' ) {
					$('input[name=calc_area_round]').val(calc_area);
				}

				if ( $('input[name=vozd-type]:checked').val() == 'vozd-square' ) {
					hydro_diameter = 2 * vozd_width * vozd_height / ( vozd_width + vozd_height );
				} else {
					hydro_diameter = vozd_diametr;
				}

				//if ( vozd_width > 999 || vozd_height > 999 || vozd_diametr > 999 ) {
				//	hydro_diameter = 1001;
				//}

				klei_rashod_hydro_diameter = 1.5;
				//if ( hydro_diameter > 999 ) {
				//	klei_rashod_hydro_diameter = 3;
				//}

				klei_rashod   = Math.round( klei_rashod_hydro_diameter * calc_area * 10) / 10;
				bazalt_rashod = Math.round( calc_area * ( 1.07 * ( vozd_perimetr + 0.08 )) / vozd_perimetr * 10) / 10;
				lenta_rashod  = Math.round( 1.5 * calc_area * 10) / 10;
				klei_komplekt = Math.ceil(klei_rashod / 18.5);
				bazalt_komplekt = Math.ceil(bazalt_rashod / 10);
				
				$('#calc_klei').val(klei_rashod);
				$('#calc_bazalt_5').val(bazalt_rashod);
				//if ( hydro_diameter <= 999 ) {
				//	$('#calc_bazalt_5').val(bazalt_rashod);
				//	$('#calc_bazalt_10').val(0);
				//} else {
				//	$('#calc_bazalt_10').val(bazalt_rashod);
				//	$('#calc_bazalt_5').val(0);
				//}

				$('#calc_lenta').val(lenta_rashod);
			}
		} 


	}); 

// добавляем строку в таблицу проекта
$('#add-to-project-btn').click(function() {

	$('#add-to-project-btn').prop('disabled', true);

	if ( $('input[name=vozd-type]:checked').val() == 'vozd-square' ) {
		vozd_type = 'Прямоугольный';
	} else {
		vozd_type = 'Круглый';
	}

if ( hydro_diameter > 0 ) {
		calc_bazalt_5 = bazalt_rashod;
}
	//if ( hydro_diameter <= 999 ) {
	//	calc_bazalt_5 = bazalt_rashod;
	//	calc_bazalt_10 = 0;
	//} else {
	//	calc_bazalt_5 = 0;
	//	calc_bazalt_10 = bazalt_rashod;
	//}

	if ( $('input[name=vozd-type]:checked').val() == 'vozd-square' ) {

		vozd_dlina = $('input[name=vozd_length_square]').val();
		if ( vozd_dlina ) {
			vozd_dlina = Math.round( vozd_dlina.replace(',', '.') * 10 ) / 10;
		}

		vozd_ploshad = $('input[name=calc_area_square]').val();
		if ( vozd_ploshad ) {
			vozd_ploshad = Math.round( vozd_ploshad.replace(',', '.') * 10 ) / 10;
		}
	} else {

		vozd_dlina = $('input[name=vozd_length_round]').val();
		if ( vozd_dlina ) {
			vozd_dlina = Math.round( vozd_dlina.replace(',', '.') * 10 ) / 10;
		}

		vozd_ploshad = $('input[name=calc_area_round]').val();
		if ( vozd_ploshad ) {
			vozd_ploshad = Math.round( vozd_ploshad.replace(',', '.') * 10 ) / 10;
		}
	}

// добавляем запись в локальное хранилище

// создадим объект
	obj = {
		type:			vozd_type,
		shirina: 		vozd_width,
		vysota: 		vozd_height,
		diametr: 		vozd_diametr,
		dlina:			vozd_dlina,
		ploshad:		vozd_ploshad,

		calc_klei:		klei_rashod,
		calc_bazalt_5:	calc_bazalt_5,
		//calc_bazalt_10:	calc_bazalt_10,
		calc_lenta:		lenta_rashod

	};

	serialObj = JSON.stringify(obj); // сериализуем его

	d = new Date();

	localStorage.setItem('ptk-vent-mbor-' + d.getTime(), serialObj); // запишем его в хранилище по ключу "ptk-vent-mbor-DATETIME"

// подсчитываем кол-во записей в Local Storage с именем ptk-vent-mbor-
	nn = 0;
	for (i = 0; i < localStorage.length; i++){
		if ( localStorage.key(i).indexOf('ptk-vent-mbor-') != -1 ) {
			++nn;
		}
	}
	$('.my-project-open-btn span').text(nn);

// перемещаем прямоугольник в правый блок, моргаем и трясем цифру
	$( this ).transfer( {
		to: $('.my-project-open-btn a'), duration: 800 },
		function() {
			$('.my-project-open-btn').fadeTo(100, 0.5).fadeTo(100, 1.0);
			$('.my-project-open-btn span').effect('shake', { times: 3, distance: 2 }, 500 );
		} );

	$('#add-to-project-btn').prev().show();
	setTimeout(function () {
            $('#add-to-project-btn').prev().hide();
        }, 4000);

	return false;
});

// popup окно с проектом
$('.my-project-open-btn a').fancybox( {
width: '95%',
beforeShow: function(){

// формируем таблицу из Local Storage
$('.my-project-tbl').html('');
tbl_header = '<tr>' + 
	'<td>Тип</td>' + 
	'<td>Ширина, мм</td>' + 
	'<td>Высота, мм</td>' + 
	'<td>Диаметр, мм</td>' + 
	'<td>Длина, м</td>' + 
	'<td>Площадь, м²</td>' + 
	
	'<td>Клей «Warmisol-К», кг</td>' + 
	'<td>Материал базальтовый «Warmisol-МБОР, м²</td>' + 
	//'<td>Материал базальтовый ПТК‑ВЕНТ‑МБОР‑10Ф, м²</td>' + 
	'<td>Лента алюминиевая (ширина 50 мм), м.п.</td>' + 

'</tr>';

$('.my-project-tbl').append(tbl_header);

// помещаем все нужные элементы из Local Storage в массив и сортируем его
arr = [];
for (i = 0; i < localStorage.length; i++){
	if ( localStorage.key(i).indexOf('ptk-vent-mbor-') != -1 ) {
		returnObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
		arr.push( returnObj );
	}
}

// How to sort an array of objects by multiple fields?
// https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields/46256174
function compare( a, b ) {

	if (a.type === b.type && a.shirina === b.shirina && a.vysota === b.vysota) {
    	return a.diametr - b.diametr;
    }

	if (a.type === b.type && a.shirina !== b.shirina) {
        return a.shirina - b.shirina;
    }

    if (a.type === b.type && a.shirina === b.shirina) {
    	return a.vysota - b.vysota;
    }

    return a.type > b.type ? 1 : -1;

}

arr.sort( compare );

calc_klei_itogo      = 0;
calc_bazalt_5_itogo  = 0;
//calc_bazalt_10_itogo = 0;
calc_lenta_itogo     = 0;
calc_ploshad_itogo   = 0;

for (i = 0; i < arr.length; i++){

	tbl_row = '<tr><td>' + 
	arr[i].type + '</td><td data-t="n">' + 
	arr[i].shirina + '</td><td data-t="n">' + 
	arr[i].vysota + '</td><td data-t="n">' + 
	arr[i].diametr + '</td><td data-t="n">' + 
	arr[i].dlina + '</td><td data-t="n">' + 
	arr[i].ploshad + '</td><td data-t="n">' + 

	arr[i].calc_klei + '</td><td data-t="n">' + 
	arr[i].calc_bazalt_5 + '</td><td data-t="n">' + 
	//arr[i].calc_bazalt_10 + '</td><td data-t="n">' + 
	arr[i].calc_lenta + '</td>' + 

	'</tr>';

	$('.my-project-tbl').append(tbl_row);

calc_klei_itogo      += arr[i].calc_klei;
calc_bazalt_5_itogo  += arr[i].calc_bazalt_5;
//calc_bazalt_10_itogo += arr[i].calc_bazalt_10;
calc_lenta_itogo     += arr[i].calc_lenta;
calc_ploshad_itogo   += arr[i].ploshad;
}

// table footer
tbl_footer = '<tr>' + 
	'<td colspan="5" style="text-align:right;font-weight:bold" data-f-bold="true" data-fill-color="ffa4ffa4">ИТОГО</td>' + 

	'<td data-t="n" data-f-bold="true" data-fill-color="ffa4ffa4" class="rashod-total-kg-all">' + Math.round(calc_ploshad_itogo * 10) / 10  + '</td>' + 
	'<td data-t="n" data-f-bold="true" data-fill-color="ffa4ffa4" class="rashod-total-kg-all">' + Math.round(calc_klei_itogo * 10) / 10  + '</td>' + 
	'<td data-t="n" data-f-bold="true" data-fill-color="ffa4ffa4" class="rashod-total-kg-all">' + Math.round(calc_bazalt_5_itogo * 10) / 10 + '</td>' + 
	//'<td data-t="n" data-f-bold="true" data-fill-color="ffa4ffa4" class="rashod-total-kg-all">' + Math.round(calc_bazalt_10_itogo * 10) / 10 + '</td>' + 
	'<td data-t="n" data-f-bold="true" data-fill-color="ffa4ffa4" class="rashod-total-kg-all">' + Math.round(calc_lenta_itogo * 10) / 10 + '</td>' + 

'</tr>';

$('.my-project-tbl').append(tbl_footer);

}
});


// при загрузке страницы - подсчитываем кол-во записей в Local Storage с именем ptk-vent-mbor-
nn = 0;
for (i = 0; i < localStorage.length; i++) {
	if ( localStorage.key(i).indexOf('ptk-vent-mbor-') != -1 ) {
		++nn;
	}
}
$('.my-project-open-btn span').text(nn);

// Converting HTML Table to EXEL
$('#my-project-export-csv').click(
    function() {
    	TableToExcel.convert(document.getElementById('my-project-tbl'), {
  			name: 'project.xlsx',
  			sheet: {
    			name: 'Лист 1'
  			}
		});
    });

$( '.my-project-open-btn a' ).click( function(e) {
	e.preventDefault();
});

// удалить ВСЁ
$('#clear-project').click(function () {
	if (confirm('Уверены?')) {
		arr2 = [];
		for (i = 0; i < localStorage.length; i++) {
			if (localStorage.key(i).indexOf('ptk-vent-mbor-') != -1) {
				arr2.push(localStorage.key(i));
			}
		}
		for (i = 0; i < arr2.length; i++) {
			localStorage.removeItem(arr2[i]);
		}

		$('.my-project-open-btn span').text('0');
	}
});

$('input[name=vozd-type]').on( 'change', function() {
	$( '.d-vozd-square input, .d-vozd-round input' ).val( '' );
});


});


