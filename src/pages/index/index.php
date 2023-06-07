<?php

/**
 * Plugin Name: DFRNC 3D animation
 * Plugin URI: https://dfrnc.com
 * Description: Add custom svg animation shortcode [dfrnc_3d_anim text="Innovation ist gelb."] 
 * Version: 1.2
 * Author: DFRNC
 * Author URI: https://dfrnc.com
 **/



/**
 * add shortcode for main animation on page
 */

add_shortcode('dfrnc_3d_anim', 'dfrnc_3d_anim_func');
function dfrnc_3d_anim_func($atts)
{
	ob_start();
	$plugin_dir = get_option('siteurl') . '/wp-content/plugins/4761_anim3d/';
	?>


	<link href="<?= $plugin_dir; ?>assets/css/index.css" rel="stylesheet">
	<section class="dfrnc">
		<div class="container_loader">
			<div id="preloader_P22">
				<div id="loader_P22"></div>
			</div>
			<div class="container_loader__content">
				<h2>
					<?= $atts["text"]; ?>
				</h2>
			</div>
			<h2 class="container_loader__progress">0%...</h2>
		</div>
		<div class="dfrnc-arrow dfrnc-arrow--prev">&lt;</div>
		<div class="dfrnc__anim-canvas" id="mainAnimContainer" data-model="<?= $plugin_dir; ?>models/"></div>
		<div class="dfrnc-arrow dfrnc-arrow--next">&gt;</div>
	</section>
	<script defer src="<?= $plugin_dir; ?>assets/js/index.js"></script>

	<?php
	$anim_html = ob_get_clean();
	return $anim_html;
}