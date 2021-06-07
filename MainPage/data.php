<?php

/* Product Categories: [pastries, muffins] */

$pastries = array(
	(object) array(
        'id' => 1,
		'name' => 'Croissant',
		'description' => 'A buttery, flaky, viennoiserie pastry of Austrian origin, named for its historical crescent shape.',
		'price' => '3.00',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/pastries/croissant.jpg'
	),
	(object) array(
        'id' => 2,
		'name' => 'Cannoli',
        'description' => 'An Italian pastry consisting of a tube-shaped shell of fried pastry dough, 
                            filled with a sweet, creamy filling.',
        'price' => '3.50',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/pastries/cannoli.jpg'
	),
	(object) array(
        'id' => 3,
		'name' => 'Cheese Danish',
		'description' => 'A delicious, flaky pastry dough, and incorporated with a smooth cheese filling.',
        'price' => '4.50',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/pastries/cheeseDanish.jpg'
	),
	(object) array(
        'id' => 4,
		'name' => 'Chocolate Danish',
		'description' => 'A delicious, flaky pastry dough, incorporated with a smooth chocolate filling.',
        'price' => '4.00',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/pastries/chocolateDanish.jpg'
	),
	(object) array(
        'id' => 5,
		'name' => 'Biscotti',
		'description' => 'An Italian almond biscuit that originated in the Tuscan city of Prato. It is twice-baked, oblong-shaped, dry, and crunchy,',
        'price' => '2.29',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/pastries/biscotti.jpg'
    ),
    (object) array(
        'id' => 6,
        'name' => 'Cinnamon Bun',
		'description' => 'A rolled sheet of dough onto which a cinnamon and sugar mixture is sprinkled over a thin coat of butter and then baked or deep fried.',
        'price' => '3.76',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/pastries/cinnamonBun.jpg'
    )
);

$muffins = array(
	(object) array(
        'id' => 1,
		'name' => 'Apple Muffin',
		'description' => 'A delicous, moist, apple-flavored muffin. Perfect for breakfast on-the-go or as a quick pick-me-up.',
		'price' => '2.50',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/muffins/AppleMuffin.jpg'
	),
	(object) array(
        'id' => 2,
		'name' => 'Choc-Chip Muffin',
        'description' => 'A delicous, moist, chocolate-chip muffin. Perfect for breakfast on-the-go or as a quick pick-me-up.',
        'price' => '2.50',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/muffins/chocolateChipMuffin.jpg'
	),
	(object) array(
        'id' => 3,
		'name' => 'Blueberry Muffin',
		'description' => 'A delicous, moist, blueberry-flavored muffin. Perfect for breakfast on-the-go or as a quick pick-me-up.',
        'price' => '2.99',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/muffins/blueberryMuffin.jpg'
	),
	(object) array(
        'id' => 4,
		'name' => 'Banana Muffin',
		'description' => 'A delicous, moist, banana-flavored muffin. Perfect for breakfast on-the-go or as a quick pick-me-up.',
        'price' => '2.50',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/muffins/bananaMuffin.jpg'
	),
	(object) array(
        'id' => 5,
		'name' => 'Pumpkin Muffin',
		'description' => 'A delicous, moist, pumpkin-flavored muffin. Perfect for breakfast on-the-go or as a quick pick-me-up.',
        'price' => '2.99',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/muffins/pumpkinMuffin.jpg'
    ),
    (object) array(
        'id' => 6,
        'name' => 'Corn Muffin',
		'description' => 'A delicous, moist, muffin muffin. Perfect for breakfast on-the-go or as a quick pick-me-up.',
        'price' => '2.50',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/muffins/cornMuffin.jpg'
	),
	(object) array(
        'id' => 7,
        'name' => 'Oatmeal Muffin',
		'description' => 'A delicous, moist, oatmeal muffin. Perfect for breakfast on-the-go or as a quick pick-me-up.',
        'price' => '2.50',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/muffins/oatmealMuffin.jpg'
	),
	(object) array(
        'id' => 8,
        'name' => 'Carrot Muffin',
		'description' => 'A delicous, moist, corn muffin. Perfect for breakfast on-the-go or as a quick pick-me-up.',
        'price' => '2.50',
        'image' => 'http://localhost/storefrontproject1/mainPage/productimages/muffins/carrotMuffin.jpg'
	)
);



/*
 * Checks both POST and GET for the named key, otherwise returns the provided
 *  default (or null).
 */
function rget($key, $default=null){
	return isset($_POST[$key]) ? $_POST[$key] : (isset($_GET[$key])  ? $_GET[$key]  : $default);
}


function get_filtered($data, $filter_col, $filter_val){
	$results = array();

	foreach( $data as $obj ){
		// If row lacks the filter column, skip it
		if( !isset($obj->$filter_col) ) continue;

		// If row column, doesn't contain the filter value, skip it
		if( is_int($obj->$filter_col) && $obj->$filter_col != $filter_val ){
			continue;
		}else if( strstr($obj->$filter_col, $filter_val) === false ){
			continue;
		}

		$results[] = $obj;
	}

	return $results;
}


function format_json($data){
	$json_str = '';

	$json_str .= "<pre>";
	$json_str .= "[\n";
	foreach( $data as $obj ){
		$obj_vars = get_object_vars($obj);

		$json_str .= "\t{\n";
		foreach( $obj_vars as $k => $v ){
			$json_str .= "\t\t'$k': '$v',\n";
		}
		$json_str .= "\t},\n";
	}
	$json_str .= "]\n";
	$json_str .= "</pre>";

	return $json_str;
}



////
//  1. Get data source
////
$source = rget('source', 'pastries');
$data = null;
if( $source ){
	switch( $source ){
	case 'pastries':
		$data = $pastries;
		break;
	case 'muffins':
		$data = $muffins;
		break;
	}
}

// If no source selected, display error and abort
if( !$data ){
	echo "Error: Invalid source selected.";
	exit();
}



////
//  2. Apply data filter, if provided
////
if( isset($_POST['apply_filter']) ){
	$filter_col = rget('filter_col');
	$filter_val = rget('filter_val');

	if( $filter_col && $filter_val ){
		$data = get_filtered($data, $filter);
	}
}



#echo "<pre>".print_r($_REQUEST,1)."</pre>";
#echo "<p>".gettype(rget('csv'))."</p>";
#exit();



////
//  3. Print the data as JSON
////
$csv = rget('csv');
if( isset($csv) ){
	echo format_json($data);
}else{
	$output = json_encode($data);
	echo $output;
}



?>
